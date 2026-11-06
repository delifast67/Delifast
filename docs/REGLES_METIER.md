# Registre officiel des règles métier Delifast

**Version consolidée : 2.1 — 6 novembre 2026**

Ce document intègre le registre consolidé transmis le 6 novembre 2026. Il remplace toute formulation antérieure incompatible. Les règles validées sont distinguées des conventions techniques recommandées et des questions restant à décider. Aucune règle ne doit être déduite d’un exemple de maquette.
Le présent dossier est une conception statique : les validations côté serveur, les transitions opérationnelles, les preuves privées, les paiements et remboursements réels, les API, les migrations et les transactions de base de données ne sont pas implémentés par cette mise à jour.

## Notifications dans l’application

À chaque changement d’état important, le client et le commerçant reçoivent une notification dans l’application. Elle indique le nouveau statut, le montant concerné et l’action attendue. Pour la première version, cette règle ne prévoit ni SMS ni e-mail. Le détail des changements considérés comme « importants » reste à préciser avant l’implémentation ; il ne modifie pas la règle de notification ci-dessus.

## Marché, commerces et comptes

- Le lancement initial vise Ouagadougou, au Burkina Faso. Delifast met en relation des clients, des restaurants et d’autres commerces.
- Delifast ne fournit pas le service de livraison. Chaque commerçant définit les modalités, zones et frais qu’il propose. Le client ne voit que les modes déclarés par le commerce.
- La carte situe l’établissement renseigné par le commerçant, pas la position actuelle du client ; le client peut ouvrir ce lieu dans Google Maps.
- Clients et commerçants utilisent Google OAuth avec PKCE uniquement. Pas d’inscription par mot de passe, numéro de téléphone, OTP ou SMS.
- Il existe un seul compte administrateur, provisionné de façon sécurisée côté serveur. Il n’y a ni inscription publique d’administrateur ni changement de rôle par l’utilisateur. Les rôles et autorisations sont vérifiés côté serveur ; la base future utilisera des politiques RLS.

## Paiements de commande et abonnements

- Le client paie directement le commerçant par l’opérateur et au numéro que celui-ci a configurés, notamment Orange Money ou Telmob.
- Seuls les opérateurs pour lesquels le commerçant a renseigné un numéro de paiement sont affichés au client. Celui-ci transmet la référence de transaction et une capture du SMS de paiement ; le commerçant compare les éléments au SMS reçu sur son téléphone, puis valide ou refuse manuellement le paiement. Un refus comporte un motif. Le client peut renvoyer une preuve lorsque le parcours le permet ; le dépôt d’une image ne valide jamais un paiement automatiquement.
- Le paiement d’abonnement est adressé à Delifast et vérifié manuellement par l’administrateur à partir de la référence, de la preuve et du SMS reçu sur le numéro de Delifast. Les états documentés sont en attente, validé et refusé ; un refus est expliqué.
- Format USSD documenté : `14421{numero}*{montant}#`. Les espaces sont retirés du numéro ; dans un lien téléphonique, `#` est encodé en `%23`, par exemple `tel:1442156893460*4500%23`.
- Les justificatifs de paiement sont privés et les décisions sont historisées. Aucune intégration ne doit présenter Delifast comme exécutant automatiquement un paiement ou un remboursement Mobile Money.

## Panier, produits et options

### Panier mono-commerçant

- Un panier et la commande qui en résulte concernent un seul commerçant.
- Si le client tente d’ajouter un produit d’un autre commerçant, l’interface demande confirmation avant de vider et remplacer le panier. S’il annule, le panier courant est conservé ; s’il confirme, le panier est remplacé et le nouveau produit y est ajouté.
- Le contrôle d’appartenance s’applique côté serveur également.

### Suivi du stock et disponibilité manuelle

- Le suivi de stock est facultatif pour chaque produit. Pour les produits suivis, la quantité disponible correspond à `stock_quantity - reserved_quantity`.
- La disponibilité manuelle est indépendante du suivi du stock. Le commerçant peut publier, désactiver, marquer comme épuisé ou réactiver un produit même si le suivi est désactivé. Un produit marqué indisponible ne peut jamais être commandé.
- Les quantités suivies sont réservées à l’envoi de la commande. La réservation n’expire pas automatiquement.
- Après validation du paiement par le commerçant, les quantités réservées sont consommées et déduites définitivement du stock disponible. Si le paiement est refusé ou si la commande est annulée avant consommation, les réservations actives concernées sont libérées.
- Après consommation, une quantité n’est restituée que si l’annulation intervient avant la préparation ou la remise au client. Il n’y a pas de restitution automatique après préparation ou remise. Pour une annulation partielle, ces règles ne s’appliquent qu’aux articles annulés.

### Libération manuelle d’une réservation

- Le commerçant peut libérer les réservations de ses propres commandes ; l’administrateur peut intervenir sur toutes les commandes.
- Un motif est obligatoire. L’action conserve l’auteur, la date, le motif et les quantités concernées. Le client est notifié si sa commande est affectée.
- Une réservation consommée ne peut pas être traitée comme une réservation active à libérer.
- Une libération ne doit pas laisser une commande active dans un état incohérent.

### Options de produits

- Un produit peut être simple ou proposer des groupes d’options.
- Chaque groupe est obligatoire ou facultatif et possède un minimum et un maximum de choix configurables. Un groupe obligatoire impose un minimum d’au moins 1 ; un groupe facultatif peut avoir un minimum de 0. Le maximum est supérieur ou égal au minimum et ne dépasse pas le nombre d’options disponibles.
- Chaque option peut porter un supplément de prix. Les choix et prix des options sont copiés dans l’historique de la commande. Les validations s’appliquent côté serveur.

## Modification d’une commande pendant la préparation

- Si un produit devient indisponible pendant la préparation, le commerçant peut proposer au client de retirer ou remplacer l’article. Le commerçant ne peut pas modifier unilatéralement la commande ; le client doit accepter explicitement.
- La demande conserve l’ancienne et la nouvelle composition ainsi que les anciens et nouveaux montants. Les lignes de commande conservent leurs noms, prix, options et quantités au moment de la commande.
- Statuts validés d’une demande de modification :

| Statut | Signification |
|---|---|
| `pending_customer_approval` | En attente de la réponse du client |
| `accepted` | Modification acceptée par le client |
| `rejected` | Modification refusée par le client |

- Si le montant augmente après paiement, le paiement complémentaire doit être vérifié avant la poursuite de la commande.
- Si le montant diminue après paiement, le commerçant rembourse directement la différence. Delifast enregistre et vérifie la preuve ; il n’exécute pas lui-même le remboursement Mobile Money.

## Annulation après refus d’une modification

### Déclenchement et périmètre

- Lorsque le client refuse une proposition, la demande de modification passe à `rejected` et une demande d’annulation est créée.
- Après ce refus, le client choisit l’annulation totale de la commande ou celle des seuls articles concernés par la proposition. Ce choix et, pour une annulation partielle, les articles visés sont enregistrés dans la demande d’annulation.
- Si la préparation a commencé, le commerçant confirme son arrêt à l’ouverture de l’annulation. La commande ou les articles concernés restent suspendus pendant le traitement de l’annulation et du remboursement. Après finalisation d’une annulation partielle, le commerçant confirme la reprise des articles restants ; une annulation totale ne donne lieu à aucune reprise.

### Statuts de commande

| Statut | Signification |
|---|---|
| `pending_payment` | Commande envoyée, paiement en attente |
| `confirmed` | Paiement validé par le commerçant |
| `preparing` | Préparation commencée |
| `cancellation_pending` | Annulation en cours de traitement |
| `partially_cancelled` | Une partie des articles est annulée, le reste continue |
| `cancelled` | Commande entièrement annulée et procédure finalisée |
| `completed` | Commande terminée et remise au client |

`cancelled` est réservé à une commande entièrement annulée. Une commande partiellement annulée ne devient pas `cancelled` tant que d’autres articles restent actifs. `completed` concerne la remise au client des articles qui restent après une annulation partielle.

### Annulation totale

- Avant validation du paiement : `pending_payment` → `cancellation_pending` → `cancelled`. Aucun remboursement n’est requis si aucun paiement n’a été validé. Les réservations actives concernées sont libérées, l’annulation est historisée et le client ainsi que le commerçant sont notifiés.
- Après validation du paiement : `confirmed` ou `preparing` → `cancellation_pending` → `cancelled`. Si la préparation a commencé, le commerçant confirme son arrêt lors de l’ouverture de l’annulation. Il rembourse directement au client le montant intégral payé pour la commande, puis transmet la référence de transaction et la preuve. Delifast vérifie le remboursement ; la commande ne passe à `cancelled` qu’après vérification positive. Le client et le commerçant sont notifiés des changements d’état importants selon la règle des notifications ci-dessus. Une annulation totale n’entraîne pas de reprise de préparation.

### Annulation partielle

1. Le client choisit les articles concernés après son refus ; ce périmètre est enregistré et les articles visés sont isolés dans la demande d’annulation. Si la préparation a commencé, le commerçant confirme son arrêt à l’ouverture de l’annulation.
2. Les quantités et montants sont calculés depuis les données historiques de la commande, jamais depuis les prix actuels du catalogue.
3. Si aucun paiement n’a été validé, les réservations correspondantes sont libérées et les articles concernés sont annulés sans remboursement fictif.
4. Si le paiement a été validé, le commerçant rembourse le prix historique des articles annulés et leurs suppléments directement associés. Les frais partagés restent inchangés. Il transmet la référence et la preuve ; Delifast vérifie celle-ci.
5. Après vérification positive, l’annulation partielle est finalisée et les articles concernés sont marqués comme annulés. Le commerçant confirme alors la reprise du traitement des articles restants. La commande porte `partially_cancelled` tant qu’il reste des articles actifs.

### Statuts et finalisation du remboursement

| Statut | Signification |
|---|---|
| `not_required` | Aucun remboursement nécessaire |
| `pending` | Remboursement attendu du commerçant |
| `proof_submitted` | Le commerçant a transmis une preuve et une référence |
| `verified` | Le remboursement a été vérifié par Delifast |
| `rejected` | La preuve ou le remboursement a été rejeté après vérification |

- Une annulation sans paiement validé peut être finalisée après libération des réservations concernées et enregistrement de l’annulation.
- Lorsqu’un remboursement est nécessaire, le dépôt d’une preuve ne suffit pas : la commande ne peut être finalisée qu’après passage du remboursement à `verified`.
- Un rejet de preuve exige un motif transmis au commerçant pour correction. Le client voit que l’annulation attend une régularisation.
- Si le remboursement est `rejected`, l’annulation ne peut pas être finalisée et la commande reste `cancellation_pending` en attente de régularisation ; le rejet n’introduit pas un nouveau statut de commande. Le commerçant peut transmettre une preuve corrigée, que l’administrateur vérifie à nouveau selon le même parcours.
- Pour une annulation partielle, seule la partie annulée est finalisée après vérification ; les autres articles restent actifs jusqu’à la confirmation de reprise par le commerçant. Le client et le commerçant reçoivent dans l’application les notifications de changements d’état importants, avec le statut, le montant concerné et l’action attendue ; aucun SMS ni e-mail n’est prévu pour la première version.

## Modèles de données recommandés

Les noms et champs ci-dessous sont des conventions recommandées dans le registre pour une future implémentation. Ils ne créent pas de statuts métier supplémentaires et ne sont pas implémentés dans cette mise à jour.

- `products` : `stock_tracking_enabled`, `stock_quantity`, `reserved_quantity`, `is_available`.
- `product_option_groups` : `name`, `is_required`, `min_selections`, `max_selections`, `display_order`, `is_active`.
- `product_options` : `name`, `additional_price`, `is_available`, `display_order`.
- Panier et commande : `carts`, `cart_items`, `cart_item_options`, `orders`, `order_items`, `order_item_options`. La commande conserve des snapshots de noms, prix, options et quantités au moment de l’achat.
- Réservations et mouvements : `stock_reservations`, `stock_reservation_items`, `stock_movements`. Les statuts recommandés pour `stock_reservations.status` sont `active`, `consumed` et `released`. Les informations recommandées comprennent `reserved_at`, `consumed_at`, `released_at`, `released_by` et `release_reason`. Les mouvements gardent l’historique de réservation, consommation, libération, restitution et ajustement.
- Modifications : `order_change_requests` conserve notamment `order_id`, `requested_by`, `reason`, `old_total`, `new_total`, `status`, `customer_response_at` et `created_at`. `order_change_items` détaille les articles ajoutés, retirés ou modifiés, les quantités et prix anciens/nouveaux, et les options anciennes/nouvelles.
- Annulations : `order_cancellations` conserve notamment `order_id`, `requested_by`, `reason`, `source`, `scope` (totale ou partielle, choisi par le client après le refus), `status`, `created_at` et `completed_at`. Une liaison ou des lignes de détail identifient exactement les `order_items` annulés. Le registre ne définit pas de liste distincte de valeurs de statut pour `order_cancellations.status`.
- Remboursements : `refunds` peut conserver `order_id`, `amount`, `operator`, `transaction_reference`, `proof_file_path`, `status`, `reviewed_by` et `reviewed_at`. Un remboursement partiel est lié aux articles ou au périmètre d’annulation correspondant. Le montant payé initialement et celui remboursé sont conservés sans écraser les données historiques.

## Sécurité, validation et tests futurs

- Les validations métier doivent être exécutées côté serveur. Les opérations de réservation, consommation, libération et restitution sont atomiques en base ; des transactions PostgreSQL et des verrouillages adaptés empêchent les doubles réservations et les stocks négatifs.
- Le commerçant ne gère que ses propres produits, commandes et réservations ; l’administrateur peut intervenir sur toutes les commandes et vérifier les remboursements.
- Les montants remboursés sont calculés à partir des snapshots de commande. Les preuves de paiement et de remboursement sont stockées de manière sécurisée et ne sont jamais considérées validées automatiquement par simple dépôt d’image.
- Les tests avant mise en production doivent couvrir : panier mono-commerçant avec confirmation avant remplacement ; commande d’un produit sans suivi de stock s’il est disponible ; refus d’un produit indisponible ; minimums et maximums d’options ; réservations concurrentes sans dépassement du stock ; libération après paiement refusé ; impossibilité de libérer comme active une réservation consommée ; restitution du stock dans les seuls cas prévus ; absence de modification unilatérale et réponse explicite du client ; choix du client (annulation totale ou articles concernés) conservé dans la demande ; remboursement total du montant payé ou remboursement partiel des prix historiques et suppléments directement associés avec frais partagés inchangés ; absence de faux remboursement avant validation du paiement ; preuve non vérifiée qui ne finalise pas ; rejet motivé transmis au commerçant et visible comme attente de régularisation côté client ; renvoi d’une preuve corrigée et nouvelle vérification par l’administrateur ; arrêt confirmé par le commerçant si la préparation a commencé et reprise confirmée après finalisation partielle, sans reprise après annulation totale ; notifications dans l’application avec statut, montant et action attendue ; cohérence de stock sur les articles annulés.

## Détails restant à préciser

Ces détails ne sont pas tranchés par les décisions actuelles et restent séparés des règles métier déjà validées :

1. Comment décomposer une annulation portant sur une partie seulement des unités d’une même ligne, notamment lorsque ses options ou suppléments sont facturés par unité ? Les montants restent fondés sur l’historique de commande.
2. Comment répartir les remises ou autres ajustements partagés qui ne sont pas des frais ? Les frais partagés, eux, restent inchangés.
3. Quels changements d’état sont qualifiés d’« importants » pour appliquer la règle générale de notification, et quelle formulation d’action convient à chaque cas ? Les destinataires, le canal dans l’application, les champs de contenu et l’absence de SMS/e-mail en v1 sont déjà décidés.
4. Les limites ou délais de renvoi des preuves corrigées et le niveau de détail de l’historique des tentatives ne sont pas définis ; ils ne changent pas le parcours validé de renvoi puis de nouvelle vérification.

Les 53 écrans, dont les vues existantes de détail de commande client, commerçant et administration, matérialisent ces règles sans créer de nouvel écran, de nouveau statut ou de comportement opérationnel non validé. Voir le [cahier des charges](CAHIER_DES_CHARGES.md) et les [maquettes](maquettes/README.md).

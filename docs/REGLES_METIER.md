# Registre officiel des règles métier Delifast

**Version consolidée : 2.2 — 6 novembre 2026**

Ce document intègre les décisions consolidées du 6 novembre 2026, y compris les arbitrages délégués par Hilton. Il remplace toute formulation antérieure incompatible. Les règles validées sont distinguées des conventions techniques recommandées et des seuls arbitrages métier réellement encore ouverts. Aucune règle ne doit être déduite d’un exemple de maquette.
Le présent dossier est une conception statique : les validations côté serveur, les transitions opérationnelles, les preuves privées, les paiements et remboursements réels, les API, les migrations et les transactions de base de données ne sont pas implémentés par cette mise à jour.

## Notifications dans l’application

Chaque transition réelle vers un autre état déclenche une notification dans l’application au client et au commerçant, pour les états de commande, paiement, modification, annulation, remboursement et réservation qui affectent cette commande. L’arrêt et la reprise de préparation confirmés déclenchent également une notification. Aucun SMS ni e-mail n’est envoyé en v1. Une création de brouillon ou une modification qui ne change aucun état n’en déclenche pas.

Les états déjà prévus et leurs libellés exacts sont :

| Domaine | État existant | Libellé de notification |
|---|---|---|
| Commande | `pending_payment` | Paiement en attente |
| Commande | `confirmed` | Commande confirmée |
| Commande | `preparing` | Préparation commencée |
| Commande / annulation | `cancellation_pending` | Annulation en cours |
| Commande / annulation | `partially_cancelled` | Annulation partielle finalisée |
| Commande / annulation | `cancelled` | Commande annulée |
| Commande | `completed` | Commande terminée |
| Paiement de commande (libellés déjà utilisés) | À vérifier ; Validé ; Refusé | Paiement à vérifier ; Paiement validé ; Paiement refusé |
| Modification | `pending_customer_approval` | Réponse du client attendue |
| Modification | `accepted` | Modification acceptée |
| Modification | `rejected` | Modification refusée |
| Remboursement | `not_required` | Remboursement non requis |
| Remboursement | `pending` | Remboursement attendu |
| Remboursement | `proof_submitted` | Preuve de remboursement transmise |
| Remboursement | `verified` | Remboursement vérifié |
| Remboursement | `rejected` | Preuve de remboursement rejetée — correction attendue |
| Réservation | `active` | Réservation de stock active |
| Réservation | `consumed` | Réservation de stock consommée |
| Réservation | `released` | Réservation de stock libérée |
| Préparation (confirmation, pas un statut nouveau) | Arrêt confirmé | Arrêt de préparation confirmé |
| Préparation (confirmation, pas un statut nouveau) | Reprise confirmée | Reprise de préparation confirmée |

Les transitions d’annulation utilisent uniquement les statuts de commande ci-dessus ; aucun statut distinct d’annulation n’est ajouté. Chaque notification indique le statut atteint, le montant concerné (montant du paiement, du remboursement ou des articles touchés ; sinon montant de la commande) et la prochaine action propre au destinataire. En l’absence d’action, le libellé est « Aucune action requise ». Par exemple, après le rejet d’une preuve, le client attend la correction et la vérification, tandis que le commerçant corrige et renvoie la preuve. Les deux destinataires reçoivent les trois champs, même si leurs actions diffèrent.

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
- Un motif est obligatoire. L’action conserve l’auteur, la date, le motif et les quantités concernées. Si la commande est affectée, la transition réelle de réservation notifie le client et le commerçant avec le statut atteint, le montant concerné et l’action attendue.
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
- Après validation du paiement : `confirmed` ou `preparing` → `cancellation_pending` → `cancelled`. Si la préparation a commencé, le commerçant confirme son arrêt lors de l’ouverture de l’annulation. Il rembourse directement au client le montant intégral payé pour la commande, puis transmet la référence de transaction et la preuve. Delifast vérifie le remboursement ; la commande ne passe à `cancelled` qu’après vérification positive. Chaque transition réelle déclenche la notification prévue ci-dessus. Une annulation totale n’entraîne pas de reprise de préparation.

### Annulation partielle

1. Le client choisit les articles concernés après son refus ; ce périmètre est enregistré et les articles visés sont isolés dans la demande d’annulation. Si la préparation a commencé, le commerçant confirme son arrêt à l’ouverture de l’annulation.
2. Une ligne de commande représente un produit avec les options choisies et leur supplément. Le snapshot conserve les quantités, prix de base, suppléments, ajustements propres à la ligne et part des ajustements globaux attribuée à cette ligne au moment de la commande.
3. Si aucun paiement n’a été validé, les réservations correspondantes sont libérées et les articles concernés sont annulés sans remboursement fictif.
4. Le prix net historique unitaire comprend le prix de base, les suppléments choisis, les ajustements propres à la ligne et la part d’ajustement global attribuée à l’article. Pour annuler `n` unités d’une ligne, le remboursement est ce prix net unitaire multiplié par `n`. Les choix et ajustements historiques restent attachés aux unités ; ils ne sont pas recalculés selon le catalogue courant ni redistribués aux articles restants.
5. Les remises et autres ajustements monétaires globaux qui ne sont pas des frais communs sont répartis au prorata entre les lignes selon leur montant après ajustements propres à l’article et avant ajustement global. L’allocation totale égale exactement l’ajustement ; les fractions sont réparties au plus petit centime (ou unité monétaire indivisible) par la méthode du plus grand reste, avec départage selon l’ordre des lignes puis des unités. Les ajustements propres à une ligne sont répartis entre ses unités par la même méthode et selon l’ordre des unités. Tous les montants alloués sont inscrits dans le snapshot historique et ne sont pas redistribués après annulation.
6. Dans une annulation partielle, les frais communs (par exemple livraison) restent inchangés et ne sont pas remboursés. Les suppléments et ajustements propres à un article suivent cet article. Pour une annulation totale après paiement, le remboursement correspond au montant intégral effectivement payé pour la commande, frais communs compris.
7. Après vérification positive, l’annulation partielle est finalisée et les articles concernés sont marqués comme annulés. Le commerçant confirme alors la reprise du traitement des articles restants. La commande porte `partially_cancelled` tant qu’il reste des articles actifs.

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
- Pour une annulation partielle, seule la partie annulée est finalisée après vérification ; les autres articles restent actifs jusqu’à la confirmation de reprise par le commerçant. Le client et le commerçant reçoivent une notification dans l’application à chaque transition réelle d’état, avec le statut atteint, le montant concerné et l’action attendue ; aucun SMS ni e-mail n’est prévu pour la première version.

Le commerçant peut renvoyer une preuve corrigée sans limite arbitraire de tentatives et sans expiration automatique. Chaque dépôt de preuve et chaque décision de vérification sont conservés en historique append-only : auteur, date et heure, montant, référence de transaction, preuve associée et, en cas de rejet, motif obligatoire. Un dépôt corrigé ajoute une entrée ; il n’écrase jamais le dépôt ou la décision antérieurs. Après rejet, la commande reste `cancellation_pending` et le remboursement garde les états prévus ; le nouveau dépôt reprend le parcours existant avec `proof_submitted`. Seul l’administrateur vérifie les preuves et décide `verified` ou `rejected`. Aucun nouveau statut n’est créé.

## Modèles de données recommandés

Les noms et champs ci-dessous sont des conventions recommandées dans le registre pour une future implémentation. Ils ne créent pas de statuts métier supplémentaires et ne sont pas implémentés dans cette mise à jour.

- `products` : `stock_tracking_enabled`, `stock_quantity`, `reserved_quantity`, `is_available`.
- `product_option_groups` : `name`, `is_required`, `min_selections`, `max_selections`, `display_order`, `is_active`.
- `product_options` : `name`, `additional_price`, `is_available`, `display_order`.
- Panier et commande : `carts`, `cart_items`, `cart_item_options`, `orders`, `order_items`, `order_item_options`. La commande conserve des snapshots de noms, prix, options et quantités au moment de l’achat.
- Réservations et mouvements : `stock_reservations`, `stock_reservation_items`, `stock_movements`. Les statuts recommandés pour `stock_reservations.status` sont `active`, `consumed` et `released`. Les informations recommandées comprennent `reserved_at`, `consumed_at`, `released_at`, `released_by` et `release_reason`. Les mouvements gardent l’historique de réservation, consommation, libération, restitution et ajustement.
- Modifications : `order_change_requests` conserve notamment `order_id`, `requested_by`, `reason`, `old_total`, `new_total`, `status`, `customer_response_at` et `created_at`. `order_change_items` détaille les articles ajoutés, retirés ou modifiés, les quantités et prix anciens/nouveaux, et les options anciennes/nouvelles.
- Annulations : `order_cancellations` conserve notamment `order_id`, `requested_by`, `reason`, `source`, `scope` (totale ou partielle, choisi par le client après le refus), `status`, `created_at` et `completed_at`. Une liaison ou des lignes de détail identifient exactement les `order_items` annulés. Le registre ne définit pas de liste distincte de valeurs de statut pour `order_cancellations.status`.
- Remboursements : `refunds` peut conserver `order_id`, `amount`, `operator`, `transaction_reference`, `proof_file_path`, `status`, `reviewed_by` et `reviewed_at`. Un remboursement partiel est lié aux articles ou au périmètre d’annulation correspondant. Le montant payé initialement, les allocations historiques et chaque dépôt/décision append-only sont conservés sans écraser les données antérieures.

## Sécurité, validation et tests futurs

- Les validations métier doivent être exécutées côté serveur. Les opérations de réservation, consommation, libération et restitution sont atomiques en base ; des transactions PostgreSQL et des verrouillages adaptés empêchent les doubles réservations et les stocks négatifs.
- Le commerçant ne gère que ses propres produits, commandes et réservations ; l’administrateur peut intervenir sur toutes les commandes et vérifier les remboursements.
- Les montants remboursés sont calculés à partir des snapshots de commande. Les preuves de paiement et de remboursement sont stockées de manière sécurisée et ne sont jamais considérées validées automatiquement par simple dépôt d’image.
- Les tests avant mise en production doivent couvrir : panier mono-commerçant avec confirmation avant remplacement ; commande d’un produit sans suivi de stock s’il est disponible ; refus d’un produit indisponible ; minimums et maximums d’options ; réservations concurrentes sans dépassement du stock ; libération après paiement refusé ; impossibilité de libérer comme active une réservation consommée ; restitution du stock dans les seuls cas prévus ; absence de modification unilatérale et réponse explicite du client ; choix du client (annulation totale ou articles concernés) conservé dans la demande ; annulation de `n` unités remboursée au prix net historique unitaire snapshoté ; prorata exact des remises et autres ajustements monétaires globaux hors frais communs ; répartition déterministe des ajustements propres à une ligne entre ses unités ; frais communs inchangés en partiel ; remboursement total égal au montant effectivement payé ; absence de faux remboursement avant validation du paiement ; preuve non vérifiée qui ne finalise pas ; rejet motivé et visible comme attente de régularisation ; preuves corrigées et décisions append-only, sans limite arbitraire ni expiration, vérifiées uniquement par l’administrateur ; arrêt confirmé si la préparation a commencé et reprise confirmée après finalisation partielle, sans reprise après annulation totale ; notification aux deux parties pour chaque transition réelle des états prévus avec libellé, montant et action propre au destinataire ; aucune notification pour brouillon ou modification sans transition ; cohérence de stock sur les articles annulés.

## Arbitrages clos et périmètre restant

Les quatre questions déléguées pour cette mise à jour sont maintenant tranchées : calcul au prorata des unités d’une ligne, répartition des remises et autres ajustements globaux hors frais (avec frais communs inchangés en partiel), transitions et libellés de notification, ainsi que renvoi et historique append-only des preuves corrigées. Aucun de ces sujets ne reste ouvert.

Les statuts existants sont conservés ; aucun nouveau statut n’est introduit pour l’annulation, les notifications ou les dépôts corrigés. Le schéma technique détaillé et les contrôles backend restent à concevoir dans les phases d’implémentation, sans changer les décisions métier ci-dessus.

Les 53 écrans, dont les vues existantes de détail de commande client, commerçant et administration, matérialisent ces règles sans créer de nouvel écran, de nouveau statut ou de comportement opérationnel non validé. Voir le [cahier des charges](CAHIER_DES_CHARGES.md) et les [maquettes](maquettes/README.md).

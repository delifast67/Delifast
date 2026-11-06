# Registre officiel des règles métier Delifast

**Version consolidée : 2.0 — 6 novembre 2026**

Ce registre est la référence des règles métier validées par le propriétaire du projet. Il consolide les décisions du cahier des charges initial et le registre officiel v2.0 transmis le 6 novembre 2026. Les données illustrées dans les maquettes ne sont pas des données réelles. Les règles décrites ici guident les futures interfaces, services serveur, API, schémas de données et tests ; elles ne sont pas encore opérationnelles dans cette phase de conception.

## Marché, commerces et livraison

- Le lancement initial est prévu à Ouagadougou, au Burkina Faso.
- Delifast ne fournit pas de service de livraison. Chaque commerçant définit ses propres zones, frais et modalités.
- Le client ne voit le retrait ou la livraison que si le commerçant a déclaré cette modalité.
- La position cartographique représente l’établissement renseigné par le commerçant, et non la position actuelle du client. Le client peut ouvrir le lieu dans Google Maps.

## Comptes et autorisations

- Clients et commerçants utilisent uniquement Google OAuth avec PKCE. Il n’y a pas d’inscription par mot de passe, numéro de téléphone, OTP ou SMS.
- Il existe un seul compte administrateur, provisionné de manière sécurisée côté serveur. Il n’y a ni inscription publique d’administrateur ni changement de rôle par l’utilisateur.
- Les rôles et autorisations sont vérifiés côté serveur ; la base future utilisera des politiques RLS.

## Paiements et abonnements

- Le client paie directement le commerçant par Orange Money ou Telmob, selon les numéros réellement configurés par celui-ci.
- Le client transmet une référence de transaction et une capture du SMS de paiement. Le commerçant compare ces éléments au SMS reçu sur son téléphone, puis valide ou refuse manuellement. Un refus comporte un motif ; le client peut renvoyer une preuve lorsque le parcours le permet.
- Une capture seule ne déclenche jamais une validation automatique. Les décisions et preuves sont historisées ; les justificatifs restent privés.
- Le paiement d’abonnement est versé à Delifast, puis vérifié manuellement par l’administrateur à partir de la référence, de la preuve et du SMS reçu sur le numéro de Delifast. Les états attendus sont en attente, validé et refusé ; un refus est expliqué.
- Delifast ne prétend pas exécuter automatiquement les remboursements mobile money.

## Codes USSD

- Format : `14421{numero}*{montant}#`.
- Les espaces sont retirés du numéro. Dans un lien téléphonique, `#` est encodé en `%23`, par exemple `tel:1442156893460*4500%23`.
- Seuls les opérateurs pour lesquels le commerçant a renseigné un numéro de paiement sont affichés.

## Panier mono-commerçant

- Un panier ne contient que des produits d’un seul commerçant. La commande qui en résulte appartient également à un seul commerçant.
- Lorsqu’un client essaie d’ajouter un produit d’un autre commerçant, l’interface demande confirmation avant de remplacer le panier. En cas d’annulation, le panier actuel est conservé ; en cas d’accord, il est remplacé et le nouvel article est ajouté.
- Le backend contrôle le commerçant du panier, de chaque ligne et de la commande. Cette règle ne repose pas uniquement sur l’interface.

## Stock, disponibilité et réservations

### Suivi facultatif et disponibilité manuelle

- Le commerçant peut activer ou désactiver individuellement le suivi du stock pour chacun de ses produits.
- Quand le suivi est activé, le système contrôle les quantités disponibles et le serveur refuse toute commande qui dépasse le stock.
- Quand le suivi est désactivé, le commerçant gère manuellement la disponibilité.
- La disponibilité commerciale est indépendante du suivi du stock : le commerçant peut publier, désactiver, marquer comme épuisé ou réactiver un produit.
- Un produit indisponible ne peut jamais être commandé, que le suivi du stock soit actif ou désactivé. Le backend applique ce contrôle.

### Cycle de vie des réservations

- À l’envoi d’une commande, les quantités des produits suivis sont réservées. Une quantité réservée n’est plus disponible pour d’autres clients.
- Les réservations n’expirent pas automatiquement.
- Après validation manuelle du paiement par le commerçant, le stock réservé est consommé définitivement.
- Si le paiement est refusé ou la commande annulée avant la consommation du stock, la réservation est libérée.
- Après consommation, le stock peut être restitué si la commande est annulée avant sa préparation ou sa remise au client. Aucune restitution automatique n’a lieu après la préparation ou la remise.

### Libération manuelle

- Le commerçant peut libérer les réservations de ses propres commandes ; l’administrateur peut libérer les réservations de tous les commerçants.
- Une réservation consommée ne peut pas être libérée comme une réservation active.
- Toute libération manuelle exige un motif. Le système historise l’auteur, la date, le motif et les quantités libérées.
- Le client est informé quand la libération affecte sa commande. La libération ne doit pas laisser une commande active dans un état incohérent.

## Options de produits

- Un produit peut être vendu sans option ou proposer plusieurs groupes d’options, par exemple tailles, suppléments ou accompagnements.
- Chaque groupe est obligatoire ou facultatif et comporte un minimum et un maximum de sélections configurables.
- Un groupe obligatoire impose un minimum d’au moins une sélection. Un groupe facultatif peut avoir un minimum de zéro. Le maximum ne dépasse pas le nombre d’options disponibles dans le groupe.
- Chaque option peut avoir un supplément de prix.
- Au moment de la commande, les options sélectionnées et leurs prix sont copiés dans chaque ligne de commande. Une évolution ultérieure du catalogue ne réécrit pas cet historique.

## Article indisponible pendant la préparation

- Le commerçant peut signaler un article devenu indisponible et proposer au client de le retirer ou de le remplacer.
- La proposition — composition et nouveau montant — est transmise au client. Le client doit l’accepter explicitement ; le commerçant ne modifie pas unilatéralement le contenu ni le prix de la commande.
- L’ancienne composition et le nouveau montant sont conservés. Les réservations sont ajustées selon la modification acceptée.
- Si le client refuse, la commande suit le processus d’annulation approprié.
- Après paiement, une baisse de montant est remboursée directement par le commerçant. Delifast ne doit pas présenter ce remboursement mobile money comme automatique.
- Après paiement, une hausse exige un paiement complémentaire, payé et vérifié avant la poursuite de la commande.

## Exigences techniques et de développement

- Adapter les composants React, services frontend, API et modèle PostgreSQL aux règles ci-dessus, sans considérer les maquettes statiques comme une implémentation.
- Effectuer les validations métier côté serveur et utiliser des transactions atomiques pour les réservations, consommations et restitutions ; empêcher les doubles réservations et les stocks négatifs.
- Conserver les prix, options, compositions avant/après et historiques de commande. Historiser les mouvements de stock, libérations et modifications.
- Appliquer des autorisations distinctes pour commerçant et administrateur.
- Écrire des tests unitaires, d’intégration, de sécurité et de concurrence couvrant les règles métier.
- Conserver les 53 écrans et les fonctionnalités déjà définies concernant paiements, abonnements, livraison, authentification et administration.
- Ne pas transformer une proposition non validée en décision métier ni inventer de règles supplémentaires. Toute modification de ce registre exige une validation du propriétaire du projet.

## Données de démonstration

Les noms, photos, prix, montants, coordonnées, références, statuts et justificatifs visibles dans les maquettes sont fictifs. Ils ne sont ni des partenaires réels ni des transactions réelles, et ne sont pas chargés dans les données de production.

# Règles métier Delifast

Ces règles proviennent des documents de référence et des choix confirmés du projet. Aucune n’est implémentée dans la phase d’initialisation.

## Marché et livraison

- Lancement initial à Ouagadougou, Burkina Faso.
- Delifast ne fournit pas de service de livraison.
- Chaque commerçant définit les zones, frais et modalités qu’il propose. Le client ne voit une option livraison ou retrait que si le commerçant l’a déclarée.
- La position cartographique est celle de l’établissement renseignée par le commerçant, pas automatiquement la position actuelle de l’utilisateur. Le client peut ouvrir le lieu dans Google Maps.

## Comptes et autorisations

- Clients et commerçants utilisent Google OAuth avec PKCE uniquement ; pas d’inscription par mot de passe, téléphone, OTP ou SMS.
- Il existe un seul compte administrateur, créé/provisionné de manière sécurisée côté serveur. Il n’y a pas d’inscription publique d’administrateur ni de changement de rôle par l’utilisateur.
- Les contrôles de rôle sont vérifiés côté serveur ; la base future utilisera des politiques RLS.

## Paiements des commandes

- Le client paie directement le commerçant par Orange ou Telmob, selon les numéros réellement configurés par ce commerçant.
- Le client fournit une référence de transaction et une capture du SMS de paiement.
- Le commerçant compare la preuve au SMS reçu sur son téléphone, puis valide ou refuse manuellement. Un refus comporte un motif ; le client peut renvoyer une preuve lorsque le parcours le permet.
- Une capture seule ne déclenche jamais une validation automatique. Les décisions et preuves sont historisées ; les justificatifs restent privés.

## Abonnements des commerçants

- Le paiement d’abonnement est versé à Delifast, puis vérifié manuellement par l’administrateur à partir de la référence, de la preuve et du SMS reçu sur le numéro de Delifast.
- Statuts attendus : en attente, validé, refusé. Un refus doit être explicable.

## Codes USSD

- Format : `14421{numero}*{montant}#`.
- Retirer tous les espaces du numéro.
- Encoder `#` en `%23` dans le lien téléphonique, par exemple `tel:1442156893460*4500%23`.
- N’afficher que les opérateurs pour lesquels le commerçant a renseigné un numéro de paiement.

## Données et environnements

- Les données et photos de la maquette sont des exemples, pas des partenaires ou enregistrements réels.
- Les données de démonstration resteront séparées des vraies données et des migrations de production.

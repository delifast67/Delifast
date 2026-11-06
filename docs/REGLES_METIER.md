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


## Panier, stock et options — décisions validées le 6 novembre 2026

### Panier mono-commerçant

- Un panier et la commande qui en résulte ne contiennent que des produits d’un seul commerçant.
- Si le client tente d’ajouter un produit d’un autre commerçant, l’interface demande confirmation avant de remplacer le panier existant. En cas d’annulation, le panier existant est conservé ; en cas d’accord, il est remplacé par le panier du nouveau commerçant et le nouvel article y est ajouté.
- Le panier, chaque ligne et la commande sont contrôlés côté serveur ; cette règle ne repose pas uniquement sur le frontend.

### Gestion facultative du stock, produit par produit

- Chaque commerçant peut activer ou désactiver individuellement le suivi du stock pour chacun de ses produits.
- Si le suivi est activé, le système contrôle la quantité disponible, rend le produit indisponible à zéro et empêche côté serveur une commande supérieure à la quantité disponible.
- Si le suivi est désactivé, le commerçant gère manuellement la disponibilité du produit.

### Options de produits facultatives

- Un produit peut être vendu sans options ou proposer plusieurs groupes d’options (par exemple taille, suppléments ou accompagnements).
- Chaque option peut avoir un supplément de prix.
- Les choix d’options et leurs prix sont copiés dans les lignes de commande au moment de la commande ; une modification ultérieure du catalogue ne change donc pas le détail ni le prix enregistré de cette commande.

### Détails qui restent ouverts

Ces décisions ne tranchent pas les propositions encore ouvertes dans le registre transmis : moment de déduction ou de restitution du stock, caractère obligatoire d’un groupe d’options, limites de sélection ou cardinalité des choix. Aucune de ces propositions n’est transformée en règle dans les maquettes. Toute évolution de ces points nécessite une validation métier explicite.

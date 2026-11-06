# Feuille de route Delifast

## Phase 1 — Fondations et initialisation (terminée)

Le dépôt de phase 1 est la référence `main` au commit `5311d8181717196b475558742a7ae1508efdfade`. Il contient le cahier des 53 écrans, les règles métier, l’architecture, le repère visuel, les conventions de sécurité et la feuille de route. Aucun flux métier ni interface applicative n’était implémenté dans ce jalon.

## Phase 2 — Conception des interfaces (maquettes prêtes à valider)

- Une maquette statique distincte est produite pour chacun des 53 écrans du cahier.
- Les neuf états communs (initial, chargement, vide, succès, erreur, désactivé, en attente, validé et refusé) disposent d’une planche de référence.
- Les règles validées le 6 novembre 2026 sur le panier mono-commerçant, le suivi de stock facultatif par produit et les options tarifées figurent dans les règles métier et dans les maquettes concernées.
- Les noms, commerces, prix, références, coordonnées et preuves illustrés sont des données fictives.
- Les rendus sont une conception visuelle statique. Ils ne créent ni routes métier Next.js, ni composants React réutilisables, ni commandes ou paiements opérationnels.

Les fichiers sont dans [`docs/maquettes/`](maquettes/README.md). La conversion en application vient après validation des maquettes par Hilton.

## Prochaines étapes après validation des maquettes

1. Convertir les maquettes validées en composants React réutilisables, en commençant par la page d’accueil HTML fournie. Les données fictives restent isolées et signalées.
2. Terminer les interfaces publiques, client, commerçant et administration avec les états de chargement, vide, succès et erreur, en respectant le repère rouge/crème.
3. Configurer Supabase : environnement, Google OAuth avec PKCE pour clients/commerçants, rôles, compte administrateur provisionné côté serveur, PostgreSQL, RLS et Storage privé.
4. Implémenter commandes, paiements et abonnements : preuves et références, décisions manuelles des commerçants ou de l’administrateur, motifs de refus, historique et renvoi d’une preuve. Aucun paiement réel sans validation explicite.
5. Tester, sécuriser et préparer le lancement : responsive, optimisation pour les connexions 3G à Ouagadougou, restauration et vérification des quotas gratuits Supabase/Vercel avant production. Vercel, GitHub, Cloudflare DNS et Sentry restent les cibles d’outillage.

Chaque phase importante attend la validation de Hilton avant de poursuivre.

## Écarts et réconciliation avec la feuille de route fournie

- La feuille fournie distingue sa phase 1 (dépôt, documentation, conventions) de sa phase 2 (installation Next.js). Le jalon de dépôt a regroupé préparation et initialisation dans la phase 1 ; la conception des interfaces est maintenant traitée séparément.
- La feuille propose un dossier `frontend/` et un dossier `backend/`, tout en indiquant que les API peuvent rester dans les Route Handlers du frontend. Pour éviter deux sources de vérité et un service inutile, le projet démarre avec une application Next.js à la racine et des Route Handlers plus tard ; aucun backend séparé n’est créé.
- Elle recommande Prisma pour PostgreSQL. La règle projet actuelle est de ne pas ajouter Prisma initialement et de privilégier les outils Supabase ; cette règle prévaut.
- Les flux réels et l’authentification restent après la validation visuelle afin de figer les choix importants avant leur intégration.

## Décisions restant à confirmer

Les propositions non validées relevées dans le registre métier — notamment le moment de déduction ou de restitution du stock, le caractère obligatoire d’un groupe d’options et les limites ou la cardinalité de sélection — restent à confirmer. Elles ne sont pas fixées par les maquettes ; voir [`REGLES_METIER.md`](REGLES_METIER.md).

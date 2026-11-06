# Feuille de route Delifast

## Phase 1 — Fondations et initialisation (en cours)

- Dépôt GitHub cible vérifié.
- Initialiser Next.js App Router, TypeScript, Tailwind CSS et les commandes de contrôle.
- Préparer les dossiers, la documentation et un `.env.example` sans secrets.
- Garder un écran de démarrage neutre ; ne pas coder d’interface métier avant validation.

## Ordre recommandé pour la suite

1. **Valider les écrans manquants** des espaces client, commerçant et administration, ainsi que les décisions métier encore ouvertes.
2. **Convertir les maquettes validées en composants React réutilisables**, en commençant par la page d’accueil HTML fournie. Toute donnée fictive restera isolée et explicitement marquée comme démo.
3. **Terminer les interfaces publiques, client, commerçant et administration** avec états de chargement, vide, succès et erreur ; respecter le design rouge/crème de la maquette.
4. **Configurer Supabase** : environnement, Google OAuth avec PKCE pour clients/commerçants, rôles, compte admin provisionné côté serveur, PostgreSQL, RLS et Storage privé.
5. **Implémenter les commandes, paiements et abonnements** : preuves et références, décisions manuelles des commerçants ou de l’admin, motifs de refus, historique et renvoi d’une preuve ; aucun paiement réel sans validation explicite.
6. **Tester, sécuriser et préparer le lancement** : responsive, optimisation pour les connexions 3G à Ouagadougou, restauration et vérification des quotas gratuits Supabase/Vercel avant production. Vercel, GitHub, Cloudflare DNS et Sentry restent les cibles d’outillage.

Chaque phase importante attend la validation de Hilton avant de poursuivre.

## Écarts et réconciliation avec la feuille de route fournie

- La feuille fournie distingue sa phase 1 (dépôt, documentation, conventions) de sa phase 2 (installation Next.js). La mission actuelle regroupe explicitement la préparation et l’initialisation dans cette phase 1.
- La feuille propose un dossier `frontend/` et un dossier `backend/`, tout en indiquant que les API peuvent rester dans les Route Handlers du frontend. Pour éviter deux sources de vérité et un service inutile, le projet démarre avec une application Next.js à la racine et des Route Handlers plus tard ; aucun backend séparé n’est créé.
- Elle recommande Prisma pour PostgreSQL. La règle projet actuelle est de ne pas ajouter Prisma initialement et de privilégier les outils Supabase ; cette règle prévaut.
- La feuille prévoit un long parcours d’interfaces avant l’authentification réelle et la base. L’ordre de haut niveau ci-dessus conserve l’approche frontend d’abord, mais demande d’abord de valider les écrans manquants et de figer les choix importants avant d’intégrer les flux réels.

## Décisions restant à confirmer

Le cahier des charges propose, sans la trancher, qu’un panier corresponde à un seul établissement ou puisse contenir plusieurs établissements avec des commandes séparées ; il recommande un seul établissement par commande. Il signale aussi comme optionnels le filtre de localisation, le formulaire d’aide, les instructions de commande, le suivi de stock et les options de produits. Ces choix ne sont pas implémentés ni transformés ici en règles définitives.

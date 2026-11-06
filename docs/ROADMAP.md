# Feuille de route Delifast

## Phase 1 — Fondations et initialisation (terminée)

Le dépôt de référence `main` contient le cahier des 53 écrans, les règles métier, l’architecture, le repère visuel, les conventions de sécurité et la feuille de route. Aucun flux métier ni interface applicative opérationnelle n’est livré dans ce jalon.

## Phase 2 — Conception des interfaces (maquettes v2.0 prêtes pour validation visuelle)

- Une maquette statique distincte est produite pour chacun des 53 écrans du cahier, avec un rendu PNG individuel et un carnet PDF de 53 pages.
- Les neuf états communs (initial, chargement, vide, succès, erreur, désactivé, en attente, validé et refusé) disposent d’une planche de référence.
- Les maquettes reflètent le registre officiel v2.0 du 6 novembre 2026 : panier mono-commerçant, suivi de stock facultatif et disponibilité indépendante, cycle de réservation et libération manuelle, groupes d’options avec règles de sélection, proposition de retrait/remplacement et accord explicite du client.
- Les vues de commande existantes illustrent également le refus d’une modification, les périmètres d’annulation total ou partiel, l’arrêt de préparation si elle a commencé, la preuve de remboursement, sa vérification ou son rejet, et la reprise du reste après vérification positive.
- Les interfaces restent statiques : elles ne créent ni routes métier Next.js, ni composants React réutilisables, ni comptes, commandes, réservations, preuves ou paiements opérationnels.
- Les noms, commerces, prix, références, coordonnées et preuves illustrés sont des données fictives.

Sources et rendus : [`docs/maquettes/`](maquettes/README.md), [`docs/REGLES_METIER.md`](REGLES_METIER.md) et [`docs/architecture/ARCHITECTURE.md`](architecture/ARCHITECTURE.md).

## Prochaines étapes après validation des maquettes

1. Convertir les maquettes validées en composants React réutilisables, en commençant par la page d’accueil HTML fournie. Les données fictives restent isolées et signalées.
2. Terminer les interfaces publiques, client, commerçant et administration avec les états de chargement, vide, succès, erreur, réservations et demandes de modification.
3. Configurer Supabase : environnement, Google OAuth avec PKCE pour clients/commerçants, rôles, compte administrateur provisionné côté serveur, PostgreSQL, RLS et Storage privé.
4. Implémenter le modèle et les opérations de panier, commande, stock, options et réservations avec validations serveur, transactions atomiques et historique ; ensuite intégrer paiements et abonnements avec vérifications manuelles et motifs de refus.
5. Écrire les tests unitaires, d’intégration, de sécurité et de concurrence ; sécuriser et optimiser pour les connexions 3G à Ouagadougou. Vérifier les quotas gratuits Supabase/Vercel avant le lancement. Vercel, GitHub, Cloudflare DNS et Sentry restent les cibles d’outillage.

Chaque phase importante attend la validation de Hilton avant de poursuivre.

## Écarts et réconciliation avec la feuille de route fournie

- La feuille initiale distinguait la préparation du dépôt de la phase Next.js. La conception des interfaces est traitée séparément afin de faire valider les choix visuels avant leur intégration.
- Le projet démarre avec une application Next.js à la racine et des Route Handlers plus tard ; aucun backend séparé n’est créé sans contrainte technique réelle.
- Prisma n’est pas ajouté au démarrage ; Supabase/PostgreSQL et ses outils d’accès sont privilégiés.
- Les règles du registre officiel v2.0 sont intégrées aux maquettes. Tout comportement non déterminé par ce registre ou les règles déjà validées reste à confirmer avant implémentation ; les visuels ne doivent pas servir à en déduire une règle nouvelle.

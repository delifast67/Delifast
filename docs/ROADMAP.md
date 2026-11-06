# Feuille de route Delifast

## Phase 1 — Fondations et initialisation (terminée)

Le dépôt de référence `main` contient le cahier des 53 écrans, les règles métier, l’architecture, le repère visuel, les conventions de sécurité et la feuille de route. Aucun flux métier ni interface applicative opérationnelle n’est livré dans ce jalon.

## Phase 2 — Conception des interfaces (maquettes v2.2 prêtes pour validation visuelle)

- Une maquette statique distincte est produite pour chacun des 53 écrans du cahier, avec un rendu PNG individuel et un carnet PDF de 53 pages.
- Les neuf états communs (initial, chargement, vide, succès, erreur, désactivé, en attente, validé et refusé) disposent d’une planche de référence.
- Les maquettes reflètent le registre officiel v2.2 du 6 novembre 2026 : panier mono-commerçant, stock et disponibilité séparés, réservations, options, modifications soumises à l’accord du client, annulation, remboursement et notifications.
- Après un refus, le client choisit l’annulation totale ou partielle. Une ligne est un produit avec options ; le prix net historique unitaire inclut suppléments, ajustements propres à la ligne et part des remises ou autres ajustements globaux hors frais communs snapshotée. Annuler `n` unités rembourse ce prix unitaire multiplié par `n`.
- Les remises et autres ajustements monétaires globaux hors frais communs sont répartis au prorata entre articles et enregistrés au snapshot, avec une règle déterministe des fractions. En partiel, les frais communs restent inchangés ; en total, le remboursement couvre le montant effectivement payé.
- Les vues de commande existantes montrent l’arrêt/reprise confirmés, le rejet motivé et la vérification par l’administrateur des preuves corrigées. Les dépôts et décisions sont append-only ; aucun nombre maximal de renvois ni expiration automatique n’est ajouté.
- Toute transition réelle d’un état déjà prévu de commande, paiement, modification, annulation, remboursement ou réservation affectant la commande, ainsi que l’arrêt/reprise confirmé de préparation, déclenche une notification dans l’application aux deux parties avec statut/libellé, montant et action propre au destinataire. Aucun SMS/e-mail en v1, aucun message pour brouillon ou modification sans transition.
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
- Les quatre arbitrages métier délégués (remboursement par unités, prorata des remises et autres ajustements globaux hors frais, déclencheurs/libellés de notification, renvoi et historique des preuves) sont décidés et intégrés au registre v2.2. Aucun n’est encore ouvert ; le détail technique backend reste pour les phases d’implémentation. Les visuels ne créent ni statut ni règle nouvelle.

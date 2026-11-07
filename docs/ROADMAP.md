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
4. Avant les opérations commerciales, concevoir et implémenter le cycle d’abonnement marchand et son contrôle d’accès. Chaque compte marchand éligible reçoit une seule période gratuite d’un mois, démarrant à l’activation initiale de l’abonnement par Delifast, avec les fonctionnalités du forfait accordé. Enregistrer cette attribution pour qu’un changement de forfait ou une nouvelle soumission de paiement ne la réinitialise pas ; les critères d’éligibilité restent à préciser et ne sont pas définis ici. À la fin du mois gratuit, le renouvellement devient payant et ne devient effectif qu’après validation de la preuve par l’administration. Conserver l’historique des abonnements, paiements et changements de statut.
   Calculer côté serveur les dates et distinguer la période gratuite, l’abonnement payant actif, le délai de grâce et la suspension pour défaut d’abonnement. À l’expiration d’un abonnement payant, accorder trois jours calendaires de grâce pendant lesquels le compte reste opérationnel et le marchand peut recevoir et traiter les commandes ; envoyer un rappel indiquant que l’abonnement a expiré et doit être renouvelé, et permettre le paiement et le dépôt de preuve. Sans renouvellement validé à la fin du délai, suspendre la réception et le traitement des commandes, la gestion du catalogue et les autres opérations réservées aux marchands actifs, tout en gardant un accès restreint au renouvellement, au paiement, au dépôt de preuve et à l’historique. Le dépôt seul ne réactive pas le compte. Après validation, activer le nouvel abonnement et réactiver automatiquement le compte uniquement si le défaut d’abonnement est la seule cause de suspension ; une suspension administrative indépendante demeure. Historiser les transitions et envoyer les notifications correspondantes.
5. Implémenter le modèle et les opérations de panier, commande, stock, options et réservations avec validations serveur, transactions atomiques et historique ; ensuite intégrer les paiements de commande avec vérifications manuelles et motifs de refus.
6. Écrire les tests unitaires, d’intégration, de sécurité et de concurrence ; sécuriser et optimiser pour les connexions 3G à Ouagadougou. Vérifier les quotas gratuits Supabase/Vercel avant le lancement. Vercel, GitHub, Cloudflare DNS et Sentry restent les cibles d’outillage.

Chaque phase importante attend la validation de Hilton avant de poursuivre.

## Écarts et réconciliation avec la feuille de route fournie

- La feuille initiale distinguait la préparation du dépôt de la phase Next.js. La conception des interfaces est traitée séparément afin de faire valider les choix visuels avant leur intégration.
- Le projet démarre avec une application Next.js à la racine et des Route Handlers plus tard ; aucun backend séparé n’est créé sans contrainte technique réelle.
- Prisma n’est pas ajouté au démarrage ; Supabase/PostgreSQL et ses outils d’accès sont privilégiés.
- Les quatre arbitrages métier délégués (remboursement par unités, prorata des remises et autres ajustements globaux hors frais, déclencheurs/libellés de notification, renvoi et historique des preuves) sont décidés et intégrés au registre v2.2. Aucun n’est encore ouvert ; le détail technique backend reste pour les phases d’implémentation. Les visuels ne créent ni statut ni règle nouvelle.

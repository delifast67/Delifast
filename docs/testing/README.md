# Tests et contrôles

## Phase d’initialisation

Les contrôles de base sont `npm run lint`, `npm run typecheck` et `npm run build`. La page `/` sert uniquement à vérifier que l’application démarre ; elle ne valide aucun parcours métier.

## À compléter dans les phases suivantes

- `tests/unit/` : règles pures, validations, formatage et génération des liens USSD.
- `tests/integration/` : services serveur et accès Supabase avec une base explicitement dédiée aux tests.
- `tests/e2e/` : parcours web client, commerçant et administration.
- Les tests ne doivent jamais payer, envoyer de SMS/e-mail métier ou écrire dans la production.

## Règles d’annulation et notifications — couverture future

Les tests opérationnels à écrire après validation de l’implémentation devront vérifier les six règles consignées dans [`../REGLES_METIER.md`](../REGLES_METIER.md) : choix et enregistrement du périmètre par le client ; montants historiques et traitement des frais partagés ; rejet motivé, renvoi d’une preuve corrigée et nouvelle vérification ; confirmations de l’arrêt et de la reprise par le commerçant ; notification dans l’application du statut, du montant et de l’action attendue aux deux parties, sans SMS ni e-mail en v1.

La génération des maquettes et son inventaire à 53 écrans ne simulent que des rendus statiques. Ils ne constituent pas des tests de transitions, de notifications réelles, de remboursement ou d’écriture de données.

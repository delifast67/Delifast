# Tests et contrôles

## Phase d’initialisation

Les contrôles de base sont `npm run lint`, `npm run typecheck` et `npm run build`. La page `/` sert uniquement à vérifier que l’application démarre ; elle ne valide aucun parcours métier.

## À compléter dans les phases suivantes

- `tests/unit/` : règles pures, validations, formatage et génération des liens USSD.
- `tests/integration/` : services serveur et accès Supabase avec une base explicitement dédiée aux tests.
- `tests/e2e/` : parcours web client, commerçant et administration.
- Les tests ne doivent jamais payer, envoyer de SMS/e-mail métier ou écrire dans la production.

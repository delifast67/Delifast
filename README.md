# Delifast

Delifast est une marketplace destinée au Burkina Faso, avec un lancement initial à Ouagadougou. Elle met en relation des clients, des restaurants et d’autres commerces ; chaque commerçant gère lui-même ses modalités de livraison.

## État actuel

Le dépôt contient le socle technique initial et la documentation de référence. L’application Next.js n’implémente pas encore d’écran métier, de compte réel, de paiement, de schéma de base de données ou de migration Supabase ; sa page d’accueil reste un écran temporaire d’initialisation.

La phase de conception comprend maintenant une [galerie statique des 53 maquettes](docs/maquettes/README.md), avec un rendu individuel pour chaque écran et une planche des états communs. Ces visuels sont des livrables de conception, pas des parcours opérationnels.

Les noms, photos, prix et autres contenus de démonstration de la maquette HTML fournie ne sont pas des données réelles et ne sont pas chargés dans l’application.

## Démarrer en local

Prérequis : Node.js 20.9 ou plus récent et npm.

```bash
npm install
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000). Aucune variable Supabase n’est requise pour cette phase. Lors de l’intégration du backend, copier `.env.example` vers `.env.local`, remplir les valeurs dans l’environnement local et ne jamais versionner `.env.local`.

Contrôles disponibles :

```bash
npm run lint
npm run typecheck
npm run build
```

## Technologies retenues

- Next.js App Router, React et TypeScript.
- Tailwind CSS, Motion et Lucide React pour les futures interfaces.
- shadcn/ui comme base de composants copiés et personnalisés dans le dépôt.
- Supabase Auth, PostgreSQL et Storage pour les étapes backend.
- Zod et React Hook Form pour la validation des formulaires.
- Aucun Prisma au démarrage : les accès futurs utiliseront les outils Supabase, sauf décision technique justifiée.

Les dépendances opérationnelles de déploiement restent Vercel, GitHub, Cloudflare pour le DNS et Sentry pour la supervision. Les offres gratuites et leurs quotas devront être vérifiés avant le lancement.

## Organisation

- `src/app/` : routes publiques, authentification, client, commerçant, administration et API.
- `src/components/` : composants partagés.
- `src/features/` : modules métier.
- `src/hooks/`, `src/lib/`, `src/types/`, `src/styles/` : utilitaires et fondations partagées.
- `supabase/migrations/` : migrations futures ; aucun changement de base dans cette phase.
- `tests/` : emplacements pour tests unitaires, d’intégration et end-to-end.
- `docs/` : cahier des charges, règles métier, architecture et feuille de route.

Voir [l’architecture](docs/architecture/ARCHITECTURE.md), [les règles métier](docs/REGLES_METIER.md), [le cahier des charges des 53 écrans](docs/CAHIER_DES_CHARGES.md), [le design de référence](docs/architecture/DESIGN_SYSTEM.md) et [la feuille de route](docs/ROADMAP.md).

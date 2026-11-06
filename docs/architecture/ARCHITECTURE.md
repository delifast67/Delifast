# Architecture cible Delifast

## Principe

Le dépôt démarre comme une application web Next.js unique à la racine. Les routes sont organisées avec l’App Router sous `src/app/`. Les Route Handlers Next.js pourront fournir les API serveur ; aucun service Node.js autonome n’est nécessaire au lancement.

Supabase est prévu pour Auth, PostgreSQL et Storage privé. Prisma n’est pas retenu au démarrage : les accès aux données utiliseront les bibliothèques et outils Supabase. Toute introduction d’une couche supplémentaire devra répondre à un besoin technique concret.

## Arborescence prévue

```text
src/
├── app/
│   ├── (public)/          # Accueil, catalogue, restaurants, commerces, aide
│   ├── (auth)/            # Connexion Google et choix du type de compte
│   ├── client/            # Parcours et espace client
│   ├── commercant/        # Espace et gestion du commerçant
│   ├── administration/    # Espace administrateur unique
│   ├── api/               # Route Handlers serveur
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                # Primitives shadcn/ui personnalisées
│   ├── layout/
│   ├── navigation/
│   ├── shared/
│   ├── forms/
│   └── feedback/
├── features/              # auth, profiles, catalogue, commerces, commandes,
│                          # paiements, abonnements, livraison, localisation
├── hooks/
├── lib/                   # Supabase, validations, formatage, données de démo
├── styles/
└── types/
supabase/migrations/       # Migrations SQL futures, aucune créée en phase 1
 tests/                    # unit/, integration/, e2e/
docs/                      # Architecture, cahier, sécurité et feuille de route
```

Les dossiers vides ne préjugent pas de l’implémentation des écrans. Chaque fonctionnalité sera ajoutée au moment prévu, plutôt que de créer 53 pages factices.

## Frontières à respecter

- Les composants d’interface ne doivent pas accéder directement à PostgreSQL ou aux secrets.
- Les autorisations et les rôles devront être vérifiés côté serveur, avec des politiques RLS sur Supabase.
- Les justificatifs de paiement seront dans un espace Storage privé.
- Les fixtures de démonstration resteront sous `src/lib/demo-data/` ou dans les fixtures de test et ne seront jamais insérées dans les tables de production.
- Les migrations futures seront versionnées dans `supabase/migrations/` et appliquées seulement après validation de l’environnement cible.

## Routes réservées

Les segments `client`, `commercant`, `administration` et `api` sont des emplacements d’architecture. Aucun écran, endpoint ou contrôle de rôle métier n’est livré à ce stade.

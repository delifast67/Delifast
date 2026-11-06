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


## Complément validé le 6 novembre 2026 — panier, stock et options

Les points ci-dessous sont des exigences pour l’architecture à implémenter, pas des tables ou contrôles déjà livrés dans cette phase de conception.

- **Panier et commandes mono-commerçant :** associer le panier à un commerçant et contrôler côté serveur que chaque ligne ajoutée, puis chaque ligne de commande, appartient à ce même commerçant. Le backend ne se fie pas à la confirmation frontend pour faire respecter cette contrainte.
- **Stock facultatif par produit :** prévoir `stock_tracking_enabled` (booléen), `stock_quantity` (entier nullable) et `is_available` (booléen) sur le produit. Lorsque le suivi est actif, le service de commande doit contrôler la quantité disponible de façon cohérente côté serveur et rendre un produit indisponible à zéro ; lorsque le suivi est inactif, la disponibilité est gérée manuellement par le commerçant.
- **Options et prix conservés :** prévoir des groupes et choix d’options distincts pour les produits, ainsi que des lignes d’options de commande contenant une copie du libellé et du supplément appliqué. Le serveur calcule le prix à partir du catalogue validé et conserve le résultat avec la commande ; une modification future du catalogue ne réécrit pas l’historique.
- **Tests futurs obligatoires :** couvrir les paniers et commandes d’un seul commerçant, le rejet serveur d’un produit d’un autre commerçant, les commandes avec suivi de stock actif et inactif, le stock à zéro et les quantités excédentaires, les produits sans options ou avec plusieurs groupes, et la stabilité des suppléments copiés dans l’historique. Ces tests seront écrits avec les services et migrations ultérieurs.

Le moment de déduction ou de restitution du stock, le caractère obligatoire d’un groupe et les limites ou la cardinalité de sélection restent à valider séparément. Aucune migration ni décision complémentaire n’est créée par cette note.

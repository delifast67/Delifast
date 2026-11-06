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
│   ├── client/             # Parcours et espace client
│   ├── commercant/         # Espace et gestion du commerçant
│   ├── administration/    # Espace administrateur unique
│   ├── api/                # Route Handlers serveur
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                 # Primitives shadcn/ui personnalisées
│   ├── layout/
│   ├── navigation/
│   ├── shared/
│   ├── forms/
│   └── feedback/
├── features/               # auth, profiles, catalogue, commerces, commandes,
│                           # paiements, abonnements, livraison, localisation
├── hooks/
├── lib/                    # Supabase, validations, formatage, données de démo
├── styles/
└── types/
supabase/migrations/        # Migrations SQL futures
 tests/                     # unit/, integration/, e2e/
docs/                       # Architecture, cahier, sécurité et feuille de route
```

Les dossiers vides ne préjugent pas de l’implémentation des écrans. Chaque fonctionnalité sera ajoutée au moment prévu, plutôt que de créer 53 pages factices.

## Frontières à respecter

- Les composants d’interface n’accèdent pas directement à PostgreSQL ni aux secrets.
- Les autorisations et les rôles sont vérifiés côté serveur, avec des politiques RLS sur Supabase.
- Les justificatifs de paiement résident dans un espace Storage privé.
- Les fixtures de démonstration restent sous `src/lib/demo-data/` ou dans les fixtures de test et ne sont jamais insérées dans les tables de production.
- Les migrations sont versionnées dans `supabase/migrations/` et appliquées uniquement après validation de l’environnement cible.

## Routes réservées

Les segments `client`, `commercant`, `administration` et `api` sont des emplacements d’architecture. Aucun écran, endpoint ou contrôle de rôle métier n’est livré à ce stade.

## Exigences du registre officiel v2.1 — 6 novembre 2026

Les points ci-dessous traduisent les règles métier en exigences d’architecture. Ils ne constituent ni un schéma PostgreSQL final, ni des tables déjà créées, ni des contrôles opérationnels : ces choix de structure seront précisés lors de la phase d’implémentation.

### Panier, prix et commandes mono-commerçant

- Le serveur vérifie que le panier, chaque ligne et la commande appartiennent à un seul commerçant. Une confirmation frontend avant remplacement du panier ne remplace jamais cette validation.
- Le serveur recalcule les prix à partir du catalogue validé et des options sélectionnées ; il ne fait pas confiance aux montants transmis par le navigateur.
- Les lignes de commande conservent une copie des libellés, options, suppléments, quantités et prix calculés au moment de la commande.

### Disponibilité, stock et réservations

- Le modèle doit distinguer le choix de suivi de stock propre à chaque produit, la quantité suivie quand ce suivi est actif et la disponibilité commerciale gérée par le commerçant. La disponibilité n’est pas déduite uniquement du suivi de stock.
- Toute commande portant sur un produit indisponible est refusée côté serveur. Avec suivi actif, le serveur contrôle les quantités et empêche de dépasser le stock.
- L’envoi d’une commande réserve les quantités suivies. Les réservations n’expirent pas automatiquement. Une validation manuelle du paiement par le commerçant consomme le stock réservé ; un refus ou une annulation avant consommation libère les quantités. Après consommation, la restitution n’est possible que pour une annulation avant préparation ou remise au client, sans restitution automatique ensuite.
- Réservation, consommation, libération et restitution sont traitées atomiquement. L’implémentation empêche les doubles réservations et les quantités négatives, y compris en concurrence.
- Les libérations manuelles sont autorisées pour les réservations du commerçant concerné, ou pour l’ensemble des commerçants côté administrateur. Elles nécessitent un motif et enregistrent auteur, horodatage, motif et quantités. Une réservation consommée ne peut être libérée comme active ; la commande est mise dans un état cohérent et le client est informé si sa commande est affectée.

### Options et modifications pendant la préparation

- Un produit peut n’avoir aucune option ou posséder plusieurs groupes. Les validations serveur appliquent, pour chaque groupe, son type obligatoire/facultatif, son minimum, son maximum et le nombre d’options disponibles ; chaque supplément est recalculé depuis le catalogue.
- Une modification proposée par un commerçant en préparation est enregistrée comme une proposition distincte. La composition actuelle et la nouvelle composition/le nouveau montant restent historisés. Aucune modification ne prend effet sans accord explicite du client.
- Après acceptation, les réservations sont ajustées de façon atomique. Un refus passe par le processus d’annulation approprié. Après paiement, une baisse est gérée directement par le commerçant (sans remboursement automatique prétendu par Delifast) ; une hausse exige un paiement complémentaire payé et vérifié avant la poursuite.

### Annulations, remboursements et notifications

- Après refus d’une modification, le client choisit l’annulation totale ou les seuls articles concernés ; la demande conserve le périmètre et les articles sélectionnés.
- Un remboursement total couvre l’intégralité du montant payé. Pour une annulation partielle, le montant est calculé depuis les prix historiques des articles annulés et leurs suppléments directement associés ; les frais partagés restent inchangés.
- Si la préparation a commencé, le commerçant confirme son arrêt à l’ouverture de l’annulation. Après finalisation partielle, il confirme la reprise des articles restants ; une annulation totale n’est pas reprise.
- Le rejet d’une preuve exige un motif transmis au commerçant. L’annulation reste `cancellation_pending`, le client voit qu’elle attend une régularisation, le commerçant peut renvoyer une preuve corrigée et l’administrateur la vérifie à nouveau. Aucun statut métier supplémentaire n’est ajouté.
- À chaque changement d’état important, client et commerçant reçoivent dans l’application le nouveau statut, le montant concerné et l’action attendue. Aucun SMS ni e-mail n’est prévu dans la première version. Le détail de ce qui qualifie un changement d’état d’important reste à préciser.

### Autorisations et tests

- Les accès du commerçant sont limités à ses produits, commandes et réservations. L’administrateur unique peut agir sur les réservations de tous les commerçants ; les permissions sont contrôlées côté serveur et renforcées par RLS.
- Les tests futurs couvrent : panier/commande mono-commerçant ; produit indisponible ; suivi activé, désactivé et stock nul ; quantité excédentaire ; options facultatives et obligatoires, minima/maxima et suppléments ; copie des prix historiques ; réservations concurrentes ; transitions de paiement, annulation, préparation/remise ; choix total/partiel du client conservé à l’annulation ; remboursement total ou partiel selon les montants historiques et frais partagés inchangés ; motif de rejet transmis, preuve corrigée et nouvelle vérification ; confirmation d’arrêt et de reprise par le commerçant selon le périmètre ; notifications dans l’application aux deux parties ; libérations manuelles et journaux ; acceptation/refus des propositions et ajustement des réservations.
- Prévoir des tests unitaires, d’intégration, de sécurité et de concurrence avant livraison opérationnelle.

Aucune migration de base de données, route métier ou transaction réelle n’est créée dans la phase de conception des maquettes.

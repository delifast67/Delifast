# Maquettes Delifast — 53 écrans

Cette galerie est le livrable de conception statique de la phase en cours. Elle comprend une maquette par écran du cahier des charges, les sources HTML/CSS/JavaScript, une planche des états communs, 53 rendus PNG individuels et un carnet PDF de 53 pages.

## Ouvrir les interfaces

- Ouvrir `index.html` dans un navigateur pour parcourir les 53 écrans.
- Un écran individuel s’ouvre avec `index.html?ecran=01` à `index.html?ecran=53`.
- Le [carnet PDF](rendus/Delifast-maquettes-53-ecrans.pdf) rassemble une interface par page ; les PNG individuels sont dans `rendus/`.
- La [planche des états communs](rendus/etats-communs.png) accompagne la source consultable `etats.html`.

## Référence métier et écrans concernés

Les maquettes suivent le [registre officiel des règles métier v2.0 du 6 novembre 2026](../REGLES_METIER.md). Le cahier reste à **53 écrans** : les parcours d’annulation et de remboursement sont intégrés aux vues déjà prévues, sans ajouter de page.

- Les écrans **15, 32 et 46** affichent les états de commande définis par le registre, dont annulation en cours, annulation partielle, annulation totale finalisée et commande terminée.
- L’écran **16** (client), l’écran **33** (commerçant) et l’écran **47** (administration) illustrent le cycle d’une proposition de modification, le refus, le périmètre d’annulation total ou partiel et la progression des états.
- L’écran **33** indique l’arrêt de préparation si elle a commencé, la suspension des articles concernés, le remboursement direct par le commerçant et le dépôt d’une référence et d’une preuve.
- Les écrans **16 et 47** montrent que Delifast vérifie le remboursement avant finalisation : une preuve déposée ne suffit pas. Le rejet laisse l’annulation en attente de régularisation ; après vérification positive d’une annulation partielle, le reste peut reprendre.
- La preuve de stock reste distincte : réservation sans expiration automatique, consommation après validation du paiement, libération avant consommation et restitution après consommation seulement si l’annulation précède la préparation ou la remise au client.

Les statuts affichés sont ceux du registre (`pending_customer_approval`, `accepted`, `rejected`, `cancellation_pending`, `partially_cancelled`, `cancelled`, `completed`, `not_required`, `pending`, `proof_submitted`, `verified`, `rejected`). Les vues les présentent comme états successifs d’un parcours, pas comme des opérations réelles. Les points métier non décidés sont consignés dans le registre, au lieu d’être tranchés dans les maquettes.

## Choix de conception et limites

Le système visuel reprend la référence existante : rouge `#ef4935`, rouge foncé `#d93625`, fond crème `#fff8f3`, encre `#20201f`, bordures discrètes, cartes arrondies et mise en page responsive. Les espaces public, client, commerçant et administration conservent leurs navigations distinctes.

Les noms, photos, prix, références, montants, coordonnées, statuts et justificatifs illustrés sont fictifs. Aucun compte, service de paiement, envoi de commande, réservation, remboursement, base de données ou rôle réel n’est connecté. Les boutons et formulaires sont des représentations visuelles et ne déclenchent aucune action.

La maquette ne déclenche pas de transfert Mobile Money : le commerçant rembourse directement le client et Delifast vérifie la preuve. Aucune API, migration, base de données ou logique de backend n’est ajoutée dans cette mise à jour.

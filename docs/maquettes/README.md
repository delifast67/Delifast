# Maquettes Delifast — 53 écrans

Cette galerie est le livrable de **conception d’interfaces** demandé pour la phase en cours. Elle contient une maquette statique par écran du cahier des charges, les sources HTML/CSS/JavaScript de la galerie, une planche des états communs et des rendus image individuels.

## Ouvrir les interfaces

- Ouvrir `index.html` dans un navigateur pour parcourir les 53 écrans et sélectionner un écran dans la navigation.
- Un écran individuel peut être ouvert avec `index.html?ecran=01` à `index.html?ecran=53`.
- Le [carnet PDF des 53 rendus](rendus/Delifast-maquettes-53-ecrans.pdf) rassemble une interface par page. Les captures PNG individuelles sont aussi dans `rendus/`.
- La [planche PNG des neuf états communs](rendus/etats-communs.png) accompagne la source consultable `etats.html`.

## Choix de conception

Le système visuel reprend la référence d’accueil fournie : rouge `#ef4935`, rouge foncé `#d93625`, fond crème `#fff8f3`, encre `#20201f`, bordures discrètes, cartes arrondies et mise en page responsive. L’espace public reste centré sur la découverte des restaurants, sans retirer les autres catégories de commerces. Les espaces client, commerçant et administration disposent de navigations distinctes.

Les maquettes intègrent les décisions validées le 6 novembre 2026 : confirmation avant remplacement du panier par un autre commerçant, option de suivi de stock par produit avec quantité et disponibilité manuelle si le suivi est désactivé, options et suppléments tarifés, conservation des choix et prix dans les lignes de commande, et contrôles serveur représentés comme exigences. La liste des 53 écrans reste inchangée.

Les propositions toujours ouvertes (moment de déduction ou restitution du stock, cardinalité ou caractère obligatoire des choix) ne sont pas fixées dans les écrans. Les parcours et boutons sont des représentations visuelles, pas des flux opérationnels.

## Données et limites

Tous les noms d’établissements, personnes, références, montants, coordonnées, statuts et justificatifs sont **fictifs** et signalés comme exemples. Les photos sont des visuels d’illustration repris de la maquette d’accueil fournie. Aucun compte, service de paiement, envoi de commande, preuve réelle, base de données ou autorisation n’est connecté.

Ce livrable s’arrête à la conception statique. Il ne crée pas de routes métier Next.js ou de composants React réutilisables et n’avance pas la phase ultérieure de conversion des maquettes en application.

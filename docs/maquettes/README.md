# Maquettes Delifast — 53 écrans

Cette galerie est le livrable de conception d’interfaces de la phase en cours. Elle contient une maquette statique par écran du cahier des charges, les sources HTML/CSS/JavaScript, une planche des états communs, 53 rendus PNG individuels et un carnet PDF d’une page par écran.

## Ouvrir les interfaces

- Ouvrir `index.html` dans un navigateur pour parcourir les 53 écrans et sélectionner une interface dans la navigation.
- Un écran individuel peut être ouvert avec `index.html?ecran=01` à `index.html?ecran=53`.
- Le [carnet PDF des 53 rendus](rendus/Delifast-maquettes-53-ecrans.pdf) rassemble une interface par page ; les captures PNG individuelles sont dans `rendus/`.
- La [planche PNG des neuf états communs](rendus/etats-communs.png) accompagne la source consultable `etats.html`.

## Règles visibles dans les interfaces

Les maquettes suivent le registre officiel v2.0 du 6 novembre 2026. Elles matérialisent notamment :

- le remplacement confirmé du panier mono-commerçant et le contrôle correspondant côté serveur (écran 11) ;
- la disponibilité distincte du suivi de stock, les quantités suivies et le refus des articles indisponibles (écrans 2, 5, 12, 28 et 29) ;
- la réservation à l’envoi, l’absence d’expiration automatique, la consommation après validation manuelle du paiement, les cas de libération/restitution et l’outil de libération manuelle avec motif (écrans 13, 14, 16, 33, 35 et 47) ;
- les produits sans options, plusieurs groupes, les règles obligatoires/facultatives, minima/maxima et suppléments tarifaires, ainsi que la copie des choix et prix dans la commande (écrans 4, 12, 16, 29, 33 et 47) ;
- les propositions de retrait ou remplacement d’un article, le choix explicite du client, l’historique avant/après et les exigences de paiement après changement (écrans 16 et 33).

Le total reste de 53 écrans. Ces comportements sont illustrés dans des composants d’écrans existants et n’ajoutent pas de nouvelles pages au cahier.

## Choix de conception et limites

Le système visuel reprend la référence d’accueil fournie : rouge `#ef4935`, rouge foncé `#d93625`, fond crème `#fff8f3`, encre `#20201f`, bordures discrètes, cartes arrondies et mise en page responsive. L’espace public met en avant les restaurants sans retirer les autres catégories de commerces ; les espaces client, commerçant et administration ont des navigations distinctes.

Les noms, photos, prix, références, montants, coordonnées, statuts et justificatifs sont fictifs et signalés comme exemples. Aucun compte, service de paiement, envoi de commande, réservation, remboursement, base de données ou rôle réel n’est connecté. Les formulaires et boutons restent des représentations visuelles, pas des actions opérationnelles.

Les tarifs ou modalités qui ne sont pas définis dans les décisions validées ne sont pas inventés. Les règles non présentes dans le registre v2.0 ne doivent pas être déduites des exemples de maquette.

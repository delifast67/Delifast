# Maquettes Delifast — 53 écrans

Cette galerie est le livrable de conception statique de la phase en cours. Elle comprend une maquette par écran du cahier des charges, les sources HTML/CSS/JavaScript, une planche des états communs, 53 rendus PNG individuels et un carnet PDF de 53 pages.

## Ouvrir les interfaces

- Ouvrir `index.html` dans un navigateur pour parcourir les 53 écrans.
- Un écran individuel s’ouvre avec `index.html?ecran=01` à `index.html?ecran=53`.
- Le [carnet PDF](rendus/Delifast-maquettes-53-ecrans.pdf) rassemble une interface par page ; les PNG individuels sont dans `rendus/`.
- La [planche des états communs](rendus/etats-communs.png) accompagne la source consultable `etats.html`.
- Pour recréer les rendus et exécuter leurs contrôles documentaires, lancer `python3 scripts/render-maquettes.py` depuis la racine du dépôt.

## Référence métier et écrans concernés

Les maquettes suivent le [registre officiel des règles métier](../REGLES_METIER.md) et la [référence fonctionnelle du module Paiements par preuve (Mobile Money)](../PAIEMENTS_MOBILE_MONEY.md). Le cahier reste à **53 écrans** : aucun écran ni statut supplémentaire n’est ajouté.

- Les écrans **15, 32 et 46** affichent les états de commande définis par le registre.
- L’écran **16** (client) montre qu’après son refus le client choisit l’annulation totale ou celle des seuls articles concernés ; le choix est inscrit dans la demande d’annulation.
- L’écran **33** (commerçant) montre la confirmation de l’arrêt si la préparation a commencé, le remboursement direct et le dépôt d’une référence et d’une preuve. Après finalisation partielle, le commerçant confirme la reprise des articles restants ; après une annulation totale, rien ne reprend.
- L’écran **47** (administration) montre la vérification par l’administrateur, le motif obligatoire en cas de rejet, le renvoi corrigé et une nouvelle vérification. Les dépôts et décisions gardent un historique append-only complet, sans limite de tentatives ni expiration automatique.
- Une ligne de commande est un produit avec ses options. Le prix net historique unitaire comprend suppléments, ajustements propres à la ligne et part des ajustements monétaires globaux (remises et autres ajustements hors frais communs) attribuée au snapshot ; annuler `n` unités rembourse ce prix unitaire multiplié par `n`.
- Les remises et autres ajustements monétaires globaux hors frais communs sont répartis au prorata entre les lignes après ajustements propres à l’article, puis enregistrés dans le snapshot. Les frais communs ne sont pas remboursés lors d’une annulation partielle ; une annulation totale rembourse le montant effectivement payé, frais compris.
- Chaque transition réelle d’un état prévu de commande, paiement, modification, annulation, remboursement ou réservation qui affecte la commande déclenche une notification dans l’application aux deux parties. Les confirmations d’arrêt et de reprise de préparation déclenchent aussi une notification. Chaque message indique le statut atteint, le montant concerné et l’action attendue du destinataire ; aucun SMS/e-mail en v1, aucune notification pour un brouillon ou une modification sans transition.
- Les réservations de stock restent distinctes : elles n’expirent pas automatiquement, sont consommées après validation du paiement, libérées avant consommation et restituées après consommation seulement si l’annulation précède la préparation ou la remise au client.

Les paiements Mobile Money utilisent uniquement **En attente**, **Validé** et **Refusé**; **Non soumis** est un état de présentation avant dépôt de preuve. Ces états restent distincts du statut de commande. Les autres états d’interface réutilisent ceux déjà prévus au registre. Les vues présentent les parcours sans déclencher d’opération réelle ni créer de statut supplémentaire.

## Choix de conception et limites

Le système visuel reprend la référence existante : rouge `#ef4935`, rouge foncé `#d93625`, fond crème `#fff8f3`, encre `#20201f`, bordures discrètes, cartes arrondies et mise en page responsive. Les espaces public, client, commerçant et administration conservent leurs navigations distinctes.

Les noms, photos, prix, références, montants, coordonnées, statuts et justificatifs illustrés sont fictifs. Aucun compte, service de paiement, envoi de commande, réservation, remboursement, base de données ou rôle réel n’est connecté. Les boutons et formulaires sont des représentations visuelles et ne déclenchent aucune action.

La maquette ne déclenche pas de transfert Mobile Money ni d’envoi réel de notification : le commerçant rembourse directement le client et Delifast vérifie la preuve. Aucune API, migration, base de données ou logique de backend n’est ajoutée dans cette mise à jour.

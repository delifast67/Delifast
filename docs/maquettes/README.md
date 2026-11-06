# Maquettes Delifast — 53 écrans

Cette galerie est le livrable de conception statique de la phase en cours. Elle comprend une maquette par écran du cahier des charges, les sources HTML/CSS/JavaScript, une planche des états communs, 53 rendus PNG individuels et un carnet PDF de 53 pages.

## Ouvrir les interfaces

- Ouvrir `index.html` dans un navigateur pour parcourir les 53 écrans.
- Un écran individuel s’ouvre avec `index.html?ecran=01` à `index.html?ecran=53`.
- Le [carnet PDF](rendus/Delifast-maquettes-53-ecrans.pdf) rassemble une interface par page ; les PNG individuels sont dans `rendus/`.
- La [planche des états communs](rendus/etats-communs.png) accompagne la source consultable `etats.html`.

## Référence métier et écrans concernés

Les maquettes suivent le [registre officiel des règles métier v2.1 du 6 novembre 2026](../REGLES_METIER.md). Le cahier reste à **53 écrans** : les parcours d’annulation, de remboursement et de notification sont intégrés aux vues déjà prévues, sans ajouter de page.

- Les écrans **15, 32 et 46** affichent les états de commande définis par le registre, dont annulation en cours, annulation partielle, annulation totale finalisée et commande terminée.
- L’écran **16** (client) montre qu’après son refus le client choisit l’annulation totale ou celle des seuls articles concernés ; le choix est inscrit dans la demande d’annulation.
- L’écran **33** (commerçant) montre la confirmation de l’arrêt si la préparation a commencé, le remboursement direct et le dépôt d’une référence et d’une preuve. Après finalisation partielle, le commerçant confirme la reprise des articles restants ; après une annulation totale, rien ne reprend.
- L’écran **47** (administration) montre la vérification de la preuve, le motif obligatoire transmis au commerçant lors d’un rejet et une nouvelle vérification après réception d’une preuve corrigée. Le rejet ne finalise pas l’annulation : elle reste en attente de régularisation, statut également visible pour le client sur l’écran **16**.
- Le remboursement total correspond au montant complet payé. Le remboursement partiel utilise les prix historiques des articles annulés et leurs suppléments directement associés ; les frais partagés restent inchangés.
- Les changements d’état importants sont associés à une notification dans l’application pour le client et le commerçant, indiquant le nouveau statut, le montant et l’action attendue. Aucun SMS ni e-mail n’est prévu en première version.
- La preuve de stock reste distincte : réservation sans expiration automatique, consommation après validation du paiement, libération avant consommation et restitution après consommation seulement si l’annulation précède la préparation ou la remise au client.

Les statuts affichés sont ceux du registre (`pending_customer_approval`, `accepted`, `rejected`, `cancellation_pending`, `partially_cancelled`, `cancelled`, `completed`, `not_required`, `pending`, `proof_submitted`, `verified`, `rejected`). Les vues les présentent comme états successifs d’un parcours, pas comme des opérations réelles ni comme des statuts supplémentaires. Les détails métier encore non décidés sont consignés séparément dans le registre.

## Choix de conception et limites

Le système visuel reprend la référence existante : rouge `#ef4935`, rouge foncé `#d93625`, fond crème `#fff8f3`, encre `#20201f`, bordures discrètes, cartes arrondies et mise en page responsive. Les espaces public, client, commerçant et administration conservent leurs navigations distinctes.

Les noms, photos, prix, références, montants, coordonnées, statuts et justificatifs illustrés sont fictifs. Aucun compte, service de paiement, envoi de commande, réservation, remboursement, base de données ou rôle réel n’est connecté. Les boutons et formulaires sont des représentations visuelles et ne déclenchent aucune action.

La maquette ne déclenche pas de transfert Mobile Money ni d’envoi réel de notification : le commerçant rembourse directement le client et Delifast vérifie la preuve. Aucune API, migration, base de données ou logique de backend n’est ajoutée dans cette mise à jour.

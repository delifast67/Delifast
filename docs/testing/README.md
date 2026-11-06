# Tests et contrôles

## Phase d’initialisation

Les contrôles de base sont `npm run lint`, `npm run typecheck` et `npm run build`. La page `/` sert uniquement à vérifier que l’application démarre ; elle ne valide aucun parcours métier.

## Contrôle documentaire et rendu des maquettes

`python3 scripts/render-maquettes.py` vérifie l’inventaire des 53 écrans, leurs éléments métier, les images et le débordement mobile, puis régénère les PNG et le carnet PDF. Le même contrôle effectue un exemple arithmétique isolé : prix de base et suppléments, remise propre à la ligne, allocation au prorata d’une remise globale, remboursement d’une unité et remboursement total du montant payé. Il vérifie également que le rendu contient les déclencheurs, états et libellés de notification approuvés.

Ce contrôle porte seulement sur les règles écrites et leurs rendus statiques. Il ne teste aucune transition opérationnelle, logique de backend, notification réelle, preuve privée, remboursement, appel API ou écriture de données.

## Couverture opérationnelle future

Après implémentation, les tests unitaires, d’intégration et e2e devront vérifier le périmètre d’annulation choisi et historisé, le calcul fondé sur les snapshots, le prorata des remises et autres ajustements monétaires globaux hors frais communs, le traitement des frais communs, les preuves et décisions append-only, le rejet motivé et la nouvelle vérification, l’arrêt/reprise de préparation, les notifications aux deux parties sur chaque transition réelle, ainsi que les réservations et la cohérence du stock.

Les tests ne doivent jamais payer, envoyer de SMS/e-mail métier ou écrire dans la production. Aucun test d’implémentation backend n’est ajouté dans cette mise à jour.

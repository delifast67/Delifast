# Cahier des charges — 53 écrans

Ce sommaire reprend le périmètre du document fourni. Il décrit la couverture à concevoir ; il ne signifie pas que ces écrans ou leurs comportements sont déjà implémentés. Les contenus, établissements, prix et photos de la maquette d’accueil sont fictifs.

## Espace public — 7 écrans

01. Accueil

02. Catalogue général

03. Liste des restaurants

04. Fiche restaurant

05. Fiche commerce

06. Recherche

07. Aide

## Authentification — 2 écrans

08. Connexion et création de compte Google

09. Choix du type de compte

## Espace client — 10 écrans

10. Tableau de bord client

11. Panier

12. Validation de commande

13. Confirmation de commande

14. Paiement de commande

15. Liste des commandes

16. Détail d’une commande

17. Liste des paiements

18. Détail d’un paiement

19. Profil client

## Espace commerçant — 18 écrans

20. Inscription du commerçant

21. Localisation du restaurant à l’inscription

22. Configuration des paiements à l’inscription

23. Tableau de bord commerçant

24. Gestion de la boutique

25. Gestion de la localisation

26. Gestion des moyens de paiement

27. Configuration de la livraison

28. Liste des produits

29. Formulaire produit

30. Liste des menus

31. Formulaire menu

32. Liste des commandes

33. Détail et traitement d’une commande

34. Liste des paiements

35. Détail et vérification d’un paiement

36. Gestion de l’abonnement

37. Paiement de l’abonnement

## Administration — 14 écrans

38. Connexion administrateur

39. Tableau de bord général

40. Liste des utilisateurs

41. Détail d’un utilisateur

42. Liste des commerçants

43. Détail d’un commerçant

44. Liste des restaurants

45. Détail d’un restaurant

46. Liste des commandes

47. Détail d’une commande

48. Gestion des abonnements

49. Vérification d’un abonnement

50. Liste des paiements

51. Détail d’un paiement

## Écrans système — 2 écrans

52. Page d’erreur

53. Page introuvable (404)

## États communs

Les maquettes doivent prévoir les états initial, chargement, vide, succès, erreur, désactivé, en attente, validé et refusé. Quand un paiement est refusé, le motif doit être visible et le parcours doit permettre une nouvelle preuve lorsque c’est prévu.


## Règles métier transversales — version officielle v2.2, 6 novembre 2026

Le périmètre reste de **53 écrans**. Le registre complet des décisions validées, y compris le cycle de réservation/libération du stock, le traitement des articles indisponibles en préparation et les règles d’annulation, remboursement et notification, se trouve dans [`REGLES_METIER.md`](REGLES_METIER.md). Les règles sont matérialisées dans les interfaces existantes concernées, sans ajouter ni supprimer d’écran. La galerie, le carnet PDF et un rendu PNG individuel par écran sont disponibles dans [`maquettes/`](maquettes/README.md). Les exemples restent fictifs et illustrent les règles décidées.

## Couverture des workflows intégrés au dossier statique

Le registre officiel v2.2 décrit les demandes de modification, les annulations, les remboursements et les notifications dans l’application. Les vues existantes portent ce parcours sans nouvel écran : les listes de commandes 15, 32 et 46 montrent les états de commande ; le détail client 16 montre le choix total ou partiel, enregistré dans la demande ; le détail commerçant 33 montre l’arrêt confirmé si la préparation a commencé et la reprise du reste après finalisation partielle ; le détail administration 47 illustre la vérification par l’administrateur, le motif obligatoire en cas de rejet, le renvoi d’une preuve corrigée et sa nouvelle vérification. Chaque dépôt et décision demeure dans un historique append-only sans limite arbitraire ni expiration automatique.

Pour une ligne (un produit avec ses options), le prix net historique unitaire inclut les suppléments, ajustements propres à la ligne et part des remises ou autres ajustements globaux non-frais attribuée au snapshot ; annuler `n` unités rembourse ce prix unitaire multiplié par `n`. Les ajustements globaux sont répartis au prorata, avec répartition déterministe des fractions au plus petit centime/unité monétaire, et les frais communs restent non remboursés en partiel. L’annulation totale rembourse le montant effectivement payé. Un rejet motivé laisse l’annulation en attente ; le commerçant peut renvoyer toute preuve corrigée nécessaire, l’historique append-only est conservé et seul l’administrateur vérifie. Une preuve déposée ou rejetée ne finalise pas l’annulation.

Chaque transition réelle des états déjà prévus de commande, paiement, modification, annulation, remboursement et réservation qui affecte la commande déclenche une notification dans l’application aux deux parties ; l’arrêt et la reprise confirmés de la préparation aussi. Le message porte le statut atteint, son libellé, le montant concerné et l’action propre au destinataire. Aucun SMS/e-mail en v1, aucune notification pour brouillon ou modification sans transition, aucun nouveau statut.

Les 53 écrans et les états communs sont conservés. Ce travail actualise uniquement les sources et rendus de conception ; il n’ajoute ni backend, ni API, ni migration, ni paiement, remboursement ou notification réel.

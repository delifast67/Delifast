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


## Règles métier transversales — version officielle v2.1, 6 novembre 2026

Le périmètre reste de **53 écrans**. Le registre complet des décisions validées, y compris le cycle de réservation/libération du stock, le traitement des articles indisponibles en préparation et les règles d’annulation, remboursement et notification, se trouve dans [`REGLES_METIER.md`](REGLES_METIER.md). Les règles sont matérialisées dans les interfaces existantes concernées, sans ajouter ni supprimer d’écran. La galerie, le carnet PDF et un rendu PNG individuel par écran sont disponibles dans [`maquettes/`](maquettes/README.md). Aucune règle non validée n’est déduite des exemples.

## Couverture des workflows intégrés au dossier statique

Le registre officiel v2.1 décrit les demandes de modification, les annulations, les remboursements et les notifications dans l’application. Les vues existantes portent ce parcours sans nouvel écran : les listes de commandes 15, 32 et 46 montrent les états de commande ; le détail client 16 montre le choix entre annulation totale et seuls articles concernés, enregistré dans la demande ; le détail commerçant 33 montre l’arrêt confirmé si la préparation a commencé et la reprise confirmée des articles restants après finalisation partielle ; le détail administration 47 illustre la vérification des preuves, le motif obligatoire en cas de rejet et une nouvelle vérification après renvoi d’une preuve corrigée.

Les montants partiels viennent des prix historiques des articles annulés et de leurs suppléments directement associés ; les frais partagés restent inchangés. Une annulation totale rembourse tout le montant payé. Un rejet motivé laisse l’annulation en attente de régularisation : le commerçant peut renvoyer une preuve corrigée et l’administrateur la vérifie à nouveau. Une preuve déposée ou rejetée ne finalise pas l’annulation.

À chaque changement d’état important, client et commerçant reçoivent dans l’application le nouveau statut, le montant concerné et l’action attendue. Cette règle n’ajoute ni SMS ni e-mail en première version. Seuls les détails encore indéterminés du registre restent à préciser.

Les 53 écrans et les états communs sont conservés. Ce travail actualise uniquement les sources et rendus de conception ; il n’ajoute ni backend, ni API, ni migration, ni paiement, remboursement ou notification réel.

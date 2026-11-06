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


### Critères et flux des écrans de paiement existants

Ces critères complètent les écrans numérotés ci-dessus ; ils n’ajoutent aucun écran.

#### Espace client

- **14. Paiement de commande :** afficher le total calculé côté serveur et uniquement les opérateurs activés et renseignés par le restaurant choisi. Le client choisit un opérateur, ouvre le code USSD prérempli et effectue puis confirme le paiement sur son téléphone. À son retour, il téléverse la capture du SMS et saisit la référence de transaction obligatoire ; aucun paiement n’est exécuté dans Delifast et aucun bénéficiaire ni montant n’est saisi par le client.
- **17. Liste des paiements :** présenter les paiements de commande propres au client avec leurs statuts communs **En attente**, **Validé** ou **Refusé** ; permettre l’accès à leur détail et à l’historique des preuves du client.
- **18. Détail d’un paiement :** afficher le montant, l’opérateur, le numéro bénéficiaire historique, la référence, les dates, les captures privées, le statut et l’historique append-only. Un refus affiche son motif et le parcours autorise une nouvelle transaction et une nouvelle preuve.

#### Espace commerçant

- **22. Configuration des paiements à l’inscription** et **26. Gestion des moyens de paiement :** permettre de renseigner et d’activer séparément Orange Money et Telmob. Pour le paiement d’une commande, le client ne voit qu’un opérateur actif avec un numéro bénéficiaire renseigné.
- **34. Liste des paiements :** montrer au commerçant les paiements de commande qui lui sont destinés, avec leur statut ; une preuve soumise lui est signalée. Ne pas exposer les preuves d’abonnement destinées à Delifast.
- **35. Détail et vérification d’un paiement :** afficher le nom du client, le numéro de commande, le montant attendu, l’opérateur, le numéro bénéficiaire, la référence de transaction, la capture privée du SMS et la date de soumission. Le commerçant compare la preuve au SMS reçu sur son propre numéro, puis valide ou refuse manuellement ; le refus exige un motif. Le client est notifié de la décision et peut déposer une nouvelle preuve après refus. Aucun contrôle de paiement d’abonnement n’est proposé au commerçant.
- **36. Gestion de l’abonnement :** présenter les forfaits Découverte et Professionnel ; leur montant et leur durée proviennent de la configuration des forfaits. Le choix ouvre le paiement de l’abonnement.
- **37. Paiement de l’abonnement :** afficher le montant du forfait et les opérateurs actifs disposant d’un numéro Delifast configuré. Le restaurant ouvre le code USSD, effectue et confirme le paiement sur son téléphone, revient dans l’application puis transmet la capture du SMS et la référence à Delifast. Le statut reste en attente jusqu’à la décision de l’administrateur ; le restaurant ne peut pas valider son abonnement. En cas de refus, afficher le motif et permettre une nouvelle transaction et une nouvelle preuve.

#### Administration

- **49. Vérification d’un abonnement :** afficher le restaurant, le forfait, le montant attendu, l’opérateur, le numéro bénéficiaire Delifast, la référence, la capture privée du SMS et la date de soumission. L’administrateur compare ces éléments au SMS réellement reçu sur le numéro Delifast ; il valide (ce qui active l’abonnement) ou refuse avec un motif obligatoire. Le restaurant reçoit la décision et, le cas échéant, le motif.
- **50. Liste des paiements** et **51. Détail d’un paiement :** distinguer les paiements d’abonnement destinés à Delifast des paiements de commande destinés aux restaurants et afficher leurs statuts et leur historique. L’administrateur peut vérifier les abonnements ; pour les commandes, son accès est de supervision seulement et aucun contrôle ne lui permet de remplacer la décision du restaurant.

#### Génération USSD commune aux écrans 14 et 37

Les formats opérateur sont distincts : Orange Money `*144*2*1*{NUMERO_BENEFICIAIRE}*{MONTANT}#` ou `*144*10*{NUMERO_BENEFICIAIRE}*{MONTANT}#` ; Telmob `*555*2*1*{NUMERO_BENEFICIAIRE}*{MONTANT}#`. Nettoyer le numéro des espaces, tirets et caractères inutiles. Dans le lien téléphonique, encoder `#` en `%23`. Le code emploie le bénéficiaire du circuit et le montant exact (forfait configuré ou total de commande calculé côté serveur) ; les syntaxes doivent être testées séparément sur les téléphones utilisés avant le lancement.


## Règles métier transversales — version officielle v2.2, 6 novembre 2026

Le périmètre reste de **53 écrans**. Le registre complet des décisions validées, y compris le cycle de réservation/libération du stock, le traitement des articles indisponibles en préparation et les règles d’annulation, remboursement et notification, se trouve dans [`REGLES_METIER.md`](REGLES_METIER.md). Les règles sont matérialisées dans les interfaces existantes concernées, sans ajouter ni supprimer d’écran. La galerie, le carnet PDF et un rendu PNG individuel par écran sont disponibles dans [`maquettes/`](maquettes/README.md). Les exemples restent fictifs et illustrent les règles décidées.

## Couverture des workflows intégrés au dossier statique

Le registre officiel v2.2 décrit les demandes de modification, les annulations, les remboursements et les notifications dans l’application. Les vues existantes portent ce parcours sans nouvel écran : les listes de commandes 15, 32 et 46 montrent les états de commande ; le détail client 16 montre le choix total ou partiel, enregistré dans la demande ; le détail commerçant 33 montre l’arrêt confirmé si la préparation a commencé et la reprise du reste après finalisation partielle ; le détail administration 47 illustre la vérification par l’administrateur, le motif obligatoire en cas de rejet, le renvoi d’une preuve corrigée et sa nouvelle vérification. Chaque dépôt et décision demeure dans un historique append-only sans limite arbitraire ni expiration automatique.

Pour une ligne (un produit avec ses options), le prix net historique unitaire inclut les suppléments, ajustements propres à la ligne et part des remises ou autres ajustements globaux non-frais attribuée au snapshot ; annuler `n` unités rembourse ce prix unitaire multiplié par `n`. Les ajustements globaux sont répartis au prorata, avec répartition déterministe des fractions au plus petit centime/unité monétaire, et les frais communs restent non remboursés en partiel. L’annulation totale rembourse le montant effectivement payé. Un rejet motivé laisse l’annulation en attente ; le commerçant peut renvoyer toute preuve corrigée nécessaire, l’historique append-only est conservé et seul l’administrateur vérifie. Une preuve déposée ou rejetée ne finalise pas l’annulation.

Chaque transition réelle des états déjà prévus de commande, paiement, modification, annulation, remboursement et réservation qui affecte la commande déclenche une notification dans l’application aux deux parties ; l’arrêt et la reprise confirmés de la préparation aussi. Le message porte le statut atteint, son libellé, le montant concerné et l’action propre au destinataire. Aucun SMS/e-mail en v1, aucune notification pour brouillon ou modification sans transition, aucun nouveau statut.

Les 53 écrans et les états communs sont conservés. Ce travail actualise uniquement les sources et rendus de conception ; il n’ajoute ni backend, ni API, ni migration, ni paiement, remboursement ou notification réel.

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

La référence complète du module est [Paiements par preuve (Mobile Money)](PAIEMENTS_MOBILE_MONEY.md). Les critères ci-dessous en résument les exigences d’interface; ils ne créent aucun nouvel écran.

### Critères et flux des écrans de paiement existants

Ces critères complètent les écrans numérotés ci-dessus ; ils n’ajoutent aucun écran.

#### Espace client

- **13. Confirmation de commande :** présenter la référence, le restaurant, les produits et quantités, le total enregistré côté serveur, le mode de réception, l’adresse de retrait ou de livraison et les coordonnées du client; l’action principale ouvre l’écran 14.
- **14. Paiement de commande :** afficher le restaurant bénéficiaire, la référence de commande, le total exact enregistré et les seuls opérateurs activés avec un numéro renseigné par ce restaurant. Chaque carte présente l’opérateur, son numéro bénéficiaire, son code USSD et l’action d’ouverture du composeur; la copie du numéro est possible. Le montant et le bénéficiaire ne sont jamais saisis par le client. Le client effectue et confirme lui-même le paiement, revient dans Delifast, puis dépose la capture du SMS et la référence obligatoire. Prévoir sélection, aperçu, retrait et remplacement de la capture; contrôler celle-ci avant envoi. Montrer séparément **Non soumis** (présentation avant preuve), **En attente**, **Validé** et **Refusé** avec motif et nouvelle soumission; prévoir chargement, erreurs de génération/téléversement/soumission, absence d’opérateur et expiration uniquement selon une règle définie. Aucun paiement réel, code appelable ou lien téléphonique actif n’est branché.
- **15. Liste des commandes :** afficher séparément le statut de la commande et le statut du paiement, avec référence, restaurant, date, montant et mode de réception.
- **16. Détail d’une commande :** conserver le montant, le bénéficiaire, l’opérateur, le statut du paiement et sa référence; l’action « Consulter le paiement » mène à l’écran 18.
- **17. Liste des paiements :** présenter les paiements propres au client avec référence de paiement, référence de commande, restaurant bénéficiaire, opérateur, montant, date et statut; filtres **En attente**, **Validés**, **Refusés**; accès au détail 18 et à la commande associée; états liste vide, chargement et erreur.
- **18. Détail d’un paiement :** afficher commande, bénéficiaire, opérateur, numéro destinataire historique, montant, référence de transaction, date d’envoi, capture privée, statut, motif de refus et historique complet des soumissions. Permettre d’agrandir la capture, de revenir à la commande et, après refus, de déposer une nouvelle preuve sans supprimer les précédentes.

#### Espace commerçant

- **22. Configuration des paiements à l’inscription** et **26. Gestion des moyens de paiement :** activer Orange Money et Telmob séparément et renseigner leur numéro respectif. Le client ne voit que l’opérateur actif avec un numéro renseigné; la configuration demeure indépendante pour chaque opérateur.
- **34. Liste des paiements :** montrer au commerçant uniquement les paiements de commande qui lui sont destinés, avec référence de paiement et commande, client, opérateur, montant, date et statut; identifier les nouvelles preuves; filtres En attente, Validés, Refusés, actions d’examen/filtrage/actualisation et états vide, à vérifier, validé et erreur. Ne pas exposer les preuves d’abonnement destinées à Delifast.
- **35. Détail et vérification d’un paiement :** afficher commande, client, montant attendu, opérateur, numéro bénéficiaire, référence de transaction, capture privée, date et historique des soumissions. Le restaurant bénéficiaire compare au SMS réellement reçu sur son propre numéro, puis valide ou refuse manuellement; le refus exige un motif. La décision notifie le client avec le motif éventuel et permet une nouvelle preuve. Le commerçant ne décide que sur les paiements qui lui sont destinés; aucun contrôle d’abonnement ne lui est présenté.
- **36. Gestion de l’abonnement :** présenter Découverte à **3 000 F CFA par mois** et Professionnel à **4 500 F CFA par mois**, ainsi que la durée, les fonctions, les avantages et la disponibilité du forfait. Indiquer qu’un premier mois est gratuit pour chaque nouveau compte marchand, une seule fois par compte, puis que les renouvellements sont payants au tarif du forfait choisi. La sélection ouvre l’écran 37.
- **37. Paiement de l’abonnement :** afficher le prix mensuel du forfait choisi (3 000 F CFA pour Découverte ou 4 500 F CFA pour Professionnel) et les seuls opérateurs actifs ayant un numéro Delifast configuré. Indiquer le mois gratuit unique et le renouvellement payant ensuite, sans inventer de condition d’éligibilité. Le restaurant choisit son opérateur, consulte le code USSD prérempli, effectue et confirme le paiement sur son téléphone puis, à son retour, transmet la capture du SMS et la référence à l’administration. Le montant n’est pas modifiable par le restaurant; le statut reste en attente jusqu’à la décision de l’administrateur. Un refus motivé permet une nouvelle transaction et une nouvelle preuve; le restaurant ne valide jamais son abonnement.

#### État d’interface — compte marchand suspendu pour défaut d’abonnement

Cet état s’applique aux écrans commerçants existants **23, 36 et 37**; il ne crée aucun écran ni statut métier supplémentaire.

- **23. Tableau de bord commerçant :** après l’expiration d’un abonnement payant, afficher le délai de grâce de **72 heures calendaires** : pendant ce délai, le compte reste opérationnel pour recevoir et traiter les commandes et des rappels de renouvellement sont envoyés. Si aucun renouvellement n’est validé à la fin des 72 heures, afficher « Votre compte marchand est temporairement désactivé » et le motif « Votre abonnement n'est pas actif ou est arrivé à expiration ». Montrer le forfait, sa date d’expiration et l’état du paiement. Alors, masquer ou rendre inaccessibles les fonctionnalités commerciales; garder l’accès limité à l’abonnement, au paiement, au dépôt d’une preuve et au suivi de vérification.
- **36. Gestion de l’abonnement :** conserver l’accès aux forfaits et à leur renouvellement, rappeler le mois gratuit unique accordé à chaque nouveau compte marchand, et permettre de consulter l’historique des abonnements et des paiements.
- **37. Paiement de l’abonnement :** si la preuve est en attente de vérification, afficher explicitement « Votre paiement est en cours de vérification. Votre compte sera réactivé après validation. » En cas de refus, afficher le motif et permettre au marchand d’effectuer une nouvelle transaction puis de soumettre une nouvelle preuve, conformément au circuit de validation existant. Après validation par l’administration, indiquer que le compte est réactivé et que les fonctionnalités autorisées sont de nouveau accessibles. Ce message de succès décrit l’effet de la validation; il n’ajoute pas de statut de paiement.

#### Administration

- **48. Gestion des abonnements :** afficher restaurant, commerçant, formule, montant, dates de début et d’expiration, statut et paiement associé; filtres Découverte, Professionnel, En attente, Actif, Expiré et Refusé; recherche, filtrage, consultation du commerçant et examen vers 49.
- **49. Vérification d’un abonnement :** afficher restaurant, commerçant, forfait, montant mensuel attendu (3 000 F CFA pour Découverte ou 4 500 F CFA pour Professionnel), opérateur, numéro bénéficiaire Delifast, référence de transaction, capture privée, date et historique complet des soumissions. L’administrateur compare au SMS reçu sur le numéro Delifast; lui seul peut valider (et activer ou réactiver l’abonnement) ou refuser en saisissant obligatoirement un motif. Le dépôt d’une preuve ne réactive pas le compte; la suspension administrative indépendante reste en vigueur. Le restaurant reçoit la décision et le motif éventuel.
- **50. Liste des paiements** : présenter référence, bénéficiaire, restaurant/commerçant, type (commande ou abonnement), opérateur, montant, date et statut; filtrer par type, Orange Money, Telmob et En attente, Validés, Refusés; rechercher, filtrer et ouvrir le détail 51. Prévoir états vide, disponible, chargement et erreur.
- **51. Détail d’un paiement :** afficher référence de transaction, type, bénéficiaire, montant, opérateur, numéro destinataire, commerçant, commande ou abonnement associé, capture, statut et historique des décisions. L’administration peut agrandir la capture et ouvrir les éléments associés. Prévoir les états En attente, Validé, Refusé et Justificatif manquant. Pour une commande, elle supervise sans valider ni refuser à la place du restaurant; elle décide seulement des abonnements destinés à Delifast.

#### Génération USSD commune aux écrans 14 et 37

Les seuls opérateurs prévus sont Orange Money et Telmob, activés séparément et disponibles seulement si leur numéro bénéficiaire est renseigné. Les formats sont distincts : Orange Money `*144*2*1*{NUMERO_BENEFICIAIRE}*{MONTANT}#` ou `*144*10*{NUMERO_BENEFICIAIRE}*{MONTANT}#` ; Telmob `*555*2*1*{NUMERO_BENEFICIAIRE}*{MONTANT}#`. Nettoyer le numéro des espaces, tirets et caractères inutiles. Dans un lien téléphonique, encoder `#` en `%23`; tous les codes ou valeurs affichés dans les maquettes doivent être clairement fictifs et aucun lien `tel:` ne doit être actif. Le code emploie le bénéficiaire propre au circuit et le montant exact (forfait configuré ou total de commande enregistré côté serveur); tester séparément les syntaxes sur les téléphones concernés avant lancement.


## Règles métier transversales — version officielle v2.2, 6 novembre 2026

Le périmètre reste de **53 écrans**. Le registre complet des décisions validées, y compris le cycle de réservation/libération du stock, le traitement des articles indisponibles en préparation et les règles d’annulation, remboursement et notification, se trouve dans [`REGLES_METIER.md`](REGLES_METIER.md). Les règles sont matérialisées dans les interfaces existantes concernées, sans ajouter ni supprimer d’écran. La galerie, le carnet PDF et un rendu PNG individuel par écran sont disponibles dans [`maquettes/`](maquettes/README.md). Les exemples restent fictifs et illustrent les règles décidées.

## Couverture des workflows intégrés au dossier statique

Le registre officiel v2.2 décrit les demandes de modification, les annulations, les remboursements et les notifications dans l’application. Les vues existantes portent ce parcours sans nouvel écran : les listes de commandes 15, 32 et 46 montrent les états de commande ; le détail client 16 montre le choix total ou partiel, enregistré dans la demande ; le détail commerçant 33 montre l’arrêt confirmé si la préparation a commencé et la reprise du reste après finalisation partielle ; le détail administration 47 illustre la vérification par l’administrateur, le motif obligatoire en cas de rejet, le renvoi d’une preuve corrigée et sa nouvelle vérification. Chaque dépôt et décision demeure dans un historique append-only sans limite arbitraire ni expiration automatique.

Pour une ligne (un produit avec ses options), le prix net historique unitaire inclut les suppléments, ajustements propres à la ligne et part des remises ou autres ajustements globaux non-frais attribuée au snapshot ; annuler `n` unités rembourse ce prix unitaire multiplié par `n`. Les ajustements globaux sont répartis au prorata, avec répartition déterministe des fractions au plus petit centime/unité monétaire, et les frais communs restent non remboursés en partiel. L’annulation totale rembourse le montant effectivement payé. Un rejet motivé laisse l’annulation en attente ; le commerçant peut renvoyer toute preuve corrigée nécessaire, l’historique append-only est conservé et seul l’administrateur vérifie. Une preuve déposée ou rejetée ne finalise pas l’annulation.

Chaque transition réelle des états déjà prévus de commande, paiement, modification, annulation, remboursement et réservation qui affecte la commande déclenche une notification dans l’application aux deux parties ; l’arrêt et la reprise confirmés de la préparation aussi. Le message porte le statut atteint, son libellé, le montant concerné et l’action propre au destinataire. Aucun SMS/e-mail en v1, aucune notification pour brouillon ou modification sans transition, aucun nouveau statut.

Les 53 écrans et les états communs sont conservés. Ce travail actualise uniquement les sources et rendus de conception ; il n’ajoute ni backend, ni API, ni migration, ni paiement, remboursement ou notification réel.

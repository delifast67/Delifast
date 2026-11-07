# Référence fonctionnelle — Paiements par preuve (Mobile Money)

**Version :** Spécification fonctionnelle intégrée le 7 novembre 2026.
**Portée :** conception fonctionnelle et statique. Ce document ne constitue pas une implémentation.

Cette référence complète le [registre officiel des règles métier](REGLES_METIER.md) et le [cahier des 53 écrans](CAHIER_DES_CHARGES.md). Elle ne change ni l’inventaire des 53 écrans ni les règles déjà validées qui ne sont pas contredites ici. Les deux circuits financiers ci-dessous restent distincts, même lorsque des éléments d’interface communs sont réutilisés.

Les maquettes et la page de démonstration client rendent les choix d’opérateur/forfait et les boutons de format USSD cliquables : une sélection met à jour l’aperçu du code fictif calculé et explique l’étape attendue. Aucun lien `tel:`, composeur, paiement, preuve réelle ou téléversement n’est activé par la démo.

Aucune API, base de données, migration, authentification, capture réelle, téléversement, notification opérationnelle, ouverture de composeur ou transaction n’est activée par cette révision documentaire. Le vrai composeur sera branché pendant le développement, puis testé avant production.

## 1. Principe du module

Delifast décrit un paiement Mobile Money manuel par USSD. Delifast prépare le code à partir des informations configurées; le payeur ouvre le composeur sur son propre téléphone, effectue et confirme lui-même la transaction, revient dans Delifast, puis transmet la référence et la capture du SMS de confirmation. Le bénéficiaire compare la preuve au SMS de transaction réellement reçu avant de décider.

L’ordre est obligatoire :

1. Générer le code correspondant au bénéficiaire et au montant exacts.
2. Laisser le payeur effectuer et confirmer lui-même le paiement sur son téléphone.
3. Revenir dans Delifast.
4. Transmettre la capture et la référence de transaction.
5. Acheminer la preuve au bénéficiaire.
6. Vérifier la transaction par comparaison avec le SMS reçu.
7. Enregistrer une validation ou un refus motivé.

Une capture ne confirme jamais automatiquement un paiement et ne déclenche pas l’activation d’un abonnement.

## 2. Circuits financiers

| Règle | Abonnement restaurant | Commande client |
|---|---|---|
| Payeur | Restaurant | Client |
| Bénéficiaire | Delifast | Restaurant choisi pour la commande |
| Numéro inséré au code | Numéro Delifast configuré pour l’opérateur | Numéro configuré du restaurant bénéficiaire |
| Montant inséré au code | Prix du forfait sélectionné, issu de la configuration | Total exact de commande calculé et enregistré côté serveur |
| Destinataire de la preuve | Administration Delifast | Restaurant bénéficiaire |
| Décideur | Administrateur | Restaurant bénéficiaire |
| Destinataire de la décision | Restaurant payeur | Client payeur |

Un numéro Delifast ne remplace jamais le numéro du restaurant dans le circuit d’une commande. Le restaurant ne peut pas valider son abonnement; le client ne peut pas valider son paiement de commande. L’administrateur supervise les paiements de commande, mais ne valide ni ne refuse à la place du restaurant.

### Circuit A — Abonnement du restaurant

Le restaurant consulte les forfaits **Découverte** à **3 000 F CFA par mois** et **Professionnel** à **4 500 F CFA par mois**. Chaque forfait présente son nom, son prix, sa durée, ses fonctionnalités, ses avantages et sa disponibilité; le prix est calculé à partir du forfait et n’est pas modifiable par le restaurant. Delifast insère automatiquement son propre numéro bénéficiaire et le prix du forfait choisi. Le payeur choisit un opérateur disponible, effectue et confirme la transaction sur son téléphone, revient, puis soumet la capture du SMS et la référence.

La preuve va à l’administration, qui peut examiner le commerçant, le restaurant, le forfait, le montant attendu, l’opérateur, le numéro bénéficiaire Delifast, la référence de transaction, la capture, la date d’envoi et l’historique des soumissions. L’administrateur compare ces informations au SMS réellement reçu sur le numéro Mobile Money de Delifast.

Après validation, le paiement passe à **Validé**, l’abonnement est activé et les dates de début et d’expiration sont enregistrées; le restaurant est notifié. Avant cette décision, l’abonnement reste inactif. Après refus, le paiement passe à **Refusé**, le motif saisi par l’administrateur est obligatoire, le restaurant est notifié avec ce motif et peut effectuer une nouvelle transaction puis soumettre une nouvelle preuve.

#### Tarifs, mois gratuit, renouvellement et suspension

Chaque nouveau compte marchand bénéficie d’un premier mois gratuit, une seule fois par compte marchand. À la fin de ce mois, le renouvellement est payant selon le forfait choisi : **3 000 F CFA par mois** pour Découverte ou **4 500 F CFA par mois** pour Professionnel. Aucun critère d’éligibilité supplémentaire n’est défini ici.

À l’expiration d’un abonnement payant, un délai de grâce de **72 heures calendaires** commence. Pendant ces 72 heures, le compte marchand reste opérationnel pour recevoir et traiter les commandes, et le système envoie des rappels de renouvellement. Sans renouvellement validé par l’administration à la fin du délai, le compte est automatiquement suspendu pour défaut d’abonnement; la suspension bloque les fonctions commerciales, notamment la réception et le traitement des commandes et la gestion du catalogue.

Le commerçant suspendu conserve un accès restreint à la consultation de son abonnement, au paiement, au dépôt d’une preuve et au suivi de vérification. Le dépôt d’une preuve n’active ni ne réactive le compte : seule la validation effective du paiement par l’administration le fait. Une suspension administrative indépendante n’est pas levée par la validation de l’abonnement. Le calcul de la période gratuite, des expirations et des 72 heures, ainsi que l’application des restrictions, relèvent du serveur.

### Circuit B — Commande du client

Delifast calcule et enregistre le total de commande à partir des produits, quantités, suppléments, frais de livraison applicables et autres frais prévus par les règles métier. Le montant affiché et inséré au code est exactement celui enregistré pour la commande; le client ne saisit ni montant ni numéro bénéficiaire.

Le restaurant peut proposer Orange Money, Telmob ou les deux. Un opérateur n’est affiché que s’il est activé et si son numéro bénéficiaire est renseigné. Le numéro et le montant exact sont insérés automatiquement dans le code propre à l’opérateur choisi. Après paiement sur son téléphone, le client transmet la capture du SMS et la référence au restaurant bénéficiaire.

Le restaurant peut consulter la référence de commande, le nom du client, le montant attendu, l’opérateur, le numéro bénéficiaire, la référence de transaction, la capture et la date de soumission. Il compare ces éléments avec le SMS réellement reçu sur son numéro Mobile Money. Il valide ou refuse manuellement; tout refus exige un motif. Le client reçoit la décision et, en cas de refus, le motif; il peut effectuer une nouvelle transaction et soumettre une nouvelle preuve depuis l’écran 18.

## 3. Opérateurs, numéros et codes USSD

Les seuls opérateurs concernés par cette spécification sont **Orange Money** et **Telmob**. Les syntaxes sont configurées séparément et ne sont proposées que lorsqu’un opérateur est actif et que le numéro bénéficiaire correspondant est configuré. Pour l’abonnement, il s’agit des numéros Delifast; pour la commande, de ceux du restaurant choisi.

Formats de référence — les noms entre accolades sont des emplacements, jamais des valeurs à composer :

- Orange Money : `*144*2*1*{NUMERO_BENEFICIAIRE}*{MONTANT}#`
- Orange Money (variante configurée) : `*144*10*{NUMERO_BENEFICIAIRE}*{MONTANT}#`
- Telmob : `*555*2*1*{NUMERO_BENEFICIAIRE}*{MONTANT}#`

Avant génération, les espaces, tirets et caractères inutiles sont retirés du numéro. Le numéro inséré dépend du circuit; le montant provient du forfait configuré ou du total de commande enregistré, et non d’une saisie directe du client. Les maquettes affichent un bénéficiaire fictif et le montant d’exemple correspondant afin de montrer le code dynamique; elles ne contiennent aucun numéro réel.

Lors du développement seulement, le bouton ouvrira le composeur avec un lien `tel:` contenant le code complet. Le caractère final `#` doit être encodé en `%23` pour ne pas être interprété comme un fragment d’URL (forme illustrative non active : `tel:*144*2*1*NUMERO_FICTIF_RESTAURANT*9500%23`). Les numéros d’abonnement Delifast seront lus côté serveur depuis `DELIFAST_ORANGE_MONEY_RECIPIENT_NUMBER` ou `DELIFAST_TELMOB_RECIPIENT_NUMBER`; pour une commande, le bénéficiaire proviendra de la configuration validée du restaurant et le total sera recalculé côté serveur. Aucune de ces valeurs ne doit être inscrite dans le code ou exposée au navigateur.

Tester séparément les trois formats (les deux variantes Orange Money et Telmob) sur les appareils Android concernés, avec les opérateurs correspondants, avant toute mise en production.

Les exemples de numéros, montants, références et codes présentés dans les supports de conception sont explicitement fictifs et non appelables. Cette révision ne crée aucun lien `tel:` actif et n’ouvre aucun composeur.

### Configuration des destinataires d’abonnement

Dans une future implémentation, les destinataires Orange Money et Telmob réservés aux abonnements Delifast seront lus uniquement côté serveur depuis `DELIFAST_ORANGE_MONEY_RECIPIENT_NUMBER` et `DELIFAST_TELMOB_RECIPIENT_NUMBER`. Ces valeurs ne doivent jamais être préfixées par `NEXT_PUBLIC_`, incluses dans un bundle navigateur, inscrites dans le code ou commitées dans `.env`. Le dépôt fournit uniquement des libellés fictifs dans `.env.example`; `.gitignore` exclut `.env` et ses variantes tout en autorisant ce modèle. Les vraies valeurs ne seront renseignées que dans l’environnement serveur sécurisé de production. Cette mise à jour ne crée ni ne configure ces valeurs de production.

## 4. Statuts et cohérence commande/paiement

Les statuts métier communs sont `pending`, `validated` et `rejected`, affichés comme suit :

| Statut métier | Libellé |
|---|---|
| `pending` | En attente — preuve transmise, vérification du bénéficiaire nécessaire |
| `validated` | Validé — transaction confirmée par le bénéficiaire |
| `rejected` | Refusé — transaction non confirmée ou preuve non conforme; motif obligatoire |

**Non soumis** est uniquement un état de présentation lorsque le payeur n’a pas encore transmis de preuve; ce n’est pas un statut métier supplémentaire. Après un refus, le payeur peut refaire une transaction et transmettre une nouvelle preuve. Les tentatives précédentes restent consultables.

Le statut de paiement et le statut de commande sont indépendants. Une preuve envoyée ne signifie pas que la commande est payée. Un paiement refusé n’annule pas automatiquement la commande; son traitement suit exclusivement les règles du module Commandes.

## 5. Écrans client — 13 à 18

- **13 — Confirmation de commande :** référence, restaurant, produits et quantités, total, mode de réception, adresse de retrait ou livraison, coordonnées du client. L’action « Procéder au paiement » mène à l’écran 14. Le total affiché est celui calculé et enregistré côté serveur.
- **14 — Paiement de commande :** restaurant bénéficiaire, référence de commande et total exact enregistré côté serveur. Le prototype permet de choisir un opérateur illustratif, montre les deux boutons Orange Money (formats `*144*2*1` et `*144*10`) ou le bouton Telmob (`*555*2*1`) et affiche le code correspondant, le bénéficiaire fictif et le montant d’exemple. Les choix et boutons mettent à jour l’aperçu du code et rappellent l’étape attendue; ils n’ouvrent pas de composeur et ne créent pas de paiement. En développement, ne proposer que les opérateurs actifs avec numéro de restaurant configuré; le vrai bouton ouvrira le composeur avec le code prérempli.
- **14 — Preuve :** après avoir effectué et confirmé le paiement sur le téléphone, le client revient dans Delifast, fournit la référence obligatoire et transmet la capture du SMS, puis attend la vérification humaine du restaurant bénéficiaire. Le prototype montre ce retour, mais garde la sélection, le téléversement et l’envoi inactifs. Prévoir les états **Non soumis**, **En attente**, **Validé**, **Refusé** (avec motif et nouvelle soumission possible), chargement, erreur de génération, erreur de téléversement, erreur de soumission, aucun opérateur disponible et paiement expiré uniquement selon les règles qui seraient définies. Aucun délai d’expiration n’est fixé ici.
- **15 — Liste des commandes :** pour chaque commande, référence, restaurant, date, montant, mode de réception, statut de commande et statut de paiement distinct.
- **16 — Détail d’une commande :** conserver le montant, le bénéficiaire, l’opérateur, le statut de paiement et la référence de paiement; l’action « Consulter le paiement » mène à l’écran 18.
- **17 — Liste des paiements :** paiements associés aux commandes du client; référence du paiement, référence de commande, restaurant bénéficiaire, opérateur, montant, date et statut. Filtres **En attente**, **Validés**, **Refusés**; accès au paiement 18 et à la commande associée. Prévoir liste vide, chargement et erreur.
- **18 — Détail d’un paiement :** référence de commande, bénéficiaire, opérateur, numéro destinataire, montant, référence de transaction, date d’envoi, capture, statut et motif de refus éventuel. Permettre de voir la preuve en grand, retourner à la commande et déposer une nouvelle preuve après refus. Une nouvelle tentative n’efface jamais la preuve refusée précédente. États : En attente, Validé, Refusé et nouvelle preuve requise.

## 6. Écrans commerçant — 22, 26, 34 à 37

- **22 — Configuration des paiements à l’inscription** et **26 — Gestion des moyens de paiement :** configurer séparément l’activation et le numéro Orange Money et Telmob. Seuls les opérateurs actifs avec numéro renseigné sont proposés au client. La configuration illustrée est fictive et n’enregistre rien.
- **34 — Liste des paiements :** paiements de commande destinés au restaurant; référence du paiement et de commande, client, opérateur, montant, date et statut. Filtres En attente, Validés, Refusés; signalement visible des nouvelles preuves; actions d’examen, filtrage et actualisation. États vide, preuves à vérifier, paiements validés et erreur. Les preuves d’abonnement destinées à Delifast ne sont pas exposées au restaurant.
- **35 — Détail et vérification d’un paiement :** commande, client, montant attendu, opérateur, numéro bénéficiaire, référence de transaction, capture du SMS, date de soumission et historique. Le restaurant bénéficiaire compare la capture au SMS reçu sur son propre numéro; il peut valider ou refuser. Un motif est obligatoire au refus, le client est notifié et peut soumettre une nouvelle preuve. Le restaurant ne décide que pour ses propres paiements de commande.
- **36 — Gestion de l’abonnement :** présenter les forfaits Découverte et Professionnel, avec nom, prix, durée, fonctions, avantages et disponibilité issus de la configuration. La sélection mène à l’écran 37; aucun prix, avantage ou statut réel n’est inventé par la maquette.
- **37 — Paiement de l’abonnement :** afficher le forfait sélectionné, choisir un opérateur actif ayant un numéro Delifast configuré et voir le code dynamique avec bénéficiaire et montant correspondants. Le prototype rend les choix et boutons cliquables, montre les deux variantes Orange Money ou le format Telmob et met à jour le code fictif sans ouvrir le composeur. En développement, le bouton ouvrira le composeur prérempli avec le numéro d’abonnement sécurisé côté serveur. Après avoir effectué et confirmé le paiement sur son téléphone, le restaurant revient dans Delifast, transmet la référence et la capture du SMS à l’administration, puis attend sa vérification humaine. Le prototype garde les champs et l’envoi de preuve inactifs; le restaurant ne valide pas son abonnement.

## 7. Écrans administration — 48 à 51

- **48 — Gestion des abonnements :** restaurant, commerçant, formule, montant, dates de début et d’expiration, statut et paiement associé. Filtres Découverte, Professionnel, En attente, Actif, Expiré et Refusé; examen vers 49, filtrage, recherche et consultation du commerçant.
- **49 — Vérification d’un abonnement :** commerçant, restaurant, formule, montant attendu, opérateur, numéro bénéficiaire Delifast, référence de transaction, capture, date d’envoi et historique complet. L’administrateur compare la preuve au SMS réellement reçu sur le numéro Delifast. Il peut agrandir la capture, consulter l’historique, valider ou refuser avec motif obligatoire. Seul l’administrateur décide; activation et dates ne sont enregistrées qu’après validation. États : en attente de vérification, Validé, Refusé avec motif et nouvelle preuve soumise.
- **50 — Liste des paiements :** référence, bénéficiaire, restaurant ou commerçant, type (commande ou abonnement), opérateur, montant, date et statut. Filtres par type, Orange Money, Telmob et En attente, Validés, Refusés; recherche, filtrage et détail vers 51. Prévoir liste vide, liste disponible, chargement et erreur.
- **51 — Détail d’un paiement :** référence de transaction, type, bénéficiaire, montant, opérateur, numéro destinataire, commerçant concerné, commande ou abonnement associé, capture, statut et historique de validation ou refus. Actions de consultation : agrandir la capture, ouvrir la commande ou l’abonnement associé, voir le commerçant, revenir à la liste. États : En attente, Validé, Refusé et Justificatif manquant. Pour une commande, l’administration est en supervision seulement et ne dispose pas d’une action de décision; elle peut décider uniquement sur les abonnements destinés à Delifast.

## 8. Historique des preuves, accès et notifications

Chaque preuve est une soumission distincte et append-only. Conserver au minimum : identifiant du paiement, chemin du fichier, référence de transaction, date de soumission, date de vérification, identifiant du vérificateur, motif du refus s’il y en a un et numéro de soumission. L’historique permet de consulter toutes les tentatives d’un paiement; une nouvelle preuve n’écrase jamais une précédente, y compris refusée. Chaque décision reste également historisée.

Les permissions suivent les rôles et le bénéficiaire : le client consulte uniquement ses preuves; le restaurant consulte les preuves des paiements de commande qui lui sont destinés; l’administrateur consulte les preuves d’abonnement destinées à Delifast et supervise les paiements de commande sans décider à la place du restaurant. Les captures sont privées.

Notifications prévues par circuit :

| Événement | Abonnement | Commande |
|---|---|---|
| Preuve soumise ou nouvelle preuve soumise | Administration Delifast | Restaurant bénéficiaire |
| Paiement validé | Restaurant | Client |
| Paiement refusé | Restaurant, avec motif | Client, avec motif |

Chaque notification porte une référence permettant d’ouvrir directement le paiement concerné, le statut atteint, le montant concerné et l’action propre au destinataire. Ces notifications sont des exigences de conception seulement ici; aucun envoi opérationnel n’est activé.

## 9. Référence d’architecture future — non implémentée

La structure de référence conserve le cahier existant : composants communs de paiement dans `src/components/paiements/` (sélecteur de moyen, instructions, bouton USSD, saisie de référence, téléversement de preuve, statut, détail, historique et dialogue de décision); fonctionnalités sous `features/paiements/` et `features/abonnements/`; espaces client, commerçant et administration sous `src/app/`.

Routes fonctionnelles proposées : `POST /api/payments`, `GET /api/payments/[id]`, `POST /api/payments/[id]/proof`, `POST /api/payments/[id]/review` et `GET /api/payments/[id]/history`. Tables proposées : `payments` (notamment order_id, subscription_id, payeur, type et identifiant du bénéficiaire, opérateur, numéro destinataire historique, montant, devise, référence, statut, dates) et `payment_proofs` (champs d’historique ci-dessus). Les relations distinguent commande et abonnement. Ces noms et routes décrivent la cible, pas un backend livré; aucun ORM n’est imposé ici.

## 10. Contrôles obligatoires avant toute implémentation

Contrôler côté serveur l’identité, le rôle, le bénéficiaire, le montant attendu, l’opérateur, la référence et le droit de décision; conserver le numéro destinataire historique; vérifier format et taille des captures; limiter les soumissions; prévenir les doublons et empêcher qu’une même preuve valide plusieurs paiements; exiger le motif du refus; historiser les décisions; protéger contre des décisions simultanées contradictoires par validation atomique; gérer l’expiration d’une demande seulement selon une règle définie; et garder les preuves dans un stockage privé accessible selon les rôles.

Prisma ne doit jamais être appelé directement depuis un composant client. Les captures seraient stockées dans Supabase Storage privé et consultées de façon sécurisée. Ces contrôles sont documentés pour la conception future et ne sont pas branchés par cette mise à jour.

Avant production, vérifier que les liens `tel:` encodent `#` en `%23`, que le composeur Android présente le code complet prérempli sans marquer le paiement comme effectué, et que les trois formats fonctionnent sur les appareils concernés avec Orange Money et Telmob. Toute transaction doit être initiée et confirmée manuellement par le payeur; seule la vérification humaine de la preuve peut valider le paiement.

## 11. Limites de la conception statique

Tous les montants, références, numéros et codes d’exemple montrés dans les écrans sont manifestement fictifs. Les sélecteurs et boutons USSD sont interactifs uniquement pour actualiser le code fictif selon l’opérateur, le bénéficiaire d’exemple et le montant; le clic ne prouve ni ne déclenche un paiement. Aucun lien `tel:` actif, composeur, capture, téléversement réel, confirmation, décision, activation d’abonnement, notification, API, authentification ou stockage n’est connecté. Les champs de preuve restent désactivés dans la démo. La commande et son paiement gardent des états distincts; le parcours d’acceptation, préparation et annulation reste celui du module Commandes.

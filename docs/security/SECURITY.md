# Sécurité — principes de fondation

Aucun fournisseur Auth, compte, base de données ou stockage n’est configuré dans la phase 1.

- Les clients et commerçants utiliseront Google OAuth avec PKCE uniquement.
- Le compte administrateur unique sera provisionné côté serveur ; aucune route de création admin publique ne sera exposée.
- Les secrets restent côté serveur et ne sont jamais préfixés `NEXT_PUBLIC_`.
- `.env.local` est ignoré par Git ; seul `.env.example`, sans valeur secrète, est versionné.
- La base Supabase future appliquera des politiques RLS et des autorisations serveur explicites.
- Les captures de paiement seront stockées dans un bucket privé ; le contrôle humain reste obligatoire.
- Avant le lancement, vérifier les limites des offres gratuites, l’isolation des données, les sauvegardes/restaurations et la supervision.

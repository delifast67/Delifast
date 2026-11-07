import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  CreditCard,
  LayoutDashboard,
  LockKeyhole,
  Store,
} from "lucide-react";
import { HomeBrand } from "../../components/public-home/site-header";
import dashboard from "../client/client-dashboard.module.css";
import styles from "./merchant-dashboard.module.css";

export const metadata: Metadata = {
  title: "Tableau de bord commerçant (démo) | Delifast",
  description:
    "Aperçu fictif du tableau de bord commerçant et des règles d’abonnement. Aucune donnée n’est transmise ou enregistrée.",
};

export default function MerchantDashboardPage() {
  return (
    <div className={dashboard.shell}>
      <aside className={dashboard.sidebar} aria-label="Espace commerçant de démonstration">
        <HomeBrand href="/" />
        <p className={dashboard.spaceLabel}>Espace commerçant</p>
        <nav className={dashboard.navigation} aria-label="Navigation commerçant">
          <Link
            aria-current="page"
            className={dashboard.activeNavItem}
            href="/commercant"
          >
            <LayoutDashboard aria-hidden="true" size={15} />
            <span>Tableau de bord</span>
          </Link>
          <Link
            className={dashboard.navItem}
            href="/commercant/inscription/paiements"
          >
            <CreditCard aria-hidden="true" size={15} />
            <span>Configuration démo</span>
          </Link>
          <span className={styles.futureNavItem} aria-disabled="true">
            <Store aria-hidden="true" size={15} />
            <span>Gestion de l’abonnement</span>
            <small>Écran non inclus</small>
          </span>
        </nav>
        <div className={dashboard.sidebarNote}>
          <span aria-hidden="true">●</span> Mode démonstration
          <small>Aucune donnée réelle</small>
        </div>
      </aside>

      <div className={dashboard.mainColumn}>
        <header className={dashboard.topbar}>
          <nav className={dashboard.breadcrumbs} aria-label="Fil d’Ariane">
            <Link href="/">Delifast</Link>
            <span aria-hidden="true">/</span>
            <span>Commerçant</span>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Tableau de bord</span>
          </nav>
          <div className={dashboard.topbarActions}>
            <div
              aria-label="Recherche désactivée dans cette maquette"
              className={dashboard.searchMock}
            >
              <span aria-hidden="true">⌕</span>
              <span>Rechercher</span>
            </div>
            <span className={dashboard.avatar} aria-label="Profil fictif Saveurs Démo">
              SD
            </span>
          </div>
        </header>

        <main className={dashboard.content} id="contenu-principal">
          <div className={dashboard.pageHeading}>
            <p className={dashboard.eyebrow}>Commerçant · Démonstration</p>
            <h1>Tableau de bord commerçant</h1>
            <p className={dashboard.intro}>
              Aperçu fictif des règles de période gratuite, de grâce et de suspension.
            </p>
          </div>

          <div className={styles.demoBanner} role="note">
            <span className={styles.bannerIcon} aria-hidden="true">
              <Clock3 size={17} />
            </span>
            <p>
              <strong>Règle illustrée · délai de grâce de 72 heures</strong>
              <span>
                Un nouveau compte bénéficie d’un premier mois gratuit, une seule fois.
                Après l’expiration d’un abonnement payant, le compte reste opérationnel
                pendant 72 heures; sans renouvellement validé, il est suspendu.
              </span>
            </p>
            <span className={styles.demoPill}>Données fictives</span>
          </div>

          <section className={styles.subscriptionCard} aria-labelledby="subscription-state-title">
            <div className={styles.cardHeading}>
              <span className={styles.alertIcon} aria-hidden="true">
                <LockKeyhole size={18} />
              </span>
              <div>
                <p className={styles.kicker}>Scénario fictif · accès commerçant limité</p>
                <h2 id="subscription-state-title">
                  Exemple de compte temporairement désactivé
                </h2>
                <p className={styles.reason}>
                  Motif illustratif : abonnement d’exemple arrivé à expiration.
                </p>
              </div>
              <span className={styles.stateTag}>Exemple d’état</span>
            </div>

            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span>Forfait concerné</span>
                <strong>Professionnel · fictif</strong>
              </div>
              <div className={styles.detailItem}>
                <span>Date d’expiration</span>
                <strong>05 novembre 2026 · fictive</strong>
              </div>
              <div className={styles.detailItem}>
                <span>Paiement / renouvellement</span>
                <strong>En attente de vérification · fictif</strong>
              </div>
            </div>

            <p className={styles.pendingNotice}>
              <span aria-hidden="true">i</span>
              Votre paiement est en cours de vérification. Votre compte sera réactivé après validation.
              <small>
                Démonstration uniquement : aucune preuve ni vérification n’existe ici.
                En cas de suspension pour non-paiement, seule l’administration peut approuver la réactivation.
              </small>
            </p>

            <div className={styles.cardActions}>
              <Link className={styles.primaryAction} href="/commercant/inscription/paiements">
                Revoir la configuration fictive <ArrowRight aria-hidden="true" size={15} />
              </Link>
              <span className={styles.upcomingAction}>
                Gestion et historique de l’abonnement · écran non inclus
              </span>
            </div>
          </section>

          <section className={styles.featuresCard} aria-labelledby="features-title">
            <div className={styles.featuresHeading}>
              <div>
                <h2 id="features-title">Fonctionnalités commerciales</h2>
                <p className={styles.featuresStatus}>
                  Dans cet exemple de suspension, la réception et le traitement des commandes,
                  ainsi que la gestion du catalogue, sont bloqués.
                </p>
              </div>
              <span className={styles.suspendedPill}>
                <span aria-hidden="true" /> Accès suspendu · exemple
              </span>
            </div>
            <div className={styles.featureFooter}>
              <p>
                Le parcours d’abonnement reste consultable dans les écrans 36 et 37 du cahier,
                non implémentés dans ce lot.
              </p>
              <Link className={styles.textLink} href="/commercant/inscription/paiements">
                Revenir à l’écran 22 <ArrowRight aria-hidden="true" size={14} />
              </Link>
              <Link className={styles.textLink} href="/commercant/boutique">
                Prévisualiser l’écran 24 · Gestion de la boutique <ArrowRight aria-hidden="true" size={14} />
              </Link>
            </div>
          </section>

          <p className={styles.disclaimer}>
            Maquette locale uniquement : les données sont fictives et aucune action n’est
            envoyée, enregistrée ou exécutée.
          </p>
        </main>
      </div>
    </div>
  );
}

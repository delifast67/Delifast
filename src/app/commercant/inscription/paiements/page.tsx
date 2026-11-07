import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../../components/public-home/site-header";
import dashboard from "../../../client/client-dashboard.module.css";
import styles from "../registration.module.css";
import pageStyles from "./payment-setup.module.css";
import { MerchantPaymentSetupForm } from "./payment-setup-form";

export const metadata: Metadata = {
  title: "Configuration des paiements à l’inscription (démo) | Delifast",
  description:
    "Maquette locale pour configurer séparément Orange Money et Telmob, sans transmission ni enregistrement.",
};

export default function MerchantPaymentSetupPage() {
  return (
    <div className={dashboard.shell}>
      <aside className={dashboard.sidebar} aria-label="Espace commerçant de démonstration">
        <HomeBrand href="/" />
        <p className={dashboard.spaceLabel}>Espace commerçant</p>
        <nav className={dashboard.navigation} aria-label="Parcours commerçant">
          <Link
            aria-current="page"
            className={dashboard.activeNavItem}
            href="/commercant/inscription"
          >
            <span aria-hidden="true">▧</span>
            <span>Inscription</span>
          </Link>
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
            <Link href="/commercant/inscription">Inscription</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Paiements</span>
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
            <h1>Configuration des paiements à l’inscription</h1>
            <p className={dashboard.intro}>
              Activez séparément Orange Money et Telmob et indiquez un numéro bénéficiaire fictif.
            </p>
          </div>

          <nav className={styles.steps} aria-label="Étapes de la maquette d’inscription">
            <Link className={styles.futureStep} href="/commercant/inscription">
              <span>1</span> Votre activité
            </Link>
            <Link
              className={styles.futureStep}
              href="/commercant/inscription/localisation"
            >
              <span>2</span> Localisation
            </Link>
            <span aria-current="step" className={styles.currentStep}>
              <span>3</span> Paiements
            </span>
          </nav>

          <div className={pageStyles.notice} role="note">
            <span className={pageStyles.noticeIcon} aria-hidden="true">i</span>
            <div>
              <strong>Configuration illustrative uniquement</strong>
              <p>Aucun numéro réel ne doit être saisi. Rien n’est transmis ou enregistré.</p>
            </div>
            <span className={pageStyles.demoBadge}>Démo locale</span>
          </div>

          <div className={pageStyles.contentGrid}>
            <section className={pageStyles.formPanel} aria-labelledby="payment-methods-title">
              <div className={pageStyles.panelHeading}>
                <div>
                  <p className={pageStyles.kicker}>Moyens de paiement</p>
                  <h2 id="payment-methods-title">Opérateurs configurés séparément</h2>
                  <p>Choisissez librement un opérateur, les deux ou aucun.</p>
                </div>
                <span className={pageStyles.operatorNames}>Orange Money · Telmob</span>
              </div>
              <MerchantPaymentSetupForm />
            </section>

            <aside className={pageStyles.infoPanel} aria-labelledby="payment-flow-title">
              <div className={pageStyles.infoIcon} aria-hidden="true">◈</div>
              <p className={pageStyles.kicker}>À comprendre</p>
              <h2 id="payment-flow-title">Qui reçoit le paiement&nbsp;?</h2>
              <div className={pageStyles.flowItem}>
                <span className={pageStyles.flowDot} aria-hidden="true">01</span>
                <p>
                  <strong>Commande</strong>
                  Le client règle le restaurant avec un opérateur activé et son numéro bénéficiaire.
                </p>
              </div>
              <div className={pageStyles.flowItem}>
                <span className={pageStyles.flowDot} aria-hidden="true">02</span>
                <p>
                  <strong>Abonnement</strong>
                  Le paiement de l’abonnement suit un circuit distinct, avec un bénéficiaire Delifast.
                </p>
              </div>
              <div className={pageStyles.infoFoot}>
                <span aria-hidden="true">✓</span>
                Seul un opérateur activé avec un numéro renseigné peut être proposé au client.
              </div>
            </aside>
          </div>

          <p className={pageStyles.footerNote}>
            Les valeurs saisies restent dans cette page et disparaissent en la quittant.
          </p>
          <div className={styles.nextStep}>
            <span className={styles.nextStepLabel}>Écran suivant · 23</span>
            <Link className={styles.nextStepLink} href="/commercant">
              Tableau de bord commerçant <span aria-hidden="true">→</span>
            </Link>
            <small>Cette navigation n’enregistre aucun moyen de paiement.</small>
          </div>
          <Link className={styles.backLink} href="/commercant/inscription/localisation">
            <span aria-hidden="true">←</span> Retour à la localisation
          </Link>
        </main>
      </div>
    </div>
  );
}

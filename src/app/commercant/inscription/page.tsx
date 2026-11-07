import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../../client/client-dashboard.module.css";
import styles from "./registration.module.css";
import { MerchantRegistrationForm } from "./registration-form";

export const metadata: Metadata = {
  title: "Inscription du commerçant (démo) | Delifast",
  description:
    "Maquette de démonstration de l’inscription commerçant. Les informations ne sont ni envoyées ni enregistrées.",
};

export default function MerchantRegistrationPage() {
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
            <span aria-current="page">Inscription</span>
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
            <h1>Inscription du commerçant</h1>
            <p className={dashboard.intro}>
              Présentez votre activité pour préparer votre espace commerçant.
            </p>
          </div>

          <nav className={styles.steps} aria-label="Étapes de la maquette d’inscription">
            <span aria-current="step" className={styles.currentStep}>
              <span>1</span> Votre activité
            </span>
            <span className={styles.futureStep}>
              <span>2</span> Localisation
            </span>
            <span className={styles.futureStep}>
              <span>3</span> Paiements
            </span>
          </nav>

          <div className={styles.registrationGrid}>
            <section className={styles.formPanel} aria-labelledby="merchant-form-title">
              <div className={styles.panelHeading}>
                <div>
                  <h2 id="merchant-form-title">Votre commerce</h2>
                  <p>Les champs ci-dessous sont présentés à titre de démonstration.</p>
                </div>
                <span className={styles.panelBadge}>Étape 1 / 3</span>
              </div>
              <MerchantRegistrationForm />
            </section>

            <aside className={styles.infoPanel} aria-labelledby="profile-tip-title">
              <span className={styles.infoIcon} aria-hidden="true">✦</span>
              <h2 id="profile-tip-title">Un profil clair aide vos clients</h2>
              <p>
                Présentez votre activité en quelques mots. Les informations saisies
                restent dans cette page et disparaissent quand vous la quittez.
              </p>
              <div className={styles.nextStep}>
                <span className={styles.nextStepLabel}>Prochaine étape du cahier</span>
                <strong>Localisation du restaurant</strong>
                <small>Écran 21 · non implémenté dans cette étape</small>
              </div>
            </aside>
          </div>

          <Link className={styles.backLink} href="/choix-type-compte">
            <span aria-hidden="true">←</span> Retour au choix du type de compte
          </Link>
        </main>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../../components/public-home/site-header";
import dashboard from "../../../client/client-dashboard.module.css";
import styles from "../registration.module.css";
import { MerchantLocationForm } from "../location-form";

export const metadata: Metadata = {
  title: "Localisation du restaurant (démo) | Delifast",
  description:
    "Écran de démonstration pour indiquer l’adresse et le lien Google Maps d’un établissement, sans transmission ni enregistrement.",
};

export default function MerchantLocationPage() {
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
            <span aria-current="page">Localisation</span>
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
            <h1>Localisation du restaurant</h1>
            <p className={dashboard.intro}>
              Indiquez l’adresse de votre établissement et, si vous le souhaitez, son lien Google Maps.
            </p>
          </div>

          <nav className={styles.steps} aria-label="Étapes de la maquette d’inscription">
            <Link className={styles.futureStep} href="/commercant/inscription">
              <span>1</span> Votre activité
            </Link>
            <span aria-current="step" className={styles.currentStep}>
              <span>2</span> Localisation
            </span>
            <Link className={styles.futureStep} href="/commercant/inscription/paiements">
              <span>3</span> Paiements
            </Link>
          </nav>

          <div className={styles.registrationGrid}>
            <section className={styles.formPanel} aria-labelledby="merchant-location-title">
              <div className={styles.panelHeading}>
                <div>
                  <h2 id="merchant-location-title">Adresse de votre établissement</h2>
                  <p>Les champs ci-dessous sont présentés à titre de démonstration.</p>
                </div>
                <span className={styles.panelBadge}>Étape 2 / 3</span>
              </div>
              <MerchantLocationForm />
            </section>

            <aside className={styles.infoPanel} aria-labelledby="location-tip-title">
              <span className={styles.infoIcon} aria-hidden="true">⌖</span>
              <h2 id="location-tip-title">Situez votre établissement</h2>
              <p>
                La localisation décrit le lieu de votre commerce, pas la position actuelle du client.
                Vous pouvez saisir une adresse et ajouter un lien de partage Google Maps.
              </p>
              <div className={styles.nextStep}>
                <span className={styles.nextStepLabel}>Mode démonstration</span>
                <strong>Aucune carte interactive</strong>
                <small>Le lien n’est ni ouvert, ni transmis, ni enregistré.</small>
                <Link className={styles.nextStepLink} href="/commercant/inscription/paiements">
                  Configuration des paiements <span aria-hidden="true">→</span>
                </Link>
                <small>Écran 22 · étape 3 sur 3</small>
              </div>
            </aside>
          </div>

          <Link className={styles.backLink} href="/commercant/inscription">
            <span aria-hidden="true">←</span> Retour à votre activité
          </Link>
        </main>
      </div>
    </div>
  );
}

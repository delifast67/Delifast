import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, MapPin, Store } from "lucide-react";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../../client/client-dashboard.module.css";
import { StoreManagementForm } from "./store-management-form";
import styles from "./store-management.module.css";

export const metadata: Metadata = {
  title: "Gestion de la boutique (démo) | Delifast",
  description:
    "Maquette locale fictive de gestion des informations de vitrine d’un commerce Delifast.",
};

export default function StoreManagementPage() {
  return (
    <div className={dashboard.shell}>
      <aside className={dashboard.sidebar} aria-label="Espace commerçant de démonstration">
        <HomeBrand href="/" />
        <p className={dashboard.spaceLabel}>Espace commerçant</p>
        <nav className={dashboard.navigation} aria-label="Navigation commerçant">
          <Link className={dashboard.navItem} href="/commercant">
            <LayoutDashboard aria-hidden="true" size={15} />
            <span>Tableau de bord</span>
          </Link>
          <Link
            aria-current="page"
            className={dashboard.activeNavItem}
            href="/commercant/boutique"
          >
            <Store aria-hidden="true" size={15} />
            <span>Gestion de la boutique</span>
          </Link>
          <Link className={dashboard.navItem} href="/commercant/localisation">
            <MapPin aria-hidden="true" size={15} />
            <span>Gestion de la localisation</span>
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
            <Link href="/commercant">Commerçant</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Gestion de la boutique</span>
          </nav>
          <div className={dashboard.topbarActions}>
            <div
              aria-label="Recherche désactivée dans cette maquette"
              className={dashboard.searchMock}
            >
              <span aria-hidden="true">⌕</span>
              <span>Rechercher</span>
            </div>
            <span className={dashboard.avatar} aria-label="Profil fictif Saveurs du Faso">
              SF
            </span>
          </div>
        </header>

        <main className={dashboard.content} id="contenu-principal">
          <div className={styles.headingRow}>
            <div className={dashboard.pageHeading}>
              <p className={dashboard.eyebrow}>Commerçant · Démonstration</p>
              <h1>Gestion de la boutique</h1>
              <p className={dashboard.intro}>
                Modifiez les informations visibles sur votre vitrine.
              </p>
            </div>
            <button
              className={styles.topSubmit}
              form="store-management-form"
              type="submit"
            >
              Enregistrer les modifications
            </button>
          </div>

          <div className={styles.panelGrid}>
            <section className={styles.formPanel} aria-labelledby="store-form-title">
              <div className={styles.panelHeading}>
                <h2 id="store-form-title">Informations de la vitrine</h2>
                <span>Champs de démonstration</span>
              </div>
              <StoreManagementForm />
            </section>

            <aside className={styles.infoPanel} aria-labelledby="store-info-title">
              <span className={styles.infoIcon} aria-hidden="true">✦</span>
              <h2 id="store-info-title">Un profil clair aide vos clients</h2>
              <p>Ces informations sont présentées comme exemples de conception.</p>
              <div className={styles.infoNote}>
                <strong>Mode démo uniquement</strong>
                <span>
                  Le bouton prépare un aperçu dans cette page. Rien n’est enregistré,
                  transmis ou publié.
                </span>
              </div>
            </aside>
          </div>

          <p className={styles.disclaimer}>
            Les noms et contenus sont fictifs. Cette maquette n’utilise ni service
            externe, ni stockage persistant, ni action commerciale réelle.
          </p>
        </main>
      </div>
    </div>
  );
}

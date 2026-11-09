import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, MapPin, Store } from "lucide-react";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../../client/client-dashboard.module.css";
import { LocationManagementForm } from "./location-management-form";
import styles from "./location-management.module.css";

export const metadata: Metadata = {
  title: "Gestion de la localisation (démo) | Delifast",
  description:
    "Aperçu fictif de l’adresse et du repère d’un établissement. Aucune donnée n’est enregistrée ni transmise.",
};

function OfflineMapPreview() {
  return (
    <div className={styles.mapPreview}>
      <svg
        aria-label="Carte schématique locale avec un repère d’exemple, sans géolocalisation"
        className={styles.mapDrawing}
        role="img"
        viewBox="0 0 760 210"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="760" height="210" fill="#f0eee9" />
        <g fill="none" stroke="#e7e2db" strokeWidth="20" strokeLinecap="round">
          <path d="M-18 25 150 64 285 24 432 64 597 25 782 66" />
          <path d="M-15 190 126 151 289 188 432 145 601 186 779 145" />
          <path d="M60-24 88 42 51 106 95 158 68 232" />
          <path d="M250-20 213 43 260 99 226 160 257 234" />
          <path d="M455-24 419 37 463 96 422 159 454 234" />
          <path d="M660-18 625 46 670 100 632 161 665 233" />
        </g>
        <g fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-30 52 124 87 274 50 414 90 570 50 792 95" />
          <path d="M-24 168 126 128 272 168 424 122 582 166 790 122" />
          <path d="M123-18 151 38 113 91 154 141 127 225" />
          <path d="M337-22 301 39 341 94 307 145 339 231" />
          <path d="M542-20 504 41 547 96 511 147 540 232" />
          <path d="M720-20 687 41 725 96 691 145 720 231" />
        </g>
        <g fill="none" stroke="#f9f8f5" strokeWidth="5" strokeLinecap="round">
          <path d="M19 111 91 98 153 115 209 102 278 118 348 104 408 118 480 103 551 120 624 105 744 125" />
          <path d="M31 30 82 54M186 180 226 164M371 25 406 48M571 174 614 155" />
        </g>
      </svg>
      <span className={styles.mapBadge}>
        <span aria-hidden="true" /> Repère de l’établissement · exemple
      </span>
      <span className={styles.mapMarker} aria-hidden="true">
        <MapPin size={34} strokeWidth={2.5} />
      </span>
    </div>
  );
}

export default function MerchantLocationManagementPage() {
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
          <Link className={dashboard.navItem} href="/commercant/boutique">
            <Store aria-hidden="true" size={15} />
            <span>Gestion de la boutique</span>
          </Link>
          <Link
            aria-current="page"
            className={dashboard.activeNavItem}
            href="/commercant/localisation"
          >
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
            <span aria-current="page">Gestion de la localisation</span>
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
              <h1>Gestion de la localisation</h1>
              <p className={dashboard.intro}>
                Gérez l’adresse et le repère cartographique de votre établissement.
              </p>
            </div>
            <button className={styles.topSubmit} form="location-management-form" type="submit">
              Mettre à jour la localisation
            </button>
          </div>

          <div className={styles.panelGrid}>
            <section className={styles.formPanel} aria-labelledby="location-panel-title">
              <div className={styles.panelHeading}>
                <h2 id="location-panel-title">Adresse de l’établissement</h2>
                <span>Champs de démonstration</span>
              </div>
              <OfflineMapPreview />
              <LocationManagementForm />
            </section>

            <aside className={styles.infoPanel} aria-labelledby="location-info-title">
              <span className={styles.infoIcon} aria-hidden="true">
                <MapPin size={17} />
              </span>
              <h2 id="location-info-title">Localisez votre établissement</h2>
              <p>
                Le repère cartographique correspond au commerce renseigné, pas à la position actuelle du client.
              </p>
              <div className={styles.infoNote}>
                <strong>Carte illustrative uniquement</strong>
                <span>
                  Aucun service de carte, GPS ou accès à votre position n’est utilisé. Le repère est un exemple visuel.
                </span>
              </div>
            </aside>
          </div>

          <p className={styles.disclaimer}>
            <span aria-hidden="true">i</span>
            La localisation correspond au lieu de l’établissement renseigné. Les modifications restent dans cette page et disparaissent en la quittant.
          </p>
        </main>
      </div>
    </div>
  );
}

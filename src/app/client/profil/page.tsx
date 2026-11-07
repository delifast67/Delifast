import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../client-dashboard.module.css";
import styles from "./profile.module.css";
import { ClientProfileForm } from "./profile-form";

export const metadata: Metadata = {
  title: "Profil client (démo) | Delifast",
  description:
    "Profil client de démonstration : informations fictives, modifications locales uniquement.",
};

const clientNavigation = [
  { label: "Client", icon: "⌂", href: "/client" },
  { label: "Panier", icon: "▣", href: "/client/panier" },
  { label: "Commandes", icon: "▤", href: "/client/commandes" },
  { label: "Paiements", icon: "◆", href: "/client/paiements" },
  { label: "Profil client", icon: "♙", href: "/client/profil", active: true },
] as const;

export default function ClientProfilePage() {
  return (
    <div className={dashboard.shell}>
      <aside className={dashboard.sidebar} aria-label="Espace client de démonstration">
        <HomeBrand href="/" />
        <p className={dashboard.spaceLabel}>Espace client</p>
        <nav className={dashboard.navigation} aria-label="Navigation client">
          {clientNavigation.map((item) => {
            const isActive = "active" in item && item.active;
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={isActive ? dashboard.activeNavItem : dashboard.navItem}
                href={item.href}
                key={item.label}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
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
            <Link href="/client">Client</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Profil client</span>
          </nav>
          <div className={dashboard.topbarActions}>
            <div
              className={dashboard.searchMock}
              aria-label="Recherche désactivée dans cette maquette"
            >
              <span aria-hidden="true">⌕</span>
              <span>Rechercher</span>
            </div>
            <span className={dashboard.avatar} aria-label="Profil fictif Aminata Démo">
              AD
            </span>
          </div>
        </header>

        <main className={dashboard.content} id="contenu-principal">
          <div className={dashboard.pageHeading}>
            <p className={dashboard.eyebrow}>Client · Démonstration</p>
            <h1>Profil client</h1>
            <p className={dashboard.intro}>
              Consultez et mettez à jour les informations de votre profil.
            </p>
          </div>

          <div className={styles.profileGrid}>
            <section className={styles.personalPanel} aria-labelledby="personal-title">
              <div className={styles.panelHeading}>
                <h2 id="personal-title">Informations personnelles</h2>
                <span>Compte de démonstration</span>
              </div>
              <ClientProfileForm />
            </section>

            <aside className={styles.accountNote} aria-labelledby="account-title">
              <h2 id="account-title">Votre compte</h2>
              <p>
                Les informations affichées sont fictives. Aucune donnée personnelle
                n’est enregistrée ici.
              </p>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

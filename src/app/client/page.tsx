import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../components/public-home/site-header";
import styles from "./client-dashboard.module.css";

export const metadata: Metadata = {
  title: "Tableau de bord client (démo) | Delifast",
  description:
    "Aperçu fictif des commandes et découvertes du parcours client Delifast.",
};

const summary = [
  { label: "Commandes", value: "04", detail: "au total · démo", icon: "▣" },
  { label: "En cours", value: "01", detail: "commande · démo", icon: "◆" },
  { label: "Paiements", value: "03", detail: "historique · démo", icon: "↗" },
] as const;

const clientNavigation = [
  { label: "Panier", icon: "▣", href: "/client/panier" },
  { label: "Commandes", icon: "▤", href: "/client/commandes" },
  { label: "Paiements", icon: "◆", href: "/client/paiements" },
  { label: "Profil client", icon: "♙", href: "/client/profil" },
] as const;

const shortcuts = ["Mes commandes", "Mes paiements", "Mon profil"] as const;

export default function ClientDashboardPage() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Espace client de démonstration">
        <HomeBrand href="/" />
        <p className={styles.spaceLabel}>Espace client</p>
        <nav className={styles.navigation} aria-label="Navigation client">
          <Link className={styles.activeNavItem} href="/client" aria-current="page">
            <span aria-hidden="true">⌂</span>
            <span>Client</span>
          </Link>
          {clientNavigation.map((item) => (
            <Link
              className={styles.navItem}
              href={item.href}
              key={item.label}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarNote}>
          <span aria-hidden="true">●</span> Mode démonstration
          <small>Aucune donnée réelle</small>
        </div>
      </aside>

      <div className={styles.mainColumn}>
        <header className={styles.topbar}>
          <nav className={styles.breadcrumbs} aria-label="Fil d’Ariane">
            <Link href="/">Delifast</Link>
            <span aria-hidden="true">/</span>
            <span>Client</span>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Tableau de bord client</span>
          </nav>
          <div className={styles.topbarActions}>
            <div className={styles.searchMock} aria-label="Recherche désactivée dans cette maquette">
              <span aria-hidden="true">⌕</span>
              <span>Rechercher</span>
            </div>
            <span className={styles.avatar} aria-label="Profil fictif Aminata Démo">
              AD
            </span>
          </div>
        </header>

        <main className={styles.content} id="contenu-principal">
          <div className={styles.pageHeading}>
            <p className={styles.eyebrow}>Client · Démonstration</p>
            <h1>Tableau de bord client</h1>
            <p className={styles.intro}>
              Un aperçu de vos commandes et de vos dernières découvertes.
            </p>
          </div>

          <section className={styles.statsGrid} aria-label="Récapitulatif fictif">
            {summary.map((item) => (
              <article className={styles.statCard} key={item.label}>
                <div className={styles.statTopline}>
                  <h2>{item.label}</h2>
                  <span className={styles.statIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                </div>
                <p className={styles.statValue}>{item.value}</p>
                <p className={styles.statDetail}>{item.detail}</p>
              </article>
            ))}
          </section>

          <div className={styles.dashboardGrid}>
            <div className={styles.primaryColumn}>
              <section className={styles.panel} aria-labelledby="commande-title">
                <div className={styles.panelHeading}>
                  <h2 id="commande-title">Commande en cours</h2>
                  <span className={styles.statusBadge}>
                    <span aria-hidden="true">●</span> En cours · démo
                  </span>
                </div>
                <div className={styles.listRow}>
                  <span className={styles.rowIcon} aria-hidden="true">▣</span>
                  <span className={styles.rowCopy}>
                    <strong>Saveurs du Faso · #DF-24018</strong>
                    <small>Contenu fictif de démonstration</small>
                  </span>
                </div>
                <span className={styles.textAction}>Voir le suivi →</span>
              </section>

              <section className={styles.panel} aria-labelledby="decouvrir-title">
                <div className={styles.panelHeading}>
                  <h2 id="decouvrir-title">À découvrir</h2>
                  <span className={styles.demoBadge}>● Démo</span>
                </div>
                <div className={styles.listRow}>
                  <span className={styles.rowIcon} aria-hidden="true">✦</span>
                  <span className={styles.rowCopy}>
                    <strong>Des plats et commerces de démonstration</strong>
                    <small>Contenu fictif de démonstration</small>
                  </span>
                </div>
                <Link className={styles.textAction} href="/catalogue">
                  Explorer le catalogue →
                </Link>
              </section>
            </div>

            <aside className={styles.secondaryColumn} aria-label="Raccourcis et note de démonstration">
              <section className={styles.panel} aria-labelledby="raccourcis-title">
                <div className={styles.panelHeading}>
                  <h2 id="raccourcis-title">Raccourcis</h2>
                  <span className={styles.panelHint}>Accès rapide</span>
                </div>
                <ul className={styles.shortcutList}>
                  {shortcuts.map((label) => (
                    <li className={styles.shortcut} key={label}>
                      <span className={styles.shortcutIcon} aria-hidden="true">↗</span>
                      <span className={styles.rowCopy}>
                        <strong>{label}</strong>
                        <small>Ouvrir la section</small>
                      </span>
                      {label === "Mon profil" ? (
                        <Link className={styles.shortcutAction} href="/client/profil">
                          Voir →
                        </Link>
                      ) : (
                        <span className={styles.shortcutAction}>Voir →</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
              <section className={styles.demoNote} aria-labelledby="demo-title">
                <h2 id="demo-title">Maquette de démonstration</h2>
                <p>Les cartes et compteurs ne correspondent pas à des dossiers réels.</p>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

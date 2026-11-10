"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Search,
  Store,
  Utensils,
  Users,
} from "lucide-react";
import styles from "./admin-dashboard-demo.module.css";
import Link from "next/link";

type DashboardItem = {
  label: string;
  screen: number;
  icon: LucideIcon;
  href: string;
};

const navigation: DashboardItem[] = [
  { label: "Utilisateurs", screen: 40, icon: Users, href: "/admin/utilisateurs" },
  { label: "Commerçants", screen: 42, icon: Store, href: "/admin/commercants" },
  { label: "Restaurants", screen: 44, icon: Utensils, href: "/admin/restaurants" },
  { label: "Commandes", screen: 46, icon: ClipboardList, href: "/admin/commandes" },
  { label: "Gestion des abonnements", screen: 48, icon: BadgeCheck, href: "/admin/abonnements" },
  { label: "Paiements", screen: 50, icon: CreditCard, href: "/admin/paiements" },
];

const shortcuts: DashboardItem[] = [
  { label: "Utilisateurs", screen: 40, icon: ArrowUpRight, href: "/admin/utilisateurs" },
  { label: "Abonnements", screen: 48, icon: ArrowUpRight, href: "/admin/abonnements" },
  { label: "Paiements", screen: 50, icon: ArrowUpRight, href: "/admin/paiements" },
];

const searchItems = [
  ...navigation.map((item) => ({
    ...item,
    description: `Rubrique de démonstration · écran ${item.screen}`,
  })),
  {
    label: "À vérifier",
    screen: 50,
    icon: CreditCard,
    href: "/admin/paiements",
    description: "Preuves de paiement et de remboursement · exemple fictif",
  },
  {
    label: "Activité",
    screen: 39,
    icon: Activity,
    href: "/admin/tableau-de-bord",
    description: "Commandes et comptes fictifs de maquette",
  },
];

function screenLabel(screen: number) {
  return String(screen).padStart(2, "0");
}

export default function AdminDashboardDemo() {
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("fr-FR");

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    return searchItems.filter((item) =>
      `${item.label} ${item.description}`
        .toLocaleLowerCase("fr-FR")
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  return (
    <div className={styles.frame} data-testid="admin-demo-dashboard" data-screen="39">
      <aside className={styles.sidebar} aria-label="Navigation de la démonstration">
        <div className={styles.brand} aria-label="Delifast">
          <span className={styles.brandMark} aria-hidden="true">
            <span />
          </span>
          <span className={styles.brandName}>DELI<span>FAST</span></span>
        </div>
        <p className={styles.sidebarLabel}>Espace administration</p>
        <nav className={styles.navigation} aria-label="Rubriques">
          <Link className={`${styles.navItem} ${styles.navActive}`} aria-current="page" href="/admin/tableau-de-bord">
            <LayoutDashboard size={15} aria-hidden="true" />
            <span>Général</span>
          </Link>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                className={styles.navItem}
                href={item.href}
                key={item.label}
              >
                <Icon size={15} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className={styles.sidebarFoot}>
          <span className={styles.footDot} aria-hidden="true" />
          <span>Mode démonstration</span>
          <p>Aucune donnée réelle</p>
          <div className={styles.systemFooterLinks}>
            <Link href="/admin/erreur">Écran 52 · Erreur</Link>
            <Link href="/admin/page-introuvable">Écran 53 · 404</Link>
          </div>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumb} aria-label="Fil d’Ariane">
            <span>Delifast</span>
            <span aria-hidden="true">/</span>
            <span>Administration</span>
            <span aria-hidden="true">/</span>
            <span className={styles.currentCrumb}>Tableau de bord général</span>
          </div>
          <div className={styles.topActions}>
            <label className={styles.searchBox}>
              <Search size={14} aria-hidden="true" />
              <span className={styles.visuallyHidden}>Rechercher dans cette démonstration</span>
              <input
                type="search"
                placeholder="Rechercher"
                value={query}
                onChange={(event) => {
                  setQuery(event.currentTarget.value);
                  setFeedback("");
                }}
              />
            </label>
            <span className={styles.avatar} aria-hidden="true">DF</span>
          </div>
        </header>

        <main className={styles.content}>
          <div className={styles.pageHeading}>
            <p className={styles.eyebrow}>Administration · Démonstration</p>
            <h1>Tableau de bord général</h1>
            <p className={styles.subtitle}>Vue synthétique des activités de démonstration.</p>
          </div>

          <div className={styles.demoNotice} role="note">
            <span className={styles.noticeDot} aria-hidden="true" />
            <p>
              <strong>Mode démo.</strong> Toutes les valeurs sont fictives, affichées localement et ne sont pas conservées. Aucun compte administrateur ni session n’a été créé.
            </p>
          </div>

          {normalizedQuery ? (
            <section className={styles.searchResults} aria-label="Résultats de recherche locale">
              <div className={styles.searchSummary} role="status" aria-live="polite">
                {searchResults.length} résultat{searchResults.length === 1 ? "" : "s"} dans cette vue fictive.
              </div>
              {searchResults.length ? (
                <div className={styles.resultList}>
                  {searchResults.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        className={styles.resultItem}
                        href={item.href}
                        key={`${item.label}-${item.screen}-${index}`}
                      >
                        <Icon size={15} aria-hidden="true" />
                        <span><strong>{item.label}</strong><small>{item.description}</small></span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className={styles.noResults}>Aucun élément ne correspond dans cet aperçu local.</p>
              )}
            </section>
          ) : null}

          <section className={styles.metrics} aria-label="Indicateurs fictifs">
            <article className={styles.metricCard}>
              <div className={styles.metricTop}>
                <span>Utilisateurs</span>
                <span className={styles.metricIcon}><Users size={15} aria-hidden="true" /></span>
              </div>
              <strong className={styles.metricValue}>128</strong>
              <span className={styles.metricCaption}>Donnée fictive · démo</span>
            </article>
            <article className={styles.metricCard}>
              <div className={styles.metricTop}>
                <span>Commerçants</span>
                <span className={styles.metricIcon}><Store size={15} aria-hidden="true" /></span>
              </div>
              <strong className={styles.metricValue}>24</strong>
              <span className={styles.metricCaption}>Donnée fictive · démo</span>
            </article>
            <article className={styles.metricCard}>
              <div className={styles.metricTop}>
                <span>Paiements et remboursements à vérifier</span>
                <span className={styles.metricIcon}><CreditCard size={15} aria-hidden="true" /></span>
              </div>
              <strong className={styles.metricValue}>07</strong>
              <span className={styles.metricCaption}>Donnée fictive · démo</span>
            </article>
          </section>

          <div className={styles.panelColumns}>
            <div className={styles.primaryColumn}>
              <section className={styles.panel} aria-labelledby="review-title">
                <div className={styles.panelHeader}>
                  <h2 id="review-title">À vérifier</h2>
                  <span className={styles.pendingBadge}><span /> À examiner</span>
                </div>
                <div className={styles.activityRow}>
                  <span className={styles.rowIcon}><CreditCard size={16} aria-hidden="true" /></span>
                  <div className={styles.rowText}>
                    <strong>Preuves de paiement et de remboursement à vérifier manuellement</strong>
                    <span>Contenu fictif de démonstration · aucun dossier réel</span>
                  </div>
                </div>
                <Link
                  className={styles.textAction}
                  href="/admin/paiements"
                >
                  Ouvrir la file <span aria-hidden="true">→</span>
                </Link>
              </section>

              <section className={styles.panel} aria-labelledby="activity-title">
                <div className={styles.panelHeader}>
                  <h2 id="activity-title">Activité</h2>
                  <span className={styles.demoBadge}><span /> Démo</span>
                </div>
                <div className={styles.activityRow}>
                  <span className={styles.rowIcon}><Activity size={16} aria-hidden="true" /></span>
                  <div className={styles.rowText}>
                    <strong>Commandes et comptes fictifs de maquette</strong>
                    <span>Contenu fictif de démonstration · sans historique réel</span>
                  </div>
                </div>
                <button
                  className={styles.textAction}
                  type="button"
                  onClick={() => setFeedback("Les rapports ne sont pas inclus dans l’écran 39. Les valeurs présentées restent fictives et temporaires.")}
                >
                  Consulter les rapports <span aria-hidden="true">→</span>
                </button>
              </section>
            </div>

            <div className={styles.secondaryColumn}>
              <section className={styles.panel} aria-labelledby="shortcuts-title">
                <div className={styles.panelHeader}>
                  <h2 id="shortcuts-title">Raccourcis</h2>
                  <span className={styles.panelHint}>Accès rapide · démo</span>
                </div>
                <div className={styles.shortcutList}>
                  {shortcuts.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        className={styles.shortcut}
                        href={item.href}
                        key={item.label}
                      >
                        <span className={styles.shortcutIcon}><Icon size={16} aria-hidden="true" /></span>
                        <span className={styles.shortcutText}>
                          <strong>{item.label}</strong>
                          <small>Ouvrir la section · écran {screenLabel(item.screen)}</small>
                        </span>
                        <span className={styles.shortcutLink}>Voir <span aria-hidden="true">→</span></span>
                      </Link>
                    );
                  })}
                </div>
              </section>

              <aside className={styles.disclaimer}>
                <h2>Maquette de démonstration</h2>
                <p>Les cartes et compteurs ne correspondent pas à des dossiers réels. Les actions ci-dessus ne font que modifier ce message dans cette page; rien n’est envoyé ni enregistré.</p>
              </aside>
            </div>
          </div>

          <div className={styles.feedback} role="status" aria-live="polite">
            {feedback}
          </div>
        </main>
      </div>
    </div>
  );
}

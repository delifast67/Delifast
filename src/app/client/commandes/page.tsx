import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../client-dashboard.module.css";
import styles from "./orders.module.css";
import { ClientOrdersList } from "./orders-list";

export const metadata: Metadata = {
  title: "Liste des commandes (démo) | Delifast",
  description:
    "Aperçu fictif des commandes client, avec statuts de commande et de paiement distincts.",
};

const clientNavigation = [
  { label: "Client", icon: "⌂", href: "/client" },
  { label: "Panier", icon: "▣", href: "/client/panier" },
  { label: "Commandes", icon: "▤", href: "/client/commandes", active: true },
  { label: "Paiements", icon: "◆" },
  { label: "Profil client", icon: "♙", href: "/client/profil" },
] as const;

export default function ClientOrdersPage() {
  return (
    <div className={dashboard.shell}>
      <aside className={dashboard.sidebar} aria-label="Espace client de démonstration">
        <HomeBrand href="/" />
        <p className={dashboard.spaceLabel}>Espace client</p>
        <nav className={dashboard.navigation} aria-label="Navigation client">
          {clientNavigation.map((item) => {
            const className =
              "active" in item && item.active ? dashboard.activeNavItem : dashboard.navItem;
            const label = (
              <>
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </>
            );

            return "href" in item ? (
              <Link
                aria-current={"active" in item && item.active ? "page" : undefined}
                className={className}
                href={item.href}
                key={item.label}
              >
                {label}
              </Link>
            ) : (
              <span className={className} key={item.label}>
                {label}
              </span>
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
            <span aria-current="page">Liste des commandes</span>
          </nav>
          <div className={dashboard.topbarActions}>
            <div className={dashboard.searchMock} aria-label="Recherche désactivée dans cette maquette">
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
            <h1>Liste des commandes</h1>
            <p className={dashboard.intro}>
              Retrouvez séparément le statut de chaque commande et celui de son paiement.
            </p>
          </div>

          <section className={styles.statusRule} aria-label="Règle de lecture des statuts">
            <strong>Statuts de commande et de paiement séparés</strong>
            <span>Références, dates et montants de démonstration fictifs.</span>
          </section>

          <ClientOrdersList />

          <section className={styles.demoNotice} aria-label="Limites de la démonstration">
            <span aria-hidden="true">i</span>
            <p>
              Aperçu fictif uniquement. Le paiement de commande est direct au restaurant et son statut
              ne remplace pas celui de la commande. Toute proposition de modification nécessite votre
              accord. Aucun compte, paiement, changement, remboursement, stock ni notification réelle
              n’est connecté ou exécuté ici.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

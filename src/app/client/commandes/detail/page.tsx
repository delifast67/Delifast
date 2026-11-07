import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../../components/public-home/site-header";
import dashboard from "../../client-dashboard.module.css";
import { ClientOrderDetailDemo } from "./order-detail-demo";

export const metadata: Metadata = {
  title: "Détail d’une commande (démo) | Delifast",
  description:
    "Exemple fictif de détail de commande client, avec proposition, composition historique, paiement et règles d’annulation.",
};

const clientNavigation = [
  { label: "Client", icon: "⌂", href: "/client" },
  { label: "Panier", icon: "▣", href: "/client/panier" },
  { label: "Commandes", icon: "▤", href: "/client/commandes", active: true },
  { label: "Paiements", icon: "◆", href: "/client/paiements" },
  { label: "Profil client", icon: "♙", href: "/client/profil" },
] as const;

export default function ClientOrderDetailPage() {
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

            return (
              <Link
                aria-current={"active" in item && item.active ? "page" : undefined}
                className={className}
                href={item.href}
                key={item.label}
              >
                {label}
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
            <Link href="/client/commandes">Liste des commandes</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Détail d’une commande</span>
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
            <h1>Détail d’une commande</h1>
            <p className={dashboard.intro}>
              Répondez à une proposition, consultez le paiement et suivez l’annulation; références et valeurs fictives.
            </p>
            <Link className={dashboard.textAction} href="/client/commandes">
              ← Retour à la liste des commandes
            </Link>
          </div>

          <ClientOrderDetailDemo />
        </main>
      </div>
    </div>
  );
}

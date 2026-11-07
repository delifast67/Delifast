import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../client-dashboard.module.css";
import styles from "./payments.module.css";
import { ClientPaymentsList } from "./payments-list";

export const metadata: Metadata = {
  title: "Liste des paiements (démo) | Delifast",
  description:
    "Liste fictive des paiements de commande du client, avec filtres par statut et accès aux commandes associées.",
};

const clientNavigation = [
  { label: "Client", icon: "⌂", href: "/client" },
  { label: "Panier", icon: "▣", href: "/client/panier" },
  { label: "Commandes", icon: "▤", href: "/client/commandes" },
  { label: "Paiements", icon: "◆", href: "/client/paiements", active: true },
  { label: "Profil client", icon: "♙", href: "/client/profil" },
] as const;

export default function ClientPaymentsPage() {
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
            <span aria-current="page">Liste des paiements</span>
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
            <h1>Liste des paiements</h1>
            <p className={dashboard.intro}>
              Consultez les paiements de commande associés à votre compte et leurs preuves historiques.
            </p>
            <Link className={dashboard.textAction} href="/client/commandes/detail">
              ← Revenir au détail de commande · démo
            </Link>
          </div>

          <section className={styles.demoRule} aria-label="Périmètre de démonstration">
            <strong>Liste de démonstration · valeurs entièrement fictives</strong>
            <span>Aucune transaction, preuve, notification ni requête réelle.</span>
          </section>

          <ClientPaymentsList />

          <section className={styles.demoRule} aria-label="Règles de paiement illustrées">
            <strong>Paiement direct au restaurant bénéficiaire</strong>
            <span>
              Le restaurant vérifie humainement les preuves; les abonnements Delifast ne figurent pas dans cette liste.
              Le statut du paiement reste distinct du statut de commande.
            </span>
          </section>
        </main>
      </div>
    </div>
  );
}

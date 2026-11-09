import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  MapPin,
  Package,
  Store,
  Truck,
} from "lucide-react";
import { HomeBrand } from "../../../../components/public-home/site-header";
import dashboard from "../../../client/client-dashboard.module.css";
import { demoOrders } from "../orders-data";
import { MerchantOrderDetail } from "../order-detail";
import styles from "../order-detail.module.css";

export const metadata: Metadata = {
  title: "Détail et traitement d’une commande (démo) | Delifast",
  description:
    "Détail fictif d’une commande commerçant. Les propositions, confirmations et aperçus restent locaux et ne sont ni transmis ni enregistrés.",
};

export function generateStaticParams() {
  return demoOrders.map(({ id }) => ({ id }));
}

type MerchantOrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MerchantOrderDetailPage({
  params,
}: MerchantOrderDetailPageProps) {
  const { id } = await params;
  const order = demoOrders.find((item) => item.id === id);

  if (!order) notFound();

  return (
    <div className={dashboard.shell}>
      <aside
        className={dashboard.sidebar}
        aria-label="Espace commerçant de démonstration"
      >
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
          <Link className={dashboard.navItem} href="/commercant/localisation">
            <MapPin aria-hidden="true" size={15} />
            <span>Gestion de la localisation</span>
          </Link>
          <Link className={dashboard.navItem} href="/commercant/moyens-paiement">
            <CreditCard aria-hidden="true" size={15} />
            <span>Gestion des moyens de paiement</span>
          </Link>
          <Link className={dashboard.navItem} href="/commercant/livraison">
            <Truck aria-hidden="true" size={15} />
            <span>Configuration de la livraison</span>
          </Link>
          <Link className={dashboard.navItem} href="/commercant/produits">
            <Package aria-hidden="true" size={15} />
            <span>Produits</span>
          </Link>
          <Link className={dashboard.navItem} href="/commercant/menus">
            <BookOpen aria-hidden="true" size={15} />
            <span>Menus</span>
          </Link>
          <Link
            aria-current="page"
            className={dashboard.activeNavItem}
            href="/commercant/commandes"
          >
            <ClipboardList aria-hidden="true" size={15} />
            <span>Commandes · démo</span>
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
            <Link href="/commercant/commandes">Liste des commandes</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Détail</span>
          </nav>
          <div className={dashboard.topbarActions}>
            <div
              aria-label="Recherche globale désactivée dans cette maquette"
              className={dashboard.searchMock}
            >
              <span aria-hidden="true">⌕</span>
              <span>Rechercher</span>
            </div>
            <span
              className={dashboard.avatar}
              aria-label="Profil fictif Saveurs du Faso"
            >
              SF
            </span>
          </div>
        </header>

        <main className={dashboard.content} id="contenu-principal">
          <div className={dashboard.pageHeading}>
            <p className={dashboard.eyebrow}>Commerçant · Démonstration</p>
            <h1>Détail et traitement d’une commande</h1>
            <p className={dashboard.intro}>
              Consultez l’historique et prévisualisez les règles de traitement, sans action réelle.
            </p>
            <Link className={dashboard.textAction} href="/commercant/commandes">
              ← Retour à la liste des commandes
            </Link>
          </div>

          <MerchantOrderDetail order={order} />

          <nav className={styles.screenNavigation} aria-label="Navigation des écrans commerçant">
            <Link href="/commercant/commandes">← Retour à l’écran 32 · Liste des commandes</Link>
            <Link href="/commercant/paiements">Écran suivant 34 · Liste des paiements →</Link>
            <span>Écran 33 sur 53 · Données fictives</span>
          </nav>
        </main>
      </div>
    </div>
  );
}

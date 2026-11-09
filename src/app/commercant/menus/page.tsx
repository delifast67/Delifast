import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CreditCard,
  LayoutDashboard,
  MapPin,
  Package,
  Store,
  Truck,
} from "lucide-react";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../../client/client-dashboard.module.css";
import styles from "./menus.module.css";
import { MenuList } from "./menu-list";

export const metadata: Metadata = {
  title: "Liste des menus (démo) | Delifast",
  description:
    "Aperçu local des menus fictifs du commerce. Rien n’est enregistré.",
};

export default function MerchantMenusPage() {
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
          <Link
            aria-current="page"
            className={dashboard.activeNavItem}
            href="/commercant/menus"
          >
            <BookOpen aria-hidden="true" size={15} />
            <span>Menus</span>
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
            <span aria-current="page">Liste des menus</span>
          </nav>
          <div className={dashboard.topbarActions}>
            <div
              aria-label="Recherche globale désactivée dans cette maquette"
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
          <MenuList />
          <nav
            className={styles.screenNavigation}
            aria-label="Navigation des écrans commerçant"
          >
            <Link href="/commercant/produits">
              <ArrowLeft aria-hidden="true" size={15} />
              Retour à la liste des produits
            </Link>
            <span>Écran 30 sur 53 · Données fictives</span>
          </nav>
        </main>
      </div>
    </div>
  );
}

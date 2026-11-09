import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Info,
  LayoutDashboard,
  MapPin,
  Store,
  Truck,
} from "lucide-react";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../../client/client-dashboard.module.css";
import styles from "./delivery.module.css";
import { DeliveryConfigurationForm } from "./delivery-form";

export const metadata: Metadata = {
  title: "Configuration de la livraison (démo) | Delifast",
  description:
    "Définissez localement les modalités, zones et frais de réception proposés par votre commerce. Rien n’est enregistré.",
};

export default function MerchantDeliveryPage() {
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
          <Link className={dashboard.navItem} href="/commercant/localisation">
            <MapPin aria-hidden="true" size={15} />
            <span>Gestion de la localisation</span>
          </Link>
          <Link className={dashboard.navItem} href="/commercant/moyens-paiement">
            <CreditCard aria-hidden="true" size={15} />
            <span>Gestion des moyens de paiement</span>
          </Link>
          <Link
            aria-current="page"
            className={dashboard.activeNavItem}
            href="/commercant/livraison"
          >
            <Truck aria-hidden="true" size={15} />
            <span>Configuration de la livraison</span>
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
            <span aria-current="page">Configuration de la livraison</span>
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
              <h1>Configuration de la livraison</h1>
              <p className={dashboard.intro}>
                Définissez les modalités que votre commerce propose.
              </p>
            </div>
            <button
              className={styles.topSubmit}
              form="merchant-delivery-form"
              type="submit"
            >
              Enregistrer les modalités
            </button>
          </div>

          <div className={styles.demoNotice} role="note">
            <span className={styles.noticeIcon} aria-hidden="true">i</span>
            <p>
              <strong>Aperçu local uniquement</strong>
              <span>Les modifications disparaissent en quittant cette page.</span>
            </p>
            <span className={styles.demoBadge}>Écran 27 sur 53</span>
          </div>

          <div className={styles.contentGrid}>
            <section className={styles.formPanel} aria-labelledby="delivery-title">
              <div className={styles.panelHeading}>
                <div>
                  <p className={styles.kicker}>Réception des commandes</p>
                  <h2 id="delivery-title">Modalités disponibles</h2>
                </div>
                <span className={styles.panelHint}>Exemples à configurer</span>
              </div>
              <DeliveryConfigurationForm />
            </section>

            <aside className={styles.infoPanel} aria-labelledby="delivery-info-title">
              <span className={styles.infoIcon} aria-hidden="true">
                <Info size={17} />
              </span>
              <p className={styles.kicker}>À savoir</p>
              <h2 id="delivery-info-title">Le commerce définit ses options</h2>
              <p className={styles.infoCopy}>
                Delifast ne fournit pas de service de livraison. Les choix proposés au client
                dépendent des modalités, zones et frais définis par ce commerce.
              </p>
              <div className={styles.infoNote}>
                <strong>Rien n’est transmis ni enregistré</strong>
                <span>
                  Aucun service externe, backend, API ou stockage n’est utilisé dans cette démo.
                </span>
              </div>
            </aside>
          </div>

          <nav className={styles.screenNavigation} aria-label="Navigation des écrans commerçant">
            <Link href="/commercant/moyens-paiement">
              <ArrowLeft aria-hidden="true" size={14} />
              Retour à la gestion des moyens de paiement
            </Link>
            <span className={dashboard.demoBadge}>Données fictives</span>
          </nav>
        </main>
      </div>
    </div>
  );
}

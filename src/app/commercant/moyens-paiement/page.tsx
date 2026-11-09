import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, LayoutDashboard, MapPin, Store } from "lucide-react";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../../client/client-dashboard.module.css";
import payment from "../inscription/paiements/payment-setup.module.css";
import location from "../localisation/location-management.module.css";
import styles from "./payment-methods.module.css";
import { MerchantPaymentMethodsForm } from "./payment-methods-form";

export const metadata: Metadata = {
  title: "Gestion des moyens de paiement (démo) | Delifast",
  description:
    "Aperçu fictif de la configuration séparée d’Orange Money et Telmob. Aucun réglage n’est enregistré ou transmis.",
};

export default function MerchantPaymentMethodsPage() {
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
          <Link
            aria-current="page"
            className={dashboard.activeNavItem}
            href="/commercant/moyens-paiement"
          >
            <CreditCard aria-hidden="true" size={15} />
            <span>Gestion des moyens de paiement</span>
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
            <span aria-current="page">Gestion des moyens de paiement</span>
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
          <div className={location.headingRow}>
            <div className={dashboard.pageHeading}>
              <p className={dashboard.eyebrow}>Commerçant · Démonstration</p>
              <h1>Gestion des moyens de paiement</h1>
              <p className={dashboard.intro}>
                Gérez séparément l’activation et le numéro fictif de chaque opérateur Mobile Money.
              </p>
            </div>
            <button
              className={location.topSubmit}
              form="merchant-payment-methods-form"
              type="submit"
            >
              Enregistrer les moyens de paiement
            </button>
          </div>

          <div className={payment.notice} role="note">
            <span className={payment.noticeIcon} aria-hidden="true">i</span>
            <div>
              <strong>Configuration illustrative uniquement</strong>
              <p>Les numéros sont fictifs; aucun réglage n’est enregistré.</p>
            </div>
            <span className={payment.demoBadge}>Démo locale</span>
          </div>

          <div className={payment.contentGrid}>
            <section className={payment.formPanel} aria-labelledby="payment-methods-title">
              <div className={payment.panelHeading}>
                <div>
                  <p className={payment.kicker}>Moyens de paiement</p>
                  <h2 id="payment-methods-title">Opérateurs configurés séparément</h2>
                  <p>Choisissez Orange Money, Telmob, les deux ou aucun dans cet aperçu.</p>
                </div>
                <span className={payment.operatorNames}>Orange Money · Telmob</span>
              </div>
              <MerchantPaymentMethodsForm />
            </section>

            <aside className={payment.infoPanel} aria-labelledby="payment-recipient-title">
              <div className={payment.infoIcon} aria-hidden="true">
                <CreditCard size={17} />
              </div>
              <p className={payment.kicker}>Circuit de paiement</p>
              <h2 id="payment-recipient-title">Qui reçoit le paiement ?</h2>
              <div className={payment.flowItem}>
                <span className={payment.flowDot} aria-hidden="true">01</span>
                <p>
                  <strong>Commande client</strong>
                  Le bénéficiaire est le restaurant choisi. Dans une vraie configuration,
                  seul un opérateur actif avec un numéro bénéficiaire renseigné serait proposé.
                </p>
              </div>
              <div className={payment.flowItem}>
                <span className={payment.flowDot} aria-hidden="true">02</span>
                <p>
                  <strong>Abonnement</strong>
                  Circuit distinct : bénéficiaire Delifast, avec vérification par l’administration.
                </p>
              </div>
              <div className={styles.infoNote}>
                <strong>Rien n’est envoyé ni enregistré</strong>
                <span>
                  Aucun paiement, code USSD, appel, service externe ou stockage n’est activé dans cette démo.
                </span>
              </div>
            </aside>
          </div>

          <p className={payment.footerNote}>
            Les codes client dépendraient du montant exact de la commande et du bénéficiaire du restaurant. Ici, toutes les valeurs restent fictives; aucun code n’est généré.
          </p>

          <nav className={styles.screenNavigation} aria-label="Navigation entre les écrans de démonstration">
            <Link href="/commercant/localisation">
              <span aria-hidden="true">←</span> Retour à la gestion de la localisation
            </Link>
            <span className={dashboard.demoBadge}>Écran 26 sur 53</span>
            <Link href="/commercant/livraison">
              Configuration de la livraison <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </main>
      </div>
    </div>
  );
}

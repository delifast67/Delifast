import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../client-dashboard.module.css";
import styles from "./client-checkout.module.css";

export const metadata: Metadata = {
  title: "Validation de commande (démo) | Delifast",
  description:
    "Aperçu fictif de la vérification des articles, de la réception et du total d’une commande Delifast.",
};

const demoItems = [
  {
    name: "Poulet braisé × 1",
    details: "Accompagnement · Frites · supplément 500 FCFA · copie de commande",
    price: "4 000 FCFA",
  },
  {
    name: "Menu du jour × 1",
    details: "Sans option · prix de démonstration",
    price: "4 500 FCFA",
  },
] as const;

const clientNavigation = [
  { label: "Client", icon: "⌂", href: "/client", active: true },
  { label: "Panier", icon: "▣", href: "/client/panier" },
  { label: "Commandes", icon: "▤" },
  { label: "Paiements", icon: "◆" },
  { label: "Profil client", icon: "♙", href: "/client/profil" },
] as const;

export default function ClientCheckoutPage() {
  return (
    <div className={dashboard.shell}>
      <aside className={dashboard.sidebar} aria-label="Espace client de démonstration">
        <HomeBrand href="/" />
        <p className={dashboard.spaceLabel}>Espace client</p>
        <nav className={dashboard.navigation} aria-label="Navigation client">
          {clientNavigation.map((item) => {
            const className = "active" in item && item.active ? dashboard.activeNavItem : dashboard.navItem;
            const label = (
              <>
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </>
            );

            return "href" in item ? (
              <Link className={className} href={item.href} key={item.label}>
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
            <Link href="/client/panier">Panier</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Validation de commande</span>
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
            <h1>Validation de commande</h1>
            <p className={dashboard.intro}>
              Vérifiez les articles, le mode de réception proposé et le total avant de continuer.
            </p>
          </div>

          <div className={styles.checkoutLayout}>
            <div className={styles.primaryColumn}>
              <section className={`${dashboard.panel} ${styles.checkoutPanel}`} aria-labelledby="items-title">
                <div className={dashboard.panelHeading}>
                  <h2 id="items-title">1. Commerce et articles</h2>
                  <span className={styles.merchantBadge}>
                    <span aria-hidden="true">●</span> Saveurs du Faso · commerce unique
                  </span>
                </div>
                <ul className={styles.orderList}>
                  {demoItems.map((item) => (
                    <li className={styles.orderLine} key={item.name}>
                      <div className={styles.orderCopy}>
                        <strong>{item.name}</strong>
                        <small>{item.details}</small>
                      </div>
                      <strong className={styles.orderPrice}>{item.price}</strong>
                    </li>
                  ))}
                </ul>
                <div className={styles.reservationNote}>
                  <strong>Vérification avant envoi</strong>
                  <span>
                    Dans le parcours prévu, la disponibilité, les quantités suivies et les options seraient
                    vérifiées avant l’envoi ; un article déclaré indisponible serait refusé.
                  </span>
                  <small>
                    Le stock suivi ne serait réservé qu’à l’envoi de la commande. Aucun contrôle ni aucune
                    réservation réelle n’est effectué dans cette maquette.
                  </small>
                </div>
              </section>

              <section className={`${dashboard.panel} ${styles.checkoutPanel}`} aria-labelledby="receipt-title">
                <div className={dashboard.panelHeading}>
                  <h2 id="receipt-title">2. Réception</h2>
                  <span className={styles.subtle}>Modalités de démonstration</span>
                </div>
                <div className={styles.receiptMethods}>
                  <div className={styles.receiptMethod}>
                    <span className={styles.methodIcon} aria-hidden="true">⌖</span>
                    <span className={styles.methodCopy}>
                      <strong>Retrait sur place</strong>
                      <small>Proposé par le commerce · adresse de démonstration</small>
                    </span>
                    <span className={styles.statusPill}><span aria-hidden="true">●</span> Disponible · démo</span>
                  </div>
                  <div className={styles.receiptMethod}>
                    <span className={styles.methodIcon} aria-hidden="true">↗</span>
                    <span className={styles.methodCopy}>
                      <strong>Livraison par le commerce</strong>
                      <small>Zone de démonstration · frais exemple : 1 000 FCFA</small>
                    </span>
                    <span className={styles.statusPill}><span aria-hidden="true">●</span> Disponible · démo</span>
                  </div>
                </div>
                <div className={styles.addressField}>
                  <label htmlFor="delivery-address">Adresse de réception · exemple</label>
                  <input
                    autoComplete="off"
                    disabled
                    id="delivery-address"
                    placeholder="Adresse à communiquer au commerce"
                    type="text"
                  />
                  <small>La livraison, les zones et les frais sont définis par le commerçant, pas par Delifast.</small>
                </div>
              </section>
            </div>

            <aside className={`${dashboard.panel} ${styles.summaryPanel}`} aria-labelledby="summary-title">
              <div className={dashboard.panelHeading}>
                <h2 id="summary-title">Résumé de la commande</h2>
              </div>
              <div className={styles.summaryLine}>
                <span>Articles</span>
                <strong>8 500 FCFA</strong>
              </div>
              <div className={styles.summaryLine}>
                <span>Livraison (exemple)</span>
                <strong>1 000 FCFA</strong>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total estimé</span>
                <strong>9 500 FCFA</strong>
              </div>
              <p className={styles.summaryNote}>
                Montants et modalités fictifs, présentés comme exemples configurés par le commerce.
              </p>
              <button
                aria-describedby="confirm-note"
                className={`${styles.actionButton} ${styles.primaryButton}`}
                disabled
                type="button"
              >
                Confirmer la commande
              </button>
              <p className={styles.confirmNote} id="confirm-note">
                Action désactivée : aucun ordre n’est envoyé et aucun stock n’est réservé.
              </p>
              <Link className={styles.returnLink} href="/client/panier">
                ← Retour au panier
              </Link>
            </aside>
          </div>

          <section className={styles.ruleNotice} aria-label="Règles et limites de la démonstration">
            <span aria-hidden="true">i</span>
            <p>
              Cette commande de démonstration appartient à un seul commerce. Aucune commande, réservation de stock
              ou transaction n’est réelle. Le paiement prévu dans le parcours se fait directement au commerçant ;
              Delifast ne réalise aucun paiement et n’assure pas la livraison.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

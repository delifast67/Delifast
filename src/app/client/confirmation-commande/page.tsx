import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../client-dashboard.module.css";
import styles from "./client-confirmation.module.css";

export const metadata: Metadata = {
  title: "Confirmation de commande (démo) | Delifast",
  description:
    "Maquette fictive de confirmation de commande, avant le paiement direct au commerçant.",
};

const clientNavigation = [
  { label: "Client", icon: "⌂", href: "/client", active: true },
  { label: "Panier", icon: "▣", href: "/client/panier" },
  { label: "Commandes", icon: "▤" },
  { label: "Paiements", icon: "◆" },
  { label: "Profil client", icon: "♙" },
] as const;

export default function ClientOrderConfirmationPage() {
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
            <span aria-current="page">Confirmation de commande</span>
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
            <h1>Confirmation de commande</h1>
            <p className={dashboard.intro}>
              Votre commande de démonstration est enregistrée dans l’aperçu. Toutes les
              informations affichées sont fictives.
            </p>
          </div>

          <section className={styles.confirmationCard} aria-labelledby="confirmation-title">
            <div className={styles.successMark} aria-hidden="true">
              ✓
            </div>
            <span className={styles.demoStatus}>Succès simulé · maquette seulement</span>
            <h2 id="confirmation-title">La commande est prête à être suivie</h2>
            <p className={styles.confirmationIntro}>
              Cet écran illustre l’étape qui suit la validation. Aucune commande n’a été envoyée
              ou créée réellement.
            </p>

            <div className={styles.referenceBox}>
              <span>Référence de démonstration</span>
              <strong>#DF-24018</strong>
              <small>Référence fictive</small>
            </div>

            <dl className={styles.orderFacts}>
              <div>
                <dt>Commerce · exemple</dt>
                <dd>Saveurs du Faso</dd>
              </div>
              <div>
                <dt>Total d’exemple</dt>
                <dd>9 500 FCFA</dd>
              </div>
              <div>
                <dt>Étape illustrée</dt>
                <dd>Paiement en attente</dd>
              </div>
            </dl>

            <div className={styles.stockNote}>
              <div className={styles.stockNoteTitle}>
                <span aria-hidden="true">●</span>
                Réservation prévue dans le parcours, non effectuée ici
              </div>
              <strong>Exemple : 1 unité suivie serait réservée à l’envoi.</strong>
              <p>
                Dans le parcours prévu, une réservation active n’expire pas automatiquement et
                n’est consommée qu’après validation manuelle du paiement par le commerçant. Un
                refus ou une annulation avant consommation la libère.
              </p>
              <small>Aucun stock n’est consulté ni réservé dans cette maquette.</small>
            </div>

            <div className={styles.paymentNote}>
              <span className={styles.paymentIcon} aria-hidden="true">↗</span>
              <div>
                <strong>Le paiement est prévu directement au commerçant</strong>
                <p>
                  Les moyens proposés dépendent des numéros configurés par le commerce. Le
                  commerçant vérifie manuellement la référence et la preuve ; Delifast n’encaisse
                  pas ce paiement.
                </p>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.primaryButton} disabled type="button">
                Passer au paiement
              </button>
              <button className={styles.secondaryButton} disabled type="button">
                Voir la commande
              </button>
            </div>
            <p className={styles.actionNote}>
              Les écrans suivants ne sont pas inclus ici : ces commandes sont inactives et ne
              déclenchent aucune transaction.
            </p>
          </section>

          <section className={styles.ruleNotice} aria-label="Limites de la démonstration">
            <span aria-hidden="true">i</span>
            <p>
              Montants, référence, commerce et quantité sont fictifs. Cette maquette ne crée pas
              de commande, de session, de réservation ou de paiement. La livraison, lorsqu’elle
              est proposée, est organisée par le commerçant ; Delifast ne fournit pas le service.
            </p>
          </section>

          <Link className={styles.backLink} href="/client/validation-commande">
            ← Retour à la validation de commande
          </Link>
        </main>
      </div>
    </div>
  );
}

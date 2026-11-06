import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../client-dashboard.module.css";
import styles from "./client-payment.module.css";

export const metadata: Metadata = {
  title: "Paiement de commande (démo) | Delifast",
  description:
    "Maquette fictive du paiement de commande, directement au commerçant.",
};

const clientNavigation = [
  { label: "Client", icon: "⌂", href: "/client", active: true },
  { label: "Panier", icon: "▣", href: "/client/panier" },
  { label: "Commandes", icon: "▤" },
  { label: "Paiements", icon: "◆" },
  { label: "Profil client", icon: "♙" },
] as const;

const paymentMethods = [
  { name: "Orange Money", mark: "O", exampleNumber: "+226 70 XX XX XX XX" },
  { name: "Telmob", mark: "T", exampleNumber: "+226 60 XX XX XX XX" },
] as const;

const paymentSteps = [
  "Dans le parcours prévu, le paiement est adressé directement au commerçant par un opérateur qu’il a configuré.",
  "Le client transmet la référence de transaction et la capture du SMS de paiement.",
  "Le commerçant compare les éléments au SMS reçu sur son téléphone et vérifie le paiement manuellement.",
] as const;

export default function ClientOrderPaymentPage() {
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
            <Link href="/client/confirmation-commande">Confirmation de commande</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Paiement de commande</span>
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
            <h1>Paiement de commande</h1>
            <p className={dashboard.intro}>
              Aperçu fictif du paiement direct au commerçant. Aucun paiement réel n’est effectué ici.
            </p>
          </div>

          <div className={styles.paymentLayout}>
            <section
              className={`${dashboard.panel} ${styles.paymentPanel}`}
              aria-labelledby="merchant-payment-title"
            >
              <div className={dashboard.panelHeading}>
                <h2 id="merchant-payment-title">Payer le commerçant directement</h2>
                <span className={dashboard.statusBadge}>
                  <span aria-hidden="true">●</span> En attente · démo
                </span>
              </div>
              <p className={styles.panelIntro}>
                Seuls les opérateurs configurés par ce commerce seraient proposés. Numéros fictifs.
              </p>

              <div className={styles.methods} aria-label="Opérateurs de démonstration">
                {paymentMethods.map((method) => (
                  <div className={styles.methodCard} key={method.name}>
                    <span className={styles.operatorMark} aria-hidden="true">
                      {method.mark}
                    </span>
                    <span className={styles.methodCopy}>
                      <strong>{method.name}</strong>
                      <small>Numéro du commerce · {method.exampleNumber}</small>
                    </span>
                    <span className={styles.configuredBadge}>
                      <span aria-hidden="true">●</span> Configuré · démo
                    </span>
                  </div>
                ))}
              </div>

              <ol className={styles.steps}>
                {paymentSteps.map((step, index) => (
                  <li className={styles.step} key={step}>
                    <span className={styles.stepNumber} aria-hidden="true">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className={styles.reservationNote}>
                <strong>Stock suivi réservé · exemple du parcours</strong>
                <p>
                  Dans le parcours prévu, une réservation n’expire pas automatiquement. Elle est consommée après
                  vérification manuelle du paiement par le commerçant ; en cas de refus ou d’annulation avant
                  consommation, elle est libérée.
                </p>
                <small>Aucune commande ni réservation réelle n’existe dans cette maquette.</small>
              </div>
            </section>

            <aside
              className={`${dashboard.panel} ${styles.proofPanel}`}
              aria-labelledby="proof-title"
            >
              <div className={dashboard.panelHeading}>
                <h2 id="proof-title">Envoyer une preuve</h2>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="transaction-reference">
                  Référence de transaction · exemple
                </label>
                <input
                  autoComplete="off"
                  className={styles.textInput}
                  disabled
                  id="transaction-reference"
                  placeholder="Ex. TXN-DEMO-123456"
                  type="text"
                />
              </div>

              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel} id="proof-upload-label">
                  Capture du SMS de paiement · exemple
                </span>
                <button
                  aria-describedby="proof-upload-note"
                  aria-labelledby="proof-upload-label"
                  className={styles.uploadButton}
                  disabled
                  type="button"
                >
                  <span aria-hidden="true">＋</span> Ajouter un justificatif
                </button>
                <small className={styles.fieldHint} id="proof-upload-note">
                  Aucun fichier n’est joint, envoyé ou conservé dans cette maquette.
                </small>
              </div>

              <div className={styles.amountRow}>
                <span>Montant d’exemple</span>
                <strong>9 500 FCFA</strong>
              </div>
              <button className={styles.submitButton} disabled type="button">
                Envoyer la preuve
              </button>
              <p className={styles.proofNote}>
                Aucune validation automatique par capture. Le commerçant vérifie manuellement les éléments en les
                comparant au SMS reçu sur son téléphone.
              </p>
            </aside>
          </div>

          <section className={styles.demoNotice} aria-label="Limites de la démonstration">
            <span aria-hidden="true">i</span>
            <p>
              Montants, opérateurs, numéros et référence sont fictifs. N’effectuez aucun paiement réel depuis cet
              aperçu : aucune transaction, preuve ou validation n’est réalisée. Le paiement réel est adressé
              directement au commerçant, pas à Delifast. Si une livraison est proposée, elle est fournie par le
              commerçant.
            </p>
          </section>

          <Link className={styles.backLink} href="/client/confirmation-commande">
            ← Retour à la confirmation de commande
          </Link>
        </main>
      </div>
    </div>
  );
}

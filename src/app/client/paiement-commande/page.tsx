import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../client-dashboard.module.css";
import styles from "./client-payment.module.css";
import { UssdDemoSelector } from "./ussd-demo-selector";

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
  { label: "Profil client", icon: "♙", href: "/client/profil" },
] as const;

const paymentSteps = [
  "Choisir un opérateur actif avec le numéro bénéficiaire du restaurant renseigné; le code reprend le montant exact enregistré.",
  "Sur son propre téléphone, le client ouvre le code, effectue et confirme la transaction, puis revient dans Delifast.",
  "Le client transmet la référence de transaction obligatoire et la capture du SMS de confirmation.",
  "Le restaurant bénéficiaire compare la preuve au SMS réellement reçu, puis décide manuellement.",
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

          <section className={styles.orderSummary} aria-label="Résumé de commande fictif">
            <div>
              <small>Restaurant bénéficiaire · fictif</small>
              <strong>Restaurant Démo</strong>
            </div>
            <div>
              <small>Référence commande · fictive</small>
              <strong>CMD-DEMO-0001</strong>
            </div>
            <div>
              <small>Total enregistré · exemple fictif</small>
              <strong>9 500 FCFA · FICTIF</strong>
            </div>
          </section>

          <div className={styles.paymentLayout}>
            <section
              className={`${dashboard.panel} ${styles.paymentPanel}`}
              aria-labelledby="merchant-payment-title"
            >
              <div className={dashboard.panelHeading}>
                <h2 id="merchant-payment-title">Payer le restaurant bénéficiaire</h2>
                <span className={dashboard.statusBadge}>
                  <span aria-hidden="true">●</span> Non soumis · démo
                </span>
              </div>
              <p className={styles.panelIntro}>
                Les cartes ci-dessous sont des exemples fictifs. Dans le parcours prévu, seuls les opérateurs actifs
                avec un numéro du restaurant configuré sont proposés; le montant exact est inséré automatiquement.
              </p>

              <UssdDemoSelector />

              <ol className={styles.steps} aria-label="Étapes du paiement prévu">
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
                  vérification manuelle du paiement par le commerçant; en cas de refus ou d’annulation avant
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
                <h2 id="proof-title">Envoyer une preuve après paiement</h2>
                <span className={dashboard.statusBadge}>
                  <span aria-hidden="true">●</span> Non soumis · fictif
                </span>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="transaction-reference">
                  Référence de transaction · obligatoire · fictive
                </label>
                <input
                  autoComplete="off"
                  className={styles.textInput}
                  disabled
                  id="transaction-reference"
                  placeholder="TXN-DEMO-0001 · EXEMPLE FICTIF"
                  type="text"
                />
                <small className={styles.fieldHint}>La référence serait requise après le paiement confirmé sur téléphone.</small>
              </div>

              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel} id="proof-upload-label">
                  Capture du SMS de confirmation · obligatoire
                </span>
                <button
                  aria-describedby="proof-upload-note"
                  aria-labelledby="proof-upload-label"
                  className={styles.uploadButton}
                  disabled
                  type="button"
                >
                  <span aria-hidden="true">＋</span> Sélectionner une image · désactivé
                </button>
                <small className={styles.fieldHint} id="proof-upload-note">
                  La capture serait contrôlée avant l’envoi. Aucun fichier n’est sélectionné, envoyé ou conservé ici.
                </small>
              </div>

              <div className={styles.proofPreview}>
                <span aria-hidden="true">▧</span>
                <div>
                  <strong>Aucun aperçu réel</strong>
                  <small>Prévisualiser, retirer ou remplacer seraient des commandes inactives.</small>
                </div>
              </div>
              <div className={styles.demoActions}>
                <button className={styles.secondaryDemoButton} disabled type="button">Prévisualiser</button>
                <button className={styles.secondaryDemoButton} disabled type="button">Retirer l’image</button>
                <button className={styles.secondaryDemoButton} disabled type="button">Remplacer</button>
              </div>

              <div className={styles.amountRow}>
                <span>Montant exact enregistré · exemple fictif</span>
                <strong>9 500 FCFA · FICTIF</strong>
              </div>
              <button className={styles.submitButton} disabled type="button">
                Envoyer la preuve · désactivé
              </button>
              <p className={styles.proofNote}>
                La preuve serait transmise au restaurant, qui compare la référence au SMS reçu puis valide ou refuse
                manuellement. Le paiement et le statut de commande restent distincts.
              </p>
            </aside>
          </div>

          <section className={styles.statesPanel} aria-label="États de paiement à concevoir">
            <strong>États du parcours · exemples statiques</strong>
            <div className={styles.stateGrid}>
              <span>Non soumis</span><span>En attente</span><span>Validé</span><span>Refusé · motif requis</span>
              <span>Chargement</span><span>Erreur de code</span><span>Erreur de téléversement</span>
              <span>Erreur de soumission</span><span>Aucun opérateur disponible</span>
              <span>Expiré · uniquement selon une règle définie</span>
            </div>
            <small>Une nouvelle preuve après refus conserve toutes les soumissions précédentes; aucune notification n’est envoyée ici.</small>
          </section>

          <section className={styles.demoNotice} aria-label="Limites de la démonstration">
            <span aria-hidden="true">i</span>
            <p>
              Montants, références, numéros et codes sont manifestement fictifs. Aucun code n’ouvre un composeur;
              aucun lien tel:, paiement, téléversement, décision, stockage ou notification opérationnelle n’est actif.
              Le bénéficiaire de ce circuit est le restaurant, pas Delifast.
            </p>
          </section>

          <Link className={styles.backLink} href="/client/confirmation-commande">
            ← Retour à la confirmation de commande
          </Link>
          <Link className={styles.backLink} href="/client/commandes">
            Consulter les commandes · aperçu
          </Link>
        </main>
      </div>
    </div>
  );
}

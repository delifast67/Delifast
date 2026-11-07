"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HomeBrand } from "../../../../components/public-home/site-header";
import dashboard from "../../client-dashboard.module.css";
import styles from "./payment-detail.module.css";

type PaymentStatus = "pending" | "validated" | "rejected";
type DemoPayment = {
  reference: string;
  orderReference: string;
  orderHref: string;
  orderStatus: string;
  restaurant: string;
  operator: string;
  recipient: string;
  amount: string;
  transactionReference: string;
  sentAt: string;
  status: PaymentStatus;
  history: {
    number: number;
    submittedAt: string;
    status: PaymentStatus;
    reviewedAt?: string;
    reason?: string;
  }[];
};

const demoPayments: Record<string, DemoPayment> = {
  "PAY-DEMO-0001": {
    reference: "PAY-DEMO-0001 · fictif",
    orderReference: "#DF-24018 · fictif",
    orderHref: "/client/commandes/detail",
    orderStatus: "Préparation commencée · fictif",
    restaurant: "Saveurs du Faso · démo",
    operator: "Orange Money · démo",
    recipient: "NUMÉRO FICTIF · non appelable",
    amount: "10 000 FCFA · fictif",
    transactionReference: "REF-OM-DEMO-0001 · fictive",
    sentAt: "06 nov. 2026 · date d’exemple",
    status: "validated",
    history: [
      {
        number: 1,
        submittedAt: "06 nov. 2026 · date fictive",
        status: "validated",
        reviewedAt: "06 nov. 2026 · décision illustrative",
      },
    ],
  },
  "PAY-DEMO-0002": {
    reference: "PAY-DEMO-0002 · fictif",
    orderReference: "CMD-DEMO-0001 · fictif",
    orderHref: "/client/commandes",
    orderStatus: "Paiement en attente · fictif",
    restaurant: "Restaurant Démo · fictif",
    operator: "Orange Money · démo",
    recipient: "NUMÉRO FICTIF · non appelable",
    amount: "9 500 FCFA · fictif",
    transactionReference: "REF-OM-DEMO-0002 · fictive",
    sentAt: "Date fictive · exemple",
    status: "pending",
    history: [
      {
        number: 1,
        submittedAt: "Date fictive · soumission d’exemple",
        status: "pending",
      },
    ],
  },
  "PAY-DEMO-0003": {
    reference: "PAY-DEMO-0003 · fictif",
    orderReference: "CMD-DEMO-0002 · fictif",
    orderHref: "/client/commandes",
    orderStatus: "Commande confirmée · fictif",
    restaurant: "Restaurant Exemple · fictif",
    operator: "Telmob · démo",
    recipient: "NUMÉRO FICTIF · non appelable",
    amount: "4 000 FCFA · fictif",
    transactionReference: "REF-TEL-DEMO-0003 · fictive",
    sentAt: "Date fictive · exemple",
    status: "validated",
    history: [
      {
        number: 1,
        submittedAt: "Date fictive · soumission d’exemple",
        status: "validated",
        reviewedAt: "Date fictive · vérification illustrée",
      },
    ],
  },
  "PAY-DEMO-0004": {
    reference: "PAY-DEMO-0004 · fictif",
    orderReference: "CMD-DEMO-0003 · fictif",
    orderHref: "/client/commandes",
    orderStatus: "Paiement en attente · fictif",
    restaurant: "Restaurant Test · fictif",
    operator: "Orange Money · démo",
    recipient: "NUMÉRO FICTIF · non appelable",
    amount: "2 500 FCFA · fictif",
    transactionReference: "REF-OM-DEMO-0004 · fictive",
    sentAt: "Date fictive · exemple",
    status: "rejected",
    history: [
      {
        number: 1,
        submittedAt: "05 nov. 2026 · date fictive",
        status: "rejected",
        reviewedAt: "05 nov. 2026 · décision illustrée",
        reason: "Motif d’exemple : référence de transaction incomplète.",
      },
      {
        number: 2,
        submittedAt: "06 nov. 2026 · date fictive",
        status: "rejected",
        reviewedAt: "06 nov. 2026 · décision illustrée",
        reason: "Motif d’exemple : montant différent du total attendu.",
      },
    ],
  },
};

const statusLabels: Record<PaymentStatus, string> = {
  pending: "En attente",
  validated: "Validé",
  rejected: "Refusé",
};

const statusStyles: Record<PaymentStatus, string> = {
  pending: styles.statusPending,
  validated: styles.statusValidated,
  rejected: styles.statusRejected,
};

const clientNavigation = [
  { label: "Client", icon: "⌂", href: "/client" },
  { label: "Panier", icon: "▣", href: "/client/panier" },
  { label: "Commandes", icon: "▤", href: "/client/commandes" },
  { label: "Paiements", icon: "◆", href: "/client/paiements", active: true },
  { label: "Profil client", icon: "♙", href: "/client/profil" },
] as const;

function PaymentStatus({ status }: { status: PaymentStatus }) {
  return (
    <span className={`${styles.statusBadge} ${statusStyles[status]}`}>
      <span aria-hidden="true" />
      {statusLabels[status]} · fictif
    </span>
  );
}

function FakeReceipt({ payment }: { payment: DemoPayment }) {
  return (
    <div className={styles.receipt}>
      <div className={styles.receiptHeader}>
        <span className={styles.receiptIcon} aria-hidden="true">
          SMS
        </span>
        <span>
          <strong>Message de démonstration</strong>
          <small>Visuel fictif · non reçu</small>
        </span>
        <span className={styles.receiptWatermark}>FICTIF</span>
      </div>
      <div className={styles.receiptBody}>
        <p>Aperçu pédagogique — aucune capture réelle</p>
        <dl>
          <div>
            <dt>Opérateur</dt>
            <dd>{payment.operator}</dd>
          </div>
          <div>
            <dt>Montant d’exemple</dt>
            <dd>{payment.amount}</dd>
          </div>
          <div>
            <dt>Référence fictive</dt>
            <dd>{payment.transactionReference}</dd>
          </div>
        </dl>
        <span className={styles.notReceived}>AUCUNE PREUVE REÇUE</span>
      </div>
    </div>
  );
}

function DemoNotice() {
  return (
    <section className={styles.demoNotice} aria-label="Limites de démonstration">
      <span className={styles.demoIcon} aria-hidden="true">
        i
      </span>
      <div>
        <strong>Écran 18 · démonstration uniquement</strong>
        <p>
          Toutes les références, dates, personnes, montants, statuts et pièces
          visuelles sont fictifs. Aucune preuve réelle n’a été reçue, vérifiée,
          stockée ou téléversée; aucun paiement, compte, API ou notification n’est
          connecté.
        </p>
      </div>
    </section>
  );
}

export function ClientPaymentDetail({ reference }: { reference: string }) {
  const [proofExpanded, setProofExpanded] = useState(false);
  const payment = demoPayments[reference];

  useEffect(() => {
    if (!proofExpanded) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setProofExpanded(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [proofExpanded]);

  return (
    <div className={dashboard.shell}>
      <aside className={dashboard.sidebar} aria-label="Espace client de démonstration">
        <HomeBrand href="/" />
        <p className={dashboard.spaceLabel}>Espace client</p>
        <nav className={dashboard.navigation} aria-label="Navigation client">
          {clientNavigation.map((item) => {
            const className =
              "active" in item && item.active
                ? dashboard.activeNavItem
                : dashboard.navItem;
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
            <Link href="/client/paiements">Liste des paiements</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Détail</span>
          </nav>
          <div className={dashboard.topbarActions}>
            <div
              className={dashboard.searchMock}
              aria-label="Recherche désactivée dans cette maquette"
            >
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
            <h1>Détail d’un paiement</h1>
            <p className={dashboard.intro}>
              Statut, référence et historique illustratifs; aucune opération réelle.
            </p>
            <Link className={dashboard.textAction} href="/client/paiements">
              ← Retour à la liste des paiements
            </Link>
          </div>
          <DemoNotice />

          {payment ? (
            <>
              <section className={styles.paymentOverview} aria-labelledby="payment-title">
                <div className={styles.overviewHeading}>
                  <div>
                    <p className={styles.sectionEyebrow}>Référence de paiement · fictive</p>
                    <h2 id="payment-title">{payment.reference}</h2>
                  </div>
                  <PaymentStatus status={payment.status} />
                </div>
                <dl className={styles.factsGrid}>
                  <div>
                    <dt>Commande associée</dt>
                    <dd>{payment.orderReference}</dd>
                  </div>
                  <div>
                    <dt>Restaurant bénéficiaire</dt>
                    <dd>{payment.restaurant}</dd>
                  </div>
                  <div>
                    <dt>Opérateur</dt>
                    <dd>{payment.operator}</dd>
                  </div>
                  <div>
                    <dt>Montant</dt>
                    <dd>{payment.amount}</dd>
                  </div>
                  <div>
                    <dt>Numéro destinataire historique</dt>
                    <dd>
                      {payment.recipient}
                      <small>Aucun numéro Mobile Money réel n’est affiché.</small>
                    </dd>
                  </div>
                  <div>
                    <dt>Référence de transaction</dt>
                    <dd>{payment.transactionReference}</dd>
                  </div>
                  <div>
                    <dt>Date d’envoi</dt>
                    <dd>{payment.sentAt}</dd>
                  </div>
                </dl>
              </section>

              <div className={styles.detailGrid}>
                <div className={styles.mainStack}>
                  <section className={styles.panel} aria-labelledby="status-title">
                    <div className={styles.panelHeading}>
                      <div>
                        <h2 id="status-title">Deux statuts distincts</h2>
                        <p>Le statut de paiement ne remplace pas celui de la commande.</p>
                      </div>
                    </div>
                    <div className={styles.statusComparison}>
                      <div className={styles.statusCard}>
                        <span>Statut du paiement</span>
                        <PaymentStatus status={payment.status} />
                        <small>
                          État illustratif uniquement; aucune vérification réelle n’a eu lieu.
                        </small>
                      </div>
                      <div className={styles.statusDivider} aria-hidden="true">
                        ≠
                      </div>
                      <div className={styles.statusCard}>
                        <span>Statut de la commande</span>
                        <strong className={styles.orderStatus}>{payment.orderStatus}</strong>
                        <small>
                          Le refus d’un paiement n’annule pas automatiquement la commande.
                        </small>
                      </div>
                    </div>
                  </section>

                  <section className={styles.panel} aria-labelledby="proof-title">
                    <div className={styles.panelHeading}>
                      <div>
                        <h2 id="proof-title">Capture privée · aperçu fictif</h2>
                        <p>Maquette visuelle seulement; aucun fichier n’a été reçu ni stocké.</p>
                      </div>
                      <span className={styles.neutralTag}>Non reçue · démo</span>
                    </div>
                    <div className={styles.proofContent}>
                      <FakeReceipt payment={payment} />
                      <div className={styles.proofActions}>
                        <button
                          className={styles.secondaryButton}
                          onClick={() => setProofExpanded(true)}
                          type="button"
                        >
                          Agrandir l’aperçu fictif
                        </button>
                        {payment.status === "rejected" ? (
                          <button
                            className={styles.disabledButton}
                            disabled
                            title="Le dépôt de fichier est désactivé dans cette démonstration."
                            type="button"
                          >
                            Déposer une nouvelle preuve · désactivé
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </section>

                  <section className={styles.panel} aria-labelledby="history-title">
                    <div className={styles.panelHeading}>
                      <div>
                        <h2 id="history-title">Historique complet des soumissions</h2>
                        <p>{payment.history.length} soumission{payment.history.length > 1 ? "s" : ""} d’exemple · rien n’a été transmis.</p>
                      </div>
                    </div>
                    <ol className={styles.timeline}>
                      {payment.history.map((entry) => (
                        <li className={styles.timelineItem} key={entry.number}>
                          <span className={styles.timelineDot} aria-hidden="true" />
                          <div className={styles.timelineBody}>
                            <div className={styles.timelineTop}>
                              <div>
                                <h3>Soumission fictive n°{entry.number}</h3>
                                <time>{entry.submittedAt}</time>
                              </div>
                              <PaymentStatus status={entry.status} />
                            </div>
                            <p className={styles.timelineNote}>
                              Référence et capture uniquement illustratives; aucune preuve réelle n’a été reçue.
                            </p>
                            {entry.reviewedAt ? (
                              <p className={styles.reviewLine}>
                                <strong>Décision humaine illustrée :</strong> {entry.reviewedAt}. Aucun contrôle réel n’a été effectué.
                              </p>
                            ) : (
                              <p className={styles.reviewLine}>
                                <strong>Vérification humaine :</strong> en attente dans cet exemple; le restaurant bénéficiaire doit comparer la preuve au SMS reçu sur son propre numéro.
                              </p>
                            )}
                            {entry.reason ? (
                              <p className={styles.reason}>
                                <strong>Motif de refus · fictif :</strong> {entry.reason.replace("Motif d’exemple : ", "")}
                              </p>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ol>
                    <p className={styles.historyRule}>
                      Les soumissions antérieures restent dans l’historique et ne sont pas remplacées par une nouvelle preuve.
                    </p>
                  </section>
                </div>

                <aside className={styles.sideStack} aria-label="Informations et actions de démonstration">
                  <section className={styles.panel} aria-labelledby="order-title">
                    <div className={styles.panelHeading}>
                      <div>
                        <h2 id="order-title">Commande associée</h2>
                        <p>Référence fictive · statut conservé séparément</p>
                      </div>
                    </div>
                    <p className={styles.orderReference}>{payment.orderReference}</p>
                    <strong className={styles.orderStatus}>{payment.orderStatus}</strong>
                    <Link className={styles.primaryLink} href={payment.orderHref}>
                      Revenir à la commande <span aria-hidden="true">→</span>
                    </Link>
                  </section>

                  <section className={styles.humanCheck} aria-labelledby="human-check-title">
                    <span className={styles.humanIcon} aria-hidden="true">✓</span>
                    <h2 id="human-check-title">Vérification humaine requise</h2>
                    <p>
                      En situation réelle, seul le restaurant bénéficiaire compare la référence et la capture au SMS reçu sur son numéro Mobile Money avant de valider ou de refuser.
                    </p>
                    <p className={styles.noActionNote}>
                      Ici, aucune preuve n’est reçue et aucune décision n’est prise. Le statut affiché est un exemple fictif.
                    </p>
                  </section>

                  {payment.status === "rejected" ? (
                    <section className={styles.retryNotice} aria-labelledby="retry-title">
                      <h2 id="retry-title">Après un refus · exemple</h2>
                      <p>
                        Une nouvelle transaction et une nouvelle preuve peuvent être présentées dans le parcours réel. Le dépôt reste désactivé ici; aucun ancien élément ne serait effacé.
                      </p>
                      <button className={styles.disabledButton} disabled type="button">
                        Nouvelle soumission indisponible en démo
                      </button>
                    </section>
                  ) : null}
                </aside>
              </div>
            </>
          ) : (
            <section className={styles.panel} aria-labelledby="missing-title">
              <h2 id="missing-title">Paiement introuvable dans les exemples</h2>
              <p>Cette référence ne correspond à aucune donnée fictive de la maquette.</p>
              <Link className={styles.primaryLink} href="/client/paiements">
                Retourner à la liste des paiements
              </Link>
            </section>
          )}
        </main>
      </div>

      {proofExpanded && payment ? (
        <div
          className={styles.modalBackdrop}
          onClick={(event) => {
            if (event.target === event.currentTarget) setProofExpanded(false);
          }}
        >
          <section
            aria-labelledby="proof-dialog-title"
            aria-modal="true"
            className={styles.proofDialog}
            role="dialog"
          >
            <div className={styles.dialogHeading}>
              <div>
                <p className={styles.sectionEyebrow}>Démonstration locale · aucun fichier</p>
                <h2 id="proof-dialog-title">Agrandissement de l’aperçu fictif</h2>
              </div>
              <button
                aria-label="Fermer l’aperçu"
                className={styles.closeButton}
                onClick={() => setProofExpanded(false)}
                type="button"
              >
                ×
              </button>
            </div>
            <FakeReceipt payment={payment} />
            <p className={styles.dialogNote}>
              Cette représentation n’est ni une capture reçue ni un justificatif; elle ne confirme aucun paiement.
            </p>
          </section>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  BadgeCheck,
  CircleAlert,
  ClipboardList,
  Clock3,
  CreditCard,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  Store,
} from "lucide-react";
import { useState } from "react";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../../client/client-dashboard.module.css";
import type {
  DemoPaymentReview,
  PaymentState,
} from "./payment-review-data";
import styles from "./payment-review.module.css";

type MerchantPaymentReviewProps = {
  payment: DemoPaymentReview;
};

function amountLabel(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;
}

function statusLabel(status: PaymentState) {
  if (status === "validated") return "Validé · exemple fictif";
  if (status === "rejected") return "Refusé · exemple fictif";
  return "En attente de vérification";
}

function statusClass(status: PaymentState) {
  if (status === "validated") return styles.statusValidated;
  if (status === "rejected") return styles.statusRejected;
  return styles.statusPending;
}

export function MerchantPaymentReview({
  payment,
}: MerchantPaymentReviewProps) {
  const [reason, setReason] = useState("");
  const [localDecision, setLocalDecision] = useState<
    Extract<PaymentState, "validated" | "rejected"> | null
  >(null);
  const [refusalError, setRefusalError] = useState("");
  const [decisionMessage, setDecisionMessage] = useState("");
  const currentStatus = localDecision ?? payment.status;
  const canReview = payment.status === "pending" && localDecision === null;

  function validateLocally() {
    setRefusalError("");
    setLocalDecision("validated");
    setDecisionMessage(
      "Décision humaine simulée localement. Aucun paiement, stock ou notification n’a été modifié; ce choix disparaît au rechargement.",
    );
  }

  function rejectLocally() {
    const trimmedReason = reason.trim();
    if (trimmedReason.length < 3) {
      setRefusalError("Un motif fictif est obligatoire pour illustrer un refus.");
      setDecisionMessage("");
      return;
    }

    setRefusalError("");
    setLocalDecision("rejected");
    setDecisionMessage(
      `Refus humain simulé localement · motif d’exemple : ${trimmedReason}. Aucun paiement, stock ou notification n’a été modifié; ce choix disparaît au rechargement.`,
    );
  }

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
          <Link className={dashboard.navItem} href="/commercant/commandes">
            <ClipboardList aria-hidden="true" size={15} />
            <span>Commandes</span>
          </Link>
          <Link
            aria-current="page"
            className={dashboard.activeNavItem}
            href="/commercant/paiements"
          >
            <CreditCard aria-hidden="true" size={15} />
            <span>Paiements</span>
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
            <Link href="/commercant/paiements">Liste des paiements</Link>
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
            <h1>Détail et vérification d’un paiement</h1>
            <p className={dashboard.intro}>
              Comparez les informations fictives avec le SMS reçu par le restaurant bénéficiaire.
            </p>
          </div>

          <div className={styles.demoNotice} role="note">
            <span className={styles.noticeIcon} aria-hidden="true">
              <ShieldCheck size={18} />
            </span>
            <p>
              <strong>Vérification humaine obligatoire · démonstration locale</strong>
              <span>
                Aucune capture réelle n’est affichée. Aucun paiement, traitement automatique,
                téléversement, appel externe ou notification n’est effectué.
              </span>
            </p>
            <span className={styles.demoTag}>Données fictives</span>
          </div>

          <div className={styles.reviewColumns}>
            <div className={styles.primaryColumn}>
              <section className={styles.panel} aria-labelledby="payment-details-title">
                <div className={styles.panelHeading}>
                  <div>
                    <p className={styles.panelKicker}>Référence fictive</p>
                    <h2 id="payment-details-title">Paiement {payment.reference}</h2>
                  </div>
                  <span className={`${styles.statusBadge} ${statusClass(currentStatus)}`}>
                    <span aria-hidden="true">●</span>
                    {statusLabel(currentStatus)}
                  </span>
                </div>

                <dl className={styles.factsGrid}>
                  <div>
                    <dt>Type</dt>
                    <dd>Paiement de commande · fictif</dd>
                  </div>
                  <div>
                    <dt>Commande</dt>
                    <dd>
                      <Link href={`/commercant/commandes/${payment.orderId}`}>
                        {payment.orderReference} · fictive
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt>Client</dt>
                    <dd>{payment.customer}</dd>
                  </div>
                  <div>
                    <dt>Restaurant bénéficiaire</dt>
                    <dd>{payment.restaurant}</dd>
                  </div>
                  <div>
                    <dt>Montant attendu</dt>
                    <dd className={styles.amount}>{amountLabel(payment.amount)} · fictif</dd>
                  </div>
                  <div>
                    <dt>Opérateur</dt>
                    <dd>{payment.operator}</dd>
                  </div>
                  <div>
                    <dt>Bénéficiaire</dt>
                    <dd>{payment.beneficiary}</dd>
                  </div>
                  <div>
                    <dt>Référence de transaction</dt>
                    <dd>{payment.transactionReference} · fictive</dd>
                  </div>
                  <div>
                    <dt>Date de soumission</dt>
                    <dd>{payment.submittedAt}</dd>
                  </div>
                  <div>
                    <dt>État du paiement</dt>
                    <dd>{statusLabel(currentStatus)}</dd>
                  </div>
                </dl>
              </section>

              <section className={styles.panel} aria-labelledby="proof-title">
                <div className={styles.panelHeading}>
                  <div>
                    <h2 id="proof-title">Capture du SMS de confirmation</h2>
                    <p className={styles.panelKicker}>Référence fictive · aucun fichier</p>
                  </div>
                  <FileText aria-hidden="true" className={styles.headingIcon} size={19} />
                </div>
                <div className={styles.proofPlaceholder}>
                  <span className={styles.proofIcon} aria-hidden="true">
                    <FileText size={19} />
                  </span>
                  <span className={styles.proofCopy}>
                    <strong>Capture fictive · non consultable</strong>
                    <small>{payment.proofReference} · aucun fichier réel</small>
                  </span>
                  <span className={styles.proofTag}>Aperçu texte</span>
                </div>
                <p className={styles.panelFootnote}>
                  Aucun justificatif n’est reçu, consultable ou téléversé. Le commerçant
                  compare manuellement ces valeurs d’exemple au SMS qu’il a reçu sur son
                  propre numéro bénéficiaire, qui n’est pas affiché ici.
                </p>
              </section>

              <section className={styles.panel} aria-labelledby="history-title">
                <div className={styles.panelHeading}>
                  <div>
                    <h2 id="history-title">Historique des soumissions</h2>
                    <p className={styles.panelKicker}>Append-only · exemple fictif</p>
                  </div>
                  <Clock3 aria-hidden="true" className={styles.headingIcon} size={19} />
                </div>
                <ol className={styles.historyList}>
                  {payment.history.map((submission) => (
                    <li className={styles.historyItem} key={submission.number}>
                      <div className={styles.historyItemHeading}>
                        <strong>
                          Soumission {submission.number} · {statusLabel(submission.state)}
                        </strong>
                        <span>{submission.date}</span>
                      </div>
                      <dl className={styles.historyFacts}>
                        <div>
                          <dt>Référence de transaction</dt>
                          <dd>{submission.transactionReference} · fictive</dd>
                        </div>
                        <div>
                          <dt>Référence de preuve</dt>
                          <dd>{submission.proofReference} · fictive</dd>
                        </div>
                        <div>
                          <dt>Décisionnaire</dt>
                          <dd>{submission.reviewer}</dd>
                        </div>
                      </dl>
                      <p>{submission.reason}</p>
                    </li>
                  ))}
                </ol>
                <p className={styles.panelFootnote}>
                  Dans le flux réel, une preuve corrigée s’ajoute à l’historique sans
                  remplacer la précédente. Ici, aucun dépôt ni historique n’est enregistré.
                </p>
              </section>
            </div>

            <aside className={styles.secondaryColumn} aria-label="Vérification manuelle">
              <section className={styles.guidancePanel}>
                <div className={styles.guidanceHeading}>
                  <Store aria-hidden="true" size={18} />
                  <h2>Vérifier le bon circuit</h2>
                </div>
                <p>
                  Le restaurant bénéficiaire compare la référence et le montant au SMS reçu
                  sur son numéro Mobile Money. Seul ce bénéficiaire prend la décision; aucune
                  autre partie ne le remplace.
                </p>
                <p className={styles.guidanceEmphasis}>
                  Une preuve déposée seule ne confirme jamais un paiement automatiquement.
                </p>
              </section>

              <section className={styles.panel} aria-labelledby="decision-title">
                <div className={styles.panelHeading}>
                  <div>
                    <h2 id="decision-title">Décision réservée au bénéficiaire</h2>
                    <p className={styles.panelKicker}>Motif requis en cas de refus</p>
                  </div>
                  <BadgeCheck aria-hidden="true" className={styles.headingIcon} size={19} />
                </div>

                {canReview ? (
                  <>
                    <label className={styles.reasonLabel} htmlFor="demo-rejection-reason">
                      Motif fictif si vous refusez
                    </label>
                    <textarea
                      aria-describedby={refusalError ? "refusal-error" : "reason-help"}
                      aria-invalid={refusalError ? "true" : undefined}
                      autoComplete="off"
                      className={styles.reasonField}
                      id="demo-rejection-reason"
                      maxLength={180}
                      onChange={(event) => {
                        setReason(event.target.value);
                        if (refusalError) setRefusalError("");
                      }}
                      placeholder="Exemple fictif — aucun motif n’est enregistré"
                      value={reason}
                    />
                    <p className={styles.fieldHelp} id="reason-help">
                      Le refus exige un motif. Les deux boutons ne modifient que cet aperçu
                      local et temporaire.
                    </p>
                    {refusalError && (
                      <p className={styles.fieldError} id="refusal-error" role="alert">
                        {refusalError}
                      </p>
                    )}
                    <div className={styles.decisionActions}>
                      <button className={styles.validateButton} onClick={validateLocally} type="button">
                        Valider après vérification
                      </button>
                      <button className={styles.rejectButton} onClick={rejectLocally} type="button">
                        Refuser avec un motif
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.readOnlyState}>
                    <BadgeCheck aria-hidden="true" size={19} />
                    <p>
                      {localDecision
                        ? "Décision de démonstration affichée localement; elle n’a pas été enregistrée."
                        : "Cet exemple est déjà marqué comme traité; aucune action réelle n’est disponible."}
                    </p>
                  </div>
                )}

                {decisionMessage && (
                  <p className={styles.decisionMessage} role="status" aria-live="polite">
                    {decisionMessage}
                  </p>
                )}
                {!canReview && !localDecision && (
                  <p className={styles.panelFootnote}>
                    État d’exemple uniquement · aucune transaction, notification ou donnée réelle.
                  </p>
                )}
              </section>

              <section className={styles.rulePanel} aria-labelledby="reservation-title">
                <div className={styles.ruleHeading}>
                  <CircleAlert aria-hidden="true" size={18} />
                  <h2 id="reservation-title">Effet sur la réservation</h2>
                </div>
                <p>
                  Règle métier : une validation humaine consomme le stock réservé; un refus le
                  libère avant consommation. Cette maquette ne change aucun stock, commande ou
                  paiement.
                </p>
              </section>
            </aside>
          </div>

          <div className={styles.footerNote} role="note">
            <ShieldCheck aria-hidden="true" size={17} />
            <p>
              Décision réservée au restaurant bénéficiaire. Les valeurs ci-dessus sont
              fictives; la vérification, la persistance et toute notification sont absentes.
            </p>
          </div>

          <nav className={styles.screenNavigation} aria-label="Navigation des écrans commerçant">
            <Link href="/commercant/paiements">← Retour à l’écran 34 · Liste des paiements</Link>
            <span>Écran 35 sur 53 · Démonstration locale</span>
          </nav>
        </main>
      </div>
    </div>
  );
}

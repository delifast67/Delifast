"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  Clock3,
  FileText,
  Info,
  Package,
  ShieldCheck,
} from "lucide-react";
import type { MerchantOrder, RefundStatus } from "./orders-data";
import styles from "./order-detail.module.css";

type MerchantOrderDetailProps = {
  order: MerchantOrder;
};

const refundStates: {
  code: RefundStatus;
  title: string;
  description: string;
  tone: "neutral" | "warning" | "success" | "danger";
}[] = [
  {
    code: "not_required",
    title: "Non requis",
    description: "Aucun paiement validé, donc aucun remboursement à exécuter.",
    tone: "neutral",
  },
  {
    code: "pending",
    title: "Attendu",
    description: "Le commerçant rembourse directement le client, s’il y a lieu.",
    tone: "warning",
  },
  {
    code: "proof_submitted",
    title: "Preuve transmise",
    description: "La référence et la preuve attendent une vérification humaine.",
    tone: "warning",
  },
  {
    code: "verified",
    title: "Vérifié",
    description: "Une personne a confirmé la preuve; la démo ne fait pas cette vérification.",
    tone: "success",
  },
  {
    code: "rejected",
    title: "Rejeté",
    description: "Le motif est transmis au commerçant; l’annulation reste en attente.",
    tone: "danger",
  },
];

function formatAmount(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;
}

function refundTone(status: RefundStatus) {
  if (status === "verified") return styles.statusSuccess;
  if (status === "rejected") return styles.statusDanger;
  if (status === "not_required") return styles.statusNeutral;
  return styles.statusWarning;
}

export function MerchantOrderDetail({ order }: MerchantOrderDetailProps) {
  const [proposedItem, setProposedItem] = useState(order.proposedItem);
  const [proposedAmount, setProposedAmount] = useState(String(order.proposedAmount));
  const [proposalPreviewed, setProposalPreviewed] = useState(false);
  const [stopPreviewed, setStopPreviewed] = useState(false);
  const [resumePreviewed, setResumePreviewed] = useState(false);
  const [refundPreviewed, setRefundPreviewed] = useState(false);

  const proposedAmountValue = Number.parseInt(proposedAmount, 10);
  const proposalIsValid =
    Number.isFinite(proposedAmountValue) && proposedAmountValue >= 0 && proposedItem.trim().length > 0;
  const amountDifference = proposalIsValid ? proposedAmountValue - order.totalPaid : 0;
  const canPropose = order.status !== "completed";
  const hasCancellation = order.status !== "completed";

  return (
    <>
      <div className={styles.demoNotice} role="note">
        <span className={styles.noticeIcon} aria-hidden="true">
          <Info size={16} />
        </span>
        <p className={styles.noticeCopy}>
          <strong>Démonstration locale uniquement</strong>
          <span>
            Références et actions fictives. Rien n’est enregistré ni transmis : aucun paiement,
            remboursement, message, notification ou téléversement réel.
          </span>
        </p>
        <span className={styles.demoTag}>Données fictives</span>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.stack}>
          <section className={styles.card} aria-labelledby="order-overview-title">
            <div className={styles.cardHeading}>
              <div>
                <p className={styles.cardEyebrow}>Commande · {order.reference} · fictif</p>
                <h2 id="order-overview-title">Informations de la commande</h2>
                <p className={styles.cardSubtitle}>{order.store} · commerce fictif</p>
              </div>
              <span className={`${styles.statusPill} ${styles.statusWarning}`}>
                <Clock3 aria-hidden="true" size={13} /> {order.statusLabel} · démo
              </span>
            </div>

            <dl className={styles.factsGrid}>
              <div className={styles.fact}>
                <dt>Client</dt>
                <dd>{order.customer} · fictif</dd>
              </div>
              <div className={styles.fact}>
                <dt>Date</dt>
                <dd>{order.date} · exemple</dd>
              </div>
              <div className={styles.fact}>
                <dt>Mode de réception</dt>
                <dd>{order.receiptMode}</dd>
              </div>
              <div className={styles.fact}>
                <dt>Statut de la commande</dt>
                <dd>{order.orderStatus}</dd>
              </div>
              <div className={styles.fact}>
                <dt>Préparation</dt>
                <dd>{order.preparationStatus}</dd>
              </div>
              <div className={styles.fact}>
                <dt>Paiement · statut distinct</dt>
                <dd>{order.paymentStatus} · démo</dd>
              </div>
              <div className={styles.fact}>
                <dt>Opérateur · exemple</dt>
                <dd>{order.paymentOperator}</dd>
              </div>
              <div className={styles.fact}>
                <dt>Référence de paiement</dt>
                <dd>{order.paymentReference}</dd>
              </div>
            </dl>

            <p className={styles.paymentNotice}>
              <ShieldCheck aria-hidden="true" size={16} />
              <span>
                La preuve de paiement est vérifiée humainement par le commerce bénéficiaire. Le statut
                illustré ici ne valide aucune transaction réelle.
              </span>
            </p>
          </section>

          <section className={styles.card} aria-labelledby="snapshot-title">
            <div className={styles.cardHeading}>
              <div>
                <h2 id="snapshot-title">Articles et composition historique</h2>
                <p className={styles.cardSubtitle}>
                  Les noms, options, quantités et prix restent ceux de la commande fictive.
                </p>
              </div>
              <span className={`${styles.statusPill} ${styles.statusSuccess}`}>
                <Check aria-hidden="true" size={13} /> Snapshot illustré
              </span>
            </div>

            <div className={styles.lineList}>
              {order.items.map((item) => (
                <article className={styles.orderLine} key={item.name}>
                  <div className={styles.lineCopy}>
                    <strong>{item.name}</strong>
                    {item.details.map((detail) => <span key={detail}>{detail}</span>)}
                    {item.note ? (
                      <em className={item.cancelled ? styles.cancelledNote : styles.lineNote}>
                        {item.note}
                      </em>
                    ) : null}
                  </div>
                  <strong className={styles.lineAmount}>{formatAmount(item.amount)}</strong>
                </article>
              ))}
            </div>
            <p className={styles.footnote}>
              Chaque somme et chaque option sont des valeurs de démonstration. Les ajustements
              historiques ne sont pas recalculés à partir du catalogue actuel.
            </p>
          </section>

          <section className={styles.card} aria-labelledby="proposal-title">
            <div className={styles.cardHeading}>
              <div>
                <h2 id="proposal-title">Article indisponible pendant la préparation</h2>
                <p className={styles.cardSubtitle}>
                  Proposer un retrait ou un remplacement; ne jamais modifier la commande seul.
                </p>
              </div>
              <span className={`${styles.statusPill} ${styles.statusWarning}`}>
                pending_customer_approval · exemple
              </span>
            </div>

            <p className={styles.ruleIntro}>
              <strong>Ancienne composition conservée :</strong> Frites · accompagnement · exemple fictif.
              Toute proposition attend l’accord explicite du client.
            </p>

            {canPropose ? (
              <>
                <div className={styles.proposalFields}>
                  <div className={styles.field}>
                    <label htmlFor="proposed-item">Nouvelle composition proposée</label>
                    <input
                      autoComplete="off"
                      id="proposed-item"
                      onChange={(event) => {
                        setProposedItem(event.target.value);
                        setProposalPreviewed(false);
                      }}
                      value={proposedItem}
                    />
                    <small>Exemple uniquement · aucun article n’est retiré ou remplacé ici.</small>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="proposed-amount">Nouveau montant proposé · FCFA</label>
                    <input
                      id="proposed-amount"
                      min="0"
                      onChange={(event) => {
                        setProposedAmount(event.target.value);
                        setProposalPreviewed(false);
                      }}
                      step="100"
                      type="number"
                      value={proposedAmount}
                    />
                    <small>Montant actuel · {formatAmount(order.totalPaid)} · fictif</small>
                  </div>
                </div>

                <div className={styles.proposalComparison} aria-live="polite">
                  <div>
                    <small>Montant actuel</small>
                    <strong>{formatAmount(order.totalPaid)}</strong>
                  </div>
                  <span aria-hidden="true">→</span>
                  <div>
                    <small>Montant proposé</small>
                    <strong>{proposalIsValid ? formatAmount(proposedAmountValue) : "Montant à vérifier"}</strong>
                  </div>
                  <span className={`${styles.deltaPill} ${amountDifference > 0 ? styles.deltaUp : styles.deltaDown}`}>
                    {amountDifference > 0
                      ? `+ ${formatAmount(amountDifference)}`
                      : amountDifference < 0
                        ? `− ${formatAmount(Math.abs(amountDifference))}`
                        : "Montant inchangé"}
                  </span>
                </div>

                <div className={styles.ruleGrid}>
                  <div className={styles.ruleCard}>
                    <strong>Si le montant augmente</strong>
                    <span>
                      Accord explicite du client requis. Le paiement complémentaire doit être effectué
                      puis vérifié humainement avant toute poursuite.
                    </span>
                  </div>
                  <div className={styles.ruleCard}>
                    <strong>Si le montant baisse après paiement</strong>
                    <span>
                      Le commerçant rembourse directement la différence; Delifast n’exécute pas le
                      remboursement et une personne vérifie la preuve.
                    </span>
                  </div>
                </div>

                <button
                  className={styles.primaryButton}
                  disabled={!proposalIsValid}
                  onClick={() => setProposalPreviewed(true)}
                  type="button"
                >
                  Prévisualiser la proposition · local
                </button>
                {proposalPreviewed ? (
                  <p className={styles.localMessage} role="status">
                    <Info aria-hidden="true" size={15} />
                    Aperçu local prêt : rien n’a été envoyé, enregistré ou modifié. Le client devrait
                    donner son accord explicite avant tout changement.
                  </p>
                ) : null}
              </>
            ) : (
              <p className={styles.localMessage} role="note">
                Cette commande est terminée dans l’exemple; aucune proposition ne peut être prévisualisée.
              </p>
            )}
          </section>

          <section className={styles.card} aria-labelledby="cancellation-title">
            <div className={styles.cardHeading}>
              <div>
                <h2 id="cancellation-title">Après un refus · annulation et remboursement</h2>
                <p className={styles.cardSubtitle}>Étapes successives du registre, pas des états simultanés.</p>
              </div>
              <span className={`${styles.statusPill} ${refundTone(order.refundStatus)}`}>
                {order.status === "completed" ? "Aucune annulation · démo" : "cancellation_pending · exemple"}
              </span>
            </div>

            <p className={styles.workflowIntro}>
              Après le refus d’une proposition, <strong>le client choisit</strong> l’annulation totale ou
              les seuls articles concernés. Si un remboursement est nécessaire, le commerçant le fait
              directement; la preuve est vérifiée humainement. Une preuve déposée ou un remboursement
              déclaré ne finalise pas automatiquement l’annulation.
            </p>

            <div className={styles.workflowSteps}>
              <article className={styles.workflowStep}>
                <span className={styles.stepNumber}>1</span>
                <div>
                  <small>Après le refus du client</small>
                  <strong>Le client choisit le périmètre</strong>
                  <span>{order.scopeLabel}. Le commerçant ne choisit pas à sa place.</span>
                </div>
              </article>
              <article className={styles.workflowStep}>
                <span className={styles.stepNumber}>2</span>
                <div>
                  <small>Si la préparation a commencé</small>
                  <strong>Arrêt confirmé par le commerçant</strong>
                  <span>Les articles concernés restent suspendus pendant le traitement.</span>
                </div>
              </article>
              <article className={styles.workflowStep}>
                <span className={styles.stepNumber}>3</span>
                <div>
                  <small>Remboursement direct, si requis</small>
                  <strong>Référence et preuve · vérification humaine</strong>
                  <span>Le dépôt ne suffit pas à finaliser l’annulation.</span>
                </div>
              </article>
            </div>

            {hasCancellation && order.preparationStarted && order.status === "cancellation_pending" ? (
              <div className={styles.confirmBox}>
                <div>
                  <strong>À l’ouverture de l’annulation · préparation commencée</strong>
                  <span>Confirmer l’arrêt avant le traitement; cette confirmation est illustrée localement.</span>
                </div>
                <button
                  className={styles.secondaryButton}
                  onClick={() => setStopPreviewed(true)}
                  type="button"
                >
                  Prévisualiser la confirmation d’arrêt
                </button>
                {stopPreviewed ? (
                  <p className={styles.localMessage} role="status">
                    Arrêt illustré localement uniquement; la préparation réelle n’a pas été arrêtée.
                  </p>
                ) : null}
              </div>
            ) : null}

            {order.status === "partially_cancelled" ? (
              <div className={styles.confirmBox}>
                <div>
                  <strong>Après finalisation partielle</strong>
                  <span>Le commerçant peut confirmer la reprise des articles restants, sans action réelle ici.</span>
                </div>
                <button
                  className={styles.secondaryButton}
                  onClick={() => setResumePreviewed(true)}
                  type="button"
                >
                  Prévisualiser la reprise · local
                </button>
                {resumePreviewed ? (
                  <p className={styles.localMessage} role="status">
                    Reprise illustrée localement; aucun statut, stock ou traitement réel n’a changé.
                  </p>
                ) : null}
              </div>
            ) : null}

            {order.status === "completed" ? (
              <p className={styles.localMessage} role="note">
                Une commande totalement annulée ne reprend pas sa préparation. Cet exemple est déjà terminé.
              </p>
            ) : null}

            <div className={styles.cancellationAmounts}>
              <article>
                <h3>Annulation totale</h3>
                <p>
                  Après paiement validé, le remboursement porte sur le montant réellement payé :
                  <strong> {formatAmount(order.totalPaid)}</strong> dans cet exemple.
                </p>
                <small>Après vérification positive : commande annulée; aucune reprise de préparation.</small>
              </article>
              <article>
                <h3>Annulation partielle · exemple</h3>
                <p>
                  Une unité ciblée : (3 000 + 500 − 500 − 300) × 1 = <strong>2 700 FCFA</strong>.
                </p>
                <small>
                  Les frais partagés fixés par le commerce restent inchangés. Après finalisation,
                  confirmer la reprise des articles restants.
                </small>
              </article>
            </div>

            <div className={styles.refundSection}>
              <div className={styles.subHeading}>
                <h3>États de remboursement</h3>
                <span>Une preuve déposée ne finalise pas l’annulation.</span>
              </div>
              <div className={styles.refundStateGrid}>
                {refundStates.map((item) => (
                  <article
                    className={`${styles.refundState} ${styles[`refundTone_${item.tone}`]}`}
                    key={item.code}
                  >
                    <code>{item.code}</code>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </article>
                ))}
              </div>
            </div>

            {order.refundAmount > 0 ? (
              <div className={styles.refundPanel}>
                <div className={styles.cardHeading}>
                  <div>
                    <h3>Remboursement direct · commerçant</h3>
                    <p className={styles.cardSubtitle}>Valeurs d’exemple · aucun transfert n’est déclenché.</p>
                  </div>
                  <span className={`${styles.statusPill} ${refundTone(order.refundStatus)}`}>
                    {order.refundLabel}
                  </span>
                </div>
                <dl className={styles.refundFacts}>
                  <div>
                    <dt>Montant illustratif</dt>
                    <dd>{formatAmount(order.refundAmount)} · fictif</dd>
                  </div>
                  <div>
                    <dt>Référence fictive</dt>
                    <dd>{order.refundReference}</dd>
                  </div>
                  <div>
                    <dt>État courant illustré</dt>
                    <dd>{order.refundStatus}</dd>
                  </div>
                </dl>
                <p className={styles.reasonBox}>
                  <AlertTriangle aria-hidden="true" size={15} />
                  <span>
                    <strong>Motif d’exemple :</strong> {order.refundReason} Seul l’administrateur vérifie
                    les preuves de remboursement; un refus ne finalise pas l’annulation.
                  </span>
                </p>
                {order.status !== "completed" ? (
                  <>
                    <button
                      className={styles.secondaryButton}
                      onClick={() => setRefundPreviewed(true)}
                      type="button"
                    >
                      Prévisualiser un renvoi corrigé · local
                    </button>
                    {refundPreviewed ? (
                      <p className={styles.localMessage} role="status">
                        Aperçu local uniquement. Aucun fichier n’a été choisi ou téléversé; aucune preuve
                        n’a été transmise ni ajoutée à l’historique.
                      </p>
                    ) : null}
                  </>
                ) : null}
                <p className={styles.uploadNotice}>
                  <FileText aria-hidden="true" size={15} />
                  Téléversement désactivé dans cette démo. La référence fictive n’est pas une preuve de paiement.
                </p>
              </div>
            ) : (
              <p className={styles.localMessage} role="note">
                Remboursement : {order.refundLabel}. Aucun paiement validé à rembourser dans cet exemple.
              </p>
            )}
          </section>

          <section className={styles.card} aria-labelledby="reservation-title">
            <div className={styles.cardHeading}>
              <div>
                <h2 id="reservation-title">Réservation de stock · rappel illustratif</h2>
                <p className={styles.cardSubtitle}>Exemple de règle distinct, non rattaché à une commande réelle.</p>
              </div>
              <span className={`${styles.statusPill} ${styles.statusNeutral}`}>
                <Package aria-hidden="true" size={13} /> Aucune réservation réelle
              </span>
            </div>
            <div className={styles.reservationNote}>
              <strong>Libération manuelle uniquement</strong>
              <span>
                Une réservation active peut être libérée avec un motif si les règles le permettent; une
                réservation consommée n’est pas libérée comme active et n’expire pas automatiquement.
                Aucun stock n’est modifié ici.
              </span>
            </div>
          </section>

          <section className={styles.card} aria-labelledby="history-title">
            <div className={styles.cardHeading}>
              <div>
                <h2 id="history-title">Historique de commande</h2>
                <p className={styles.cardSubtitle}>Exemples fictifs · aucun message réel</p>
              </div>
              <span className={`${styles.statusPill} ${styles.statusNeutral}`}>Lecture seule · démo</span>
            </div>
            <ol className={styles.historyList}>
              {order.history.map((item) => (
                <li className={styles.historyItem} key={`${item.date}-${item.title}`}>
                  <span className={styles.historyMarker} aria-hidden="true" />
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.date}</small>
                    <span>{item.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
            <p className={styles.footnote}>
              Toute vraie transition d’état et toute notification exigeraient le service applicatif approprié;
              rien n’est simulé comme effectivement envoyé par cette page.
            </p>
          </section>
        </div>

        <aside className={styles.stack} aria-label="Résumé financier et règles">
          <section className={styles.card} aria-labelledby="summary-title">
            <div className={styles.cardHeading}>
              <div>
                <h2 id="summary-title">Résumé</h2>
                <p className={styles.cardSubtitle}>Montants d’exemple · fictifs</p>
              </div>
            </div>
            <div className={styles.summaryLine}>
              <span>Articles après remises</span>
              <strong>{formatAmount(order.itemsSubtotal)}</strong>
            </div>
            <div className={styles.summaryLine}>
              <span>Frais partagés · commerce</span>
              <strong>{formatAmount(order.sharedFees)}</strong>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total effectivement payé · exemple</span>
              <strong>{formatAmount(order.totalPaid)}</strong>
            </div>
            <p className={styles.summaryNote}>
              Tous les frais éventuels sont définis par le commerce. Delifast ne fournit aucun service de livraison.
            </p>
            <div className={styles.summaryRefund}>
              <span>{order.scopeLabel}</span>
              <strong>
                {order.refundAmount > 0 ? formatAmount(order.refundAmount) : "Aucun remboursement"}
              </strong>
              <small>{order.refundLabel}</small>
            </div>
          </section>

          <section className={styles.card} aria-labelledby="refund-control-title">
            <div className={styles.cardHeading}>
              <h2 id="refund-control-title">Contrôle du remboursement</h2>
            </div>
            <p className={styles.ruleIntro}>
              <strong>Pas de remboursement automatique.</strong> Le commerçant effectue directement le
              remboursement, puis une preuve est vérifiée humainement. Delifast n’exécute pas le transfert.
            </p>
            <div className={styles.summaryChecklist}>
              <span><Check aria-hidden="true" size={14} /> Montant et référence fictifs</span>
              <span><Check aria-hidden="true" size={14} /> Aucune décision automatique</span>
              <span><Check aria-hidden="true" size={14} /> Aucun fichier envoyé</span>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

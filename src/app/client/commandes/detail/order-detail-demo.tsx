"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./order-detail.module.css";

type ResponseChoice = "pending" | "accepted" | "rejected";
type CancellationScope = "total" | "partial";

const refundStates = [
  {
    code: "not_required",
    title: "Non requis",
    text: "Aucun remboursement nécessaire si aucun paiement n’a été validé.",
    tone: "neutral",
  },
  {
    code: "pending",
    title: "Attendu",
    text: "Le commerçant doit rembourser directement le client.",
    tone: "warning",
  },
  {
    code: "proof_submitted",
    title: "Preuve transmise",
    text: "La référence et la preuve attendent une vérification.",
    tone: "warning",
  },
  {
    code: "verified",
    title: "Vérifié",
    text: "La preuve a été vérifiée positivement par Delifast.",
    tone: "success",
  },
  {
    code: "rejected",
    title: "Rejeté",
    text: "Motif obligatoire; l’annulation reste en attente de régularisation.",
    tone: "danger",
  },
] as const;

export function ClientOrderDetailDemo() {
  const [response, setResponse] = useState<ResponseChoice>("pending");
  const [scope, setScope] = useState<CancellationScope | null>(null);
  const [scopePreviewed, setScopePreviewed] = useState(false);

  function chooseResponse(choice: Exclude<ResponseChoice, "pending">) {
    setResponse(choice);
    setScope(null);
    setScopePreviewed(false);
  }

  return (
    <div className={styles.detailGrid}>
      <div className={styles.primaryStack}>
        <section className={styles.panel} aria-labelledby="order-overview-title">
          <div className={styles.panelHeading}>
            <div>
              <h2 id="order-overview-title">Commande #DF-24018</h2>
              <p className={styles.panelSub}>Référence fictive · exemple de démonstration</p>
            </div>
            <span className={`${styles.statusPill} ${styles.statusWarning}`}>
              <span aria-hidden="true">●</span> Préparation commencée · démo
            </span>
          </div>
          <dl className={styles.factsGrid}>
            <div className={styles.fact}>
              <dt>Commerce unique</dt>
              <dd>Saveurs du Faso · fictif</dd>
            </div>
            <div className={styles.fact}>
              <dt>Client</dt>
              <dd>Client Démo</dd>
            </div>
            <div className={styles.fact}>
              <dt>Date</dt>
              <dd>06 nov. 2026 · exemple</dd>
            </div>
            <div className={styles.fact}>
              <dt>Mode de réception</dt>
              <dd>Retrait · démonstration</dd>
            </div>
            <div className={styles.fact}>
              <dt>Statut de la commande</dt>
              <dd>Préparation commencée · fictif</dd>
            </div>
            <div className={styles.fact}>
              <dt>Préparation</dt>
              <dd>Commencée · exemple</dd>
            </div>
          </dl>
          <Link className={styles.inlineLink} href="/client/paiements/PAY-DEMO-0001">
            Consulter le paiement <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className={styles.panel} aria-labelledby="snapshot-title">
          <div className={styles.panelHeading}>
            <div>
              <h2 id="snapshot-title">Articles et composition historique</h2>
              <p className={styles.panelSub}>Les noms, options, quantités et prix restent ceux de la commande.</p>
            </div>
            <span className={`${styles.statusPill} ${styles.statusSuccess}`}>
              <span aria-hidden="true">●</span> Snapshot conservé
            </span>
          </div>

          <article className={styles.orderLine}>
            <div className={styles.orderLeft}>
              <strong>Poulet braisé × 2 · fictif</strong>
              <span>Prix de base : 3 000 FCFA par unité</span>
              <span>Option · supplément : 500 FCFA par unité</span>
              <span>Remise de ligne : 1 000 FCFA au total · 500 par unité</span>
              <span>Remise globale allouée : 600 FCFA · 300 par unité</span>
              <em>Prix net historique : 2 700 FCFA par unité · une unité ciblée dans l’exemple</em>
            </div>
            <strong className={styles.lineTotal}>5 400 FCFA</strong>
          </article>

          <article className={styles.orderLine}>
            <div className={styles.orderLeft}>
              <strong>Menu du jour × 1 · fictif</strong>
              <span>Prix historique : 4 000 FCFA</span>
              <span>Remise globale allouée : 400 FCFA</span>
              <em className={styles.remainingLine}>Prix net historique : 3 600 FCFA · article restant</em>
            </div>
            <strong className={styles.lineTotal}>3 600 FCFA</strong>
          </article>
          <p className={styles.footnote}>
            Remise globale totale : 1 000 FCFA, répartie au prorata des montants après ajustements propres aux
            articles (6 000 / 4 000), puis figée dans le snapshot. Les valeurs sont fictives.
          </p>
        </section>

        <section className={styles.panel} aria-labelledby="proposal-title">
          <div className={styles.panelHeading}>
            <div>
              <h2 id="proposal-title">Proposition du commerce</h2>
              <p className={styles.panelSub}>Aucun article n’est retiré ou remplacé sans votre accord explicite.</p>
            </div>
            <span className={`${styles.statusPill} ${response === "pending" ? styles.statusWarning : response === "accepted" ? styles.statusSuccess : styles.statusDanger}`}>
              {response === "pending" ? "pending_customer_approval" : response === "accepted" ? "accepted · aperçu" : "rejected · aperçu"}
            </span>
          </div>

          <p className={styles.reasonLine}>
            <strong>Motif de la demande · exemple fictif :</strong> l’accompagnement choisi est indisponible pendant
            la préparation.
          </p>

          <div className={styles.proposalGrid}>
            <div className={styles.proposalChoice}>
              <strong>Composition actuelle · snapshot</strong>
              <span>Frites · accompagnement</span>
              <small>Commande #DF-24018 · composition conservée</small>
            </div>
            <div className={styles.proposalChoice}>
              <strong>Nouvelle composition proposée</strong>
              <span>Riz · accompagnement</span>
              <small>Retrait ou remplacement proposé par le commerce</small>
            </div>
          </div>

          <div className={styles.proposalTotal} aria-label="Comparaison des montants fictifs">
            <div>
              <small>Montant actuel · exemple</small>
              <strong>10 000 FCFA</strong>
            </div>
            <span aria-hidden="true">→</span>
            <div>
              <small>Nouveau montant proposé</small>
              <strong>9 500 FCFA</strong>
            </div>
            <span className={`${styles.statusPill} ${styles.statusDanger}`}>− 500 FCFA</span>
          </div>

          {response === "pending" ? (
            <div className={styles.proposalActions}>
              <button className={styles.primaryButton} onClick={() => chooseResponse("accepted")} type="button">
                Accepter la modification · aperçu
              </button>
              <button className={styles.outlineButton} onClick={() => chooseResponse("rejected")} type="button">
                Refuser · aperçu
              </button>
            </div>
          ) : response === "accepted" ? (
            <div className={styles.responseNotice} aria-live="polite">
              <strong>Votre accord est illustré dans cette démonstration.</strong>
              <span>
                Aucun dossier n’est modifié. Si le montant baisse après paiement, le commerçant rembourse directement
                la différence; Delifast enregistre et vérifie la preuve.
              </span>
            </div>
          ) : (
            <div className={styles.scopeSection}>
              <div>
                <h3>Après votre refus · choix du périmètre</h3>
                <p>Le choix total ou partiel, avec les articles visés, est conservé dans la demande d’annulation.</p>
              </div>
              <fieldset className={styles.scopeChoices}>
                <legend className={styles.visuallyHidden}>Choix fictif du périmètre d’annulation</legend>
                <label className={scope === "total" ? styles.scopeChoiceSelected : styles.scopeChoice}>
                  <input
                    checked={scope === "total"}
                    name="demo-cancellation-scope"
                    onChange={() => {
                      setScope("total");
                      setScopePreviewed(false);
                    }}
                    type="radio"
                  />
                  <span>
                    <strong>Annulation totale</strong>
                    <small>Remboursement total de 10 000 FCFA si le paiement a été validé; frais compris.</small>
                  </span>
                </label>
                <label className={scope === "partial" ? styles.scopeChoiceSelected : styles.scopeChoice}>
                  <input
                    checked={scope === "partial"}
                    name="demo-cancellation-scope"
                    onChange={() => {
                      setScope("partial");
                      setScopePreviewed(false);
                    }}
                    type="radio"
                  />
                  <span>
                    <strong>Annulation partielle</strong>
                    <small>
                      Une unité ciblée · 2 700 FCFA au prix net historique. Les frais communs restent inchangés.
                    </small>
                  </span>
                </label>
              </fieldset>
              <button
                className={styles.outlineButton}
                disabled={scope === null}
                onClick={() => setScopePreviewed(true)}
                type="button"
              >
                Afficher ce périmètre · aperçu
              </button>
              {scopePreviewed ? (
                <p className={styles.responseNotice} aria-live="polite">
                  Périmètre affiché localement seulement. Aucune demande, commande, somme, préparation, réservation,
                  notification ou donnée n’est modifiée.
                </p>
              ) : null}
            </div>
          )}

          <div className={styles.ruleCallout}>
            <strong>La modification exige l’accord explicite du client.</strong>
            <span>
              Si le montant augmente après paiement, le paiement complémentaire doit être payé et vérifié avant la
              poursuite. Si le montant baisse après paiement, le commerçant rembourse directement la différence.
            </span>
          </div>
        </section>

        <section className={styles.panel} aria-labelledby="cancellation-title">
          <div className={styles.panelHeading}>
            <div>
              <h2 id="cancellation-title">Après un refus · annulation et remboursement</h2>
              <p className={styles.panelSub}>Étapes successives du registre · pas des états simultanés</p>
            </div>
            <span className={`${styles.statusPill} ${styles.statusWarning}`}>cancellation_pending · étape illustrative</span>
          </div>

          <p className={styles.workflowLead}>
            Après le refus, vous choisissez l’annulation totale ou les seuls articles concernés. Le commerçant rembourse
            directement; Delifast vérifie la preuve avant toute finalisation.
          </p>

          <div className={styles.workflowSteps}>
            <article className={styles.workflowStep}>
              <span className={styles.stepNumber}>1</span>
              <div>
                <small>Refus de la modification</small>
                <strong>pending_customer_approval → rejected</strong>
                <span>Le client choisit le périmètre; ce choix et les articles concernés sont conservés dans la demande.</span>
              </div>
            </article>
            <article className={styles.workflowStep}>
              <span className={styles.stepNumber}>2</span>
              <div>
                <small>Si la préparation a commencé</small>
                <strong>Arrêt confirmé par le commerçant</strong>
                <span>La commande ou les articles visés restent suspendus pendant le traitement.</span>
              </div>
            </article>
            <article className={styles.workflowStep}>
              <span className={styles.stepNumber}>3</span>
              <div>
                <small>Remboursement direct, si requis</small>
                <strong>Preuve et référence → vérification humaine</strong>
                <span>Une preuve déposée ne finalise pas l’annulation; un rejet exige un motif.</span>
              </div>
            </article>
          </div>

          <div className={styles.scopeRuleGrid}>
            <article>
              <h3>Annulation totale</h3>
              <p>Après paiement validé, le remboursement couvre le montant intégral effectivement payé, frais compris.</p>
              <small>Après vérification positive : commande annulée. Aucune reprise de préparation.</small>
            </article>
            <article>
              <h3>Annulation partielle · exemple</h3>
              <p>Une unité : 3 000 + 500 de supplément − 500 de remise de ligne − 300 de remise globale = 2 700 FCFA.</p>
              <small>
                La remise globale de 1 000 FCFA est répartie au prorata (600 / 400). Les frais communs de 1 000 FCFA
                restent inchangés. Après finalisation, le commerçant confirme la reprise du reste.
              </small>
            </article>
          </div>

          <div className={styles.refundStates}>
            <div className={styles.subheading}>
              <h3>États de remboursement</h3>
              <span>Une preuve déposée ne finalise pas l’annulation.</span>
            </div>
            <div className={styles.refundStateGrid}>
              {refundStates.map((item) => (
                <article className={`${styles.refundState} ${styles[`refundTone_${item.tone}`]}`} key={item.code}>
                  <code>{item.code}</code>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.finalizationGrid}>
            <article>
              <strong>Après vérification positive · totale</strong>
              <span>La commande peut passer à « annulée » après vérification du remboursement requis.</span>
            </article>
            <article>
              <strong>Après vérification positive · partielle</strong>
              <span>
                La partie ciblée est finalisée; le commerçant confirme la reprise des articles restants. La commande
                reste partiellement annulée tant qu’il reste des articles actifs.
              </span>
            </article>
          </div>

          <div className={styles.ruleCallout}>
            <strong>Preuves corrigées et décisions conservées</strong>
            <span>
              En cas de rejet, l’annulation reste en cours. Le commerçant peut renvoyer une preuve corrigée sans limite
              arbitraire ni expiration; chaque dépôt et décision est ajouté à l’historique. Seul l’administrateur vérifie
              le remboursement.
            </span>
          </div>
        </section>

        <section className={styles.panel} aria-labelledby="reservation-title">
          <div className={styles.panelHeading}>
            <div>
              <h2 id="reservation-title">Réservation de stock · exemple distinct</h2>
              <p className={styles.panelSub}>Autre commande de démonstration · #DF-24011</p>
            </div>
            <span className={`${styles.statusPill} ${styles.statusWarning}`}>active · non consommée</span>
          </div>
          <dl className={styles.reservationGrid}>
            <div>
              <dt>Quantité réservée</dt>
              <dd>Poulet braisé × 1 · fictif</dd>
            </div>
            <div>
              <dt>Prochaine étape</dt>
              <dd>Consommée après validation manuelle du paiement</dd>
            </div>
          </dl>
          <div className={styles.ruleCallout}>
            <strong>La réservation n’expire pas automatiquement.</strong>
            <span>
              Un paiement refusé ou une annulation avant consommation libère les réservations concernées. Après
              consommation, une restitution n’a lieu que si l’annulation précède la préparation ou la remise au client;
              aucune restitution automatique après ces étapes.
            </span>
          </div>
          <p className={styles.footnote}>
            Cette commande d’exemple est distincte de la commande en préparation ci-dessus; son stock suit uniquement
            les règles correspondant à son propre état.
          </p>
        </section>

        <section className={styles.panel} aria-labelledby="history-title">
          <div className={styles.panelHeading}>
            <div>
              <h2 id="history-title">Historique de commande</h2>
              <p className={styles.panelSub}>Exemple fictif · aucun message réel</p>
            </div>
            <span className={styles.mutedLabel}>Démonstration seulement</span>
          </div>
          <ol className={styles.timeline}>
            <li>
              <span className={styles.timelineDot} aria-hidden="true">✓</span>
              <div>
                <strong>Commande envoyée · réservation créée</strong>
                <small>06 nov. 2026 · exemple</small>
              </div>
            </li>
            <li>
              <span className={styles.timelineDot} aria-hidden="true">·</span>
              <div>
                <strong>Proposition de retrait ou remplacement soumise à votre accord explicite</strong>
                <small>Ancienne et nouvelle compositions et montants conservés dans l’exemple.</small>
              </div>
            </li>
            <li>
              <span className={styles.timelineDot} aria-hidden="true">·</span>
              <div>
                <strong>Après un refus, vous choisissez le périmètre de l’annulation</strong>
                <small>
                  Si la préparation a commencé, son arrêt est confirmé par le commerçant. Après finalisation partielle,
                  le commerçant confirme la reprise des articles restants.
                </small>
              </div>
            </li>
          </ol>
        </section>
      </div>

      <aside className={styles.secondaryStack} aria-label="Résumé et informations du paiement fictif">
        <section className={styles.panel} aria-labelledby="order-summary-title">
          <div className={styles.panelHeading}>
            <h2 id="order-summary-title">Résumé</h2>
            <span className={styles.mutedLabel}>Exemple fictif</span>
          </div>
          <div className={styles.summaryLine}>
            <span>Articles après remises</span>
            <strong>9 000 FCFA</strong>
          </div>
          <div className={styles.summaryLine}>
            <span>Frais partagés · exemple</span>
            <strong>1 000 FCFA</strong>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total effectivement payé · exemple</span>
            <strong>10 000 FCFA</strong>
          </div>
          <p className={styles.footnote}>
            Annulation totale : remboursement du montant intégral payé, frais compris. Annulation partielle d’une unité :
            2 700 FCFA au prix net historique; les frais partagés restent inchangés.
          </p>
        </section>

        <section className={styles.panel} id="payment-details" aria-labelledby="payment-title">
          <div className={styles.panelHeading}>
            <div>
              <h2 id="payment-title">Paiement de la commande</h2>
              <p className={styles.panelSub}>Paiement direct au commerçant · exemple fictif</p>
            </div>
            <span className={`${styles.statusPill} ${styles.statusSuccess}`}>
              <span aria-hidden="true">●</span> Validé · démo
            </span>
          </div>
          <dl className={styles.paymentFacts}>
            <div>
              <dt>Montant conservé</dt>
              <dd>10 000 FCFA · fictif</dd>
            </div>
            <div>
              <dt>Bénéficiaire</dt>
              <dd>Saveurs du Faso · démo</dd>
            </div>
            <div>
              <dt>Opérateur</dt>
              <dd>Orange Money · exemple</dd>
            </div>
            <div>
              <dt>Statut du paiement</dt>
              <dd>Validé · vérification humaine illustrée</dd>
            </div>
            <div>
              <dt>Référence de paiement</dt>
              <dd>PAY-DEMO-0001 · fictif</dd>
            </div>
          </dl>
          <p className={styles.paymentRule}>
            Une preuve soumise ne confirme pas automatiquement un paiement. Le commerçant bénéficiaire compare la
            preuve au SMS réellement reçu avant de valider ou de refuser avec un motif.
          </p>
          <p className={styles.footnote}>
            Le détail de paiement et son historique restent fictifs; seule une vérification humaine réelle du restaurant pourrait décider du statut.
          </p>
        </section>

        <section className={styles.sideNote} aria-labelledby="demo-note-title">
          <h2 id="demo-note-title">Démonstration uniquement</h2>
          <p>
            Les références, montants, personnes et statuts sont fictifs. Les choix sur cette page ne sont que des
            interactions locales de présentation.
          </p>
          <p>
            Aucun compte, commande, paiement, remboursement, stock, preuve, notification, API ou téléversement n’est
            connecté ni modifié. Aucun numéro réel, code USSD appelable ou lien téléphonique n’est présent.
          </p>
        </section>
      </aside>
    </div>
  );
}

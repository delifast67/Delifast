"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./payments.module.css";

type PaymentState = "pending" | "validated" | "rejected";
type FilterKey = "all" | PaymentState;
type PreviewMode = "list" | "empty" | "loading" | "error";

type DemoPayment = {
  reference: string;
  orderReference: string;
  restaurant: string;
  operator: string;
  amount: string;
  date: string;
  status: PaymentState;
  orderHref: string;
  detailNote?: string;
};

const payments: DemoPayment[] = [
  {
    reference: "PAY-DEMO-0001 · fictif",
    orderReference: "#DF-24018 · fictif",
    restaurant: "Saveurs du Faso · démo",
    operator: "Orange Money · démo",
    amount: "10 000 FCFA · fictif",
    date: "06 nov. 2026 · exemple",
    status: "validated",
    orderHref: "/client/commandes/detail#payment-details",
    detailNote: "Même exemple que le résumé de paiement de l’écran 16.",
  },
  {
    reference: "PAY-DEMO-0002 · fictif",
    orderReference: "CMD-DEMO-0001 · fictif",
    restaurant: "Restaurant Démo",
    operator: "Orange Money · démo",
    amount: "9 500 FCFA · fictif",
    date: "Date fictive",
    status: "pending",
    orderHref: "/client/commandes",
  },
  {
    reference: "PAY-DEMO-0003 · fictif",
    orderReference: "CMD-DEMO-0002 · fictif",
    restaurant: "Restaurant Exemple",
    operator: "Telmob · démo",
    amount: "4 000 FCFA · fictif",
    date: "Date fictive",
    status: "validated",
    orderHref: "/client/commandes",
  },
  {
    reference: "PAY-DEMO-0004 · fictif",
    orderReference: "CMD-DEMO-0003 · fictif",
    restaurant: "Restaurant Test",
    operator: "Orange Money · démo",
    amount: "2 500 FCFA · fictif",
    date: "Date fictive",
    status: "rejected",
    orderHref: "/client/commandes",
  },
];

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "pending", label: "En attente" },
  { key: "validated", label: "Validés" },
  { key: "rejected", label: "Refusés" },
];

const statusLabels: Record<PaymentState, string> = {
  pending: "En attente",
  validated: "Validé",
  rejected: "Refusé",
};

const statusClass: Record<PaymentState, string> = {
  pending: styles.statusPending,
  validated: styles.statusValidated,
  rejected: styles.statusRejected,
};

function PaymentStatus({ status }: { status: PaymentState }) {
  return (
    <span className={`${styles.statusPill} ${statusClass[status]}`}>
      <span aria-hidden="true" />
      {statusLabels[status]} · démo
    </span>
  );
}

export function ClientPaymentsList() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("list");
  const visiblePayments = useMemo(
    () => payments.filter((payment) => filter === "all" || payment.status === filter),
    [filter],
  );

  function changeFilter(nextFilter: FilterKey) {
    setFilter(nextFilter);
    setPreviewMode("list");
  }

  return (
    <section className={styles.panel} aria-labelledby="payments-list-title">
      <div className={styles.controls}>
        <div className={styles.filterGroup} role="group" aria-label="Filtrer par statut du paiement">
          {filters.map((item) => (
            <button
              aria-pressed={filter === item.key}
              className={filter === item.key ? styles.filterActive : styles.filterButton}
              key={item.key}
              onClick={() => changeFilter(item.key)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className={styles.statePicker}>
          <span>État d’aperçu</span>
          <select
            aria-label="État de présentation local"
            onChange={(event) => setPreviewMode(event.target.value as PreviewMode)}
            value={previewMode}
          >
            <option value="list">Liste</option>
            <option value="empty">Liste vide</option>
            <option value="loading">Chargement</option>
            <option value="error">Erreur</option>
          </select>
        </label>
      </div>
      <p className={styles.controlHint}>
        Les filtres et l’état d’aperçu ne changent que cette page; aucune recherche ni requête réseau n’est exécutée.
      </p>

      <div className={styles.listHeading}>
        <div>
          <h2 id="payments-list-title">Liste des paiements</h2>
          <p>Références, bénéficiaires et montants fictifs.</p>
        </div>
        <span aria-live="polite">
          {previewMode === "list" ? `${visiblePayments.length} ligne${visiblePayments.length === 1 ? "" : "s"} fictive${visiblePayments.length === 1 ? "" : "s"}` : "Aperçu local"}
        </span>
      </div>

      {previewMode === "list" && visiblePayments.length > 0 ? (
        <>
          <div className={styles.tableViewport}>
            <table className={styles.paymentTable}>
              <caption className={styles.visuallyHidden}>
                Paiements de commande fictifs du client, filtrables par statut
              </caption>
              <thead>
                <tr>
                  <th scope="col">Référence paiement</th>
                  <th scope="col">Commande</th>
                  <th scope="col">Restaurant bénéficiaire</th>
                  <th scope="col">Opérateur</th>
                  <th scope="col">Montant fictif</th>
                  <th scope="col">Date fictive</th>
                  <th scope="col">Statut du paiement</th>
                  <th scope="col"><span className={styles.visuallyHidden}>Accès</span></th>
                </tr>
              </thead>
              <tbody>
                {visiblePayments.map((payment) => (
                  <tr key={payment.reference}>
                    <td className={styles.paymentReference}>
                      <strong>{payment.reference}</strong>
                      {payment.detailNote ? <small>{payment.detailNote}</small> : null}
                    </td>
                    <td>
                      <Link className={styles.orderLink} href={payment.orderHref}>
                        {payment.orderReference}
                        <span className={styles.visuallyHidden}> — consulter la commande associée</span>
                      </Link>
                    </td>
                    <td>{payment.restaurant}</td>
                    <td>{payment.operator}</td>
                    <td className={styles.amountCell}>{payment.amount}</td>
                    <td>{payment.date}</td>
                    <td><PaymentStatus status={payment.status} /></td>
                    <td>
                      <button
                        className={styles.detailUnavailable}
                        disabled
                        title="L’écran 18 sera ajouté à l’étape suivante."
                        type="button"
                      >
                        Détail · écran 18
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.mobileList} aria-label="Paiements fictifs, présentation mobile">
            {visiblePayments.map((payment) => (
              <article className={styles.mobileCard} key={payment.reference}>
                <div className={styles.mobileCardHeading}>
                  <strong>{payment.reference}</strong>
                  <PaymentStatus status={payment.status} />
                </div>
                {payment.detailNote ? <p className={styles.mobileDetailNote}>{payment.detailNote}</p> : null}
                <dl className={styles.mobileFacts}>
                  <div><dt>Commande associée</dt><dd><Link className={styles.orderLink} href={payment.orderHref}>{payment.orderReference}</Link></dd></div>
                  <div><dt>Restaurant bénéficiaire</dt><dd>{payment.restaurant}</dd></div>
                  <div><dt>Opérateur</dt><dd>{payment.operator}</dd></div>
                  <div><dt>Montant fictif</dt><dd>{payment.amount}</dd></div>
                  <div><dt>Date fictive</dt><dd>{payment.date}</dd></div>
                </dl>
                <button
                  className={styles.detailUnavailable}
                  disabled
                  title="L’écran 18 sera ajouté à l’étape suivante."
                  type="button"
                >
                  Détail du paiement · écran 18 à venir
                </button>
              </article>
            ))}
          </div>
        </>
      ) : previewMode === "loading" ? (
        <div className={styles.statePanel} aria-live="polite" role="status">
          <span className={styles.spinner} aria-hidden="true" />
          <strong>Chargement d’exemple</strong>
          <p>État visuel simulé localement; aucune donnée n’est chargée depuis un service.</p>
        </div>
      ) : previewMode === "error" ? (
        <div className={`${styles.statePanel} ${styles.errorState}`} aria-live="polite" role="alert">
          <strong>Impossible d’afficher cette liste · erreur simulée</strong>
          <p>Aucun appel réseau n’a été tenté et aucune donnée de compte n’est concernée.</p>
          <button className={styles.retryButton} onClick={() => setPreviewMode("list")} type="button">
            Réafficher l’aperçu fictif
          </button>
        </div>
      ) : (
        <div className={styles.statePanel} aria-live="polite">
          <strong>Aucun paiement dans cet aperçu</strong>
          <p>État vide simulé localement; il ne décrit aucun compte ni historique réel.</p>
        </div>
      )}

      <div className={styles.panelFooter}>
        <span>Une nouvelle preuve ne remplace jamais les soumissions antérieures; l’historique prévu est append-only.</span>
        <Link href="/client/commandes">Voir les commandes associées →</Link>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import styles from "./orders.module.css";

type PaymentState = "pending" | "validated" | "rejected";
type StatusTone = "warning" | "success" | "danger";
type OrderDemo = {
  reference: string;
  restaurant: string;
  date: string;
  amount: string;
  reception: string;
  orderStatus: string;
  orderTone: StatusTone;
  paymentStatus: string;
  paymentState: PaymentState;
};

type FilterKey = "all" | PaymentState;

const demoOrders: OrderDemo[] = [
  {
    reference: "CMD-DEMO-0001 · fictif",
    restaurant: "Restaurant Démo",
    date: "Date fictive",
    amount: "9 500 FCFA · fictif",
    reception: "Retrait · démo",
    orderStatus: "Annulation en cours · fictif",
    orderTone: "warning",
    paymentStatus: "En attente · démo",
    paymentState: "pending",
  },
  {
    reference: "CMD-DEMO-0002 · fictif",
    restaurant: "Restaurant Exemple",
    date: "Date fictive",
    amount: "4 000 FCFA · fictif",
    reception: "Livraison · démo",
    orderStatus: "Annulée partiellement · fictif",
    orderTone: "warning",
    paymentStatus: "Validé · démo",
    paymentState: "validated",
  },
  {
    reference: "CMD-DEMO-0003 · fictif",
    restaurant: "Restaurant Test",
    date: "Date fictive",
    amount: "2 500 FCFA · fictif",
    reception: "Retrait · démo",
    orderStatus: "Terminée · fictif",
    orderTone: "success",
    paymentStatus: "Refusé · démo",
    paymentState: "rejected",
  },
];

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Toutes les commandes" },
  { key: "pending", label: "Paiement en attente" },
  { key: "validated", label: "Paiement validé" },
  { key: "rejected", label: "Paiement refusé" },
];

const toneClasses: Record<StatusTone, string> = {
  warning: styles.statusWarning,
  success: styles.statusSuccess,
  danger: styles.statusDanger,
};

export function ClientOrdersList() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const orders = demoOrders.filter((order) => filter === "all" || order.paymentState === filter);

  return (
    <section className={styles.ordersPanel} aria-labelledby="orders-panel-title">
      <div className={styles.panelHeading}>
        <h2 id="orders-panel-title">Commandes du client · aperçu fictif</h2>
        <span aria-live="polite">
          {orders.length} ligne{orders.length === 1 ? "" : "s"} fictive{orders.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className={styles.filterBar} aria-label="Filtrer les exemples par statut de paiement">
        {filters.map((item) => (
          <button
            aria-pressed={filter === item.key}
            className={filter === item.key ? styles.filterButtonActive : styles.filterButton}
            key={item.key}
            onClick={() => setFilter(item.key)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className={styles.filterHint}>Ces filtres ne portent que sur les trois lignes de démonstration.</p>

      <div className={styles.tableViewport}>
        <table className={styles.orderTable}>
          <caption className={styles.visuallyHidden}>
            Liste fictive des commandes du client et statuts séparés de commande et de paiement
          </caption>
          <thead>
            <tr>
              <th scope="col">Commande</th>
              <th scope="col">Restaurant</th>
              <th scope="col">Date fictive</th>
              <th scope="col">Montant fictif</th>
              <th scope="col">Mode de réception</th>
              <th scope="col">Statut commande</th>
              <th scope="col">Statut paiement</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.reference}>
                <td className={styles.referenceCell}>{order.reference}</td>
                <td>{order.restaurant}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td>{order.reception}</td>
                <td>
                  <span className={`${styles.statusPill} ${toneClasses[order.orderTone]}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`${styles.statusPill} ${toneClasses[
                      order.paymentState === "pending"
                        ? "warning"
                        : order.paymentState === "validated"
                          ? "success"
                          : "danger"
                    ]}`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.mobileOrderList} aria-label="Commandes fictives, présentation mobile">
        {orders.map((order) => (
          <article className={styles.mobileOrderCard} key={order.reference}>
            <div className={styles.mobileOrderHeading}>
              <strong>{order.reference}</strong>
              <span>{order.restaurant}</span>
            </div>
            <dl className={styles.mobileFacts}>
              <div>
                <dt>Date fictive</dt>
                <dd>{order.date}</dd>
              </div>
              <div>
                <dt>Montant fictif</dt>
                <dd>{order.amount}</dd>
              </div>
              <div>
                <dt>Mode de réception</dt>
                <dd>{order.reception}</dd>
              </div>
            </dl>
            <div className={styles.mobileStatuses}>
              <div>
                <span>Statut commande</span>
                <span className={`${styles.statusPill} ${toneClasses[order.orderTone]}`}>
                  {order.orderStatus}
                </span>
              </div>
              <div>
                <span>Statut paiement</span>
                <span
                  className={`${styles.statusPill} ${toneClasses[
                    order.paymentState === "pending"
                      ? "warning"
                      : order.paymentState === "validated"
                        ? "success"
                        : "danger"
                  ]}`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {orders.length === 0 ? (
        <p className={styles.emptyState}>Aucune ligne fictive ne correspond à ce filtre.</p>
      ) : null}
      <div className={styles.panelFootnote}>
        Les statuts de commande et de paiement sont indépendants.
      </div>
    </section>
  );
}

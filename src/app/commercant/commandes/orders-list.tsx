"use client";

import { useMemo, useState } from "react";
import { Info, Search } from "lucide-react";
import styles from "./orders.module.css";

type OrderStatus = "cancellation_pending" | "partially_cancelled" | "completed";
type Order = {
  reference: string;
  customer: string;
  date: string;
  dateSort: string;
  total: string;
  status: OrderStatus;
  statusLabel: string;
};
type Filter = "all" | "waiting" | "recent";

const demoOrders: Order[] = [
  {
    reference: "#DF-24018",
    customer: "Client Démo",
    date: "06 nov. 2026",
    dateSort: "2026-11-06",
    total: "10 000 FCFA",
    status: "cancellation_pending",
    statusLabel: "Annulation en cours",
  },
  {
    reference: "#DF-24016",
    customer: "Client Exemple",
    date: "06 nov. 2026",
    dateSort: "2026-11-06",
    total: "4 500 FCFA",
    status: "partially_cancelled",
    statusLabel: "Annulée partiellement",
  },
  {
    reference: "#DF-24011",
    customer: "Client Démo",
    date: "04 nov. 2026",
    dateSort: "2026-11-04",
    total: "4 000 FCFA",
    status: "completed",
    statusLabel: "Terminée",
  },
];

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "waiting", label: "En attente" },
  { id: "recent", label: "Récents" },
];

function statusClass(status: OrderStatus) {
  if (status === "cancellation_pending") return styles.statusWaiting;
  if (status === "completed") return styles.statusCompleted;
  return styles.statusPartial;
}

export function MerchantOrdersList() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const visibleOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    let result = demoOrders.filter((order) =>
      [
        order.reference,
        order.customer,
        order.date,
        order.total,
        order.statusLabel,
      ]
        .join(" ")
        .toLocaleLowerCase("fr")
        .includes(normalizedQuery),
    );

    if (filter === "waiting") {
      result = result.filter((order) => order.status === "cancellation_pending");
    }
    if (filter === "recent") {
      result = [...result].sort((first, second) =>
        second.dateSort.localeCompare(first.dateSort),
      );
    }
    return result;
  }, [filter, query]);

  return (
    <>
      <div className={styles.headingRow}>
        <div className={styles.pageHeading}>
          <p className={styles.eyebrow}>Commerçant · Démonstration</p>
          <h1>Liste des commandes</h1>
          <p className={styles.intro}>
            Examinez les commandes passées auprès de votre commerce.
          </p>
        </div>
      </div>

      <div className={styles.demoNotice} role="note">
        <span className={styles.noticeIcon} aria-hidden="true">
          <Info size={14} />
        </span>
        <p>
          <strong>Aperçu local uniquement</strong>
          <span>
            Exemples fictifs : aucune commande réelle n’est affichée, transmise
            ou enregistrée.
          </span>
        </p>
        <span className={styles.demoBadge}>Données fictives</span>
      </div>

      <section className={styles.ordersSection} aria-labelledby="orders-title">
        <div className={styles.controls}>
          <label className={styles.searchBox} htmlFor="merchant-order-search">
            <Search aria-hidden="true" size={15} />
            <span className={styles.srOnly}>Rechercher une commande fictive</span>
            <input
              autoComplete="off"
              id="merchant-order-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher…"
              type="search"
              value={query}
            />
          </label>
          <div className={styles.filters} role="group" aria-label="Filtres de commandes">
            {filters.map((item) => (
              <button
                aria-pressed={filter === item.id}
                className={filter === item.id ? styles.filterActive : styles.filterButton}
                key={item.id}
                onClick={() => setFilter(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.panelHeading}>
          <h2 id="orders-title">Éléments · commandes</h2>
          <span aria-live="polite">
            {visibleOrders.length} {visibleOrders.length === 1 ? "ligne démo" : "lignes démo"}
          </span>
        </div>

        <div className={styles.tableViewport}>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th scope="col">Commande</th>
                <th scope="col">Client</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">État</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => (
                <tr key={order.reference}>
                  <td className={styles.referenceCell} data-label="Commande">
                    {order.reference}
                  </td>
                  <td data-label="Client">{order.customer}</td>
                  <td data-label="Date">{order.date}</td>
                  <td data-label="Total">{order.total}</td>
                  <td data-label="État">
                    <span className={`${styles.statusPill} ${statusClass(order.status)}`}>
                      {order.statusLabel}
                    </span>
                  </td>
                </tr>
              ))}
              {visibleOrders.length === 0 ? (
                <tr>
                  <td className={styles.emptyState} colSpan={5}>
                    Aucune commande fictive ne correspond à cette recherche.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className={styles.mobileOrderList} aria-label="Commandes fictives">
          {visibleOrders.map((order) => (
            <article className={styles.mobileOrderCard} key={order.reference}>
              <div className={styles.mobileOrderHeading}>
                <strong>{order.reference}</strong>
                <span>{order.customer}</span>
              </div>
              <dl className={styles.mobileFacts}>
                <div>
                  <dt>Date</dt>
                  <dd>{order.date}</dd>
                </div>
                <div>
                  <dt>Total</dt>
                  <dd>{order.total}</dd>
                </div>
              </dl>
              <div className={styles.mobileStatus}>
                <span>État de la commande</span>
                <span className={`${styles.statusPill} ${statusClass(order.status)}`}>
                  {order.statusLabel}
                </span>
              </div>
            </article>
          ))}
          {visibleOrders.length === 0 ? (
            <p className={styles.emptyState}>
              Aucune commande fictive ne correspond à cette recherche.
            </p>
          ) : null}
        </div>

        <div className={styles.panelFootnote}>
          {visibleOrders.length} élément{visibleOrders.length === 1 ? "" : "s"} affiché
          {visibleOrders.length === 1 ? "" : "s"} · données fictives
        </div>
      </section>
    </>
  );
}

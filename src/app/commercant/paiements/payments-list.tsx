"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../../client/client-dashboard.module.css";
import styles from "../commandes/orders.module.css";

type PaymentStatus = "pending" | "validated" | "rejected";
type PaymentFilter = "all" | PaymentStatus;
type DemoPayment = {
  reference: string;
  orderId: string;
  orderReference: string;
  customer: string;
  operator: "Orange Money" | "Telmob";
  amount: number;
  date: string;
  status: PaymentStatus;
  hasNewProof: boolean;
};

const demoPayments: DemoPayment[] = [
  {
    reference: "PAY-0418",
    orderId: "DF-24018",
    orderReference: "#DF-24018",
    customer: "Client Démo",
    operator: "Orange Money",
    amount: 7_000,
    date: "06 nov. 2026 · 14:26",
    status: "pending",
    hasNewProof: true,
  },
  {
    reference: "PAY-0416",
    orderId: "DF-24016",
    orderReference: "#DF-24016",
    customer: "Client Exemple",
    operator: "Telmob",
    amount: 4_500,
    date: "06 nov. 2026 · 11:08",
    status: "validated",
    hasNewProof: false,
  },
  {
    reference: "PAY-0411",
    orderId: "DF-24011",
    orderReference: "#DF-24011",
    customer: "Client Démo",
    operator: "Orange Money",
    amount: 4_000,
    date: "04 nov. 2026 · 18:42",
    status: "rejected",
    hasNewProof: false,
  },
];

const filters: { id: PaymentFilter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "pending", label: "En attente" },
  { id: "validated", label: "Validés" },
  { id: "rejected", label: "Refusés" },
];

function formatAmount(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;
}

function paymentStatusLabel(status: PaymentStatus) {
  if (status === "validated") return "Validé";
  if (status === "rejected") return "Refusé";
  return "À vérifier";
}

function paymentStatusClass(status: PaymentStatus) {
  if (status === "validated") return styles.paymentStatusValid;
  if (status === "rejected") return styles.paymentStatusRejected;
  return styles.paymentStatusPending;
}

export function MerchantPaymentsList() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PaymentFilter>("all");
  const [selectedPayment, setSelectedPayment] = useState<DemoPayment | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("");
  const [showReadError, setShowReadError] = useState(false);

  const visiblePayments = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    return demoPayments.filter((payment) => {
      const matchesFilter = filter === "all" || payment.status === filter;
      const searchable = [
        payment.reference,
        payment.orderReference,
        payment.customer,
        payment.operator,
        paymentStatusLabel(payment.status),
        payment.date,
        String(payment.amount),
      ]
        .join(" ")
        .toLocaleLowerCase("fr");
      return matchesFilter && searchable.includes(normalizedQuery);
    });
  }, [filter, query]);

  const filterCounts = {
    all: demoPayments.length,
    pending: demoPayments.filter((payment) => payment.status === "pending").length,
    validated: demoPayments.filter((payment) => payment.status === "validated").length,
    rejected: demoPayments.filter((payment) => payment.status === "rejected").length,
  };

  function refreshDemoList() {
    setShowReadError(false);
    setRefreshing(true);
    setRefreshMessage("");
    setSelectedPayment(null);
    window.setTimeout(() => {
      setRefreshing(false);
      setRefreshMessage("Liste locale actualisée · aucune donnée transmise.");
    }, 420);
  }

  function clearFilters() {
    setFilter("all");
    setQuery("");
    setShowReadError(false);
    setSelectedPayment(null);
  }

  function inspectPayment(payment: DemoPayment) {
    setSelectedPayment((current) =>
      current?.reference === payment.reference ? null : payment,
    );
  }

  return (
    <div className={dashboard.shell}>
      <aside className={dashboard.sidebar} aria-label="Espace commerçant de démonstration">
        <HomeBrand href="/" />
        <p className={dashboard.spaceLabel}>Espace commerçant</p>
        <nav className={dashboard.navigation} aria-label="Navigation commerçant">
          <Link className={dashboard.navItem} href="/commercant">
            <span aria-hidden="true">⌂</span>
            <span>Tableau de bord</span>
          </Link>
          <Link className={dashboard.navItem} href="/commercant/commandes">
            <span aria-hidden="true">▤</span>
            <span>Commandes</span>
          </Link>
          <Link
            aria-current="page"
            className={dashboard.activeNavItem}
            href="/commercant/paiements"
          >
            <span aria-hidden="true">◈</span>
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
            <span aria-current="page">Liste des paiements</span>
          </nav>
          <div className={dashboard.topbarActions}>
            <div
              aria-label="Recherche globale désactivée dans cette maquette"
              className={dashboard.searchMock}
            >
              <span aria-hidden="true">⌕</span>
              <span>Rechercher</span>
            </div>
            <span className={dashboard.avatar} aria-label="Profil fictif Saveurs du Faso">
              SF
            </span>
          </div>
        </header>

        <main className={dashboard.content} id="contenu-principal">
          <div className={dashboard.pageHeading}>
            <p className={dashboard.eyebrow}>Commerçant · Démonstration</p>
            <h1>Liste des paiements</h1>
            <p className={dashboard.intro}>
              Suivez les paiements de commande destinés à votre commerce et repérez les nouvelles preuves.
            </p>
          </div>

          <div className={styles.paymentsDemoNotice} role="note">
            <span className={styles.paymentsNoticeIcon} aria-hidden="true">i</span>
            <p>
              <strong>Démonstration locale uniquement</strong>
              <span>
                Références, clients, montants et statuts sont fictifs. Aucune preuve réelle n’est affichée ou vérifiée ; aucun paiement d’abonnement n’apparaît ici.
              </span>
            </p>
            <span className={styles.paymentsDemoTag}>Données fictives</span>
          </div>

          <section className={styles.paymentListPanel} aria-labelledby="payments-panel-title">
            <div className={styles.paymentListToolbar}>
              <label className={styles.paymentSearch} htmlFor="merchant-payment-search">
                <span aria-hidden="true">⌕</span>
                <span className={styles.paymentSrOnly}>Rechercher un paiement fictif</span>
                <input
                  autoComplete="off"
                  id="merchant-payment-search"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher…"
                  type="search"
                  value={query}
                />
              </label>

              <div className={styles.paymentFilterGroup} role="group" aria-label="Filtrer les paiements">
                {filters.map((item) => (
                  <button
                    aria-pressed={filter === item.id}
                    className={filter === item.id ? styles.paymentFilterActive : styles.paymentFilter}
                    key={item.id}
                    onClick={() => {
                      setFilter(item.id);
                      setSelectedPayment(null);
                    }}
                    type="button"
                  >
                    {item.label}
                    <span>{filterCounts[item.id]}</span>
                  </button>
                ))}
              </div>

              <button
                className={styles.paymentRefresh}
                disabled={refreshing}
                onClick={refreshDemoList}
                type="button"
              >
                <span aria-hidden="true">↻</span>
                {refreshing ? "Actualisation…" : "Actualiser"}
              </button>
            </div>

            {refreshMessage && (
              <p className={styles.paymentRefreshMessage} role="status">
                <span aria-hidden="true">✓</span> {refreshMessage}
              </p>
            )}

            {selectedPayment && !showReadError && (
              <section className={styles.paymentSelection} aria-labelledby="selected-payment-title">
                <div className={styles.paymentSelectionHeading}>
                  <div>
                    <p>Résumé de la ligne sélectionnée</p>
                    <h2 id="selected-payment-title">{selectedPayment.reference} · {paymentStatusLabel(selectedPayment.status)}</h2>
                  </div>
                  <button
                    aria-label="Fermer le résumé"
                    className={styles.paymentCloseSelection}
                    onClick={() => setSelectedPayment(null)}
                    type="button"
                  >
                    ×
                  </button>
                </div>
                <dl className={styles.paymentSelectionFacts}>
                  <div><dt>Commande</dt><dd>{selectedPayment.orderReference}</dd></div>
                  <div><dt>Client</dt><dd>{selectedPayment.customer}</dd></div>
                  <div><dt>Opérateur</dt><dd>{selectedPayment.operator}</dd></div>
                  <div><dt>Montant</dt><dd>{formatAmount(selectedPayment.amount)}</dd></div>
                </dl>
                <p className={styles.paymentSelectionNote}>
                  La vérification humaine est disponible sur{" "}
                  <Link href={`/commercant/paiements/${selectedPayment.reference}`}>
                    l’écran 35 · Détail du paiement
                  </Link>
                  .
                </p>
              </section>
            )}

            <div className={styles.paymentPanelHeading}>
              <h2 id="payments-panel-title">Éléments · paiements</h2>
              <span aria-live="polite">
                {visiblePayments.length} {visiblePayments.length === 1 ? "ligne démo" : "lignes démo"}
              </span>
            </div>

            {showReadError ? (
              <div className={styles.paymentErrorState} role="alert">
                <span className={styles.paymentStateIcon} aria-hidden="true">!</span>
                <strong>Impossible d’afficher la liste · erreur de démonstration</strong>
                <p>Aucun service n’a été appelé. Réessayez pour rétablir les données locales fictives.</p>
                <button onClick={refreshDemoList} type="button">Réessayer localement</button>
              </div>
            ) : refreshing ? (
              <div className={styles.paymentLoadingState} role="status">
                <span className={styles.paymentSpinner} aria-hidden="true" />
                <span>Actualisation locale des données fictives…</span>
              </div>
            ) : visiblePayments.length === 0 ? (
              <div className={styles.paymentEmptyState}>
                <span className={styles.paymentStateIcon} aria-hidden="true">⌕</span>
                <strong>Aucun paiement fictif ne correspond</strong>
                <p>Modifiez votre recherche ou retirez les filtres pour revoir les exemples.</p>
                <button onClick={clearFilters} type="button">Effacer les filtres</button>
              </div>
            ) : (
              <>
                <div className={styles.paymentTableViewport}>
                  <table className={styles.paymentTable}>
                    <thead>
                      <tr>
                        <th scope="col">Paiement</th>
                        <th scope="col">Commande</th>
                        <th scope="col">Client</th>
                        <th scope="col">Opérateur</th>
                        <th scope="col">Montant</th>
                        <th scope="col">Date</th>
                        <th scope="col">État</th>
                        <th scope="col"><span className={styles.paymentSrOnly}>Action</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {visiblePayments.map((payment) => (
                        <tr key={payment.reference}>
                          <td>
                            <strong>{payment.reference}</strong>
                            {payment.hasNewProof && <span className={styles.paymentNewProof}>Nouvelle preuve</span>}
                          </td>
                          <td><Link className={styles.paymentOrderLink} href={`/commercant/commandes/${payment.orderId}`}>{payment.orderReference}</Link></td>
                          <td>{payment.customer}</td>
                          <td>{payment.operator}</td>
                          <td className={styles.paymentAmount}>{formatAmount(payment.amount)}</td>
                          <td>{payment.date}</td>
                          <td><span className={`${styles.paymentStatus} ${paymentStatusClass(payment.status)}`}><span aria-hidden="true">●</span>{paymentStatusLabel(payment.status)}</span></td>
                          <td>
                            <button className={styles.paymentInspectButton} onClick={() => inspectPayment(payment)} type="button">{selectedPayment?.reference === payment.reference ? "Masquer" : "Examiner"}</button>{" "}
                            <Link className={styles.paymentOrderLink} href={`/commercant/paiements/${payment.reference}`}>Détail</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className={styles.paymentMobileList}>
                  {visiblePayments.map((payment) => (
                    <article className={styles.paymentMobileCard} key={payment.reference}>
                      <div className={styles.paymentMobileTop}>
                        <div>
                          <strong>{payment.reference}</strong>
                          {payment.hasNewProof && <span className={styles.paymentNewProof}>Nouvelle preuve</span>}
                        </div>
                        <span className={`${styles.paymentStatus} ${paymentStatusClass(payment.status)}`}><span aria-hidden="true">●</span>{paymentStatusLabel(payment.status)}</span>
                      </div>
                      <Link className={styles.paymentOrderLink} href={`/commercant/commandes/${payment.orderId}`}>{payment.orderReference} · {payment.customer}</Link>
                      <dl className={styles.paymentMobileFacts}>
                        <div><dt>Opérateur</dt><dd>{payment.operator}</dd></div>
                        <div><dt>Montant</dt><dd>{formatAmount(payment.amount)}</dd></div>
                        <div><dt>Date</dt><dd>{payment.date}</dd></div>
                      </dl>
                      <button className={styles.paymentInspectButton} onClick={() => inspectPayment(payment)} type="button">{selectedPayment?.reference === payment.reference ? "Masquer le résumé" : "Examiner"}</button>
                      <Link className={styles.paymentOrderLink} href={`/commercant/paiements/${payment.reference}`}>
                        Ouvrir le détail et vérifier →
                      </Link>
                    </article>
                  ))}
                </div>
              </>
            )}

            <div className={styles.paymentListFooter}>
              <span>Données fictives · {visiblePayments.length} élément{visiblePayments.length === 1 ? "" : "s"} affiché{visiblePayments.length === 1 ? "" : "s"}</span>
              <details className={styles.paymentStateDemo}>
                <summary>États de démonstration</summary>
                <button
                  onClick={() => {
                    setShowReadError(true);
                    setSelectedPayment(null);
                    setRefreshMessage("");
                  }}
                  type="button"
                >
                  Simuler une erreur de lecture
                </button>
                <button onClick={clearFilters} type="button">Rétablir la liste normale</button>
              </details>
            </div>
          </section>

          <nav className={styles.screenNavigation} aria-label="Navigation des écrans commerçant">
            <Link href="/commercant/commandes/DF-24018">← Retour à l’écran 33 · Détail d’une commande</Link>
            <span>Écran 34 sur 53 · Données fictives</span>
          </nav>
        </main>
      </div>
    </div>
  );
}

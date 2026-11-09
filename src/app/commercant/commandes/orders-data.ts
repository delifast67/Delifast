export type OrderStatus =
  | "cancellation_pending"
  | "partially_cancelled"
  | "completed";

export type RefundStatus =
  | "not_required"
  | "pending"
  | "proof_submitted"
  | "verified"
  | "rejected";

export type OrderLine = {
  name: string;
  amount: number;
  details: string[];
  note?: string;
  cancelled?: boolean;
};

export type OrderHistoryItem = {
  date: string;
  title: string;
  detail: string;
};

export type MerchantOrder = {
  id: string;
  reference: string;
  customer: string;
  date: string;
  dateSort: string;
  total: string;
  status: OrderStatus;
  statusLabel: string;
  store: string;
  receiptMode: string;
  orderStatus: string;
  paymentStatus: string;
  paymentReference: string;
  paymentOperator: string;
  preparationStatus: string;
  preparationStarted: boolean;
  items: OrderLine[];
  itemsSubtotal: number;
  sharedFees: number;
  totalPaid: number;
  scopeLabel: string;
  refundAmount: number;
  refundStatus: RefundStatus;
  refundLabel: string;
  refundReference: string;
  refundReason: string;
  proposedItem: string;
  proposedAmount: number;
  history: OrderHistoryItem[];
};

export const demoOrders: MerchantOrder[] = [
  {
    id: "DF-24018",
    reference: "#DF-24018",
    customer: "Client Démo",
    date: "06 nov. 2026",
    dateSort: "2026-11-06",
    total: "10 000 FCFA",
    status: "cancellation_pending",
    statusLabel: "Annulation en cours",
    store: "Saveurs du Faso",
    receiptMode: "Retrait au commerce · démo",
    orderStatus: "Annulation en cours · exemple",
    paymentStatus: "Validé · vérification humaine illustrée",
    paymentReference: "PAY-DEMO-0001 · fictif",
    paymentOperator: "Orange Money · démo",
    preparationStatus: "Préparation commencée · arrêt à confirmer",
    preparationStarted: true,
    items: [
      {
        name: "Poulet braisé × 2",
        amount: 5_400,
        details: [
          "Prix de base : 3 000 FCFA par unité",
          "Option · supplément : 500 FCFA par unité",
          "Remise de ligne : 1 000 FCFA au total · 500 par unité",
          "Remise globale allouée : 600 FCFA · 300 par unité",
        ],
        note: "Prix net historique : 2 700 FCFA par unité · une unité ciblée",
      },
      {
        name: "Menu du jour × 1",
        amount: 3_600,
        details: [
          "Prix historique : 4 000 FCFA",
          "Remise globale allouée : 400 FCFA",
        ],
        note: "Prix net historique : 3 600 FCFA · article restant",
      },
    ],
    itemsSubtotal: 9_000,
    sharedFees: 1_000,
    totalPaid: 10_000,
    scopeLabel: "Annulation partielle · une unité ciblée · exemple",
    refundAmount: 2_700,
    refundStatus: "proof_submitted",
    refundLabel: "Preuve corrigée en attente de vérification humaine · démo",
    refundReference: "REF-DEMO-0418-C",
    refundReason: "Référence illisible · motif fictif de l’historique",
    proposedItem: "Riz · accompagnement",
    proposedAmount: 9_500,
    history: [
      {
        date: "06 nov. 2026 · exemple",
        title: "Commande reçue · réservation créée",
        detail: "Référence et composition conservées dans un exemple fictif.",
      },
      {
        date: "06 nov. 2026 · exemple",
        title: "Proposition de retrait ou remplacement",
        detail: "Toute modification attend l’accord explicite du client.",
      },
      {
        date: "06 nov. 2026 · exemple",
        title: "Annulation en cours · preuve corrigée illustrée",
        detail: "Le remboursement n’est pas automatisé et attend une vérification humaine.",
      },
    ],
  },
  {
    id: "DF-24016",
    reference: "#DF-24016",
    customer: "Client Exemple",
    date: "06 nov. 2026",
    dateSort: "2026-11-06",
    total: "4 500 FCFA",
    status: "partially_cancelled",
    statusLabel: "Annulée partiellement",
    store: "Saveurs du Faso",
    receiptMode: "Retrait au commerce · démo",
    orderStatus: "Annulée partiellement · exemple",
    paymentStatus: "Validé · vérification humaine illustrée",
    paymentReference: "PAY-DEMO-0002 · fictif",
    paymentOperator: "Telmob · démo",
    preparationStatus: "Reprise des articles restants · exemple",
    preparationStarted: true,
    items: [
      {
        name: "Poulet braisé × 1",
        amount: 3_000,
        details: ["Prix historique : 3 000 FCFA"],
        note: "Article restant · exemple fictif",
      },
      {
        name: "Jus de bissap × 1",
        amount: 1_500,
        details: ["Prix historique : 1 500 FCFA"],
        note: "Article annulé partiellement · exemple fictif",
        cancelled: true,
      },
    ],
    itemsSubtotal: 4_500,
    sharedFees: 0,
    totalPaid: 4_500,
    scopeLabel: "Annulation partielle · jus de bissap × 1 · exemple",
    refundAmount: 1_500,
    refundStatus: "verified",
    refundLabel: "Vérifié humainement · exemple fictif",
    refundReference: "REF-DEMO-0416",
    refundReason: "Aucun · vérification positive illustrée",
    proposedItem: "Jus de gingembre · accompagnement",
    proposedAmount: 4_500,
    history: [
      {
        date: "06 nov. 2026 · exemple",
        title: "Commande reçue · paiement vérifié",
        detail: "La preuve de paiement est montrée comme vérifiée par une personne, à titre fictif.",
      },
      {
        date: "06 nov. 2026 · exemple",
        title: "Annulation partielle finalisée · exemple",
        detail: "Le remboursement correspondant est affiché comme vérifié manuellement dans cette démo.",
      },
      {
        date: "06 nov. 2026 · exemple",
        title: "Reprise des articles restants · illustration",
        detail: "Aucun changement réel ni message n’est déclenché.",
      },
    ],
  },
  {
    id: "DF-24011",
    reference: "#DF-24011",
    customer: "Client Démo",
    date: "04 nov. 2026",
    dateSort: "2026-11-04",
    total: "4 000 FCFA",
    status: "completed",
    statusLabel: "Terminée",
    store: "Saveurs du Faso",
    receiptMode: "Retrait au commerce · démo",
    orderStatus: "Terminée · exemple",
    paymentStatus: "Validé · vérification humaine illustrée",
    paymentReference: "PAY-DEMO-0003 · fictif",
    paymentOperator: "Orange Money · démo",
    preparationStatus: "Terminée · remise au client illustrée",
    preparationStarted: true,
    items: [
      {
        name: "Menu du jour × 1",
        amount: 4_000,
        details: ["Prix historique : 4 000 FCFA"],
        note: "Commande terminée · exemple fictif",
      },
    ],
    itemsSubtotal: 4_000,
    sharedFees: 0,
    totalPaid: 4_000,
    scopeLabel: "Aucune annulation · commande terminée",
    refundAmount: 0,
    refundStatus: "not_required",
    refundLabel: "Non requis · exemple fictif",
    refundReference: "—",
    refundReason: "Aucun remboursement dans cet exemple.",
    proposedItem: "Article de remplacement · démo",
    proposedAmount: 4_000,
    history: [
      {
        date: "04 nov. 2026 · exemple",
        title: "Commande reçue · réservation créée",
        detail: "Données fictives de démonstration.",
      },
      {
        date: "04 nov. 2026 · exemple",
        title: "Paiement vérifié humainement · illustration",
        detail: "Aucune preuve ni transaction réelle n’est consultée.",
      },
      {
        date: "04 nov. 2026 · exemple",
        title: "Commande terminée",
        detail: "Retrait au commerce · aucun service de livraison Delifast.",
      },
    ],
  },
];

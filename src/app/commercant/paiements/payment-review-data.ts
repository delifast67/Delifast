export type PaymentState = "pending" | "validated" | "rejected";

export type DemoPaymentSubmission = {
  number: number;
  state: PaymentState;
  date: string;
  transactionReference: string;
  proofReference: string;
  reviewer: string;
  reason: string;
};

export type DemoPaymentReview = {
  reference: string;
  orderId: string;
  orderReference: string;
  customer: string;
  restaurant: string;
  amount: number;
  operator: string;
  beneficiary: string;
  transactionReference: string;
  proofReference: string;
  submittedAt: string;
  status: PaymentState;
  history: DemoPaymentSubmission[];
};

export const demoPaymentReviews: Record<string, DemoPaymentReview> = {
  "PAY-0418": {
    reference: "PAY-0418",
    orderId: "DF-24018",
    orderReference: "#DF-24018",
    customer: "Client Démo · fictif",
    restaurant: "Saveurs du Faso · fictif",
    amount: 7_000,
    operator: "Orange Money · démo",
    beneficiary: "Non affiché dans cette maquette",
    transactionReference: "TXN-DEMO-0418-B",
    proofReference: "PREUVE-DEMO-0418-B",
    submittedAt: "06 nov. 2026 · 14:26 · date fictive",
    status: "pending",
    history: [
      {
        number: 1,
        state: "rejected",
        date: "06 nov. 2026 · 13:58 · date fictive",
        transactionReference: "TXN-DEMO-0418-A",
        proofReference: "PREUVE-DEMO-0418-A",
        reviewer: "Commerçant bénéficiaire · démo",
        reason: "Référence non rapprochée · motif entièrement fictif.",
      },
      {
        number: 2,
        state: "pending",
        date: "06 nov. 2026 · 14:26 · date fictive",
        transactionReference: "TXN-DEMO-0418-B",
        proofReference: "PREUVE-DEMO-0418-B",
        reviewer: "Aucune décision · en attente",
        reason:
          "Nouvelle soumission distincte; une vérification humaine est attendue.",
      },
    ],
  },
  "PAY-0416": {
    reference: "PAY-0416",
    orderId: "DF-24016",
    orderReference: "#DF-24016",
    customer: "Client Exemple · fictif",
    restaurant: "Saveurs du Faso · fictif",
    amount: 4_500,
    operator: "Telmob · démo",
    beneficiary: "Non affiché dans cette maquette",
    transactionReference: "TXN-DEMO-0416",
    proofReference: "PREUVE-DEMO-0416",
    submittedAt: "06 nov. 2026 · 11:08 · date fictive",
    status: "validated",
    history: [
      {
        number: 1,
        state: "validated",
        date: "06 nov. 2026 · 11:08 · date fictive",
        transactionReference: "TXN-DEMO-0416",
        proofReference: "PREUVE-DEMO-0416",
        reviewer: "Commerçant bénéficiaire · démo",
        reason:
          "Décision humaine d’exemple; aucune transaction ni modification réelle.",
      },
    ],
  },
  "PAY-0411": {
    reference: "PAY-0411",
    orderId: "DF-24011",
    orderReference: "#DF-24011",
    customer: "Client Démo · fictif",
    restaurant: "Saveurs du Faso · fictif",
    amount: 4_000,
    operator: "Orange Money · démo",
    beneficiary: "Non affiché dans cette maquette",
    transactionReference: "TXN-DEMO-0411",
    proofReference: "PREUVE-DEMO-0411",
    submittedAt: "04 nov. 2026 · 18:42 · date fictive",
    status: "rejected",
    history: [
      {
        number: 1,
        state: "rejected",
        date: "04 nov. 2026 · 18:42 · date fictive",
        transactionReference: "TXN-DEMO-0411",
        proofReference: "PREUVE-DEMO-0411",
        reviewer: "Commerçant bénéficiaire · démo",
        reason: "Montant non rapproché · motif entièrement fictif.",
      },
    ],
  },
};

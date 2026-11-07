import type { Metadata } from "next";
import { ClientPaymentDetail } from "./payment-detail";

export const metadata: Metadata = {
  title: "Détail d’un paiement (démo) | Delifast",
  description:
    "Détail fictif d’un paiement client, état et historique de preuves illustratifs, sans transaction ni téléversement.",
};

export function generateStaticParams() {
  return ["PAY-DEMO-0001", "PAY-DEMO-0002", "PAY-DEMO-0003", "PAY-DEMO-0004"].map(
    (reference) => ({ reference }),
  );
}

type ClientPaymentDetailPageProps = {
  params: Promise<{ reference: string }>;
};

export default async function ClientPaymentDetailPage({
  params,
}: ClientPaymentDetailPageProps) {
  const { reference } = await params;

  return <ClientPaymentDetail reference={reference} />;
}

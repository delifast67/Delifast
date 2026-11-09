import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MerchantPaymentReview } from "../payment-review";
import { demoPaymentReviews } from "../payment-review-data";

export const metadata: Metadata = {
  title: "Détail et vérification d’un paiement (démo) | Delifast",
  description:
    "Vérification manuelle d’un paiement fictif côté commerçant. Aucune preuve réelle, transaction ou donnée persistée.",
};

export function generateStaticParams() {
  return Object.keys(demoPaymentReviews).map((reference) => ({ reference }));
}

type MerchantPaymentReviewPageProps = {
  params: Promise<{ reference: string }>;
};

export default async function MerchantPaymentReviewPage({
  params,
}: MerchantPaymentReviewPageProps) {
  const { reference } = await params;
  const payment = Object.values(demoPaymentReviews).find(
    (item) => item.reference === reference,
  );

  if (!payment) notFound();

  return <MerchantPaymentReview payment={payment} />;
}

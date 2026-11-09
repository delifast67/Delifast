import type { Metadata } from "next";
import { SubscriptionPaymentDemo } from "./subscription-payment-demo";

export const metadata: Metadata = {
  title: "Paiement de l’abonnement · écran 37 (démo) | Delifast",
  description:
    "Démonstration locale et fictive du paiement d’un abonnement Delifast, avec validation administrative humaine.",
};

export const instant = false;

type PageProps = {
  searchParams: Promise<{ forfait?: string | string[] }>;
};

export default async function SubscriptionPaymentPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const requestedPlan = Array.isArray(params.forfait) ? params.forfait[0] : params.forfait;
  const initialPlan = requestedPlan === "professionnel" ? "professionnel" : "decouverte";

  return <SubscriptionPaymentDemo initialPlan={initialPlan} />;
}

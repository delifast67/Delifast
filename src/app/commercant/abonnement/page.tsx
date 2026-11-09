import type { Metadata } from "next";
import { MerchantSubscriptionManagement } from "./subscription-management";

export const metadata: Metadata = {
  title: "Gestion de l’abonnement (démo) | Delifast",
  description:
    "Écran 36 sur 53 — forfaits et historique fictifs. Aucun abonnement ni paiement réel n’est créé.",
};

export default function MerchantSubscriptionPage() {
  return <MerchantSubscriptionManagement />;
}

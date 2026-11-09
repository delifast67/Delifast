import type { Metadata } from "next";
import { MerchantPaymentsList } from "./payments-list";

export const metadata: Metadata = {
  title: "Liste des paiements commerçant (démo) | Delifast",
  description:
    "Aperçu local de paiements de commande fictifs destinés au commerce. Aucune preuve réelle n’est affichée ou vérifiée.",
};

export default function MerchantPaymentsPage() {
  return <MerchantPaymentsList />;
}

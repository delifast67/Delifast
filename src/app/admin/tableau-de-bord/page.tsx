import type { Metadata } from "next";
import AdminDashboardDemo from "./admin-dashboard-demo";

export const metadata: Metadata = {
  title: "Tableau de bord général — Démonstration | Delifast",
  description:
    "Écran 39 de démonstration : tableau de bord général avec des données entièrement fictives et locales.",
};

export default function AdminDashboardDemoPage() {
  return <AdminDashboardDemo />;
}

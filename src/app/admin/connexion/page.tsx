import type { Metadata } from "next";
import AdminLogin from "./admin-login";

export const metadata: Metadata = {
  title: "Connexion administrateur | Delifast",
  description: "Accès privé de démonstration à l’espace d’administration Delifast.",
};

export default function AdminConnexionPage() {
  return <AdminLogin />;
}

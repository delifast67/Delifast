import type { Metadata } from "next";
import { HelpCenter } from "../../../components/public-pages/help-center";
import { PublicFrame } from "../../../components/public-pages/public-shell";

export const metadata: Metadata = {
  title: "Aide · Delifast",
  description:
    "Des réponses pratiques de démonstration pour parcourir Delifast.",
};

export default function HelpPage() {
  return (
    <PublicFrame active="help">
      <HelpCenter />
    </PublicFrame>
  );
}

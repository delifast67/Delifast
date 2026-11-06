import type { Metadata } from "next";
import { CatalogueBrowser } from "../../../components/public-pages/catalogue-browser";
import { PublicFrame } from "../../../components/public-pages/public-shell";

export const metadata: Metadata = {
  title: "Catalogue général · Delifast",
  description: "Explorez un aperçu fictif des catégories, restaurants et commerces de Delifast.",
};

export default function CataloguePage() {
  return (
    <PublicFrame active="catalogue">
      <CatalogueBrowser />
    </PublicFrame>
  );
}

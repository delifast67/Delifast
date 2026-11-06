import type { Metadata } from "next";
import { CommerceExperience } from "../../../../components/public-pages/commerce-experience";
import { PublicFrame } from "../../../../components/public-pages/public-shell";
import { DEMO_PUBLIC_COMMERCE } from "../../../../lib/demo-data/public-commerce";

export const metadata: Metadata = {
  title: `${DEMO_PUBLIC_COMMERCE.name} · Commerce de démonstration · Delifast`,
  description: "Fiche fictive d’un commerce de proximité et de ses produits exemples.",
};

export default function CommercePage() {
  return (
    <PublicFrame active="catalogue">
      <CommerceExperience commerce={DEMO_PUBLIC_COMMERCE} />
    </PublicFrame>
  );
}

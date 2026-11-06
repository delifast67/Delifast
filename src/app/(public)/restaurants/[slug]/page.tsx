import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicFrame } from "../../../../components/public-pages/public-shell";
import { RestaurantExperience } from "../../../../components/public-pages/restaurant-experience";
import { DEMO_RESTAURANTS } from "../../../../lib/demo-data/public-catalog";

type RestaurantPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return DEMO_RESTAURANTS.map((restaurant) => ({ slug: restaurant.slug }));
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = DEMO_RESTAURANTS.find((item) => item.slug === slug);
  if (!restaurant) return { title: "Restaurant non trouvé · Delifast" };
  return {
    title: `${restaurant.name} · Restaurant de démonstration · Delifast`,
    description: `${restaurant.cuisine}. Fiche et produits fictifs de démonstration.`,
  };
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;
  const restaurant = DEMO_RESTAURANTS.find((item) => item.slug === slug);
  if (!restaurant) notFound();

  return (
    <PublicFrame active="restaurants">
      <RestaurantExperience restaurant={restaurant} />
    </PublicFrame>
  );
}

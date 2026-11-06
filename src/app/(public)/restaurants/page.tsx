import type { Metadata } from "next";
import { RestaurantDirectory } from "../../../components/public-pages/restaurant-directory";
import { PublicFrame } from "../../../components/public-pages/public-shell";

export const metadata: Metadata = {
  title: "Restaurants · Delifast",
  description: "Parcourez les fiches de restaurants fictives de l’aperçu Delifast.",
};

export default function RestaurantsPage() {
  return (
    <PublicFrame active="restaurants">
      <RestaurantDirectory />
    </PublicFrame>
  );
}

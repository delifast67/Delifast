/**
 * Fixture de démonstration réservée à l’écran public Fiche commerce.
 * L’enseigne, les produits, la disponibilité, les visuels et les prix sont fictifs.
 */
export type DemoCommerceProduct = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly available: boolean;
};

export type DemoCommerce = {
  readonly slug: string;
  readonly name: string;
  readonly category: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly location: string;
  readonly pickupSummary: string;
  readonly availabilitySummary: string;
  readonly products: readonly DemoCommerceProduct[];
};

export const PUBLIC_COMMERCE_DELIVERY_NOTE =
  "La livraison, si elle est proposée, est organisée et gérée par le commerçant ; Delifast n’opère pas de service de livraison.";

export const DEMO_PUBLIC_COMMERCE: DemoCommerce = {
  slug: "epicerie-du-quartier",
  name: "Épicerie du Quartier",
  category: "Alimentation · Commerce de proximité",
  imageSrc: "/images/demo-delifast/table.jpg",
  imageAlt: "Table garnie, photographie illustrative fictive pour cette vitrine de démonstration",
  location: "Ouagadougou · adresse de démonstration",
  pickupSummary: "Modalités de retrait indiquées par le vendeur",
  availabilitySummary: "Disponibilité affichée par le commerce",
  products: [
    {
      id: "panier-de-saison",
      name: "Panier de saison",
      description: "Produit exemple · disponibilité gérée par le vendeur",
      price: 2500,
      imageSrc: "/images/demo-delifast/table.jpg",
      imageAlt: "Illustration fictive du panier de saison",
      available: true,
    },
    {
      id: "jus-frais",
      name: "Jus frais",
      description: "Disponibilité gérée manuellement · épuisé dans cette démo",
      price: 1200,
      imageSrc: "/images/demo-delifast/plat-hero.jpg",
      imageAlt: "Visuel illustratif fictif associé au jus frais",
      available: false,
    },
    {
      id: "assortiment-du-jour",
      name: "Assortiment du jour",
      description: "Produit exemple · visuel et information fictifs",
      price: 3000,
      imageSrc: "/images/demo-delifast/grillades.jpg",
      imageAlt: "Illustration fictive de l’assortiment du jour",
      available: true,
    },
  ],
};

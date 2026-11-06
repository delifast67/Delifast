/**
 * Fixtures de démonstration réservées aux écrans publics catalogue/restaurants.
 * Les commerces, produits, notes, lieux, disponibilités et prix ci-dessous sont
 * fictifs ; aucune API ni donnée réelle n’est utilisée.
 */
export type DemoOption = {
  readonly id: string;
  readonly label: string;
  readonly price: number;
};

export type DemoOptionGroup = {
  readonly id: string;
  readonly title: string;
  readonly required: boolean;
  readonly minimum: number;
  readonly maximum: number;
  readonly kind: "single" | "multiple";
  readonly options: readonly DemoOption[];
};

export type DemoRestaurantProduct = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly optionGroups: readonly DemoOptionGroup[];
  readonly initialSelection?: Readonly<Record<string, readonly string[]>>;
};

export type DemoRestaurant = {
  readonly slug: string;
  readonly name: string;
  readonly cuisine: string;
  readonly cuisineFilter: "Cuisine locale" | "Grillades" | "Pizzeria" | "Cuisine variée";
  readonly rating: string;
  readonly location: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly demoOpenNow: boolean;
  readonly serviceSummary: string;
  readonly paymentSummary: string;
  readonly products: readonly DemoRestaurantProduct[];
};

export type DemoCatalogProduct = {
  readonly id: string;
  readonly name: string;
  readonly merchantName: string;
  readonly category: "Restaurants" | "Alimentation";
  readonly price: number;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly available: boolean;
  readonly restaurantSlug: string | null;
};

const noOptions: readonly DemoOptionGroup[] = [];

export const PUBLIC_DEMO_NOTICE =
  "Exemples fictifs : commerces, produits, notes, disponibilités, photos et prix illustratifs. Aucun catalogue réel n’est connecté.";

export const DEMO_RESTAURANTS: readonly DemoRestaurant[] = [
  {
    slug: "saveurs-du-faso",
    name: "Saveurs du Faso",
    cuisine: "Cuisine locale · Grillades",
    cuisineFilter: "Cuisine locale",
    rating: "4,8",
    location: "Ouagadougou · secteur de démonstration",
    imageSrc: "/images/demo-delifast/grillades.jpg",
    imageAlt: "Assiette de grillades, photographie illustrative de démonstration",
    demoOpenNow: true,
    serviceSummary: "Retrait et livraison proposés par le commerce (démo)",
    paymentSummary: "Paiement direct au commerçant",
    products: [
      {
        id: "poulet-braise",
        name: "Poulet braisé",
        description: "Accompagnement au choix",
        price: 3500,
        imageSrc: "/images/demo-delifast/grillades.jpg",
        imageAlt: "Poulet braisé, visuel fictif",
        optionGroups: [
          {
            id: "cuisson",
            title: "Cuisson",
            required: true,
            minimum: 1,
            maximum: 1,
            kind: "single",
            options: [
              { id: "a-point", label: "À point", price: 0 },
              { id: "bien-cuit", label: "Bien cuit", price: 0 },
            ],
          },
          {
            id: "accompagnement",
            title: "Accompagnement",
            required: false,
            minimum: 0,
            maximum: 1,
            kind: "single",
            options: [
              { id: "riz", label: "Riz", price: 0 },
              { id: "frites", label: "Frites", price: 500 },
              { id: "salade", label: "Salade", price: 300 },
            ],
          },
          {
            id: "supplements",
            title: "Suppléments",
            required: false,
            minimum: 0,
            maximum: 2,
            kind: "multiple",
            options: [
              { id: "fromage", label: "Fromage", price: 400 },
              { id: "sauce-maison", label: "Sauce maison", price: 200 },
            ],
          },
        ],
        initialSelection: { cuisson: ["a-point"], accompagnement: ["frites"] },
      },
      {
        id: "menu-du-jour",
        name: "Menu du jour",
        description: "Préparé à la commande · exemple fictif",
        price: 4500,
        imageSrc: "/images/demo-delifast/table.jpg",
        imageAlt: "Repas et accompagnements, visuel fictif",
        optionGroups: noOptions,
      },
      {
        id: "brochettes-mixtes",
        name: "Brochettes mixtes",
        description: "Options de suppléments disponibles (démo)",
        price: 2800,
        imageSrc: "/images/demo-delifast/grillades.jpg",
        imageAlt: "Brochettes illustratives de démonstration",
        optionGroups: noOptions,
      },
    ],
  },
  {
    slug: "la-piazza",
    name: "La Piazza",
    cuisine: "Pizzeria · Cuisine italienne",
    cuisineFilter: "Pizzeria",
    rating: "4,7",
    location: "Ouagadougou · secteur de démonstration",
    imageSrc: "/images/demo-delifast/pizza.jpg",
    imageAlt: "Pizza garnie, photographie illustrative de démonstration",
    demoOpenNow: true,
    serviceSummary: "Modalités de retrait proposées par le commerce (démo)",
    paymentSummary: "Paiement direct au commerçant",
    products: [
      {
        id: "pizza-du-marche",
        name: "Pizza du marché",
        description: "Garniture de démonstration",
        price: 4000,
        imageSrc: "/images/demo-delifast/pizza.jpg",
        imageAlt: "Pizza garnie, visuel fictif",
        optionGroups: noOptions,
      },
      {
        id: "pizza-maison",
        name: "Pizza maison",
        description: "Exemple de spécialité fictive",
        price: 4500,
        imageSrc: "/images/demo-delifast/pizza.jpg",
        imageAlt: "Pizza de démonstration",
        optionGroups: noOptions,
      },
      {
        id: "salade-du-marche",
        name: "Salade du marché",
        description: "Composition illustrative fictive",
        price: 2500,
        imageSrc: "/images/demo-delifast/table.jpg",
        imageAlt: "Assiette de démonstration",
        optionGroups: noOptions,
      },
    ],
  },
  {
    slug: "le-jardin-gourmand",
    name: "Le Jardin Gourmand",
    cuisine: "Cuisine variée",
    cuisineFilter: "Cuisine variée",
    rating: "4,6",
    location: "Ouagadougou · secteur de démonstration",
    imageSrc: "/images/demo-delifast/table.jpg",
    imageAlt: "Table garnie, photographie illustrative de démonstration",
    demoOpenNow: false,
    serviceSummary: "Modalités précisées par le commerce (démo)",
    paymentSummary: "Paiement direct au commerçant",
    products: [
      {
        id: "plat-du-jour",
        name: "Plat du jour",
        description: "Menu de démonstration",
        price: 4500,
        imageSrc: "/images/demo-delifast/table.jpg",
        imageAlt: "Plat du jour fictif",
        optionGroups: noOptions,
      },
      {
        id: "assiette-decouverte",
        name: "Assiette découverte",
        description: "Composition illustrative fictive",
        price: 3800,
        imageSrc: "/images/demo-delifast/grillades.jpg",
        imageAlt: "Assiette de démonstration",
        optionGroups: noOptions,
      },
      {
        id: "accompagnement-du-jour",
        name: "Accompagnement du jour",
        description: "Exemple de produit fictif",
        price: 1800,
        imageSrc: "/images/demo-delifast/table.jpg",
        imageAlt: "Accompagnement de démonstration",
        optionGroups: noOptions,
      },
    ],
  },
];

export const DEMO_CATALOG_PRODUCTS: readonly DemoCatalogProduct[] = [
  {
    id: "poulet-braise",
    name: "Poulet braisé",
    merchantName: "Saveurs du Faso",
    category: "Restaurants",
    price: 3500,
    imageSrc: "/images/demo-delifast/grillades.jpg",
    imageAlt: "Poulet braisé, image illustrative fictive",
    available: true,
    restaurantSlug: "saveurs-du-faso",
  },
  {
    id: "pizza-du-marche",
    name: "Pizza du marché",
    merchantName: "La Piazza",
    category: "Restaurants",
    price: 4000,
    imageSrc: "/images/demo-delifast/pizza.jpg",
    imageAlt: "Pizza, image illustrative fictive",
    available: true,
    restaurantSlug: "la-piazza",
  },
  {
    id: "panier-de-saison",
    name: "Panier de saison",
    merchantName: "Marché Démo",
    category: "Alimentation",
    price: 2500,
    imageSrc: "/images/demo-delifast/table.jpg",
    imageAlt: "Panier de saison, image illustrative fictive",
    available: false,
    restaurantSlug: null,
  },
];

export const DEMO_CATALOG_CATEGORIES = [
  "Tout voir",
  "Restaurants",
  "Alimentation",
  "Mode",
  "Beauté",
  "Maison",
] as const;

export const DEMO_RESTAURANT_FILTERS = [
  "Cuisine locale",
  "Grillades",
  "Pizzeria",
  "Ouverts",
] as const;

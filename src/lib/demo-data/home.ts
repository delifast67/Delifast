/**
 * Fixtures d’illustration de la page d’accueil Delifast.
 * Tous les établissements, notes et visuels référencés ici sont fictifs ;
 * aucune donnée n’est chargée depuis un service ou une API.
 */
export type HomeCategory = {
  readonly label: string;
  readonly detail: string;
  readonly icon: string;
  readonly href: string;
};

export type DemoRestaurant = {
  readonly name: string;
  readonly cuisine: string;
  readonly rating: string;
  readonly tag: string;
  readonly location: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
};

export const HOME_DEMO_NOTICE =
  "Établissements, noms, notes, photos et informations présentés ici sont fictifs et illustratifs.";

export const HOME_INTERACTIONS_NOTICE =
  "La recherche et les favoris sont des aperçus locaux ; aucun catalogue, compte ou service n’est connecté.";

export const DEMO_HOME_CATEGORIES = [
  {
    label: "Restaurants",
    detail: "Plats & spécialités",
    icon: "🍲",
    href: "#restaurants",
  },
  {
    label: "Alimentation",
    detail: "Produits du quotidien",
    icon: "🥬",
    href: "#commerces",
  },
  {
    label: "Mode & accessoires",
    detail: "Style et tendances",
    icon: "👗",
    href: "#commerces",
  },
  {
    label: "Beauté & bien-être",
    detail: "Prendre soin de soi",
    icon: "✨",
    href: "#commerces",
  },
  {
    label: "Électronique",
    detail: "Tech et accessoires",
    icon: "🎧",
    href: "#commerces",
  },
  {
    label: "Maison",
    detail: "Équipement et déco",
    icon: "🏡",
    href: "#commerces",
  },
] as const satisfies readonly HomeCategory[];

export const DEMO_HOME_RESTAURANTS = [
  {
    name: "Saveurs du Faso",
    cuisine: "Cuisine locale · Grillades",
    rating: "4,8",
    tag: "Grillades",
    location: "Ouagadougou · démo",
    imageSrc: "/images/demo-delifast/grillades.jpg",
    imageAlt: "Assiette de grillades, visuel de démonstration",
  },
  {
    name: "La Piazza",
    cuisine: "Pizzeria · Cuisine italienne",
    rating: "4,7",
    tag: "Pizzeria",
    location: "Ouagadougou · démo",
    imageSrc: "/images/demo-delifast/pizza.jpg",
    imageAlt: "Pizza garnie, visuel de démonstration",
  },
  {
    name: "Le Jardin Gourmand",
    cuisine: "Plats du jour · Cuisine variée",
    rating: "4,6",
    tag: "Cuisine variée",
    location: "Ouagadougou · démo",
    imageSrc: "/images/demo-delifast/table.jpg",
    imageAlt: "Repas et accompagnements, visuel de démonstration",
  },
] as const satisfies readonly DemoRestaurant[];

export const DEMO_HOME_OTHER_COMMERCE = [
  {
    icon: "🛍️",
    title: "Mode & accessoires",
    description: "Vêtements, chaussures, sacs et accessoires.",
    link: "Explorer la mode",
  },
  {
    icon: "💆🏾",
    title: "Beauté & bien-être",
    description: "Produits de beauté, soins et univers bien-être.",
    link: "Explorer cet univers",
  },
  {
    icon: "📱",
    title: "Électronique & maison",
    description: "Équipements, accessoires et essentiels du quotidien.",
    link: "Explorer les produits",
  },
] as const;

export const DEMO_HOME_TRUST_ITEMS = [
  {
    icon: "🔎",
    title: "Trouvez facilement",
    description:
      "Recherchez des restaurants, des plats et des commerces depuis un seul espace.",
  },
  {
    icon: "🤝",
    title: "Échangez directement",
    description:
      "Consultez les informations du vendeur et passez commande auprès de lui.",
  },
  {
    icon: "📱",
    title: "Payez selon les modalités proposées",
    description:
      "Les modalités de paiement sont affichées par le commerçant concerné.",
  },
] as const;

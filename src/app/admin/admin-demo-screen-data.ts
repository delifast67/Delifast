export type DemoListRow = {
  id: string;
  cells: string[];
  href?: string;
};

export type DemoListPage = {
  screen: number;
  section: string;
  title: string;
  description: string;
  columns: string[];
  statusColumn: number;
  filters: string[];
  rows: DemoListRow[];
};

export const demoListPages: Record<string, DemoListPage> = {
  utilisateurs: {
    screen: 40,
    section: "utilisateurs",
    title: "Liste des utilisateurs",
    description: "Recherchez et consultez les comptes de démonstration.",
    columns: ["Utilisateur", "E-mail", "Type", "Créé le", "État"],
    statusColumn: 4,
    filters: ["Tous", "En attente", "Récents"],
    rows: [
      {
        id: "aminata-demo",
        cells: ["Aminata Démo", "aminata@example.test", "Client", "06 nov. 2026", "Actif"],
        href: "/admin/utilisateurs/aminata-demo",
      },
      {
        id: "issa-exemple",
        cells: ["Issa Exemple", "issa@example.test", "Client", "05 nov. 2026", "Actif"],
      },
      {
        id: "mariam-test",
        cells: ["Mariam Test", "mariam@example.test", "Commerçant", "03 nov. 2026", "À examiner"],
      },
    ],
  },
  commercants: {
    screen: 42,
    section: "commercants",
    title: "Liste des commerçants",
    description: "Consultez les profils commerçants et leur état.",
    columns: ["Commerce", "Responsable", "Catégorie", "État", "Depuis"],
    statusColumn: 3,
    filters: ["Tous", "En attente", "Récents"],
    rows: [
      {
        id: "saveurs-du-faso",
        cells: ["Saveurs du Faso", "Mariam Test", "Restaurant", "Actif", "03 nov. 2026"],
        href: "/admin/commercants/saveurs-du-faso",
      },
      {
        id: "epicerie-du-quartier",
        cells: ["Épicerie du Quartier", "Issa Exemple", "Alimentation", "À examiner", "02 nov. 2026"],
      },
      {
        id: "la-piazza",
        cells: ["La Piazza", "Awa Démo", "Restaurant", "Actif", "28 oct. 2026"],
      },
    ],
  },
  restaurants: {
    screen: 44,
    section: "restaurants",
    title: "Liste des restaurants",
    description: "Vérifiez les fiches restaurant et leur visibilité.",
    columns: ["Restaurant", "Commerçant", "Secteur", "Visibilité", "Fiche"],
    statusColumn: 3,
    filters: ["Tous", "En attente", "Récents"],
    rows: [
      {
        id: "saveurs-du-faso",
        cells: ["Saveurs du Faso", "Mariam Test", "Ouagadougou · démo", "Visible", "Ouvrir"],
        href: "/admin/restaurants/saveurs-du-faso",
      },
      {
        id: "la-piazza",
        cells: ["La Piazza", "Awa Démo", "Ouagadougou · démo", "Visible", "Ouvrir"],
      },
      {
        id: "le-jardin-gourmand",
        cells: ["Le Jardin Gourmand", "Issa Exemple", "Ouagadougou · démo", "À examiner", "Ouvrir"],
      },
    ],
  },
  commandes: {
    screen: 46,
    section: "commandes",
    title: "Liste des commandes",
    description: "Vue de contrôle des commandes de démonstration.",
    columns: ["Commande", "Client", "Commerce", "Montant", "État"],
    statusColumn: 4,
    filters: ["Tous", "En attente", "Récents"],
    rows: [
      {
        id: "df-24018",
        cells: ["#DF-24018", "Aminata Démo", "Saveurs du Faso", "10 000 FCFA · fictif", "Annulation en cours"],
        href: "/admin/commandes/df-24018",
      },
      {
        id: "df-24016",
        cells: ["#DF-24016", "Issa Exemple", "Saveurs du Faso", "4 500 FCFA · fictif", "Annulée partiellement"],
      },
      {
        id: "df-24011",
        cells: ["#DF-24011", "Aminata Démo", "La Piazza", "4 000 FCFA · fictif", "Terminée"],
      },
    ],
  },
  abonnements: {
    screen: 48,
    section: "Gestion des abonnements",
    title: "Gestion des abonnements",
    description: "Suivez les forfaits, montants, périodes, statuts et paiements associés.",
    columns: ["Restaurant", "Commerçant", "Formule", "Montant fictif", "Début fictif", "Expiration fictive", "Statut", "Paiement"],
    statusColumn: 6,
    filters: ["Tous", "Découverte", "Professionnel", "En attente", "Actif", "Expiré", "Refusé"],
    rows: [
      {
        id: "sub-demo-0001",
        cells: ["Restaurant Démo", "Commerçant Démo", "Découverte", "MONTANT FICTIF", "Date fictive", "Date fictive", "En attente", "PAY-DEMO-0001 · fictif"],
        href: "/admin/abonnements/sub-demo-0001",
      },
      {
        id: "sub-demo-0002",
        cells: ["Restaurant Exemple", "Commerçant Exemple", "Professionnel", "MONTANT FICTIF", "Date fictive", "Date fictive", "Validé", "PAY-DEMO-0002 · fictif"],
      },
      {
        id: "sub-demo-0003",
        cells: ["Restaurant Test", "Commerçant Test", "Découverte", "MONTANT FICTIF", "Date fictive", "Date fictive", "Refusé", "PAY-DEMO-0003 · fictif"],
      },
    ],
  },
  paiements: {
    screen: 50,
    section: "Paiements",
    title: "Liste des paiements",
    description: "Supervisez les paiements d’abonnement destinés à Delifast et les paiements de commande destinés aux restaurants.",
    columns: ["Référence fictive", "Bénéficiaire", "Restaurant / commerçant", "Type", "Opérateur", "Montant fictif", "Date fictive", "Statut"],
    statusColumn: 7,
    filters: ["Tous", "Commandes", "Abonnements", "Orange Money", "Telmob", "En attente", "Validés", "Refusés"],
    rows: [
      {
        id: "pay-demo-0001",
        cells: ["PAY-DEMO-0001 · fictif", "Restaurant Démo", "Restaurant Démo", "Commande", "Orange Money · démo", "9 500 FCFA · fictif", "Date fictive", "En attente"],
        href: "/admin/paiements/pay-demo-0001",
      },
      {
        id: "pay-demo-0002",
        cells: ["PAY-DEMO-0002 · fictif", "Delifast · destinataire de démo", "Restaurant Exemple", "Abonnement", "Telmob · démo", "MONTANT FICTIF", "Date fictive", "Validé"],
      },
      {
        id: "pay-demo-0003",
        cells: ["PAY-DEMO-0003 · fictif", "Restaurant Test", "Restaurant Test", "Commande", "Orange Money · démo", "2 500 FCFA · fictif", "Date fictive", "Refusé"],
      },
    ],
  },
};

export type DemoInfoField = { label: string; value: string };
export type DemoHistoryItem = { title: string; detail: string; tag?: string };
export type DemoSimpleDetail = {
  screen: number;
  section: string;
  title: string;
  description: string;
  fields: DemoInfoField[];
  history: DemoHistoryItem[];
  status?: string;
};

export const demoSimpleDetails: Record<string, DemoSimpleDetail> = {
  "utilisateurs/aminata-demo": {
    screen: 41,
    section: "utilisateurs",
    title: "Détail d’un utilisateur",
    description: "Informations et historique du compte sélectionné.",
    fields: [
      { label: "Nom", value: "Aminata Démo" },
      { label: "E-mail", value: "aminata@example.test" },
      { label: "Type", value: "Client" },
      { label: "Création", value: "06 novembre 2026" },
      { label: "Données", value: "Exemple fictif" },
    ],
    history: [
      { title: "Dossier reçu", detail: "Événement de démonstration" },
      { title: "Dernière mise à jour", detail: "Historique fictif" },
    ],
  },
  "commercants/saveurs-du-faso": {
    screen: 43,
    section: "commercants",
    title: "Détail d’un commerçant",
    description: "Profil, établissement lié et paramètres de démonstration.",
    status: "Actif · donnée fictive",
    fields: [
      { label: "Commerce", value: "Saveurs du Faso" },
      { label: "Responsable", value: "Mariam Test" },
      { label: "Catégorie", value: "Restaurant" },
      { label: "Paiements", value: "Orange Money configuré · démo" },
      { label: "État", value: "Actif · donnée fictive" },
    ],
    history: [
      { title: "Dossier reçu", detail: "Événement de démonstration", tag: "Exemple" },
      { title: "Dernière mise à jour", detail: "Historique fictif" },
    ],
  },
  "restaurants/saveurs-du-faso": {
    screen: 45,
    section: "restaurants",
    title: "Détail d’un restaurant",
    description: "Consultez la fiche et les informations soumises par le commerçant.",
    status: "Visible · exemple de maquette",
    fields: [
      { label: "Nom", value: "Saveurs du Faso" },
      { label: "Catégorie", value: "Cuisine locale · Grillades" },
      { label: "Localisation", value: "Ouagadougou · repère fictif" },
      { label: "Commerçant", value: "Mariam Test" },
      { label: "Visibilité", value: "Visible · exemple de maquette" },
    ],
    history: [
      { title: "Dossier reçu", detail: "Événement de démonstration", tag: "Exemple" },
      { title: "Dernière mise à jour", detail: "Historique fictif" },
    ],
  },
};

export const sectionTitles: Record<string, string> = {
  utilisateurs: "Utilisateurs",
  commercants: "Commerçants",
  restaurants: "Restaurants",
  commandes: "Commandes",
  abonnements: "Gestion des abonnements",
  paiements: "Paiements",
};

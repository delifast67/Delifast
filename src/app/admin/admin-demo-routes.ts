export const adminDemoSections = {
  utilisateurs: { screen: 40, details: ["aminata-demo"] },
  commercants: { screen: 42, details: ["saveurs-du-faso"] },
  restaurants: { screen: 44, details: ["saveurs-du-faso"] },
  commandes: { screen: 46, details: ["df-24018"] },
  abonnements: { screen: 48, details: ["sub-demo-0001"] },
  paiements: { screen: 50, details: ["pay-demo-0001"] },
} as const;

export function isKnownAdminDemoPath(segments: string[]) {
  if (segments.length === 1 && ["erreur", "page-introuvable"].includes(segments[0])) {
    return true;
  }

  if (segments.length === 1) {
    return Object.prototype.hasOwnProperty.call(adminDemoSections, segments[0]);
  }

  if (segments.length === 2) {
    const section = adminDemoSections[segments[0] as keyof typeof adminDemoSections];
    return Boolean(section && section.details.some((detail) => detail === segments[1]));
  }

  return false;
}

export function getAdminDemoStaticParams(): { segments: string[] }[] {
  const sectionParams = Object.entries(adminDemoSections).flatMap(([section, definition]) => [
    { segments: [section] },
    ...definition.details.map((detail) => ({ segments: [section, detail] })),
  ]);
  return [...sectionParams, { segments: ["erreur"] }, { segments: ["page-introuvable"] }];
}

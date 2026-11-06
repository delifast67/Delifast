import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delifast — Le meilleur de vos envies, au même endroit",
  description:
    "Découvrez les restaurants, les plats et les commerces de Ouagadougou avec Delifast.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

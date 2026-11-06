import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delifast — Les bonnes adresses de Ouagadougou",
  description:
    "Le socle technique de Delifast, une marketplace pour découvrir les restaurants et commerces de Ouagadougou.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

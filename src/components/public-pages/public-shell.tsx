import Link from "next/link";
import type { ReactNode } from "react";
import { PUBLIC_DEMO_NOTICE } from "../../lib/demo-data/public-catalog";
import { HomeBrand } from "../public-home/site-header";
import homeStyles from "../public-home/home.module.css";

type PublicSection = "catalogue" | "restaurants" | "help";

const links = [
  { label: "Restaurants", href: "/restaurants" },
  { label: "Recherche", href: "/recherche" },
  { label: "Catégories", href: "/catalogue#categories" },
  { label: "Commerces", href: "/commerces/epicerie-du-quartier" },
  { label: "Aide", href: "/aide" },
] as const;

export function PublicHeader() {
  return (
    <>
      <div className={homeStyles.topline}>
        Aperçu fictif de Delifast — <strong>les bonnes adresses de Ouagadougou</strong>
      </div>
      <header className={homeStyles.header}>
        <div className={`${homeStyles.wrap} ${homeStyles.nav}`}>
          <HomeBrand href="/" />
          <nav className={homeStyles.links} aria-label="Navigation principale">
            {links.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={homeStyles.actions}>
            <Link
              className={`${homeStyles.button} ${homeStyles.buttonOutline}`}
              href="/#compte-note"
            >
              Connexion
            </Link>
            <Link
              className={`${homeStyles.button} ${homeStyles.buttonPrimary}`}
              href="/#compte-note"
            >
              Créer un compte <span aria-hidden="true">↗</span>
            </Link>
            <details className={homeStyles.mobileMenu}>
              <summary className={homeStyles.menuToggle}>
                <span className={homeStyles.srOnly}>Afficher la navigation</span>
                <span aria-hidden="true">☰</span>
              </summary>
              <nav
                className={homeStyles.mobileMenuLinks}
                aria-label="Navigation mobile secondaire"
              >
                {links.map((item) => (
                  <Link href={item.href} key={item.label}>
                    {item.label}
                  </Link>
                ))}
                <Link href="/#compte-note">Connexion et compte</Link>
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}

function PublicFooter() {
  return (
    <footer className={homeStyles.footer}>
      <div className={homeStyles.wrap}>
        <div className={homeStyles.footerGrid}>
          <div>
            <HomeBrand href="/" />
            <p className={homeStyles.footerIntro}>
              Restaurants et commerces à découvrir. Les modalités de retrait ou
              livraison sont proposées par chaque commerce ; Delifast n’opère pas
              de service de livraison.
            </p>
          </div>
          <div>
            <h2 className={homeStyles.footerHeading}>Découvrir</h2>
            <div className={homeStyles.footerLinks}>
              <Link href="/restaurants">Restaurants</Link>
              <Link href="/recherche">Recherche</Link>
              <Link href="/catalogue">Catalogue</Link>
              <Link href="/commerces/epicerie-du-quartier">Fiche commerce · démo</Link>
            </div>
          </div>
          <div>
            <h2 className={homeStyles.footerHeading}>À propos</h2>
            <p className={homeStyles.footerIntro}>{PUBLIC_DEMO_NOTICE}</p>
          </div>
        </div>
        <div className={homeStyles.copyright}>
          <span>© 2026 Delifast · aperçu public de démonstration</span>
          <span>Aucune commande ni donnée commerciale réelle n’est connectée.</span>
        </div>
      </div>
    </footer>
  );
}

function PublicMobileNavigation({ active }: { active: PublicSection }) {
  const itemClass = (section: PublicSection) =>
    active === section ? homeStyles.mobileNavActive : undefined;

  return (
    <nav className={homeStyles.mobileNav} aria-label="Navigation mobile">
      <Link href="/">
        <span aria-hidden="true">⌂</span>Accueil
      </Link>
      <Link
        className={itemClass("restaurants")}
        href="/restaurants"
        aria-current={active === "restaurants" ? "page" : undefined}
      >
        <span aria-hidden="true">🍽</span>Restaurants
      </Link>
      <Link
        className={itemClass("catalogue")}
        href="/catalogue"
        aria-current={active === "catalogue" ? "page" : undefined}
      >
        <span aria-hidden="true">▦</span>Explorer
      </Link>
      <Link href="/#compte-note">
        <span aria-hidden="true">♙</span>Compte
      </Link>
    </nav>
  );
}

export function PublicFrame({
  active,
  children,
}: {
  active: PublicSection;
  children: ReactNode;
}) {
  return (
    <div className={homeStyles.page}>
      <a className={homeStyles.skipLink} href="#contenu-principal">
        Aller au contenu principal
      </a>
      <PublicHeader />
      <main id="contenu-principal">{children}</main>
      <PublicFooter />
      <PublicMobileNavigation active={active} />
    </div>
  );
}

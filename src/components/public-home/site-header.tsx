import styles from "./home.module.css";

const navigation = [
  { label: "Restaurants", href: "#restaurants" },
  { label: "Catégories", href: "#categories" },
  { label: "Commerces", href: "#commerces" },
  { label: "Aide", href: "#aide" },
] as const;

export function HomeBrand({ href = "#accueil" }: { href?: string }) {
  return (
    <a className={styles.brand} href={href} aria-label="Delifast, accueil">
      <span className={styles.brandMark} aria-hidden="true">
        ➤
      </span>
      <span className={styles.brandText}>
        DELI<span>FAST</span>
      </span>
    </a>
  );
}

export function HomeHeader() {
  return (
    <>
      <div className={styles.topline}>
        Aperçu fictif de Delifast —{" "}
        <strong>les bonnes adresses de Ouagadougou</strong>
      </div>
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.nav}`}>
          <HomeBrand />
          <nav className={styles.links} aria-label="Navigation principale">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className={styles.actions}>
            <a
              className={`${styles.button} ${styles.buttonOutline}`}
              href="#compte"
              aria-describedby="compte-note"
            >
              Connexion
            </a>
            <a
              className={`${styles.button} ${styles.buttonPrimary}`}
              href="#compte"
              aria-describedby="compte-note"
            >
              Créer un compte <span aria-hidden="true">↗</span>
            </a>
            <details className={styles.mobileMenu}>
              <summary className={styles.menuToggle}>
                <span className={styles.srOnly}>Afficher la navigation</span>
                <span aria-hidden="true">☰</span>
              </summary>
              <nav
                className={styles.mobileMenuLinks}
                aria-label="Navigation mobile secondaire"
              >
                {navigation.map((item) => (
                  <a href={item.href} key={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}

export function MobileNavigation() {
  return (
    <nav className={styles.mobileNav} aria-label="Navigation mobile">
      <a className={styles.mobileNavActive} href="#accueil">
        <span aria-hidden="true">⌂</span>Accueil
      </a>
      <a href="#restaurants">
        <span aria-hidden="true">🍽️</span>Restaurants
      </a>
      <a href="#categories">
        <span aria-hidden="true">▦</span>Explorer
      </a>
      <a href="#compte">
        <span aria-hidden="true">♙</span>Compte
      </a>
    </nav>
  );
}

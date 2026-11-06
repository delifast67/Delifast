import {
  HOME_DEMO_NOTICE,
  HOME_INTERACTIONS_NOTICE,
} from "../../lib/demo-data/home";
import { HomeBrand } from "./site-header";
import styles from "./home.module.css";

export function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footerGrid}>
          <div>
            <HomeBrand />
            <p className={styles.footerIntro}>
              Les restaurants à l’honneur, les commerces à portée de découverte.
              Delifast, votre marketplace au Burkina Faso.
            </p>
          </div>
          <div>
            <h2 className={styles.footerHeading}>Découvrir</h2>
            <div className={styles.footerLinks}>
              <a href="#restaurants">Restaurants</a>
              <a href="#categories">Catégories</a>
              <a href="#commerces">Commerces</a>
            </div>
          </div>
          <div id="compte">
            <h2 className={styles.footerHeading}>Votre compte</h2>
            <div className={styles.footerLinks}>
              <a href="#compte-note">Connexion</a>
              <a href="#compte-note">Créer un compte</a>
              <a href="#compte-note">Espace commerçant</a>
            </div>
            <p className={styles.footerIntro} id="compte-note">
              Aucun compte ni espace commerçant n’est connecté dans cet aperçu.
            </p>
          </div>
          <div>
            <h2 className={styles.footerHeading}>Informations</h2>
            <div className={styles.footerLinks}>
              <a href="#accueil">À propos</a>
              <a href="#aide">Aide & contact</a>
              <a href="#demo-notice">À propos de cet aperçu</a>
            </div>
          </div>
        </div>
        <p className={styles.footerNotice} id="demo-notice">
          {HOME_DEMO_NOTICE} {HOME_INTERACTIONS_NOTICE}
        </p>
        <div className={styles.copyright}>
          <span>© 2026 Delifast. Tous droits réservés.</span>
          <span>Fait pour découvrir les bonnes adresses du Burkina Faso.</span>
        </div>
      </div>
    </footer>
  );
}

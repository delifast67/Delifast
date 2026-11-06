import Image from "next/image";
import type { Metadata } from "next";
import { HomeBrand } from "../../../components/public-home/site-header";
import { GoogleDemoButton } from "./google-demo-button";
import styles from "./login.module.css";

export const metadata: Metadata = {
  title: "Connexion (démo) | Delifast",
  description:
    "Écran de démonstration Delifast. Aucune connexion Google réelle n’est effectuée.",
};

export default function LoginDemoPage() {
  return (
    <main className={styles.screen}>
      <a className={styles.skipLink} href="#connexion-title">
        Aller à la connexion de démonstration
      </a>
      <section className={styles.formPanel} aria-labelledby="connexion-title">
        <div className={styles.formContent}>
          <HomeBrand href="/" />
          <div className={styles.welcomeMark} aria-hidden="true">
            ↗
          </div>
          <p className={styles.eyebrow}>Bienvenue sur Delifast</p>
          <h1 className={styles.title} id="connexion-title">
            Retrouvez vos envies, simplement.
          </h1>
          <p className={styles.description}>
            Connectez-vous pour retrouver vos commandes et vos commerces favoris.
          </p>
          <GoogleDemoButton />
          <p className={styles.demoNote} id="demo-note">
            Démonstration uniquement : la connexion Google n’est pas activée ici.
            Aucun compte n’est créé ni connecté.
          </p>
          <p className={styles.termsNote}>
            À terme, l’authentification sera limitée à Google OAuth avec PKCE.
          </p>
        </div>
      </section>
      <aside
        className={styles.visualPanel}
        aria-label="Illustration de démonstration"
      >
        <Image
          className={styles.foodImage}
          src="/images/demo-delifast/plat-hero.jpg"
          alt="Illustration culinaire de démonstration, assiette colorée avec légumes et riz"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 50vw"
        />
        <div className={styles.imageShade} aria-hidden="true" />
        <div className={styles.visualCopy}>
          <p className={styles.visualEyebrow}>
            Les bonnes adresses de Ouagadougou
          </p>
          <h2>Les saveurs et commerces près de vous.</h2>
          <p>Illustration fictive de maquette — aucun compte réel connecté.</p>
        </div>
      </aside>
    </main>
  );
}

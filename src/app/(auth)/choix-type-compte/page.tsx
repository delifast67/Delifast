import type { Metadata } from "next";
import Link from "next/link";
import { HomeBrand } from "../../../components/public-home/site-header";
import { RoleDemoOptions } from "./role-demo-options";
import styles from "./roles.module.css";

export const metadata: Metadata = {
  title: "Choix du type de compte (démo) | Delifast",
  description:
    "Écran fictif de sélection d’espace Delifast. Aucun compte n’est créé et aucune session n’est ouverte.",
};

export default function AccountTypeDemoPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#type-compte-title">
        Aller au choix de démonstration
      </a>
      <section className={styles.card} aria-labelledby="type-compte-title">
        <HomeBrand href="/" />
        <p className={styles.eyebrow}>Une dernière étape</p>
        <h1 className={styles.title} id="type-compte-title">
          Quel espace souhaitez-vous utiliser ?
        </h1>
        <p className={styles.description}>
          Choisissez l’espace à associer à votre compte Google.
        </p>
        <RoleDemoOptions />
        <p className={styles.note} id="role-demo-note">
          Choix présenté à titre de maquette. Aucun espace réel n’est ouvert,
          aucun compte n’est créé et aucune session n’est activée.
        </p>
        <Link className={styles.backLink} href="/connexion">
          Retour à l’écran de connexion
        </Link>
      </section>
    </main>
  );
}

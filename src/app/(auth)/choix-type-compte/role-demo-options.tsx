"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./roles.module.css";

const roleOptions = [
  {
    label: "Client",
    description: "Découvrir les commerces et retrouver vos commandes",
    icon: "♙",
    message:
      "Démonstration uniquement : l’espace Client n’est pas connecté. Aucun compte n’a été créé et aucune session n’a été ouverte.",
  },
  {
    label: "Commerçant",
    description: "Présenter votre commerce et gérer votre activité",
    icon: "▧",
    message:
      "Démonstration uniquement : l’espace Commerçant n’est pas connecté. Aucun compte n’a été créé et aucune session n’a été ouverte.",
  },
] as const;

export function RoleDemoOptions() {
  const [message, setMessage] = useState("");

  return (
    <div
      className={styles.options}
      role="group"
      aria-label="Espaces proposés dans cette maquette"
    >
      {roleOptions.map((option) =>
        option.label === "Commerçant" ? (
          <Link
            aria-describedby="role-demo-note"
            className={styles.option}
            href="/commercant/inscription"
            key={option.label}
          >
            <span className={styles.roleIcon} aria-hidden="true">
              {option.icon}
            </span>
            <span className={styles.roleCopy}>
              <strong>{option.label}</strong>
              <small>{option.description}</small>
            </span>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </Link>
        ) : (
          <button
            aria-describedby="role-demo-note"
            className={styles.option}
            key={option.label}
            onClick={() => setMessage(option.message)}
            type="button"
          >
            <span className={styles.roleIcon} aria-hidden="true">
              {option.icon}
            </span>
            <span className={styles.roleCopy}>
              <strong>{option.label}</strong>
              <small>{option.description}</small>
            </span>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </button>
        ),
      )}
      <p
        className={styles.status}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </p>
    </div>
  );
}

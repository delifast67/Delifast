"use client";

import { useState } from "react";
import styles from "./login.module.css";

export function GoogleDemoButton() {
  const [message, setMessage] = useState("");

  return (
    <div className={styles.actionGroup}>
      <button
        className={styles.googleButton}
        type="button"
        aria-describedby="demo-note"
        onClick={() =>
          setMessage(
            "Mode démonstration : aucune connexion Google réelle n’a été établie et aucun compte n’a été créé.",
          )
        }
      >
        <span className={styles.googleMark} aria-hidden="true">
          G
        </span>
        <span>Continuer avec Google</span>
      </button>
      <p
        className={styles.actionStatus}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </p>
    </div>
  );
}

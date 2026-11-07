"use client";

import { useState } from "react";
import styles from "./client-payment.module.css";

type Operator = "orange" | "telmob";
type OrangeVariant = "standard" | "alternative";

const RECIPIENT = "NUMERO_FICTIF_RESTAURANT";
const AMOUNT = 9500;

export function UssdDemoSelector() {
  const [operator, setOperator] = useState<Operator>("orange");
  const [orangeVariant, setOrangeVariant] = useState<OrangeVariant>("standard");
  const [notice, setNotice] = useState(
    "Code d’exemple Orange Money affiché ci-dessous; choisissez un opérateur ou une variante pour mettre à jour l’aperçu.",
  );

  const code =
    operator === "telmob"
      ? `*555*2*1*${RECIPIENT}*${AMOUNT}#`
      : orangeVariant === "standard"
        ? `*144*2*1*${RECIPIENT}*${AMOUNT}#`
        : `*144*10*${RECIPIENT}*${AMOUNT}#`;

  function chooseOperator(nextOperator: Operator) {
    setOperator(nextOperator);
    setNotice("Opérateur sélectionné dans la maquette; aucune opération n’a été lancée.");
  }

  function previewCode(variant: OrangeVariant) {
    setOrangeVariant(variant);
    setNotice(
      `Code fictif affiché : ${
        operator === "orange"
          ? variant === "standard"
            ? `*144*2*1*${RECIPIENT}*${AMOUNT}#`
            : `*144*10*${RECIPIENT}*${AMOUNT}#`
          : code
      }. Aucun composeur n’a été ouvert et aucun paiement n’a été effectué.`,
    );
  }

  function previewTelmob() {
    setNotice(
      `Code fictif affiché : ${code}. Aucun composeur n’a été ouvert et aucun paiement n’a été effectué.`,
    );
  }

  return (
    <section className={styles.ussdDemo} aria-labelledby="ussd-demo-title">
      <div className={styles.ussdDemoHeading}>
        <div>
          <strong id="ussd-demo-title">Choisir un opérateur actif</strong>
          <small>Options d’exemple · en situation réelle, seuls les opérateurs configurés seraient proposés.</small>
        </div>
        <span className={styles.demoTag}>Prototype interactif</span>
      </div>

      <div className={styles.operatorChoices} role="group" aria-label="Opérateur Mobile Money">
        <button
          aria-pressed={operator === "orange"}
          className={operator === "orange" ? styles.operatorChoiceActive : styles.operatorChoice}
          onClick={() => chooseOperator("orange")}
          type="button"
        >
          Orange Money
        </button>
        <button
          aria-pressed={operator === "telmob"}
          className={operator === "telmob" ? styles.operatorChoiceActive : styles.operatorChoice}
          onClick={() => chooseOperator("telmob")}
          type="button"
        >
          Telmob
        </button>
      </div>

      <div className={styles.ussdActions} role="group" aria-label="Formats USSD fictifs">
        {operator === "orange" ? (
          <>
            <button className={styles.demoButton} onClick={() => previewCode("standard")} type="button">
              Afficher Orange Money · format 1
            </button>
            <button className={styles.demoButtonSecondary} onClick={() => previewCode("alternative")} type="button">
              Afficher Orange Money · variante
            </button>
          </>
        ) : (
          <button className={styles.demoButton} onClick={previewTelmob} type="button">
            Afficher le code Telmob
          </button>
        )}
      </div>

      <div className={styles.ussdCodeCard}>
        <small>Code USSD de démonstration · non appelable</small>
        <code>{code}</code>
        <span>Bénéficiaire fictif : {RECIPIENT} · Montant exact d’exemple : 9 500 FCFA</span>
      </div>

      <p className={styles.ussdDemoNotice} aria-live="polite">
        {notice}
      </p>
      <p className={styles.ussdFutureNote}>
        Lors du développement, l’action ouvrira le composeur avec le code prérempli. Le client effectuera et confirmera
        lui-même la transaction, puis reviendra ici pour transmettre la capture du SMS et la référence; le paiement
        restera en attente jusqu’à la vérification humaine du restaurant.
      </p>
    </section>
  );
}

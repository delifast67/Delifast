"use client";

import { useState, type FormEvent } from "react";
import styles from "./payment-setup.module.css";

type OperatorId = "orange-money" | "telmob";
type Operator = {
  id: OperatorId;
  name: string;
  mark: string;
  enabled: boolean;
  number: string;
};

const initialOperators: Operator[] = [
  { id: "orange-money", name: "Orange Money", mark: "O", enabled: true, number: "" },
  { id: "telmob", name: "Telmob", mark: "T", enabled: false, number: "" },
];

export function MerchantPaymentSetupForm() {
  const [operators, setOperators] = useState(initialOperators);
  const [previewUpdated, setPreviewUpdated] = useState(false);

  function updateOperator(id: OperatorId, changes: Partial<Operator>) {
    setOperators((current) =>
      current.map((operator) =>
        operator.id === id ? { ...operator, ...changes } : operator,
      ),
    );
    setPreviewUpdated(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewUpdated(true);
  }

  const offeredOperators = operators.filter(
    (operator) => operator.enabled && operator.number.trim().length > 0,
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.operatorList}>
        {operators.map((operator) => (
          <section className={styles.operatorCard} key={operator.id}>
            <div className={styles.operatorTopline}>
              <span className={`${styles.operatorMark} ${operator.id === "telmob" ? styles.telmark : ""}`} aria-hidden="true">
                {operator.mark}
              </span>
              <div className={styles.operatorIdentity}>
                <h3>{operator.name}</h3>
                <p className={operator.enabled ? styles.enabledText : styles.disabledText}>
                  <span aria-hidden="true" className={styles.statusDot} />
                  {operator.enabled ? "Activé dans cet aperçu" : "Désactivé · non proposé"}
                </p>
              </div>
              <button
                aria-pressed={operator.enabled}
                aria-label={`${operator.enabled ? "Désactiver" : "Activer"} ${operator.name} dans l’aperçu`}
                className={`${styles.toggle} ${operator.enabled ? styles.toggleOn : ""}`}
                onClick={() => updateOperator(operator.id, { enabled: !operator.enabled })}
                type="button"
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>

            <label className={styles.numberField} htmlFor={`beneficiary-${operator.id}`}>
              <span>Numéro bénéficiaire fictif</span>
              <input
                autoComplete="off"
                id={`beneficiary-${operator.id}`}
                inputMode="tel"
                maxLength={32}
                onChange={(event) => updateOperator(operator.id, { number: event.target.value })}
                placeholder="XX XX XX XX · exemple fictif"
                type="text"
                value={operator.number}
              />
            </label>
            <p className={styles.fieldHint}>
              Utilisez uniquement des caractères de démonstration — aucun numéro réel.
            </p>
          </section>
        ))}
      </div>

      <div className={styles.offerPreview} aria-live="polite">
        <div className={styles.previewIcon} aria-hidden="true">▣</div>
        <div className={styles.previewCopy}>
          <strong>Moyens visibles dans l’aperçu client</strong>
          {offeredOperators.length > 0 ? (
            <div className={styles.providerChips}>
              {offeredOperators.map((operator) => (
                <span className={styles.providerChip} key={operator.id}>
                  <span aria-hidden="true">✓</span> {operator.name}
                </span>
              ))}
            </div>
          ) : (
            <p>Aucun opérateur ne sera proposé tant qu’il n’est pas activé avec un numéro fictif.</p>
          )}
        </div>
      </div>

      <div className={styles.formFooter}>
        <p>Les modifications sont temporaires et locales à cette page.</p>
        <button className={styles.submitButton} type="submit">
          Actualiser l’aperçu <span aria-hidden="true">→</span>
        </button>
      </div>
      <p aria-live="polite" className={styles.localStatus}>
        {previewUpdated
          ? "Aperçu local actualisé. Aucun moyen de paiement n’a été enregistré."
          : "Mode démonstration : aucun paiement, USSD, appel téléphonique ou service externe n’est utilisé."}
      </p>
    </form>
  );
}

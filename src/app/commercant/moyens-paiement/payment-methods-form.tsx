"use client";

import { useState, type FormEvent } from "react";
import styles from "../inscription/paiements/payment-setup.module.css";
import pageStyles from "./payment-methods.module.css";

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

export function MerchantPaymentMethodsForm() {
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
    <form
      className={styles.form}
      id="merchant-payment-methods-form"
      onSubmit={handleSubmit}
    >
      <div className={styles.operatorList}>
        {operators.map((operator) => {
          const numberId = `demo-beneficiary-${operator.id}`;
          const hintId = `${numberId}-hint`;

          return (
            <section className={styles.operatorCard} key={operator.id}>
              <div className={styles.operatorTopline}>
                <span
                  aria-hidden="true"
                  className={`${styles.operatorMark} ${operator.id === "telmob" ? styles.telmark : ""}`}
                >
                  {operator.mark}
                </span>
                <div className={styles.operatorIdentity}>
                  <h3>{operator.name}</h3>
                  <p className={operator.enabled ? styles.enabledText : styles.disabledText}>
                    <span aria-hidden="true" className={styles.statusDot} />
                    {operator.enabled
                      ? "Activé dans cette maquette"
                      : "Désactivé · non proposé"}
                  </p>
                </div>
                <button
                  aria-pressed={operator.enabled}
                  aria-label={`${operator.enabled ? "Désactiver" : "Activer"} ${operator.name} dans la maquette`}
                  className={`${styles.toggle} ${operator.enabled ? styles.toggleOn : ""}`}
                  onClick={() => updateOperator(operator.id, { enabled: !operator.enabled })}
                  type="button"
                >
                  <span className={styles.toggleThumb} />
                </button>
              </div>

              <label className={styles.numberField} htmlFor={numberId}>
                <span>Numéro bénéficiaire fictif</span>
                <input
                  aria-describedby={hintId}
                  autoComplete="off"
                  id={numberId}
                  maxLength={32}
                  onChange={(event) =>
                    updateOperator(operator.id, {
                      number: event.target.value.replace(/[^Xx ]/g, ""),
                    })
                  }
                  pattern="[Xx ]*"
                  placeholder="XX XX XX XX · exemple fictif"
                  spellCheck={false}
                  title="Utilisez uniquement des X et des espaces pour illustrer un numéro fictif."
                  type="text"
                  value={operator.number}
                />
              </label>
              <p className={styles.fieldHint} id={hintId}>
                Démonstration uniquement : utilisez X et des espaces, jamais un numéro réel.
              </p>
            </section>
          );
        })}
      </div>

      <div aria-live="polite" className={styles.offerPreview}>
        <div aria-hidden="true" className={styles.previewIcon}>▣</div>
        <div className={styles.previewCopy}>
          <strong>Moyens présentés dans l’aperçu client</strong>
          {offeredOperators.length > 0 ? (
            <div className={styles.providerChips}>
              {offeredOperators.map((operator) => (
                <span className={styles.providerChip} key={operator.id}>
                  <span aria-hidden="true">✓</span> {operator.name} · fictif
                </span>
              ))}
            </div>
          ) : (
            <p>
              Aucun opérateur dans l’aperçu : il faut l’activer et saisir un numéro
              fictif en X.
            </p>
          )}
        </div>
      </div>

      <div className={styles.formFooter}>
        <p>Aucune valeur n’est enregistrée dans cette maquette.</p>
        <button className={styles.submitButton} type="submit">
          Enregistrer les moyens de paiement
        </button>
      </div>
      <p aria-live="polite" className={styles.localStatus} role="status">
        {previewUpdated
          ? "Aperçu local actualisé. Aucun moyen de paiement n’a été enregistré."
          : "Mode démonstration : aucun paiement, code USSD, appel téléphonique ou service externe n’est utilisé."}
      </p>
      <p className={pageStyles.inputSafetyNote}>
        Les caractères saisis sont limités à X et aux espaces et disparaissent en quittant cette page.
      </p>
    </form>
  );
}

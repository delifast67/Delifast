"use client";

import { useState, type FormEvent } from "react";
import styles from "./location-management.module.css";

type LocationValues = {
  address: string;
  city: string;
  complement: string;
};

const initialValues: LocationValues = {
  address: "",
  city: "",
  complement: "",
};

export function LocationManagementForm() {
  const [values, setValues] = useState(initialValues);
  const [previewReady, setPreviewReady] = useState(false);

  function updateField(field: keyof LocationValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setPreviewReady(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewReady(true);
  }

  return (
    <form
      className={styles.form}
      id="location-management-form"
      onSubmit={handleSubmit}
    >
      <div className={styles.fieldsGrid}>
        <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="merchant-location-address">
          <span>Adresse</span>
          <textarea
            autoComplete="off"
            id="merchant-location-address"
            maxLength={240}
            name="demoAddress"
            onChange={(event) => updateField("address", event.target.value)}
            placeholder="Rue, secteur, repère utile"
            required
            rows={3}
            value={values.address}
          />
        </label>

        <label className={styles.field} htmlFor="merchant-location-city">
          <span>Ville</span>
          <input
            autoComplete="off"
            id="merchant-location-city"
            maxLength={80}
            name="demoCity"
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="Ouagadougou"
            required
            type="text"
            value={values.city}
          />
        </label>

        <label className={styles.field} htmlFor="merchant-location-complement">
          <span>
            Complément <span className={styles.optional}>(facultatif)</span>
          </span>
          <input
            autoComplete="off"
            id="merchant-location-complement"
            maxLength={160}
            name="demoComplement"
            onChange={(event) => updateField("complement", event.target.value)}
            placeholder="Précisions facultatives"
            type="text"
            value={values.complement}
          />
        </label>
      </div>

      <div className={styles.formFooter}>
        <p>Les données de ce formulaire ne sont pas enregistrées.</p>
        <button className={styles.submitButton} type="submit">
          Mettre à jour la localisation
        </button>
      </div>
      <p aria-live="polite" className={styles.localStatus} role="status">
        {previewReady
          ? "Saisie validée pour la démonstration. Rien n’a été transmis ni enregistré."
          : "Démonstration uniquement : les modifications restent dans cette page et disparaissent en la quittant."}
      </p>
    </form>
  );
}

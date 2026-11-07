"use client";

import { useState, type FormEvent } from "react";
import styles from "./registration.module.css";

type RegistrationValues = {
  businessName: string;
  activityType: string;
  contactName: string;
  description: string;
};

const initialValues: RegistrationValues = {
  businessName: "",
  activityType: "",
  contactName: "",
  description: "",
};

export function MerchantRegistrationForm() {
  const [values, setValues] = useState(initialValues);
  const [showPreview, setShowPreview] = useState(false);

  function updateField(field: keyof RegistrationValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setShowPreview(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowPreview(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldsGrid}>
        <label className={styles.field} htmlFor="business-name">
          <span>Nom du commerce</span>
          <input
            autoComplete="organization"
            id="business-name"
            maxLength={120}
            onChange={(event) => updateField("businessName", event.target.value)}
            placeholder="Ex. Saveurs du Faso"
            type="text"
            value={values.businessName}
          />
        </label>

        <label className={styles.field} htmlFor="activity-type">
          <span>Type d’activité</span>
          <select
            id="activity-type"
            onChange={(event) => updateField("activityType", event.target.value)}
            value={values.activityType}
          >
            <option value="">Restaurant / Commerce</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Commerce">Commerce</option>
          </select>
        </label>

        <label className={styles.field} htmlFor="contact-name">
          <span>Nom du responsable</span>
          <input
            autoComplete="name"
            id="contact-name"
            maxLength={100}
            onChange={(event) => updateField("contactName", event.target.value)}
            placeholder="Votre nom"
            type="text"
            value={values.contactName}
          />
        </label>

        <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="business-description">
          <span>Description</span>
          <textarea
            id="business-description"
            maxLength={500}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Quelques mots sur votre commerce"
            rows={4}
            value={values.description}
          />
          <small>{values.description.length} / 500 caractères · démonstration</small>
        </label>
      </div>

      <div className={styles.formFooter}>
        <p>Ces informations ne sont ni envoyées ni enregistrées.</p>
        <button className={styles.submitButton} type="submit">
          Continuer <span aria-hidden="true">→</span>
        </button>
      </div>

      <p aria-live="polite" className={styles.localStatus}>
        {showPreview
          ? "Aperçu préparé dans cette page uniquement. Aucune donnée n’a été transmise ou enregistrée."
          : "Les champs et l’action sont fictifs; rien n’est conservé après avoir quitté la page."}
      </p>
    </form>
  );
}

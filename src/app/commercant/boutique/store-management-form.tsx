"use client";

import { useState, type FormEvent } from "react";
import styles from "./store-management.module.css";

type StoreValues = {
  name: string;
  category: string;
  description: string;
  publicPhone: string;
};

const initialValues: StoreValues = {
  name: "Saveurs du Faso",
  category: "restaurant-local",
  description: "",
  publicPhone: "",
};

export function StoreManagementForm() {
  const [values, setValues] = useState(initialValues);
  const [previewReady, setPreviewReady] = useState(false);

  function updateField(field: keyof StoreValues, value: string) {
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
      id="store-management-form"
      onSubmit={handleSubmit}
    >
      <div className={styles.fieldsGrid}>
        <label className={styles.field} htmlFor="store-name">
          <span>Nom du commerce</span>
          <input
            autoComplete="off"
            id="store-name"
            maxLength={120}
            name="storeName"
            onChange={(event) => updateField("name", event.target.value)}
            required
            type="text"
            value={values.name}
          />
        </label>

        <label className={styles.field} htmlFor="store-category">
          <span>Catégorie</span>
          <select
            id="store-category"
            name="storeCategory"
            onChange={(event) => updateField("category", event.target.value)}
            value={values.category}
          >
            <option value="restaurant-local">Restaurant · Cuisine locale</option>
            <option value="restaurant-grillades">Restaurant · Grillades</option>
            <option value="commerce-alimentaire">Commerce · Alimentation</option>
            <option value="commerce-proximite">Commerce de proximité</option>
          </select>
        </label>

        <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="store-description">
          <span>Description</span>
          <textarea
            id="store-description"
            maxLength={500}
            name="storeDescription"
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Présentez votre activité aux clients · exemple fictif"
            rows={4}
            value={values.description}
          />
          <small>{values.description.length} / 500 caractères · démonstration</small>
        </label>

        <label className={styles.field} htmlFor="store-public-phone">
          <span>Téléphone public</span>
          <input
            autoComplete="off"
            id="store-public-phone"
            inputMode="tel"
            maxLength={40}
            name="storePublicPhone"
            onChange={(event) => updateField("publicPhone", event.target.value)}
            placeholder="Numéro fictif uniquement · non appelable"
            type="text"
            value={values.publicPhone}
          />
        </label>
      </div>

      <div className={styles.formFooter}>
        <p>Les données de ce formulaire ne sont pas enregistrées.</p>
        <button className={styles.submitButton} type="submit">
          Enregistrer les modifications
        </button>
      </div>
      <p aria-live="polite" className={styles.localStatus} role="status">
        {previewReady
          ? "Aperçu préparé localement. Aucune donnée n’a été enregistrée, transmise ou publiée."
          : "Maquette locale : les modifications restent dans cette page et disparaissent en la quittant."}
      </p>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import styles from "./registration.module.css";

type LocationValues = {
  address: string;
  city: string;
  complement: string;
  mapsLink: string;
};

const initialValues: LocationValues = {
  address: "",
  city: "",
  complement: "",
  mapsLink: "",
};

export function MerchantLocationForm() {
  const [values, setValues] = useState(initialValues);
  const [showPreview, setShowPreview] = useState(false);

  function updateField(field: keyof LocationValues, value: string) {
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
        <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="merchant-address">
          <span>Adresse de l’établissement</span>
          <textarea
            autoComplete="street-address"
            id="merchant-address"
            maxLength={240}
            onChange={(event) => updateField("address", event.target.value)}
            placeholder="Rue, secteur, repère utile"
            required
            rows={3}
            value={values.address}
          />
        </label>

        <label className={styles.field} htmlFor="merchant-city">
          <span>Ville</span>
          <input
            autoComplete="address-level2"
            id="merchant-city"
            maxLength={80}
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="Ouagadougou"
            required
            type="text"
            value={values.city}
          />
        </label>

        <label className={styles.field} htmlFor="merchant-address-complement">
          <span>Complément <span aria-hidden="true">(facultatif)</span></span>
          <input
            id="merchant-address-complement"
            maxLength={160}
            onChange={(event) => updateField("complement", event.target.value)}
            placeholder="Précisions facultatives"
            type="text"
            value={values.complement}
          />
        </label>

        <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="merchant-maps-link">
          <span>Lien Google Maps <span aria-hidden="true">(facultatif)</span></span>
          <input
            autoComplete="url"
            id="merchant-maps-link"
            inputMode="url"
            maxLength={2048}
            onChange={(event) => updateField("mapsLink", event.target.value)}
            placeholder="https://maps.app.goo.gl/exemple-lieu-fictif"
            spellCheck={false}
            type="url"
            value={values.mapsLink}
          />
          <small>
            Collez le lien de partage Google Maps de votre établissement. Exemple fictif :
            https://maps.app.goo.gl/exemple-lieu-fictif. Le lien reste dans cet aperçu :
            il n’est ni envoyé, ni enregistré, ni ouvert.
          </small>
        </label>
      </div>

      <div className={styles.formFooter}>
        <p>Adresse et lien conservés dans cette page uniquement.</p>
        <button className={styles.submitButton} type="submit">
          Enregistrer cette localisation <span aria-hidden="true">→</span>
        </button>
      </div>

      <p aria-live="polite" className={styles.localStatus}>
        {showPreview
          ? "Aperçu local mis à jour. Aucune donnée n’a été transmise ou enregistrée."
          : "Mode démonstration : aucun enregistrement réel, service cartographique ou géolocalisation n’est utilisé."}
      </p>
    </form>
  );
}

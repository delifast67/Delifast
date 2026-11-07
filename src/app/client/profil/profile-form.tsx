"use client";

import { useState, type FormEvent } from "react";
import styles from "./profile.module.css";

type ProfileValues = {
  name: string;
  email: string;
  city: string;
  phone: string;
  mapLink: string;
};

const initialProfile: ProfileValues = {
  name: "Aminata Démo",
  email: "aminata@example.test",
  city: "Ouagadougou",
  phone: "",
  mapLink: "",
};

export function ClientProfileForm() {
  const [profile, setProfile] = useState(initialProfile);
  const [showLocalUpdate, setShowLocalUpdate] = useState(false);

  function updateField(field: keyof ProfileValues, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
    setShowLocalUpdate(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowLocalUpdate(true);
  }

  return (
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      <div className={styles.fieldsGrid}>
        <label className={styles.field} htmlFor="profile-name">
          <span>Nom complet</span>
          <input
            autoComplete="name"
            id="profile-name"
            maxLength={80}
            onChange={(event) => updateField("name", event.target.value)}
            required
            type="text"
            value={profile.name}
          />
        </label>

        <label className={styles.field} htmlFor="profile-email">
          <span>Adresse e-mail</span>
          <input
            autoComplete="email"
            id="profile-email"
            readOnly
            type="email"
            value={profile.email}
          />
          <small>Adresse liée à la connexion Google · non modifiable ici</small>
        </label>

        <label className={styles.field} htmlFor="profile-city">
          <span>Ville</span>
          <input
            autoComplete="address-level2"
            id="profile-city"
            maxLength={80}
            onChange={(event) => updateField("city", event.target.value)}
            required
            type="text"
            value={profile.city}
          />
        </label>

        <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="profile-phone">
          <span>Téléphone</span>
          <input
            autoComplete="tel"
            id="profile-phone"
            maxLength={30}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="À renseigner si nécessaire"
            type="tel"
            value={profile.phone}
          />
          <small>Facultatif · aucune vérification ni notification n’est envoyée.</small>
        </label>

        <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="profile-map-link">
          <span>Lien Google Maps</span>
          <input
            autoComplete="url"
            id="profile-map-link"
            inputMode="url"
            maxLength={2048}
            onChange={(event) => updateField("mapLink", event.target.value)}
            placeholder="https://maps.app.goo.gl/exemple-lieu-fictif"
            spellCheck={false}
            type="url"
            value={profile.mapLink}
          />
          <small>
            Exemple fictif : https://maps.app.goo.gl/exemple-lieu-fictif. Le lien reste
            dans cet aperçu : il n’est ni envoyé, ni enregistré, ni ouvert.
          </small>
        </label>

        {showLocalUpdate && profile.mapLink.trim() ? (
          <div
            aria-label="Aperçu local du lien Google Maps"
            className={`${styles.mapPreview} ${styles.fieldWide}`}
          >
            <div className={styles.mapPreviewHeading}>
              <strong>Aperçu local</strong>
              <span>Non enregistré</span>
            </div>
            <p>{profile.mapLink}</p>
          </div>
        ) : null}
      </div>

      <div className={styles.formFooter}>
        <p>Connexion via Google · aucun mot de passe dans cette maquette</p>
        <button className={styles.submitButton} type="submit">
          Mettre à jour l’aperçu
        </button>
      </div>
      <p aria-live="polite" className={styles.localStatus}>
        {showLocalUpdate
          ? "Aperçu mis à jour dans cette page uniquement; rien n’a été transmis ni enregistré."
          : "Démonstration : les modifications restent locales et disparaissent au rechargement."}
      </p>
    </form>
  );
}

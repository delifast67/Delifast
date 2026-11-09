"use client";

import { useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import styles from "./delivery.module.css";

type DeliveryZone = {
  id: number;
  name: string;
  fee: string;
};

const initialZones: DeliveryZone[] = [
  { id: 1, name: "Secteur de démonstration", fee: "1000" },
];

export function DeliveryConfigurationForm() {
  const [pickupEnabled, setPickupEnabled] = useState(true);
  const [deliveryEnabled, setDeliveryEnabled] = useState(true);
  const [zones, setZones] = useState(initialZones);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [status, setStatus] = useState("");

  const invalidZoneIds = deliveryEnabled && attemptedSubmit
    ? zones
        .filter((zone) => !zone.name.trim() || !/^\d+$/.test(zone.fee))
        .map((zone) => zone.id)
    : [];
  const hasNoDeliveryZone = deliveryEnabled && attemptedSubmit && zones.length === 0;

  function clearFeedback() {
    setAttemptedSubmit(false);
    setStatus("");
  }

  function updateZone(id: number, changes: Partial<DeliveryZone>) {
    setZones((current) =>
      current.map((zone) => (zone.id === id ? { ...zone, ...changes } : zone)),
    );
    clearFeedback();
  }

  function addZone() {
    setZones((current) => {
      const nextId = current.reduce((maximum, zone) => Math.max(maximum, zone.id), 0) + 1;
      return [...current, { id: nextId, name: "", fee: "" }];
    });
    clearFeedback();
  }

  function removeZone(id: number) {
    setZones((current) => current.filter((zone) => zone.id !== id));
    clearFeedback();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttemptedSubmit(true);

    const containsInvalidZone = zones.some(
      (zone) => !zone.name.trim() || !/^\d+$/.test(zone.fee),
    );
    if (deliveryEnabled && (zones.length === 0 || containsInvalidZone)) {
      setStatus(
        zones.length === 0
          ? "À vérifier : ajoutez une zone pour proposer la livraison."
          : "À vérifier : chaque zone doit avoir un nom et des frais entiers non négatifs.",
      );
      return;
    }

    if (!pickupEnabled && !deliveryEnabled) {
      setStatus("Aperçu local actualisé : aucune modalité de réception n’est proposée. Rien n’est enregistré.");
      return;
    }

    const modes = [
      pickupEnabled ? "retrait sur place" : "",
      deliveryEnabled ? `livraison (${zones.length} zone${zones.length === 1 ? "" : "s"})` : "",
    ].filter(Boolean);
    setStatus(`Aperçu local actualisé : ${modes.join(" et ")}. Rien n’est enregistré.`);
  }

  return (
    <form
      className={styles.form}
      id="merchant-delivery-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className={styles.optionsList}>
        <div className={styles.optionRow}>
          <span className={`${styles.optionIcon} ${styles.pickupIcon}`} aria-hidden="true">
            ⌖
          </span>
          <div className={styles.optionCopy}>
            <strong>Retrait sur place</strong>
            <span>Les clients peuvent retirer au lieu renseigné.</span>
          </div>
          <button
            aria-checked={pickupEnabled}
            aria-label={`${pickupEnabled ? "Désactiver" : "Activer"} le retrait sur place dans la maquette`}
            className={`${styles.toggle} ${pickupEnabled ? styles.toggleOn : ""}`}
            onClick={() => {
              setPickupEnabled((current) => !current);
              clearFeedback();
            }}
            role="switch"
            type="button"
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.optionRow}>
          <span className={`${styles.optionIcon} ${styles.deliveryIcon}`} aria-hidden="true">
            ↗
          </span>
          <div className={styles.optionCopy}>
            <strong>Livraison proposée par le commerce</strong>
            <span>Définissez vos zones et frais.</span>
          </div>
          <button
            aria-checked={deliveryEnabled}
            aria-label={`${deliveryEnabled ? "Désactiver" : "Activer"} la livraison du commerce dans la maquette`}
            className={`${styles.toggle} ${deliveryEnabled ? styles.toggleOn : ""}`}
            onClick={() => {
              setDeliveryEnabled((current) => !current);
              clearFeedback();
            }}
            role="switch"
            type="button"
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>

      <fieldset className={styles.zoneFieldset} disabled={!deliveryEnabled}>
        <legend className={styles.visuallyHidden}>Zones de livraison de démonstration</legend>
        {zones.length === 0 ? (
          <div className={styles.emptyZones}>
            <span className={styles.exampleBadge}>Exemple</span>
            <p>Aucune zone dans cet aperçu.</p>
            <small>Ajoutez une zone pour illustrer les frais définis par le commerce.</small>
          </div>
        ) : (
          <div className={styles.zoneList}>
            {zones.map((zone, index) => {
              const nameId = `delivery-zone-${zone.id}-name`;
              const feeId = `delivery-zone-${zone.id}-fee`;
              const nameErrorId = `${nameId}-error`;
              const feeErrorId = `${feeId}-error`;
              const invalid = invalidZoneIds.includes(zone.id);
              const invalidName = invalid && !zone.name.trim();
              const invalidFee = invalid && !/^\d+$/.test(zone.fee);

              return (
                <section className={styles.zoneCard} key={zone.id} aria-labelledby={`${nameId}-heading`}>
                  <div className={styles.zoneHeading}>
                    <div>
                      <p className={styles.zoneEyebrow}>Zone {index + 1}</p>
                      <h3 id={`${nameId}-heading`}>
                        {zone.name.trim() || `Nouvelle zone · exemple`}
                      </h3>
                    </div>
                    <div className={styles.zoneActions}>
                      <span className={styles.exampleBadge}>Exemple</span>
                      <button
                        aria-label={`Supprimer la zone ${index + 1} de la maquette`}
                        className={styles.removeZoneButton}
                        onClick={() => removeZone(zone.id)}
                        type="button"
                      >
                        <Trash2 aria-hidden="true" size={14} />
                        <span>Retirer</span>
                      </button>
                    </div>
                  </div>

                  <div className={styles.zoneFields}>
                    <label className={styles.field} htmlFor={nameId}>
                      <span>Nom de la zone</span>
                      <input
                        aria-describedby={invalidName ? nameErrorId : undefined}
                        aria-invalid={invalidName || undefined}
                        autoComplete="off"
                        id={nameId}
                        maxLength={60}
                        onChange={(event) => updateZone(zone.id, { name: event.target.value })}
                        placeholder="Ex. Secteur de démonstration"
                        value={zone.name}
                      />
                      {invalidName ? (
                        <small className={styles.fieldError} id={nameErrorId}>
                          Indiquez un nom d’exemple pour cette zone.
                        </small>
                      ) : null}
                    </label>

                    <label className={styles.field} htmlFor={feeId}>
                      <span>Frais (exemple)</span>
                      <span className={styles.feeInputWrap}>
                        <input
                          aria-describedby={invalidFee ? feeErrorId : undefined}
                          aria-invalid={invalidFee || undefined}
                          id={feeId}
                          inputMode="numeric"
                          min="0"
                          onChange={(event) =>
                            updateZone(zone.id, { fee: event.target.value })
                          }
                          placeholder="0"
                          step="1"
                          type="number"
                          value={zone.fee}
                        />
                        <span aria-hidden="true">FCFA</span>
                      </span>
                      {invalidFee ? (
                        <small className={styles.fieldError} id={feeErrorId}>
                          Utilisez un montant entier égal ou supérieur à zéro.
                        </small>
                      ) : null}
                    </label>
                  </div>
                </section>
              );
            })}
          </div>
        )}
        {hasNoDeliveryZone ? (
          <p className={styles.fieldError} role="alert">
            Ajoutez au moins une zone si la livraison est activée dans cet aperçu.
          </p>
        ) : null}
        <button className={styles.addZoneButton} onClick={addZone} type="button">
          <Plus aria-hidden="true" size={15} /> Ajouter une zone
        </button>
        {!deliveryEnabled ? (
          <p className={styles.disabledHint}>
            Activez la livraison du commerce pour modifier les zones et frais.
          </p>
        ) : null}
      </fieldset>

      <div className={styles.formFooter}>
        <p>Chaque commerçant définit ses propres modalités.</p>
        <button className={styles.submitButton} type="submit">
          Enregistrer les modalités
        </button>
      </div>
      <p aria-live="polite" className={styles.status} role="status">
        {status ||
          "Aperçu local uniquement : aucun réglage n’est enregistré ou transmis."}
      </p>
      <p className={styles.safetyNote}>
        Les réglages et zones sont fictifs et disparaissent en quittant cette page.
      </p>
    </form>
  );
}

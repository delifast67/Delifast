"use client";

import { useState, type FormEvent } from "react";
import { Info, Plus } from "lucide-react";
import styles from "./product-form.module.css";

type Availability = "published" | "disabled" | "unavailable" | "reactivated";

type OptionChoice = {
  id: string;
  name: string;
  price: number;
};

type OptionGroup = {
  id: string;
  name: string;
  required: boolean;
  minimum: number;
  maximum: number;
  choices: OptionChoice[];
};

const availabilityLabels: Record<Availability, string> = {
  published: "Publié · disponible",
  disabled: "Désactivé",
  unavailable: "Marqué indisponible / épuisé",
  reactivated: "Réactivé",
};

const initialGroups: OptionGroup[] = [
  {
    id: "cooking",
    name: "Cuisson",
    required: true,
    minimum: 1,
    maximum: 1,
    choices: [
      { id: "cooking-medium", name: "À point", price: 0 },
      { id: "cooking-well-done", name: "Bien cuit", price: 0 },
    ],
  },
  {
    id: "accompaniment",
    name: "Accompagnement",
    required: false,
    minimum: 0,
    maximum: 1,
    choices: [
      { id: "rice", name: "Riz", price: 0 },
      { id: "fries", name: "Frites", price: 500 },
      { id: "salad", name: "Salade", price: 300 },
    ],
  },
  {
    id: "extras",
    name: "Suppléments",
    required: false,
    minimum: 0,
    maximum: 2,
    choices: [
      { id: "cheese", name: "Fromage", price: 400 },
      { id: "house-sauce", name: "Sauce maison", price: 200 },
    ],
  },
];

export function ProductForm() {
  const [name, setName] = useState("Poulet braisé · exemple");
  const [basePrice, setBasePrice] = useState("3500");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState<Availability>("published");
  const [stockTracked, setStockTracked] = useState(true);
  const [quantity, setQuantity] = useState("12");
  const [groups, setGroups] = useState(initialGroups);
  const [nextGroupNumber, setNextGroupNumber] = useState(4);
  const [feedback, setFeedback] = useState("");

  function updateGroup(groupId: string, updates: Partial<OptionGroup>) {
    setGroups((current) =>
      current.map((group) =>
        group.id === groupId ? { ...group, ...updates } : group,
      ),
    );
  }

  function updateChoice(
    groupId: string,
    choiceId: string,
    updates: Partial<OptionChoice>,
  ) {
    setGroups((current) =>
      current.map((group) =>
        group.id === groupId
          ? {
              ...group,
              choices: group.choices.map((choice) =>
                choice.id === choiceId ? { ...choice, ...updates } : choice,
              ),
            }
          : group,
      ),
    );
  }

  function addGroup() {
    const groupId = `group-${nextGroupNumber}`;
    setGroups((current) => [
      ...current,
      {
        id: groupId,
        name: "Nouveau groupe",
        required: false,
        minimum: 0,
        maximum: 1,
        choices: [
          {
            id: `${groupId}-choice-1`,
            name: "Nouvelle option",
            price: 0,
          },
        ],
      },
    ]);
    setNextGroupNumber((current) => current + 1);
    setFeedback("Aperçu local : un groupe de démonstration a été ajouté. Rien n’est enregistré.");
  }

  function addChoice(group: OptionGroup) {
    const choiceId = `${group.id}-choice-${group.choices.length + 1}`;
    updateGroup(group.id, {
      choices: [
        ...group.choices,
        { id: choiceId, name: "Nouvelle option", price: 0 },
      ],
    });
    setFeedback("Aperçu local : une option de démonstration a été ajoutée. Rien n’est enregistré.");
  }

  function removeGroup(group: OptionGroup) {
    setGroups((current) => current.filter((item) => item.id !== group.id));
    setFeedback(
      `Aperçu local : le groupe « ${group.name || "sans nom"} » a été retiré. Rien n’est enregistré.`,
    );
  }

  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const productName = name.trim() || "Nouveau produit";
    setFeedback(
      `Aperçu local uniquement : « ${productName} » n’a pas été enregistré. Aucun produit n’a été créé.`,
    );
  }

  return (
    <form className={styles.formLayout} onSubmit={submitDemo}>
      <section className={styles.primaryColumn} aria-label="Formulaire produit">
        <article className={styles.panel}>
          <div className={styles.panelTitle}>
            <h2>Informations du produit</h2>
            <span className={styles.subtle}>Simple ou personnalisable</span>
          </div>
          <div className={styles.fieldGrid}>
            <label className={styles.field}>
              <span>Nom du produit</span>
              <input
                autoComplete="off"
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            </label>
            <label className={styles.field}>
              <span>Prix de base</span>
              <div className={styles.moneyInput}>
                <input
                  aria-label="Prix de base en FCFA"
                  inputMode="numeric"
                  onChange={(event) => setBasePrice(event.target.value.replace(/[^0-9]/g, ""))}
                  value={basePrice}
                />
                <span>FCFA</span>
              </div>
            </label>
            <label className={`${styles.field} ${styles.fullWidth}`}>
              <span>Description</span>
              <textarea
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Décrivez le produit…"
                rows={3}
                value={description}
              />
            </label>
            <label className={styles.field}>
              <span>Catégorie</span>
              <select defaultValue="Plats · démo">
                <option>Plats · démo</option>
              </select>
            </label>
            <label className={styles.field}>
              <span>Disponibilité commerciale</span>
              <select
                onChange={(event) => setAvailability(event.target.value as Availability)}
                value={availability}
              >
                <option value="published">Publié · disponible</option>
                <option value="disabled">Désactivé</option>
                <option value="unavailable">Marqué indisponible / épuisé</option>
                <option value="reactivated">Réactivé</option>
              </select>
            </label>
          </div>
          <div className={styles.availabilityControl}>
            <div>
              <strong>Disponibilité indépendante du stock</strong>
              <small>Publier, désactiver, marquer indisponible ou réactiver ce produit.</small>
            </div>
            <span
              className={`${styles.statusPill} ${availability === "published" || availability === "reactivated" ? styles.successPill : styles.mutedPill}`}
            >
              {availabilityLabels[availability]}
            </span>
          </div>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelTitle}>
            <h2>Suivi du stock · facultatif</h2>
            <span className={`${styles.statusPill} ${styles.successPill}`}>Réglage par produit</span>
          </div>
          <div className={styles.toggleLine}>
            <button
              aria-checked={stockTracked}
              aria-label="Activer le suivi du stock"
              className={styles.switch}
              data-enabled={stockTracked}
              onClick={() => setStockTracked((current) => !current)}
              role="switch"
              type="button"
            >
              <span />
            </button>
            <span className={styles.toggleCopy}>
              <strong>Activer le suivi du stock</strong>
              <small>Le suivi est activé uniquement pour ce produit.</small>
            </span>
          </div>
          <label className={styles.field}>
            <span>Quantité disponible</span>
            <input
              disabled={!stockTracked}
              inputMode="numeric"
              onChange={(event) => setQuantity(event.target.value.replace(/[^0-9]/g, ""))}
              value={quantity}
            />
            <small className={styles.fieldHint}>
              À zéro, le produit n’est plus commandable. Le serveur bloque une quantité supérieure au stock.
            </small>
          </label>
          <div className={styles.notice} role="note">
            <Info aria-hidden="true" size={14} />
            <span>
              Si le suivi est désactivé, le commerçant reste responsable de la disponibilité manuelle. Un article indisponible est toujours refusé.
            </span>
          </div>
        </article>

        <article className={`${styles.panel} ${styles.optionsPanel}`}>
          <div className={styles.panelTitle}>
            <h2>Options et suppléments</h2>
            <span className={styles.subtle}>Aucune option ou plusieurs groupes</span>
          </div>
          <p className={styles.sectionIntro}>
            Chaque groupe est facultatif ou obligatoire et définit le minimum et le maximum de choix.
          </p>
          <div className={styles.groups}>
            {groups.map((group, groupIndex) => (
              <section className={styles.optionGroup} key={group.id} aria-label={`Groupe d’options ${groupIndex + 1}`}>
                <div className={styles.optionGroupHead}>
                  <label className={styles.groupName}>
                    <span className={styles.srOnly}>Nom du groupe</span>
                    <input
                      aria-label={`Nom du groupe ${groupIndex + 1}`}
                      onChange={(event) => updateGroup(group.id, { name: event.target.value })}
                      value={group.name}
                    />
                  </label>
                  <label className={styles.groupRequirement}>
                    <span className={styles.srOnly}>Règle du groupe</span>
                    <select
                      aria-label={`Règle du groupe ${groupIndex + 1}`}
                      data-required={group.required}
                      onChange={(event) => updateGroup(group.id, { required: event.target.value === "required" })}
                      value={group.required ? "required" : "optional"}
                    >
                      <option value="required">Obligatoire</option>
                      <option value="optional">Facultatif</option>
                    </select>
                  </label>
                </div>
                <div className={styles.optionRuleRow}>
                  <label>
                    <span>Minimum</span>
                    <input
                      aria-label={`Minimum de choix pour ${group.name || `le groupe ${groupIndex + 1}`}`}
                      inputMode="numeric"
                      onChange={(event) => updateGroup(group.id, { minimum: Number(event.target.value) })}
                      type="number"
                      value={group.minimum}
                    />
                  </label>
                  <label>
                    <span>Maximum</span>
                    <input
                      aria-label={`Maximum de choix pour ${group.name || `le groupe ${groupIndex + 1}`}`}
                      inputMode="numeric"
                      onChange={(event) => updateGroup(group.id, { maximum: Number(event.target.value) })}
                      type="number"
                      value={group.maximum}
                    />
                  </label>
                  <small>{group.choices.length} options disponibles</small>
                </div>
                <div className={styles.choiceList}>
                  {group.choices.map((choice, choiceIndex) => (
                    <div className={styles.optionChoice} key={choice.id}>
                      <label>
                        <span className={styles.srOnly}>Nom de l’option {choiceIndex + 1}</span>
                        <input
                          aria-label={`Nom de l’option ${choiceIndex + 1} du groupe ${group.name || groupIndex + 1}`}
                          onChange={(event) => updateChoice(group.id, choice.id, { name: event.target.value })}
                          value={choice.name}
                        />
                      </label>
                      <label className={styles.choicePrice}>
                        <span className={styles.srOnly}>Supplément de prix en FCFA</span>
                        <span aria-hidden="true">+</span>
                        <input
                          aria-label={`Supplément de prix pour ${choice.name || `l’option ${choiceIndex + 1}`}`}
                          inputMode="numeric"
                          onChange={(event) => updateChoice(group.id, choice.id, { price: Number(event.target.value.replace(/[^0-9]/g, "")) })}
                          value={choice.price}
                        />
                        <span>FCFA</span>
                      </label>
                    </div>
                  ))}
                </div>
                <div className={styles.groupActions}>
                  <button className={styles.addChoiceButton} onClick={() => addChoice(group)} type="button">
                    <Plus aria-hidden="true" size={13} /> Ajouter une option
                  </button>
                  <button
                    aria-label={`Retirer le groupe ${group.name || groupIndex + 1}`}
                    className={styles.removeGroupButton}
                    onClick={() => removeGroup(group)}
                    type="button"
                  >
                    Retirer le groupe
                  </button>
                </div>
              </section>
            ))}
          </div>
          {groups.length === 0 && (
            <p className={styles.emptyOptions}>
              Aucun groupe dans cet aperçu. Le produit peut être proposé sans options.
            </p>
          )}
          <button className={styles.addGroupButton} onClick={addGroup} type="button">
            <Plus aria-hidden="true" size={14} /> Ajouter un groupe
          </button>
          <p className={styles.footerNote}>
            Un groupe obligatoire impose au moins 1 choix ; un groupe facultatif peut en autoriser 0. Le maximum ne dépasse pas le nombre d’options du groupe.
          </p>
        </article>

        <div className={styles.formActions}>
          <span>Exemple de conception uniquement</span>
          <button className={styles.primaryButton} type="submit">Enregistrer le produit</button>
        </div>
        {feedback && <p className={styles.feedback} role="status" aria-live="polite">{feedback}</p>}
      </section>

      <aside className={styles.secondaryColumn} aria-label="Informations sur les options et contrôles">
        <article className={styles.sideHelp}>
          <h2>Optionnel par produit</h2>
          <p>Le produit peut être vendu sans options. Chaque choix peut ajouter un supplément de prix, qui sera recalculé côté serveur.</p>
        </article>
        <article className={styles.panel}>
          <div className={styles.panelTitle}>
            <h2>Contrôles côté serveur</h2>
          </div>
          <ol className={styles.serverChecks}>
            <li><span>1</span><p>Disponibilité et quantités, selon le suivi activé.</p></li>
            <li><span>2</span><p>Minima, maxima, nombre d’options et prix.</p></li>
            <li><span>3</span><p>Copie des options et suppléments tarifés dans la ligne de commande.</p></li>
          </ol>
        </article>
      </aside>
    </form>
  );
}

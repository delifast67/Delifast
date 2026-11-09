"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Info, Sparkles } from "lucide-react";
import styles from "./menu-form.module.css";

type ProductOption = {
  id: string;
  name: string;
};

const demoProducts: ProductOption[] = [
  { id: "chicken", name: "Poulet braisé" },
  { id: "day-menu", name: "Menu du jour" },
  { id: "juice", name: "Jus frais" },
  { id: "brochettes", name: "Brochettes mixtes" },
];

const demoMenus: Record<string, { name: string; productIds: string[] }> = {
  lunch: {
    name: "Menu du midi",
    productIds: ["chicken", "juice", "brochettes"],
  },
  grill: {
    name: "Formule grillades",
    productIds: ["chicken", "brochettes"],
  },
  seasonal: {
    name: "Menu saisonnier",
    productIds: ["chicken", "day-menu", "juice", "brochettes"],
  },
};

export function MenuForm() {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("modifier") ?? undefined;
  const example = menuId ? demoMenus[menuId] : undefined;
  const isEditing = Boolean(example);
  const [name, setName] = useState(example?.name ?? "");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    example?.productIds ?? [],
  );
  const [feedback, setFeedback] = useState("");

  const selectedCount = selectedProductIds.length;

  function toggleProduct(productId: string) {
    setSelectedProductIds((current) =>
      current.includes(productId)
        ? current.filter((item) => item !== productId)
        : [...current, productId],
    );
  }

  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = name.trim() ? ` « ${name.trim()} »` : "";
    setFeedback(
      isEditing
        ? `Aperçu local uniquement : le menu${subject} n’a pas été modifié. Rien n’est transmis ni enregistré.`
        : `Aperçu local uniquement : le menu${subject} n’a pas été créé. Rien n’est transmis ni enregistré.`,
    );
  }

  return (
    <>
      <div className={styles.headingRow}>
        <div className={styles.pageHeading}>
          <p className={styles.eyebrow}>Commerçant · Démonstration</p>
          <h1>Formulaire menu</h1>
          <p className={styles.intro}>
            Composez un menu à partir des produits du commerce.
          </p>
        </div>
        <button className={styles.primaryButton} form="menu-form" type="submit">
          Enregistrer le menu
        </button>
      </div>

      <div className={styles.formLayout}>
        <form className={styles.formCard} id="menu-form" onSubmit={submitDemo}>
          <div className={styles.panelTitle}>
            <h2>Informations de la vitrine</h2>
            <span>Champs de démonstration</span>
          </div>

          <div className={styles.fieldGrid}>
            <label className={styles.field} htmlFor="menu-name">
              <span>Nom du menu</span>
              <input
                autoComplete="off"
                id="menu-name"
                name="menuName"
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex. Menu du midi"
                value={name}
              />
            </label>

            <label className={`${styles.field} ${styles.fullWidth}`} htmlFor="menu-description">
              <span>Description</span>
              <textarea
                id="menu-description"
                name="menuDescription"
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Texte de présentation"
                rows={3}
                value={description}
              />
            </label>

            <fieldset className={styles.productField}>
              <legend>Produits inclus</legend>
              <details className={styles.productPicker}>
                <summary>
                  <span>
                    {selectedCount > 0
                      ? `${selectedCount} produit${selectedCount > 1 ? "s" : ""} sélectionné${selectedCount > 1 ? "s" : ""}`
                      : "Choisir parmi vos produits"}
                  </span>
                  <ChevronDown aria-hidden="true" size={15} />
                </summary>
                <div className={styles.productChoices}>
                  {demoProducts.map((product) => (
                    <label className={styles.productChoice} key={product.id}>
                      <input
                        checked={selectedProductIds.includes(product.id)}
                        name="includedProducts"
                        onChange={() => toggleProduct(product.id)}
                        type="checkbox"
                        value={product.id}
                      />
                      <span>{product.name}</span>
                    </label>
                  ))}
                </div>
              </details>
            </fieldset>

            <label className={styles.field} htmlFor="menu-price">
              <span>Prix du menu</span>
              <span className={styles.moneyInput}>
                <input
                  autoComplete="off"
                  id="menu-price"
                  inputMode="numeric"
                  name="menuPrice"
                  onChange={(event) =>
                    setPrice(event.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="Montant en FCFA"
                  value={price}
                />
                <span>FCFA</span>
              </span>
            </label>
          </div>

          <div className={styles.formFooter}>
            <p>
              <Info aria-hidden="true" size={13} />
              Les données de ce formulaire ne sont pas enregistrées.
            </p>
            <button className={styles.primaryButton} type="submit">
              Enregistrer le menu
            </button>
          </div>
          {feedback && (
            <p className={styles.feedback} role="status" aria-live="polite">
              {feedback}
            </p>
          )}
        </form>

        <aside className={styles.sideHelp} aria-label="Conseil de démonstration">
          <span className={styles.helpIcon} aria-hidden="true">
            <Sparkles size={16} />
          </span>
          <div>
            <h2>Un profil clair aide vos clients</h2>
            <p>Ces informations sont présentées comme exemples de conception.</p>
          </div>
        </aside>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import type {
  DemoOptionGroup,
  DemoRestaurant,
  DemoRestaurantProduct,
} from "../../lib/demo-data/public-catalog";
import styles from "./public-pages.module.css";

type Selection = Record<string, string[]>;

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

function initialSelection(product: DemoRestaurantProduct): Selection {
  return Object.fromEntries(
    Object.entries(product.initialSelection ?? {}).map(([groupId, values]) => [
      groupId,
      [...values],
    ]),
  );
}

function groupIsValid(group: DemoOptionGroup, selection: Selection) {
  const selectedCount = selection[group.id]?.length ?? 0;
  return selectedCount >= group.minimum && selectedCount <= group.maximum;
}

export function RestaurantExperience({ restaurant }: { restaurant: DemoRestaurant }) {
  const [selectedProductId, setSelectedProductId] = useState(restaurant.products[0]?.id ?? "");
  const [selection, setSelection] = useState<Selection>(() =>
    initialSelection(restaurant.products[0]),
  );
  const [feedback, setFeedback] = useState("");
  const selectedProduct = restaurant.products.find((item) => item.id === selectedProductId)
    ?? restaurant.products[0];

  if (!selectedProduct) return null;

  const selectedOptions = selectedProduct.optionGroups.flatMap((group) =>
    group.options.filter((option) => selection[group.id]?.includes(option.id)),
  );
  const optionsTotal = selectedOptions.reduce((total, option) => total + option.price, 0);
  const total = selectedProduct.price + optionsTotal;
  const canPreview = selectedProduct.optionGroups.every((group) =>
    groupIsValid(group, selection),
  );

  function chooseProduct(product: DemoRestaurantProduct) {
    setSelectedProductId(product.id);
    setSelection(initialSelection(product));
    setFeedback("");
  }

  function updateSingle(group: DemoOptionGroup, optionId: string) {
    setSelection((current) => ({ ...current, [group.id]: optionId ? [optionId] : [] }));
    setFeedback("");
  }

  function updateMultiple(group: DemoOptionGroup, optionId: string, checked: boolean) {
    setSelection((current) => {
      const existing = current[group.id] ?? [];
      const updated = checked
        ? [...existing, optionId].slice(0, group.maximum)
        : existing.filter((id) => id !== optionId);
      return { ...current, [group.id]: updated };
    });
    setFeedback("");
  }

  return (
    <section className={`${styles.main} ${styles.detailMain}`} aria-labelledby="restaurant-name">
      <div className={styles.wrap}>
        <div className={styles.detailHero}>
          <Image
            className={styles.coverImage}
            src={restaurant.imageSrc}
            alt={restaurant.imageAlt}
            fill
            priority
            sizes="(max-width: 680px) 100vw, 1340px"
          />
          <div className={styles.detailHeroCopy}>
            <p className={styles.eyebrow}>Fiche restaurant · démo</p>
            <h1 className={styles.detailTitle} id="restaurant-name">{restaurant.name}</h1>
            <p className={styles.detailCuisine}>{restaurant.cuisine}</p>
          </div>
        </div>

        <div className={styles.detailMeta} aria-label="Informations de démonstration">
          <span><span className={styles.mapPin} aria-hidden="true">●</span>{restaurant.location}</span>
          <span><span aria-hidden="true">★</span>{restaurant.rating} · note de démonstration</span>
          <span>{restaurant.serviceSummary}</span>
          <span>{restaurant.paymentSummary}</span>
        </div>

        <div className={styles.menuHeading}>
          <h2>À la carte</h2>
          <p>Produits et prix de démonstration</p>
        </div>
        <div className={styles.productGrid}>
          {restaurant.products.map((product) => (
            <article className={styles.card} key={product.id}>
              <div className={styles.menuCardImage}>
                <Image
                  className={styles.coverImage}
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 950px) 50vw, 33vw"
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTitleRow}>
                  <h3 className={styles.cardTitle}>{product.name}</h3>
                  <span className={styles.price}>{formatPrice(product.price)}</span>
                </div>
                <p className={styles.cardDescription}>{product.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.demoLabel}>Exemple · Démo</span>
                  <button
                    className={styles.productSelect}
                    type="button"
                    aria-pressed={selectedProduct.id === product.id}
                    onClick={() => chooseProduct(product)}
                  >
                    {selectedProduct.id === product.id ? "Sélectionné · démo" : "Personnaliser l’aperçu"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.notice}>
          Les options et suppléments affichés sont fictifs. La disponibilité et les modalités sont à confirmer auprès du commerce ; la livraison, si proposée, est gérée par celui-ci et non par Delifast.
        </p>

        <div className={styles.customizer}>
          <section className={styles.choicePanel} aria-labelledby="customize-title">
            <div className={styles.panelHeading}>
              <h2 id="customize-title">Personnaliser · {selectedProduct.name}</h2>
              <span className={styles.panelHint}>Exemple de choix local</span>
            </div>
            {selectedProduct.optionGroups.length ? selectedProduct.optionGroups.map((group) => (
              <fieldset className={styles.optionGroup} key={group.id}>
                <legend className={styles.optionLegend}>
                  <span>{group.title}</span>
                  <span className={styles.optionLimit}>
                    {group.required
                      ? `Obligatoire · min. ${group.minimum} · max. ${group.maximum}`
                      : `Facultatif · min. ${group.minimum} · max. ${group.maximum}`}
                  </span>
                </legend>
                {group.kind === "single" && !group.required ? (
                  <label className={styles.optionRow}>
                    <input
                      type="radio"
                      name={`${restaurant.slug}-${group.id}`}
                      value=""
                      checked={!selection[group.id]?.length}
                      onChange={() => updateSingle(group, "")}
                    />
                    <span>Aucun</span>
                    <span className={styles.optionPrice}>+ 0 FCFA</span>
                  </label>
                ) : null}
                {group.options.map((option) => {
                  const checked = selection[group.id]?.includes(option.id) ?? false;
                  const limitReached = (selection[group.id]?.length ?? 0) >= group.maximum;
                  const disabled = group.kind === "multiple" && limitReached && !checked;
                  return (
                    <label className={styles.optionRow} key={option.id}>
                      <input
                        type={group.kind === "single" ? "radio" : "checkbox"}
                        name={`${restaurant.slug}-${group.id}`}
                        value={option.id}
                        checked={checked}
                        disabled={disabled}
                        onChange={(event) => {
                          if (group.kind === "single") {
                            updateSingle(group, option.id);
                          } else {
                            updateMultiple(group, option.id, event.target.checked);
                          }
                        }}
                      />
                      <span>{option.label}</span>
                      <span className={styles.optionPrice}>
                        {option.price ? `+ ${formatPrice(option.price)}` : "+ 0 FCFA"}
                      </span>
                    </label>
                  );
                })}
              </fieldset>
            )) : (
              <p className={styles.notice}>
                Aucun groupe d’options n’est illustré pour ce produit de démonstration.
              </p>
            )}
          </section>

          <aside className={styles.pricePanel} aria-labelledby="price-title">
            <div className={styles.panelHeading}>
              <h2 id="price-title">Prix présenté</h2>
              <span className={styles.panelHint}>Exemple fictif</span>
            </div>
            <div className={styles.priceLine}>
              <span>Prix de base</span><strong>{formatPrice(selectedProduct.price)}</strong>
            </div>
            {selectedOptions.map((option) => (
              <div className={styles.priceLine} key={option.id}>
                <span>{option.label} · supplément</span><strong>+ {formatPrice(option.price)}</strong>
              </div>
            ))}
            <div className={styles.totalLine}>
              <span>Total d’exemple</span><strong>{formatPrice(total)}</strong>
            </div>
            <p className={styles.notice}>
              Ce calcul reste dans le navigateur et ne crée ni panier ni commande.
            </p>
            <button
              className={styles.previewButton}
              type="button"
              disabled={!canPreview}
              onClick={() => setFeedback("Sélection de démonstration affichée localement ; aucun panier ni commande n’a été créé.")}
            >
              Ajouter au panier · aperçu
            </button>
            {feedback ? <p className={styles.previewFeedback} role="status" aria-live="polite">{feedback}</p> : null}
          </aside>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import {
  DEMO_CATALOG_CATEGORIES,
  DEMO_CATALOG_PRODUCTS,
  PUBLIC_DEMO_NOTICE,
} from "../../lib/demo-data/public-catalog";
import styles from "./public-pages.module.css";

const categoryTiles = [
  { label: "Restaurants", icon: "🥬", detail: "Voir les adresses", filter: "Restaurants" },
  { label: "Alimentation", icon: "🥣", detail: "Exemples de produits", filter: "Alimentation" },
  { label: "Mode", icon: "🏡", detail: "Univers à découvrir", filter: "Mode" },
  { label: "Beauté", icon: "✨", detail: "Univers à découvrir", filter: "Beauté" },
  { label: "Maison", icon: "🌿", detail: "Univers à découvrir", filter: "Maison" },
] as const;

type SortOrder = "default" | "price-asc" | "price-desc" | "name";

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

function hasCategoryExamples(category: string) {
  return category === "Tout voir" || DEMO_CATALOG_PRODUCTS.some((product) => product.category === category);
}

export function CatalogueBrowser() {
  const [category, setCategory] = useState<(typeof DEMO_CATALOG_CATEGORIES)[number]>("Tout voir");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOrder>("default");

  const products = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("fr-FR");
    const filtered = DEMO_CATALOG_PRODUCTS.filter((product) => {
      const matchesCategory =
        category === "Tout voir" || product.category === category;
      const searchable = `${product.name} ${product.merchantName} ${product.category}`
        .toLocaleLowerCase("fr-FR");
      return matchesCategory && (!term || searchable.includes(term));
    });

    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return filtered;
  }, [category, query, sort]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className={styles.main} aria-labelledby="catalogue-title">
      <div className={styles.wrap}>
        <div className={styles.pageHeading}>
          <div className={styles.headingCopy}>
            <p className={styles.eyebrow}>Explorez Delifast</p>
            <h1 className={styles.title} id="catalogue-title">Catalogue général</h1>
            <p className={styles.intro}>
              Explorez les catégories, les restaurants et les commerces de proximité.
            </p>
          </div>
          <span className={styles.demoBadge}>Données de démonstration</span>
        </div>

        <form className={styles.searchForm} role="search" onSubmit={handleSubmit}>
          <span className={styles.searchIcon} aria-hidden="true">⌕</span>
          <label className="sr-only" htmlFor="catalogue-search">
            Rechercher un produit ou un commerce
          </label>
          <input
            className={styles.searchInput}
            id="catalogue-search"
            type="search"
            placeholder="Rechercher un produit ou un commerce…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className={styles.searchButton} type="submit">Rechercher</button>
        </form>

        <div className={styles.filters} aria-label="Filtres du catalogue">
          {DEMO_CATALOG_CATEGORIES.map((item) => (
            <button
              className={styles.filterChip}
              type="button"
              key={item}
              aria-pressed={category === item}
              disabled={!hasCategoryExamples(item)}
              title={!hasCategoryExamples(item) ? "Aucun produit d’exemple dans cette catégorie" : undefined}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
          <label className="sr-only" htmlFor="catalogue-sort">Trier les produits</label>
          <select
            className={styles.sortControl}
            id="catalogue-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOrder)}
          >
            <option value="default">Trier par</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name">Nom</option>
          </select>
        </div>

        <div className={styles.productGrid} id="catalogue-products" aria-live="polite">
          {products.length ? products.map((product) => (
            <article className={styles.card} key={product.id}>
              <div className={styles.cardImage}>
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
                  <h2 className={styles.cardTitle}>{product.name}</h2>
                  <span className={styles.price}>{formatPrice(product.price)}</span>
                </div>
                <p className={styles.cardDescription}>{product.merchantName} · démo</p>
                <div className={styles.cardFooter}>
                  <span className={styles.demoLabel}>Exemple · Démo</span>
                  {product.available && product.restaurantSlug ? (
                    <Link className={styles.cardLink} href={`/restaurants/${product.restaurantSlug}`}>
                      Voir la fiche <span aria-hidden="true">↗</span>
                    </Link>
                  ) : (
                    <span className={styles.unavailable}>Indisponible · aperçu non commandable</span>
                  )}
                </div>
              </div>
            </article>
          )) : (
            <p className={styles.emptyState}>
              Aucun exemple n’est affiché pour ce filtre. Choisissez une autre catégorie.
            </p>
          )}
        </div>

        <section className={styles.categoryPanel} id="categories" aria-labelledby="categories-title">
          <div className={styles.panelHeading}>
            <h2 id="categories-title">Encore plus à découvrir</h2>
            <span className={styles.panelHint}>Visuels et commerces fictifs</span>
          </div>
          <div className={styles.categoryGrid}>
            {categoryTiles.map((tile) => (
              <button
                className={styles.categoryTile}
                key={tile.label}
                type="button"
                disabled={!hasCategoryExamples(tile.filter)}
                onClick={() => setCategory(tile.filter)}
              >
                <span className={styles.categoryIcon} aria-hidden="true">{tile.icon}</span>
                <strong>{tile.label}</strong>
                <small>{hasCategoryExamples(tile.filter) ? tile.detail : "Sans produits dans cet aperçu"}</small>
              </button>
            ))}
          </div>
          <p className={styles.notice}>
            {PUBLIC_DEMO_NOTICE} Les filtres, le tri et la recherche ne parcourent que ces exemples locaux.
          </p>
        </section>
      </div>
    </section>
  );
}

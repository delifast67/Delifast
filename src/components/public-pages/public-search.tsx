"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import {
  DEMO_RESTAURANTS,
  PUBLIC_DEMO_NOTICE,
  type DemoRestaurant,
  type DemoRestaurantProduct,
} from "../../lib/demo-data/public-catalog";
import {
  DEMO_PUBLIC_COMMERCE,
  type DemoCommerceProduct,
} from "../../lib/demo-data/public-commerce";
import styles from "./public-pages.module.css";

type SearchFilter = "Tout" | "Restaurants" | "Produits" | "Commerces";
type SearchResult = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly kind: "Restaurant" | "Produit" | "Commerce";
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly href: string;
  readonly price?: number;
  readonly rating?: string;
  readonly available?: boolean;
};

const filters: readonly SearchFilter[] = ["Tout", "Restaurants", "Produits", "Commerces"];

function restaurantProductResult(
  restaurant: DemoRestaurant,
  product: DemoRestaurantProduct,
): SearchResult {
  return {
    id: product.id,
    title: product.name,
    subtitle: `${restaurant.name} · Restaurant`,
    kind: "Produit",
    imageSrc: product.imageSrc,
    imageAlt: product.imageAlt,
    href: `/restaurants/${restaurant.slug}`,
    price: product.price,
    available: true,
  };
}

function commerceProductResult(product: DemoCommerceProduct): SearchResult {
  return {
    id: product.id,
    title: product.name,
    subtitle: `${DEMO_PUBLIC_COMMERCE.name} · Commerce`,
    kind: "Produit",
    imageSrc: product.imageSrc,
    imageAlt: product.imageAlt,
    href: `/commerces/${DEMO_PUBLIC_COMMERCE.slug}`,
    price: product.price,
    available: product.available,
  };
}

const sampleResults: readonly SearchResult[] = [
  restaurantProductResult(DEMO_RESTAURANTS[0], DEMO_RESTAURANTS[0].products[0]),
  restaurantProductResult(DEMO_RESTAURANTS[2], DEMO_RESTAURANTS[2].products[0]),
  {
    id: DEMO_PUBLIC_COMMERCE.slug,
    title: DEMO_PUBLIC_COMMERCE.name,
    subtitle: "Commerce · Alimentation",
    kind: "Commerce",
    imageSrc: DEMO_PUBLIC_COMMERCE.imageSrc,
    imageAlt: DEMO_PUBLIC_COMMERCE.imageAlt,
    href: `/commerces/${DEMO_PUBLIC_COMMERCE.slug}`,
  },
];

const restaurantResults: readonly SearchResult[] = DEMO_RESTAURANTS.map((restaurant) => ({
  id: restaurant.slug,
  title: restaurant.name,
  subtitle: restaurant.cuisine,
  kind: "Restaurant",
  imageSrc: restaurant.imageSrc,
  imageAlt: restaurant.imageAlt,
  href: `/restaurants/${restaurant.slug}`,
  rating: restaurant.rating,
}));

const productResults: readonly SearchResult[] = [
  ...DEMO_RESTAURANTS.flatMap((restaurant) =>
    restaurant.products.map((product) => restaurantProductResult(restaurant, product)),
  ),
  ...DEMO_PUBLIC_COMMERCE.products.map(commerceProductResult),
];

const commerceResults: readonly SearchResult[] = [
  {
    id: DEMO_PUBLIC_COMMERCE.slug,
    title: DEMO_PUBLIC_COMMERCE.name,
    subtitle: DEMO_PUBLIC_COMMERCE.category,
    kind: "Commerce",
    imageSrc: DEMO_PUBLIC_COMMERCE.imageSrc,
    imageAlt: DEMO_PUBLIC_COMMERCE.imageAlt,
    href: `/commerces/${DEMO_PUBLIC_COMMERCE.slug}`,
  },
];

function fold(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr-FR");
}

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

function resultActionLabel(kind: SearchResult["kind"]) {
  if (kind === "Restaurant") return "Voir le restaurant";
  if (kind === "Produit") return "Voir la fiche";
  return "Voir le commerce";
}

export function PublicSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<SearchFilter>("Tout");

  const results = useMemo(() => {
    const source =
      filter === "Restaurants"
        ? restaurantResults
        : filter === "Produits"
          ? productResults
          : filter === "Commerces"
            ? commerceResults
            : sampleResults;
    const term = fold(query.trim());
    if (!term) return source;
    return source.filter((result) => fold(`${result.title} ${result.subtitle} ${result.kind}`).includes(term));
  }, [filter, query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className={styles.main} aria-labelledby="search-title">
      <div className={styles.wrap}>
        <div className={styles.pageHeading}>
          <div className={styles.headingCopy}>
            <p className={styles.eyebrow}>Recherche Delifast</p>
            <h1 className={styles.title} id="search-title">Rechercher un plat ou une adresse</h1>
            <p className={styles.intro}>
              Un seul champ pour parcourir les exemples de restaurants, de produits et de commerces.
            </p>
          </div>
          <span className={styles.demoBadge}>Données fictives</span>
        </div>

        <form className={styles.searchForm} role="search" aria-label="Recherche locale de démonstration" onSubmit={handleSubmit}>
          <span className={styles.searchIcon} aria-hidden="true">⌕</span>
          <label className="sr-only" htmlFor="public-search">
            Rechercher un plat, un restaurant ou un commerce
          </label>
          <input
            className={styles.searchInput}
            id="public-search"
            type="search"
            placeholder="Ex. Poulet braisé, restaurant, commerce…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className={styles.searchButton} type="submit">Rechercher</button>
        </form>

        <div className={styles.filters} aria-label="Filtrer les résultats de démonstration">
          {filters.map((item) => (
            <button
              className={styles.filterChip}
              type="button"
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className={styles.panelHeading}>
          <h2>Résultats de démonstration</h2>
          <span className={styles.panelHint} aria-live="polite">
            {results.length} résultat{results.length === 1 ? "" : "s"} fictif{results.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className={styles.productGrid} aria-live="polite">
          {results.length ? results.map((result) => (
            <article className={styles.card} key={`${result.kind}-${result.id}`}>
              <div className={styles.cardImage}>
                <Image
                  className={styles.coverImage}
                  src={result.imageSrc}
                  alt={result.imageAlt}
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 950px) 50vw, 33vw"
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTitleRow}>
                  <h3 className={styles.cardTitle}>{result.title}</h3>
                  {result.price !== undefined ? (
                    <span className={styles.price}>{formatPrice(result.price)}</span>
                  ) : result.rating ? (
                    <span className={styles.rating}><span aria-hidden="true">★</span> {result.rating}</span>
                  ) : null}
                </div>
                <p className={styles.cardDescription}>{result.subtitle}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.demoLabel}>{result.kind} · démo</span>
                  {result.available === false ? (
                    <span className={styles.unavailable}>Indisponible · aperçu seulement</span>
                  ) : (
                    <Link className={styles.cardLink} href={result.href}>
                      {resultActionLabel(result.kind)} <span aria-hidden="true">↗</span>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          )) : (
            <p className={styles.emptyState}>
              Aucun résultat fictif ne correspond à cette recherche. Essayez un autre mot ou un autre filtre.
            </p>
          )}
        </div>

        <p className={styles.notice}>
          {PUBLIC_DEMO_NOTICE} La recherche et les filtres ne parcourent que ces exemples locaux.
        </p>
      </div>
    </section>
  );
}

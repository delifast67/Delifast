"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import {
  DEMO_RESTAURANTS,
  DEMO_RESTAURANT_FILTERS,
  PUBLIC_DEMO_NOTICE,
} from "../../lib/demo-data/public-catalog";
import styles from "./public-pages.module.css";

type RestaurantFilter = (typeof DEMO_RESTAURANT_FILTERS)[number];
type SortOrder = "default" | "rating" | "name";

export function RestaurantDirectory() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<RestaurantFilter[]>([]);
  const [sort, setSort] = useState<SortOrder>("default");

  const restaurants = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("fr-FR");
    const matches = DEMO_RESTAURANTS.filter((restaurant) => {
      const searchable = `${restaurant.name} ${restaurant.cuisine} ${restaurant.location}`
        .toLocaleLowerCase("fr-FR");
      const matchesQuery = !term || searchable.includes(term);
      const matchesFilters = filters.every((filter) =>
        filter === "Ouverts"
          ? restaurant.demoOpenNow
          : restaurant.cuisineFilter === filter || restaurant.cuisine.includes(filter),
      );
      return matchesQuery && matchesFilters;
    });

    if (sort === "rating") {
      return [...matches].sort((a, b) => Number(b.rating.replace(",", ".")) - Number(a.rating.replace(",", ".")));
    }
    if (sort === "name") return [...matches].sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return matches;
  }, [filters, query, sort]);

  function toggleFilter(filter: RestaurantFilter) {
    setFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className={styles.main} aria-labelledby="restaurants-title">
      <div className={styles.wrap}>
        <div className={styles.pageHeading}>
          <div className={styles.headingCopy}>
            <p className={styles.eyebrow}>Découvrez les adresses</p>
            <h1 className={styles.title} id="restaurants-title">Liste des restaurants</h1>
            <p className={styles.intro}>Des adresses de démonstration à découvrir à Ouagadougou.</p>
          </div>
          <span className={styles.demoBadge}>Données de démonstration</span>
        </div>

        <form className={styles.searchForm} role="search" onSubmit={handleSubmit}>
          <span className={styles.searchIcon} aria-hidden="true">⌕</span>
          <label className="sr-only" htmlFor="restaurant-search">
            Rechercher dans les restaurants
          </label>
          <input
            className={styles.searchInput}
            id="restaurant-search"
            type="search"
            placeholder="Rechercher dans les restaurants…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className={styles.searchButton} type="submit">Rechercher</button>
        </form>

        <div className={styles.filters} aria-label="Filtres des restaurants">
          {DEMO_RESTAURANT_FILTERS.map((filter) => (
            <button
              className={styles.filterChip}
              type="button"
              key={filter}
              aria-pressed={filters.includes(filter)}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </button>
          ))}
          <label className="sr-only" htmlFor="restaurant-sort">Trier les restaurants</label>
          <select
            className={styles.sortControl}
            id="restaurant-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOrder)}
          >
            <option value="default">Trier par</option>
            <option value="rating">Note de démonstration</option>
            <option value="name">Nom</option>
          </select>
        </div>

        <div className={styles.restaurantGrid} aria-live="polite">
          {restaurants.length ? restaurants.map((restaurant) => (
            <article className={styles.card} key={restaurant.slug}>
              <div className={styles.restaurantImage}>
                <Image
                  className={styles.coverImage}
                  src={restaurant.imageSrc}
                  alt={restaurant.imageAlt}
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 950px) 50vw, 33vw"
                />
              </div>
              <div className={styles.restaurantInfo}>
                <div className={styles.cardTitleRow}>
                  <h2 className={styles.cardTitle}>{restaurant.name}</h2>
                  <span className={styles.rating}>
                    <span aria-hidden="true">★</span> {restaurant.rating}
                    <span className="sr-only">, note fictive</span>
                  </span>
                </div>
                <p className={styles.cuisine}>{restaurant.cuisine}</p>
                <div className={styles.restaurantFoot}>
                  <span><span className={styles.mapPin} aria-hidden="true">●</span> Ouagadougou · démo</span>
                  <Link className={styles.cardLink} href={`/restaurants/${restaurant.slug}`}>
                    Voir la fiche <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </article>
          )) : (
            <p className={styles.emptyState}>
              Aucun restaurant de démonstration ne correspond à ces filtres. Modifiez votre recherche ou vos choix.
            </p>
          )}
        </div>
        <p className={styles.notice}>
          {PUBLIC_DEMO_NOTICE} Les filtres et le tri s’appliquent localement aux fiches d’exemple.
        </p>
      </div>
    </section>
  );
}

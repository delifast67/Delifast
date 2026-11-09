"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Info, Plus, Search } from "lucide-react";
import dashboard from "../../client/client-dashboard.module.css";
import styles from "./products.module.css";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  imageAlt: string;
  stockTracked: boolean;
  quantity: number | null;
  manualAvailable: boolean;
  published: boolean;
};

type Filter = "all" | "available" | "stock" | "unavailable";

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Poulet braisé",
    price: "3 500 FCFA",
    image: "/images/demo-delifast/grillades.jpg",
    imageAlt: "Illustration fictive de poulet braisé",
    stockTracked: true,
    quantity: 12,
    manualAvailable: true,
    published: true,
  },
  {
    id: 2,
    name: "Menu du jour",
    price: "4 500 FCFA",
    image: "/images/demo-delifast/table.jpg",
    imageAlt: "Illustration fictive du menu du jour",
    stockTracked: false,
    quantity: null,
    manualAvailable: true,
    published: false,
  },
  {
    id: 3,
    name: "Jus frais",
    price: "1 200 FCFA",
    image: "/images/demo-delifast/plat-hero.jpg",
    imageAlt: "Illustration fictive d’un jus frais",
    stockTracked: true,
    quantity: 8,
    manualAvailable: false,
    published: false,
  },
  {
    id: 4,
    name: "Brochettes mixtes",
    price: "2 800 FCFA",
    image: "/images/demo-delifast/grillades.jpg",
    imageAlt: "Illustration fictive de brochettes",
    stockTracked: true,
    quantity: 0,
    manualAvailable: true,
    published: false,
  },
];

function isAvailable(product: Product) {
  if (product.stockTracked && product.quantity === 0) return false;
  return product.manualAvailable;
}

function availabilityLabel(product: Product) {
  if (product.stockTracked && product.quantity === 0) {
    return "Indisponible · stock nul";
  }
  if (!product.manualAvailable) return "Indisponible · réglage manuel";
  return product.published ? "Publié · disponible" : "Disponible";
}

export function ProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    return products.filter((product) => {
      const matchesQuery = product.name.toLocaleLowerCase("fr").includes(normalizedQuery);
      const matchesFilter =
        filter === "all" ||
        (filter === "available" && isAvailable(product)) ||
        (filter === "stock" && product.stockTracked) ||
        (filter === "unavailable" && !isAvailable(product));
      return matchesQuery && matchesFilter;
    });
  }, [filter, products, query]);

  const counts = useMemo(
    () => ({
      all: products.length,
      available: products.filter(isAvailable).length,
      stock: products.filter((product) => product.stockTracked).length,
      unavailable: products.filter((product) => !isAvailable(product)).length,
    }),
    [products],
  );

  function toggleAvailability(product: Product) {
    if (product.stockTracked && product.quantity === 0) {
      setFeedback(
        "Disponibilité inchangée : le stock fictif est nul. Aucun changement n’est enregistré.",
      );
      return;
    }
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? { ...item, manualAvailable: !item.manualAvailable }
          : item,
      ),
    );
    setFeedback(
      `Aperçu local : disponibilité de « ${product.name} » modifiée. Rien n’est enregistré.`,
    );
  }

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "Tous les produits", count: counts.all },
    { id: "available", label: "Disponibles", count: counts.available },
    { id: "stock", label: "Stock suivi", count: counts.stock },
    { id: "unavailable", label: "Indisponibles", count: counts.unavailable },
  ];

  return (
    <>
      <div className={styles.headingRow}>
        <div className={dashboard.pageHeading}>
          <p className={dashboard.eyebrow}>Commerçant · Démonstration</p>
          <h1>Liste des produits</h1>
          <p className={dashboard.intro}>
            Gérez vos produits, leur disponibilité et le suivi de stock facultatif.
          </p>
        </div>
        <Link className={styles.primaryButton} href="/commercant/produits/nouveau">
          <Plus aria-hidden="true" size={15} />
          Ajouter un produit
        </Link>
      </div>

      <div className={styles.demoNotice} role="note">
        <span className={styles.noticeIcon} aria-hidden="true">
          <Info size={14} />
        </span>
        <p>
          <strong>Aperçu local uniquement</strong>
          <span>Filtres et changements d’affichage non enregistrés.</span>
        </p>
        <span className={styles.demoBadge}>Écran 28 sur 53</span>
      </div>

      <section className={styles.listSection} aria-label="Produits fictifs du commerce">
        <div className={styles.toolbar}>
          <div className={styles.filters} aria-label="Filtrer les produits">
            {filters.map((item) => (
              <button
                aria-pressed={filter === item.id}
                className={`${styles.filterButton} ${filter === item.id ? styles.filterActive : ""}`}
                key={item.id}
                onClick={() => setFilter(item.id)}
                type="button"
              >
                {item.label}
                <span>{item.count}</span>
              </button>
            ))}
          </div>
          <label className={styles.productSearch}>
            <Search aria-hidden="true" size={15} />
            <span className={styles.srOnly}>Rechercher un produit</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un produit"
              type="search"
              value={query}
            />
          </label>
        </div>

        <div className={styles.tableFrame}>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th scope="col">Produit</th>
                <th scope="col">Prix</th>
                <th scope="col">Suivi stock</th>
                <th scope="col">Quantité suivie</th>
                <th scope="col">Disponibilité</th>
              </tr>
            </thead>
            <tbody>
              {visibleProducts.map((product) => {
                const available = isAvailable(product);
                const stockEmpty = product.stockTracked && product.quantity === 0;
                return (
                  <tr key={product.id}>
                    <td data-label="Produit">
                      <div className={styles.productCell}>
                        <Image
                          alt={product.imageAlt}
                          className={styles.productImage}
                          height={42}
                          sizes="42px"
                          src={product.image}
                          width={42}
                        />
                        <strong>{product.name}</strong>
                      </div>
                    </td>
                    <td data-label="Prix">{product.price}</td>
                    <td data-label="Suivi stock">
                      {product.stockTracked ? "Actif" : "Désactivé"}
                    </td>
                    <td data-label="Quantité suivie">
                      {product.stockTracked
                        ? `${product.quantity} ${product.quantity === 1 ? "unité" : "unités"}`
                        : "Gestion manuelle"}
                    </td>
                    <td data-label="Disponibilité">
                      <button
                        aria-label={
                          stockEmpty
                            ? `${product.name} : indisponible en raison du stock nul`
                            : `Rendre ${product.name} ${available ? "indisponible" : "disponible"} dans cet aperçu local`
                        }
                        className={`${styles.statusButton} ${available ? styles.statusAvailable : styles.statusUnavailable}`}
                        disabled={stockEmpty}
                        onClick={() => toggleAvailability(product)}
                        title={stockEmpty ? "Stock nul : disponibilité bloquée dans cet aperçu" : "Modifier uniquement cet aperçu local"}
                        type="button"
                      >
                        <span aria-hidden="true" />
                        {availabilityLabel(product)}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {visibleProducts.length === 0 && (
                <tr>
                  <td className={styles.emptyState} colSpan={5}>
                    Aucun produit fictif ne correspond à ce filtre.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.listFootnote}>
          <span aria-hidden="true">✓</span>
          <p>
            Le suivi de stock et la disponibilité manuelle sont deux réglages distincts.
            Un produit indisponible est refusé côté serveur, même si le stock n’est pas suivi.
          </p>
          <small>Noms et quantités fictifs</small>
        </div>
        {feedback && (
          <p className={styles.feedback} role="status" aria-live="polite">
            {feedback}
          </p>
        )}
        <p className={styles.ruleNote}>
          <Info aria-hidden="true" size={14} />
          La disponibilité manuelle est indépendante du suivi de stock. Tout produit marqué
          indisponible est refusé côté serveur, y compris lorsque le stock n’est pas suivi.
        </p>
      </section>
    </>
  );
}

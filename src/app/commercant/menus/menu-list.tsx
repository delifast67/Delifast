"use client";

import { useMemo, useState } from "react";
import { BookOpen, Info, Plus, Search, SquarePen } from "lucide-react";
import styles from "./menus.module.css";

type Menu = {
  id: string;
  name: string;
  itemCount: number;
  availability: "Disponible" | "Masqué";
  updatedAt: string;
};

const demoMenus: Menu[] = [
  {
    id: "lunch",
    name: "Menu du midi",
    itemCount: 3,
    availability: "Disponible",
    updatedAt: "05 nov. 2026",
  },
  {
    id: "grill",
    name: "Formule grillades",
    itemCount: 2,
    availability: "Disponible",
    updatedAt: "02 nov. 2026",
  },
  {
    id: "seasonal",
    name: "Menu saisonnier",
    itemCount: 4,
    availability: "Masqué",
    updatedAt: "30 oct. 2026",
  },
];

export function MenuList() {
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");

  const visibleMenus = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    if (!normalizedQuery) return demoMenus;

    return demoMenus.filter((menu) =>
      [menu.name, `${menu.itemCount} produits`, menu.availability, menu.updatedAt]
        .join(" ")
        .toLocaleLowerCase("fr")
        .includes(normalizedQuery),
    );
  }, [query]);

  function previewForm(action: "création" | "modification", name?: string) {
    const subject = name ? ` « ${name} »` : "";
    setFeedback(
      `Aperçu local uniquement : le formulaire menu (écran 31) n’est pas inclus dans ce lot. Aucune ${action} de menu${subject} n’a eu lieu.`,
    );
  }

  return (
    <>
      <div className={styles.headingRow}>
        <div className={styles.pageHeading}>
          <p className={styles.eyebrow}>Commerçant · Démonstration</p>
          <h1>Liste des menus</h1>
          <p className={styles.intro}>
            Organisez les menus présentés dans la vitrine de votre commerce.
          </p>
        </div>
        <button
          className={styles.primaryButton}
          onClick={() => previewForm("création")}
          type="button"
        >
          <Plus aria-hidden="true" size={16} />
          Créer un menu
        </button>
      </div>

      <div className={styles.demoNotice} role="note">
        <span className={styles.noticeIcon} aria-hidden="true">
          <Info size={14} />
        </span>
        <p>
          <strong>Aperçu local uniquement</strong>
          <span>Menus, articles et dates fictifs · rien n’est enregistré.</span>
        </p>
        <span className={styles.demoBadge}>Écran 30 sur 53</span>
      </div>

      <section className={styles.listSection} aria-label="Menus fictifs du commerce">
        <div className={styles.toolbar}>
          <div className={styles.sectionIntro}>
            <h2>Menus du commerce</h2>
            <p>{visibleMenus.length} résultat{visibleMenus.length > 1 ? "s" : ""}</p>
          </div>
          <label className={styles.menuSearch}>
            <Search aria-hidden="true" size={16} />
            <span className={styles.srOnly}>Rechercher un menu</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un menu"
              type="search"
              value={query}
            />
          </label>
        </div>

        <div className={styles.tableFrame}>
          <table className={styles.menuTable}>
            <thead>
              <tr>
                <th scope="col">Menu</th>
                <th scope="col">Articles</th>
                <th scope="col">Disponibilité</th>
                <th scope="col">Dernière modification</th>
                <th scope="col"><span className={styles.srOnly}>Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {visibleMenus.map((menu) => (
                <tr key={menu.id}>
                  <td data-label="Menu">
                    <div className={styles.menuCell}>
                      <span className={styles.menuIcon} aria-hidden="true">
                        <BookOpen size={18} />
                      </span>
                      <strong>{menu.name}</strong>
                    </div>
                  </td>
                  <td data-label="Articles">
                    {menu.itemCount} {menu.itemCount === 1 ? "produit" : "produits"}
                  </td>
                  <td data-label="Disponibilité">
                    <span
                      className={`${styles.statusPill} ${menu.availability === "Disponible" ? styles.statusAvailable : styles.statusHidden}`}
                    >
                      <span aria-hidden="true" />
                      {menu.availability}
                    </span>
                  </td>
                  <td data-label="Dernière modification">{menu.updatedAt}</td>
                  <td data-label="Actions">
                    <button
                      aria-label={`Modifier ${menu.name} · aperçu local`}
                      className={styles.editButton}
                      onClick={() => previewForm("modification", menu.name)}
                      type="button"
                    >
                      <SquarePen aria-hidden="true" size={14} />
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
              {visibleMenus.length === 0 && (
                <tr>
                  <td className={styles.emptyState} colSpan={5}>
                    Aucun menu fictif ne correspond à cette recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {feedback && (
          <p className={styles.feedback} role="status" aria-live="polite">
            {feedback}
          </p>
        )}
      </section>
    </>
  );
}

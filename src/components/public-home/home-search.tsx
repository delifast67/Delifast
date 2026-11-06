import styles from "./home.module.css";

export function HomeSearch() {
  return (
    <form
      action="/recherche"
      method="get"
      className={styles.searchBox}
      role="search"
      aria-label="Recherche de démonstration"
    >
      <span className={styles.searchIcon} aria-hidden="true">
        ⌕
      </span>
      <label className={styles.srOnly} htmlFor="home-search">
        Rechercher un restaurant, un plat ou un commerce
      </label>
      <input
        className={styles.searchInput}
        id="home-search"
        name="q"
        type="search"
        placeholder="Un restaurant, un plat, un commerce…"
      />
      <button
        className={`${styles.button} ${styles.buttonPrimary} ${styles.searchButton}`}
        type="submit"
      >
        Rechercher
      </button>
    </form>
  );
}

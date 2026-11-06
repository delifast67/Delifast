"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "./home.module.css";

export function HomeSearch() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) {
      setMessage("Saisissez un restaurant, un plat ou un commerce.");
      inputRef.current?.focus();
      return;
    }
    setMessage("La recherche n’est pas connectée dans cet aperçu.");
  }

  return (
    <>
      <form
        className={styles.searchBox}
        role="search"
        aria-label="Recherche de démonstration"
        onSubmit={handleSubmit}
      >
        <span className={styles.searchIcon} aria-hidden="true">
          ⌕
        </span>
        <label className={styles.srOnly} htmlFor="home-search">
          Rechercher un restaurant, un plat ou un commerce
        </label>
        <input
          ref={inputRef}
          className={styles.searchInput}
          id="home-search"
          type="search"
          placeholder="Un restaurant, un plat, un commerce…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            if (message) setMessage("");
          }}
        />
        <button
          className={`${styles.button} ${styles.buttonPrimary} ${styles.searchButton}`}
          type="submit"
        >
          Rechercher
        </button>
      </form>
      {message ? (
        <p className={styles.searchFeedback} role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </>
  );
}

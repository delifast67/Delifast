"use client";

import { useState } from "react";
import styles from "./home.module.css";

type FavoriteButtonProps = {
  restaurantName: string;
};

export function FavoriteButton({ restaurantName }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const action = isFavorite ? "Retirer" : "Ajouter";

  return (
    <button
      className={styles.favoriteButton}
      type="button"
      aria-label={`${action} ${restaurantName} ${isFavorite ? "des" : "aux"} favoris (aperçu local)`}
      aria-pressed={isFavorite}
      onClick={() => setIsFavorite((current) => !current)}
    >
      <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
    </button>
  );
}

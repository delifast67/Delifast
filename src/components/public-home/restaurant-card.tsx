import Image from "next/image";
import type { DemoRestaurant } from "../../lib/demo-data/home";
import { FavoriteButton } from "./favorite-button";
import styles from "./home.module.css";

type RestaurantCardProps = {
  restaurant: DemoRestaurant;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <article className={styles.restaurantCard}>
      <div className={styles.restaurantImage}>
        <Image
          className={styles.coverImage}
          src={restaurant.imageSrc}
          alt={restaurant.imageAlt}
          fill
          sizes="(max-width: 680px) 50vw, (max-width: 950px) 50vw, 33vw"
        />
        <span className={styles.tag}>{restaurant.tag}</span>
        <FavoriteButton restaurantName={restaurant.name} />
      </div>
      <div className={styles.restaurantInfo}>
        <div className={styles.restaurantTitleRow}>
          <h3>{restaurant.name}</h3>
          <span className={styles.rating}>
            <span aria-hidden="true">★</span> {restaurant.rating}
            <span className={styles.srOnly}>, note fictive</span>
          </span>
        </div>
        <p>{restaurant.cuisine}</p>
        <div className={styles.restaurantFoot}>
          <span>
            <span aria-hidden="true">📍</span> {restaurant.location}
          </span>
          <span className={styles.cardLink}>
            Fiche de démonstration
          </span>
        </div>
      </div>
    </article>
  );
}

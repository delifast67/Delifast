import Image from "next/image";
import type { DemoCommerce } from "../../lib/demo-data/public-commerce";
import { PUBLIC_COMMERCE_DELIVERY_NOTE } from "../../lib/demo-data/public-commerce";
import styles from "./public-pages.module.css";

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

export function CommerceExperience({ commerce }: { commerce: DemoCommerce }) {
  return (
    <section className={`${styles.main} ${styles.detailMain}`} aria-labelledby="commerce-name">
      <div className={styles.wrap}>
        <div className={styles.detailHero}>
          <Image
            className={styles.coverImage}
            src={commerce.imageSrc}
            alt={commerce.imageAlt}
            fill
            priority
            sizes="(max-width: 680px) 100vw, 1340px"
          />
          <div className={styles.detailHeroCopy}>
            <p className={styles.eyebrow}>Fiche commerce · démo</p>
            <h1 className={styles.detailTitle} id="commerce-name">{commerce.name}</h1>
            <p className={styles.detailCuisine}>{commerce.category}</p>
          </div>
        </div>

        <div className={styles.detailMeta} aria-label="Informations de démonstration">
          <span><span className={styles.mapPin} aria-hidden="true">●</span>{commerce.location}</span>
          <span>{commerce.pickupSummary}</span>
          <span>{commerce.availabilitySummary}</span>
        </div>

        <p className={styles.deliveryNotice} role="note">
          <strong>Livraison :</strong> {PUBLIC_COMMERCE_DELIVERY_NOTE}
        </p>

        <div className={styles.menuHeading} id="produits">
          <h2>Produits du commerce</h2>
          <p>Exemples fictifs · prix illustratifs</p>
        </div>

        <div className={styles.productGrid}>
          {commerce.products.map((product) => (
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
                  <span className={styles.demoLabel}>Exemple · démo</span>
                  {product.available ? (
                    <span className={styles.demoLabel}>Disponibilité illustrative</span>
                  ) : (
                    <span className={styles.unavailable}>Indisponible · non commandable</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.notice}>
          Commerce, produits, visuels, prix et disponibilités entièrement fictifs. Cet aperçu ne propose ni panier, ni commande, ni paiement.
        </p>
      </div>
    </section>
  );
}

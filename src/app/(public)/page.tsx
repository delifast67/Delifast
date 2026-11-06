import Image from "next/image";
import {
  DEMO_HOME_CATEGORIES,
  DEMO_HOME_OTHER_COMMERCE,
  DEMO_HOME_RESTAURANTS,
  DEMO_HOME_TRUST_ITEMS,
  HOME_DEMO_NOTICE,
} from "../../lib/demo-data/home";
import { HomeSearch } from "../../components/public-home/home-search";
import { MobileNavigation, HomeHeader } from "../../components/public-home/site-header";
import { RestaurantCard } from "../../components/public-home/restaurant-card";
import { HomeFooter } from "../../components/public-home/site-footer";
import styles from "../../components/public-home/home.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#contenu-principal">
        Aller au contenu principal
      </a>
      <HomeHeader />
      <main id="contenu-principal">
        <section
          className={styles.hero}
          id="accueil"
          aria-labelledby="home-title"
        >
          <div className={`${styles.wrap} ${styles.heroGrid}`}>
            <div className={styles.heroCopyColumn}>
              <p className={styles.eyebrow}>La restauration à l’honneur</p>
              <h1 className={styles.heroTitle} id="home-title">
                Vos envies ont trouvé leur <em>adresse.</em>
              </h1>
              <p className={styles.heroCopy}>
                Découvrez les restaurants, explorez des plats qui donnent envie
                et trouvez aussi les commerces qui facilitent votre quotidien à
                Ouagadougou.
              </p>
              <HomeSearch />
              <div className={styles.heroMeta}>
                <span>
                  <span aria-hidden="true">✓</span> Restaurants et commerces
                </span>
                <span>
                  <span aria-hidden="true">✓</span> Paiement direct au vendeur
                </span>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroPhoto}>
                <Image
                  className={styles.coverImage}
                  src="/images/demo-delifast/plat-hero.jpg"
                  alt="Assiette colorée, photographie illustrative de démonstration"
                  fill
                  priority
                  sizes="(max-width: 680px) 100vw, 50vw"
                />
                <div className={styles.photoShade} aria-hidden="true" />
              </div>
              <div className={styles.ratingPill}>
                <span aria-hidden="true">★★★★★</span>
                <span className={styles.srOnly}>Illustration</span>
                Les saveurs à découvrir
              </div>
              <div className={styles.floatingCard}>
                <div className={styles.floatingIcon} aria-hidden="true">
                  🍽️
                </div>
                <div>
                  <strong>Une envie ? Trouvez votre table.</strong>
                  <small>Explorez les restaurants près de vous</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.section}
          id="categories"
          aria-labelledby="categories-title"
        >
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.sectionKicker}>Explorez Delifast</p>
                <h2 className={styles.sectionTitle} id="categories-title">
                  Tout ce qui vous fait envie
                </h2>
                <p className={styles.sectionSub}>
                  La cuisine en vedette, et d’autres univers à découvrir au fil
                  de vos besoins.
                </p>
              </div>
              <a className={styles.textLink} href="#commerces">
                Voir toutes les catégories <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className={styles.categoryGrid}>
              {DEMO_HOME_CATEGORIES.map((category) => (
                <a
                  className={styles.category}
                  href={category.href}
                  key={category.label}
                >
                  <span className={styles.categoryIcon} aria-hidden="true">
                    {category.icon}
                  </span>
                  <strong>{category.label}</strong>
                  <small>{category.detail}</small>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.sectionSoft}`}
          id="restaurants"
          aria-labelledby="restaurants-title"
        >
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.sectionKicker}>À découvrir en premier</p>
                <h2 className={styles.sectionTitle} id="restaurants-title">
                  Les restaurants à la une
                </h2>
                <p className={styles.sectionSub}>
                  Parcourez les adresses gourmandes et laissez-vous inspirer
                  par leurs spécialités.
                </p>
              </div>
              <a className={styles.textLink} href="#restaurants">
                Explorer les restaurants <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className={styles.restaurantGrid}>
              {DEMO_HOME_RESTAURANTS.map((restaurant) => (
                <RestaurantCard
                  restaurant={restaurant}
                  key={restaurant.name}
                />
              ))}
            </div>
            <p className={styles.demoNotice}>{HOME_DEMO_NOTICE}</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="food-banner-title">
          <div className={styles.wrap}>
            <div className={styles.foodBanner}>
              <div className={styles.foodBannerCopy}>
                <p className={styles.sectionKicker}>Le goût d’abord</p>
                <h2 className={styles.bannerTitle} id="food-banner-title">
                  La bonne cuisine mérite d’être trouvée.
                </h2>
                <p>
                  Découvrez les menus, comparez les spécialités et contactez
                  directement les restaurants pour vos envies du moment.
                </p>
                <a
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  href="#restaurants"
                >
                  Découvrir les restaurants <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className={styles.foodBannerVisual}>
                <Image
                  className={styles.coverImage}
                  src="/images/demo-delifast/table.jpg"
                  alt="Table garnie, visuel de démonstration"
                  fill
                  sizes="(max-width: 680px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.sectionSoft}`}
          id="commerces"
          aria-labelledby="commerce-title"
        >
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.sectionKicker}>Et bien plus encore</p>
                <h2 className={styles.sectionTitle} id="commerce-title">
                  Vos autres commerces, au même endroit
                </h2>
                <p className={styles.sectionSub}>
                  Delifast s’ouvre aussi aux boutiques et commerces de proximité.
                </p>
              </div>
              <a className={styles.textLink} href="#categories">
                Tout explorer <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className={styles.otherGrid}>
              {DEMO_HOME_OTHER_COMMERCE.map((item) => (
                <article className={styles.otherCard} key={item.title}>
                  <span className={styles.otherSymbol} aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href="#categories">
                    {item.link} <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.section}
          id="aide"
          aria-labelledby="trust-title"
        >
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.sectionKicker}>Simple et transparent</p>
                <h2 className={styles.sectionTitle} id="trust-title">
                  Delifast, pensé pour vos habitudes
                </h2>
              </div>
            </div>
            <div className={styles.trust}>
              {DEMO_HOME_TRUST_ITEMS.map((item) => (
                <article className={styles.trustItem} key={item.title}>
                  <span className={styles.trustIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <HomeFooter />
      <MobileNavigation />
    </div>
  );
}

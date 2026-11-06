import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../client-dashboard.module.css";
import styles from "./client-cart.module.css";

export const metadata: Metadata = {
  title: "Panier (démo) | Delifast",
  description:
    "Aperçu fictif d’un panier Delifast associé à un seul commerce.",
};

const demoItems = [
  {
    name: "Poulet braisé",
    image: "/images/demo-delifast/grillades.jpg",
    alt: "Assiette de grillades, visuel de démonstration",
    option: "Accompagnement : frites · supplément enregistré 500 FCFA",
    price: "4 000 FCFA",
  },
  {
    name: "Menu du jour",
    image: "/images/demo-delifast/table.jpg",
    alt: "Repas et accompagnements, visuel de démonstration",
    option: "Sans option · prix de démonstration",
    price: "4 500 FCFA",
  },
] as const;

const clientNavigation = [
  { label: "Client", icon: "⌂", href: "/client" },
  { label: "Panier", icon: "▣", href: "/client/panier" },
  { label: "Commandes", icon: "▤" },
  { label: "Paiements", icon: "◆" },
  { label: "Profil client", icon: "♙" },
] as const;

function DemoButton({
  children,
  variant = "primary",
}: {
  children: ReactNode;
  variant?: "primary" | "outline";
}) {
  return (
    <button
      className={`${styles.actionButton} ${variant === "primary" ? styles.primaryButton : styles.outlineButton}`}
      type="button"
      disabled
    >
      {children}
    </button>
  );
}

export default function ClientCartPage() {
  return (
    <div className={dashboard.shell}>
      <aside className={dashboard.sidebar} aria-label="Espace client de démonstration">
        <HomeBrand href="/" />
        <p className={dashboard.spaceLabel}>Espace client</p>
        <nav className={dashboard.navigation} aria-label="Navigation client">
          {clientNavigation.map((item) => {
            const className =
              item.label === "Panier" ? dashboard.activeNavItem : dashboard.navItem;
            const label = (
              <>
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </>
            );

            return "href" in item ? (
              <Link
                aria-current={item.label === "Panier" ? "page" : undefined}
                className={className}
                href={item.href}
                key={item.label}
              >
                {label}
              </Link>
            ) : (
              <span className={className} key={item.label}>
                {label}
              </span>
            );
          })}
        </nav>
        <div className={dashboard.sidebarNote}>
          <span aria-hidden="true">●</span> Mode démonstration
          <small>Aucune donnée réelle</small>
        </div>
      </aside>

      <div className={dashboard.mainColumn}>
        <header className={dashboard.topbar}>
          <nav className={dashboard.breadcrumbs} aria-label="Fil d’Ariane">
            <Link href="/">Delifast</Link>
            <span aria-hidden="true">/</span>
            <Link href="/client">Client</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Panier</span>
          </nav>
          <div className={dashboard.topbarActions}>
            <div
              className={dashboard.searchMock}
              aria-label="Recherche désactivée dans cette maquette"
            >
              <span aria-hidden="true">⌕</span>
              <span>Rechercher</span>
            </div>
            <span className={dashboard.avatar} aria-label="Profil fictif Aminata Démo">
              AD
            </span>
          </div>
        </header>

        <main className={dashboard.content} id="contenu-principal">
          <div className={dashboard.pageHeading}>
            <p className={dashboard.eyebrow}>Client · Démonstration</p>
            <h1>Panier</h1>
            <p className={dashboard.intro}>Un panier associé à un seul commerçant.</p>
          </div>

          <section className={styles.merchantNotice} aria-labelledby="merchant-notice-title">
            <span className={styles.noticeIcon} aria-hidden="true">▧</span>
            <div>
              <h2 id="merchant-notice-title">Un seul commerce par panier</h2>
              <p>
                Panier actuel : <strong>Saveurs du Faso</strong> · 2 articles ·
                données fictives
              </p>
            </div>
          </section>

          <div className={styles.cartLayout}>
            <section className={`${dashboard.panel} ${styles.cartPanel}`} aria-labelledby="cart-title">
              <div className={dashboard.panelHeading}>
                <h2 id="cart-title">Votre panier</h2>
                <span className={styles.subtle}>Saveurs du Faso · données démo</span>
              </div>
              <ul className={styles.itemList}>
                {demoItems.map((item) => (
                  <li className={styles.cartItem} key={item.name}>
                    <Image
                      alt={item.alt}
                      className={styles.cartThumb}
                      height={100}
                      src={item.image}
                      width={112}
                    />
                    <div className={styles.cartMain}>
                      <h3>{item.name}</h3>
                      <p>{item.option}</p>
                      <div className={styles.quantity} aria-label="Quantité de démonstration : 1">
                        <button aria-label="Diminuer la quantité (désactivé dans cette maquette)" disabled type="button">
                          −
                        </button>
                        <span>1</span>
                        <button aria-label="Augmenter la quantité (désactivé dans cette maquette)" disabled type="button">
                          +
                        </button>
                        <small>Quantité</small>
                      </div>
                    </div>
                    <strong className={styles.itemPrice}>{item.price}</strong>
                  </li>
                ))}
              </ul>
              <p className={styles.panelNote}>
                Les prix et options sont une copie illustrative des choix du panier.
                Le stock n’est pas réservé ici ; un produit déclaré indisponible ne
                peut pas être commandé.
              </p>
            </section>

            <aside className={`${dashboard.panel} ${styles.summaryPanel}`} aria-labelledby="summary-title">
              <div className={dashboard.panelHeading}>
                <h2 id="summary-title">Résumé</h2>
                <span className={styles.subtle}>Commerce unique</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Sous-total</span>
                <strong>8 500 FCFA</strong>
              </div>
              <div className={styles.summaryLine}>
                <span>Modalité du commerce</span>
                <strong>À choisir</strong>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total estimé</span>
                <strong>8 500 FCFA</strong>
              </div>
              <DemoButton>Continuer la commande</DemoButton>
              <Link className={`${styles.actionButton} ${styles.outlineButton}`} href="/catalogue">
                Retour au catalogue
              </Link>
            </aside>
          </div>

          <p className={styles.serverNote}>
            Dans le parcours prévu, chaque ligne est vérifiée pour le même commerce
            avant l’envoi de la commande.
          </p>
        </main>
      </div>

      <div className={styles.dialogBackdrop}>
        <section
          aria-describedby="cart-change-description"
          aria-labelledby="cart-change-title"
          aria-modal="true"
          className={styles.dialog}
          role="dialog"
        >
          <div className={styles.dialogTop}>
            <span className={styles.dialogIcon} aria-hidden="true">↔</span>
            <div>
              <h2 id="cart-change-title">Changer de commerce ?</h2>
              <p id="cart-change-description">
                Le panier contient déjà des produits de <strong>Saveurs du Faso</strong>.
                Pour ajouter l’article de <strong>Marché Démo</strong>, le panier
                actuel serait remplacé.
              </p>
            </div>
          </div>
          <div className={styles.dialogItem}>
            <span>Panier actuel · 2 articles</span>
            <strong>8 500 FCFA</strong>
          </div>
          <div className={styles.dialogItem}>
            <span>Nouvel article · Panier de saison</span>
            <strong>2 500 FCFA</strong>
          </div>
          <div className={styles.dialogActions}>
            <DemoButton variant="outline">Garder mon panier</DemoButton>
            <DemoButton>Remplacer le panier</DemoButton>
          </div>
          <p className={styles.dialogNote}>
            La confirmation est requise avant tout remplacement. Aperçu statique :
            aucune donnée n’est modifiée et aucune commande n’est envoyée.
          </p>
        </section>
      </div>
    </div>
  );
}

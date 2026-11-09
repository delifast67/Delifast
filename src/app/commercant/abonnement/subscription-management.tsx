"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  Clock3,
  ClipboardList,
  CreditCard,
  History,
  LayoutDashboard,
  ShieldCheck,
  Store,
} from "lucide-react";
import { useState } from "react";
import { HomeBrand } from "../../../components/public-home/site-header";
import dashboard from "../../client/client-dashboard.module.css";
import styles from "./subscription.module.css";

const plans = [
  { id: "decouverte", name: "Découverte", price: 3_000 },
  { id: "professionnel", name: "Professionnel", price: 4_500 },
] as const;

type PlanId = (typeof plans)[number]["id"];

const historyRows = [
  {
    id: "pending",
    plan: "Professionnel · exemple fictif",
    payment: "PAY-DEMO-0001 · fictif",
    period: "Renouvellement · période fictive",
    state: "En attente · exemple",
  },
  {
    id: "rejected",
    plan: "Découverte · exemple fictif",
    payment: "PAY-DEMO-0000 · fictif",
    period: "Période passée · date fictive",
    state: "Refusé · exemple",
  },
] as const;

function amountLabel(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} F CFA`;
}

export function MerchantSubscriptionManagement() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const selectedPlanName = plans.find((plan) => plan.id === selectedPlan)?.name;

  return (
    <div className={dashboard.shell}>
      <aside
        className={dashboard.sidebar}
        aria-label="Espace commerçant de démonstration"
      >
        <HomeBrand href="/" />
        <p className={dashboard.spaceLabel}>Espace commerçant</p>
        <nav className={dashboard.navigation} aria-label="Navigation commerçant">
          <Link className={dashboard.navItem} href="/commercant">
            <LayoutDashboard aria-hidden="true" size={15} />
            <span>Tableau de bord</span>
          </Link>
          <Link className={dashboard.navItem} href="/commercant/commandes">
            <ClipboardList aria-hidden="true" size={15} />
            <span>Commandes · démo</span>
          </Link>
          <Link className={dashboard.navItem} href="/commercant/paiements">
            <CreditCard aria-hidden="true" size={15} />
            <span>Paiements de commande</span>
          </Link>
          <Link
            aria-current="page"
            className={dashboard.activeNavItem}
            href="/commercant/abonnement"
          >
            <Store aria-hidden="true" size={15} />
            <span>Gestion de l’abonnement</span>
          </Link>
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
            <Link href="/commercant">Commerçant</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Gestion de l’abonnement</span>
          </nav>
          <div className={dashboard.topbarActions}>
            <div
              aria-label="Recherche désactivée dans cette maquette"
              className={dashboard.searchMock}
            >
              <span aria-hidden="true">⌕</span>
              <span>Rechercher</span>
            </div>
            <span className={dashboard.avatar} aria-label="Profil fictif Saveurs du Faso">
              SF
            </span>
          </div>
        </header>

        <main className={dashboard.content} id="contenu-principal">
          <div className={dashboard.pageHeading}>
            <p className={dashboard.eyebrow}>Commerçant · Démonstration</p>
            <h1>Gestion de l’abonnement</h1>
            <p className={dashboard.intro}>
              Découverte coûte 3 000 F CFA par mois et Professionnel 4 500 F CFA par mois.
            </p>
          </div>

          <div className={styles.demoNotice} role="note">
            <span className={styles.noticeIcon} aria-hidden="true">
              <ShieldCheck size={17} />
            </span>
            <p>
              <strong>Tarifs de référence · maquette locale uniquement</strong>
              <span>
                Les données d’abonnement ci-dessous sont fictives. Aucun compte, paiement,
                renouvellement, décision ou notification n’est créé ou modifié.
              </span>
            </p>
            <span className={styles.demoTag}>36 / 53</span>
          </div>

          <section className={styles.suspensionCard} aria-labelledby="suspension-title">
            <div className={styles.suspensionHeading}>
              <span className={styles.alertIcon} aria-hidden="true">
                <CircleAlert size={18} />
              </span>
              <div>
                <p className={styles.kicker}>État de démonstration · fictif</p>
                <h2 id="suspension-title">
                  Votre compte marchand est temporairement désactivé
                </h2>
                <p className={styles.reason}>
                  Motif d’exemple : votre abonnement n’est pas actif ou est arrivé à expiration.
                </p>
              </div>
              <span className={styles.stateTag}>Scénario fictif</span>
            </div>

            <dl className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <dt>Forfait concerné</dt>
                <dd>Professionnel · exemple fictif</dd>
              </div>
              <div className={styles.detailItem}>
                <dt>Date d’expiration</dt>
                <dd>05 novembre 2026 · fictive</dd>
              </div>
              <div className={styles.detailItem}>
                <dt>Paiement / renouvellement</dt>
                <dd>En attente de vérification · fictif</dd>
              </div>
            </dl>

            <p className={styles.pendingNotice}>
              <Clock3 aria-hidden="true" size={16} />
              <span>
                Votre paiement est en cours de vérification. Votre compte sera réactivé après
                validation.
                <small>
                  Message illustratif uniquement : aucun paiement ni dossier n’est suivi ici.
                  Seule l’administration peut valider le renouvellement; une suspension
                  administrative indépendante reste en vigueur.
                </small>
              </span>
            </p>

            <div className={styles.suspensionActions}>
              <a className={styles.primaryAction} href="#forfaits">
                Consulter les forfaits et renouveler <ArrowRight aria-hidden="true" size={15} />
              </a>
              <a className={styles.secondaryAction} href="#historique-abonnements">
                Historique des abonnements et des paiements
              </a>
            </div>
          </section>

          <section className={styles.plansSection} id="forfaits" aria-labelledby="plans-title">
            <div className={styles.sectionHeading}>
              <div>
                <h2 id="plans-title">Forfaits et renouvellement</h2>
                <p>Durée mensuelle · données et disponibilité selon la configuration.</p>
              </div>
              <span>Prix de référence · aucun débit</span>
            </div>

            <div className={styles.planGrid}>
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <article
                    className={`${styles.planCard} ${isSelected ? styles.selectedPlanCard : ""}`}
                    key={plan.id}
                  >
                    <div className={styles.planHeading}>
                      <div>
                        <h3>{plan.name}</h3>
                        <p className={styles.planPrice}>
                          <strong>{amountLabel(plan.price)}</strong>
                          <span>/ mois</span>
                        </p>
                      </div>
                      <span className={styles.planTag}>Forfait · démo</span>
                    </div>
                    <p className={styles.planFeatures}>
                      Fonctions, avantages et disponibilité selon la configuration.
                    </p>
                    <button
                      aria-pressed={isSelected}
                      className={isSelected ? styles.selectedPlanButton : styles.planButton}
                      onClick={() => setSelectedPlan(plan.id)}
                      type="button"
                    >
                      {isSelected ? "Forfait sélectionné · aperçu" : `Choisir ${plan.name} · aperçu`}
                    </button>
                  </article>
                );
              })}
            </div>

            <p className={styles.freeMonthNote}>
              <span aria-hidden="true">i</span>
              <span>
                Chaque nouveau compte marchand bénéficie d’un premier mois gratuit, accordé une
                seule fois par compte marchand. À la fin de cette période, le renouvellement est
                payant au tarif mensuel du forfait choisi.
              </span>
            </p>

            {selectedPlanName && (
              <p className={styles.selectionNotice} role="status" aria-live="polite">
                <BadgeCheck aria-hidden="true" size={17} />
                <span>
                  {selectedPlanName} sélectionné pour cet aperçu local. Aucun abonnement ni
                  paiement n’a été lancé; l’écran 37 n’est pas inclus dans cette livraison.
                </span>
              </p>
            )}
          </section>

          <section
            className={styles.historySection}
            id="historique-abonnements"
            aria-labelledby="history-title"
          >
            <div className={styles.sectionHeading}>
              <div>
                <h2 id="history-title">Historique des abonnements et des paiements</h2>
                <p>Exemples fictifs · aucune ligne n’est liée à un compte réel.</p>
              </div>
              <History aria-hidden="true" className={styles.headingIcon} size={19} />
            </div>

            <div className={styles.historyHeader} aria-hidden="true">
              <span>Forfait</span>
              <span>Paiement</span>
              <span>Date / période</span>
              <span>Statut</span>
            </div>
            <ul className={styles.historyList}>
              {historyRows.map((row) => (
                <li className={styles.historyRow} key={row.id}>
                  <div>
                    <span className={styles.historyLabel}>Forfait</span>
                    <strong>{row.plan}</strong>
                  </div>
                  <div>
                    <span className={styles.historyLabel}>Paiement</span>
                    <strong>{row.payment}</strong>
                  </div>
                  <div>
                    <span className={styles.historyLabel}>Date / période</span>
                    <strong>{row.period}</strong>
                  </div>
                  <div>
                    <span className={styles.historyLabel}>Statut</span>
                    <span
                      className={`${styles.historyStatus} ${row.id === "pending" ? styles.statusPending : styles.statusRejected}`}
                    >
                      <span aria-hidden="true">●</span> {row.state}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className={styles.historyFootnote}>
              Les renouvellements ne prennent effet qu’après validation humaine par
              l’administration Delifast. Une preuve déposée seule ne réactive pas le compte.
            </p>
          </section>

          <p className={styles.disclaimer}>
            Aucune décision automatique, persistance, API, preuve réelle, téléversement, paiement
            ou appel externe n’est utilisé dans cette démonstration locale.
          </p>

          <nav className={styles.screenNavigation} aria-label="Navigation de l’écran commerçant">
            <Link href="/commercant">← Retour au tableau de bord commerçant</Link>
            <span>Écran 36 sur 53 · démonstration locale</span>
          </nav>
        </main>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  FileImage,
  Info,
  LayoutDashboard,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
  Store,
  CreditCard,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { HomeBrand } from "../../../../components/public-home/site-header";
import dashboard from "../../../client/client-dashboard.module.css";
import styles from "./subscription-payment.module.css";

type PlanId = "decouverte" | "professionnel";
type Operator = "orange" | "telmob";
type UssdFormat = "orange-standard" | "orange-alternative" | "telmob";

const plans: Array<{ id: PlanId; name: string; price: number; description: string }> = [
  {
    id: "decouverte",
    name: "Découverte",
    price: 3_000,
    description: "Forfait mensuel · tarif de référence",
  },
  {
    id: "professionnel",
    name: "Professionnel",
    price: 4_500,
    description: "Forfait mensuel · tarif de référence",
  },
];

const demoRecipient = "NUMERO_FICTIF_DELIFAST";
const demoReference = "TX-DEMO-37-0001 · fictive";

function formatAmount(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} F CFA`;
}

export function SubscriptionPaymentDemo({ initialPlan }: { initialPlan: PlanId }) {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(initialPlan);
  const [operator, setOperator] = useState<Operator>("orange");
  const [format, setFormat] = useState<UssdFormat>("orange-standard");
  const [interactionNote, setInteractionNote] = useState(
    "Choisissez un forfait, un opérateur ou un format pour actualiser uniquement cet aperçu fictif.",
  );
  const plan = plans.find((item) => item.id === selectedPlan) ?? plans[0];

  const ussdCode =
    format === "telmob"
      ? `*555*2*1*${demoRecipient}*${plan.price}#`
      : format === "orange-alternative"
        ? `*144*10*${demoRecipient}*${plan.price}#`
        : `*144*2*1*${demoRecipient}*${plan.price}#`;

  function choosePlan(nextPlan: PlanId) {
    setSelectedPlan(nextPlan);
    setInteractionNote(
      `Forfait ${plans.find((item) => item.id === nextPlan)?.name} choisi pour l’aperçu local. Aucun paiement n’a été effectué.`,
    );
  }

  function chooseOperator(nextOperator: Operator) {
    setOperator(nextOperator);
    setFormat(nextOperator === "orange" ? "orange-standard" : "telmob");
    setInteractionNote(
      `${nextOperator === "orange" ? "Orange Money" : "Telmob"} choisi dans la maquette. Aucun composeur n’a été ouvert et aucun paiement n’a été effectué.`,
    );
  }

  function chooseFormat(nextFormat: UssdFormat) {
    setFormat(nextFormat);
    setInteractionNote(
      `Aperçu du code fictif ${nextFormat === "telmob" ? "Telmob" : nextFormat === "orange-standard" ? "Orange Money · format 1" : "Orange Money · variante"}. Aucun composeur ni paiement réel.`,
    );
  }

  return (
    <div className={dashboard.shell}>
      <aside className={dashboard.sidebar} aria-label="Espace commerçant de démonstration">
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
            <Link href="/commercant/abonnement">Gestion de l’abonnement</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Paiement de l’abonnement</span>
          </nav>
          <div className={dashboard.topbarActions}>
            <div className={dashboard.searchMock} aria-label="Recherche désactivée dans cette maquette">
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
            <h1>Paiement de l’abonnement</h1>
            <p className={dashboard.intro}>
              Aperçu du règlement d’un abonnement au bénéfice de Delifast. Aucun paiement réel n’est effectué ici.
            </p>
          </div>

          <div className={styles.demoNotice} role="note">
            <span className={styles.noticeIcon} aria-hidden="true"><ShieldCheck size={17} /></span>
            <p>
              <strong>Écran 37 / 53 · démonstration locale uniquement</strong>
              <span>Montants, bénéficiaire, code, référence et justificatif sont fictifs. Rien n’est envoyé ni conservé.</span>
            </p>
            <span className={styles.demoTag}>Aucune opération réelle</span>
          </div>

          <div className={styles.summaryBar} aria-label="Résumé du forfait sélectionné">
            <div className={styles.summaryIcon} aria-hidden="true"><CreditCard size={19} /></div>
            <div className={styles.summaryCopy}>
              <span>Forfait sélectionné · exemple fictif</span>
              <strong>{plan.name} <i>·</i> {formatAmount(plan.price)} / mois</strong>
            </div>
            <div className={styles.summaryRecipient}>
              <span>Bénéficiaire du paiement</span>
              <strong>Delifast</strong>
            </div>
            <span className={styles.previewState}><Clock3 size={13} aria-hidden="true" /> Aperçu · non envoyé</span>
          </div>

          <section className={styles.planSection} aria-labelledby="plan-title">
            <div className={styles.sectionHeading}>
              <div>
                <h2 id="plan-title">Forfait à régler</h2>
                <p>Le tarif dépend du forfait choisi; durée : un mois.</p>
              </div>
              <span>Tarifs de référence · fictifs</span>
            </div>
            <div className={styles.planGrid} role="group" aria-label="Choisir un forfait pour l’aperçu">
              {plans.map((item) => {
                const selected = item.id === selectedPlan;
                return (
                  <button
                    aria-pressed={selected}
                    className={`${styles.planCard} ${selected ? styles.planCardSelected : ""}`}
                    key={item.id}
                    onClick={() => choosePlan(item.id)}
                    type="button"
                  >
                    <span className={styles.planCardTop}>
                      <span className={styles.planName}>{item.name}</span>
                      <span className={selected ? styles.radioSelected : styles.radio} aria-hidden="true">
                        {selected ? <Check size={12} /> : null}
                      </span>
                    </span>
                    <strong className={styles.planPrice}>{formatAmount(item.price)} <small>/ mois</small></strong>
                    <span className={styles.planDescription}>{item.description} · fictif</span>
                  </button>
                );
              })}
            </div>
            <p className={styles.freeMonthNote}>
              <Info size={15} aria-hidden="true" />
              <span>Un premier mois gratuit est accordé une seule fois à chaque nouveau compte marchand. Il ne concerne pas un renouvellement payant.</span>
            </p>
          </section>

          <div className={styles.paymentGrid}>
            <section className={styles.paymentPanel} aria-labelledby="pay-title">
              <div className={styles.panelHeading}>
                <div>
                  <h2 id="pay-title">Régler l’abonnement à Delifast</h2>
                  <p>Opérateurs proposés pour l’aperçu uniquement; en situation réelle, seuls les opérateurs actifs avec un numéro Delifast configuré seraient affichés.</p>
                </div>
                <span className={styles.panelStatus}><span aria-hidden="true">●</span> Exemple fictif</span>
              </div>

              <div className={styles.operatorChoices} role="group" aria-label="Choisir un opérateur pour l’aperçu">
                <button
                  aria-pressed={operator === "orange"}
                  className={operator === "orange" ? styles.operatorActive : styles.operator}
                  onClick={() => chooseOperator("orange")}
                  type="button"
                >
                  <span className={styles.operatorMark} aria-hidden="true">O</span>
                  <span><strong>Orange Money</strong><small>Destinataire : Delifast · fictif</small></span>
                  {operator === "orange" ? <Check className={styles.operatorCheck} size={16} aria-hidden="true" /> : null}
                </button>
                <button
                  aria-pressed={operator === "telmob"}
                  className={operator === "telmob" ? styles.operatorActive : styles.operator}
                  onClick={() => chooseOperator("telmob")}
                  type="button"
                >
                  <span className={`${styles.operatorMark} ${styles.telmobMark}`} aria-hidden="true">T</span>
                  <span><strong>Telmob</strong><small>Destinataire : Delifast · fictif</small></span>
                  {operator === "telmob" ? <Check className={styles.operatorCheck} size={16} aria-hidden="true" /> : null}
                </button>
              </div>

              <div className={styles.formatHeading}>
                <strong>Formats USSD de démonstration</strong>
                <span>Cliquer affiche uniquement un code non appelable.</span>
              </div>
              <div className={styles.formatChoices} role="group" aria-label="Choisir un format USSD fictif">
                {operator === "orange" ? (
                  <>
                    <button
                      aria-pressed={format === "orange-standard"}
                      className={format === "orange-standard" ? styles.formatActive : styles.formatButton}
                      onClick={() => chooseFormat("orange-standard")}
                      type="button"
                    >Orange Money · format 1</button>
                    <button
                      aria-pressed={format === "orange-alternative"}
                      className={format === "orange-alternative" ? styles.formatActive : styles.formatButton}
                      onClick={() => chooseFormat("orange-alternative")}
                      type="button"
                    >Orange Money · variante</button>
                  </>
                ) : (
                  <button
                    aria-pressed={format === "telmob"}
                    className={styles.formatActive}
                    onClick={() => chooseFormat("telmob")}
                    type="button"
                  >Afficher le code Telmob</button>
                )}
              </div>

              <div className={styles.codeCard} aria-live="polite">
                <div className={styles.codeLabel}><Smartphone size={14} aria-hidden="true" /> Code de démonstration · non appelable</div>
                <code>{ussdCode}</code>
                <div className={styles.codeDetails}>
                  <span>Bénéficiaire fictif <strong>{demoRecipient}</strong></span>
                  <span>Montant de l’exemple <strong>{formatAmount(plan.price)}</strong></span>
                </div>
              </div>
              <p className={styles.interactionNote} role="status" aria-live="polite">{interactionNote}</p>
              <p className={styles.futureNote}>
                <LockKeyhole size={14} aria-hidden="true" />
                <span>Aucun composeur ne s’ouvre. Dans le parcours réel, seul un numéro Delifast configuré côté serveur serait utilisé; le payeur effectue et confirme lui-même son paiement.</span>
              </p>
            </section>

            <aside className={styles.proofPanel} aria-labelledby="proof-title">
              <div className={styles.panelHeading}>
                <div>
                  <h2 id="proof-title">Référence et preuve</h2>
                  <p>Exemples illustratifs · aucune soumission réelle</p>
                </div>
                <span className={styles.notSentTag}>Non envoyé</span>
              </div>

              <label className={styles.fieldLabel} htmlFor="demo-reference">Référence de transaction · fictive</label>
              <input
                autoComplete="off"
                className={styles.referenceInput}
                id="demo-reference"
                readOnly
                value={demoReference}
              />
              <small className={styles.fieldHint}>Cette référence est un exemple; elle ne correspond à aucune transaction.</small>

              <div className={styles.proofHeading}>
                <FileImage size={15} aria-hidden="true" />
                <strong>Capture SMS de démonstration</strong>
                <span>fictive</span>
              </div>
              <div className={styles.smsPreview} aria-label="Illustration fictive d’une preuve SMS, aucune transaction réelle">
                <span className={styles.smsLabel}>EXEMPLE FICTIF · AUCUN PAIEMENT</span>
                <strong>DEMO · Delifast</strong>
                <p>Capture de confirmation Mobile Money illustrative. Aucun SMS réel ni fichier image n’est utilisé.</p>
                <span className={styles.smsRef}>Réf. {demoReference}</span>
              </div>

              <button className={styles.disabledAction} disabled type="button">
                <FileImage size={15} aria-hidden="true" /> Ajouter une capture · indisponible
              </button>
              <small className={styles.fieldHint}>La sélection et le téléversement de fichiers sont désactivés dans cette démo locale.</small>

              <div className={styles.submitRow}>
                <span>À transmettre à l’administration Delifast</span>
                <strong>{formatAmount(plan.price)} · fictif</strong>
              </div>
              <button className={styles.submitButton} disabled type="button">Envoyer la preuve · désactivé</button>
              <p className={styles.adminNote}>
                La preuve réelle et sa référence resteraient en attente jusqu’à la vérification humaine par l’administration, qui compare les informations au SMS reçu sur le numéro Delifast.
              </p>
            </aside>
          </div>

          <section className={styles.pendingNotice} aria-label="Règle de validation de l’abonnement">
            <span className={styles.pendingIcon} aria-hidden="true"><AlertTriangle size={17} /></span>
            <div>
              <strong>Validation administrative requise</strong>
              <p>Un clic, une capture ou une preuve déposée ne confirme jamais un paiement et ne réactive pas un compte. Seule une validation réelle par l’administration peut activer ou réactiver l’abonnement; une suspension administrative indépendante reste en vigueur.</p>
            </div>
          </section>

          <ol className={styles.steps} aria-label="Parcours réel prévu, non exécuté dans cette démonstration">
            <li><span>1</span><div><strong>Le commerçant effectue et confirme lui-même le paiement</strong><small>Hors de cette maquette; aucun code n’est appelé ici.</small></div></li>
            <li><span>2</span><div><strong>La référence et la capture sont transmises à Delifast</strong><small>Les champs ci-dessus sont uniquement illustratifs; rien n’est téléversé.</small></div></li>
            <li><span>3</span><div><strong>L’administration vérifie manuellement le SMS reçu</strong><small>Elle seule valide ou refuse; un refus réel exige un motif et permet une nouvelle preuve.</small></div></li>
          </ol>

          <section className={styles.outcomeSection} aria-labelledby="outcomes-title">
            <div className={styles.outcomeHeading}>
              <h2 id="outcomes-title">Issues possibles · explications fictives</h2>
              <span>Aucun statut réel n’est affiché ou modifié ici</span>
            </div>
            <div className={styles.outcomeGrid}>
              <article className={styles.outcomeCard}>
                <strong>En attente · après transmission réelle</strong>
                <p>Le paiement doit encore être vérifié par l’administration; une preuve seule ne réactive pas le compte.</p>
              </article>
              <article className={styles.outcomeCard}>
                <strong>Refusé · motif requis</strong>
                <p>En cas de refus réel, l’administration indique le motif; le commerçant peut refaire une transaction et transmettre une nouvelle preuve.</p>
              </article>
              <article className={styles.outcomeCard}>
                <strong>Validé · décision administrative réelle</strong>
                <p>Seule cette décision peut activer l’abonnement; la démo ne valide rien et ne réactive aucun compte.</p>
              </article>
            </div>
          </section>

          <p className={styles.disclaimer}>
            Démonstration locale uniquement : aucune donnée n’est persistée; aucun backend, API, paiement, téléversement, notification, SMS, USSD appelable ou lien tel: n’est utilisé.
          </p>
          <nav className={styles.screenNavigation} aria-label="Navigation de l’écran abonnement">
            <Link href="/commercant/abonnement"><ArrowLeft size={15} aria-hidden="true" /> Retour à la gestion de l’abonnement · écran 36</Link>
            <span>Écran 37 sur 53 · démonstration locale</span>
            <Link href="/commercant">Tableau de bord commerçant <ArrowRight size={15} aria-hidden="true" /></Link>
          </nav>
        </main>
      </div>
    </div>
  );
}

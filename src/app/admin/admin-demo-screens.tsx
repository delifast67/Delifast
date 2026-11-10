"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  CreditCard,
  History,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Store,
  Utensils,
  Users,
} from "lucide-react";
import {
  demoListPages,
  demoSimpleDetails,
  type DemoListPage,
  type DemoListRow,
  type DemoSimpleDetail,
} from "./admin-demo-screen-data";
import styles from "./admin-demo-screens.module.css";

type NavigationEntry = {
  label: string;
  href: string;
  section: string;
  icon: LucideIcon;
};

const navigation: NavigationEntry[] = [
  { label: "Utilisateurs", href: "/admin/utilisateurs", section: "utilisateurs", icon: Users },
  { label: "Commerçants", href: "/admin/commercants", section: "commercants", icon: Store },
  { label: "Restaurants", href: "/admin/restaurants", section: "restaurants", icon: Utensils },
  { label: "Commandes", href: "/admin/commandes", section: "commandes", icon: ClipboardList },
  { label: "Gestion des abonnements", href: "/admin/abonnements", section: "abonnements", icon: BadgeCheck },
  { label: "Paiements", href: "/admin/paiements", section: "paiements", icon: CreditCard },
];

function AdminShell({
  screen,
  section,
  title,
  searchValue,
  onSearch,
  children,
}: {
  screen: number;
  section: string;
  title: string;
  searchValue?: string;
  onSearch?: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div className={styles.frame} data-testid={`admin-demo-screen-${screen}`} data-screen={screen}>
      <aside className={styles.sidebar} aria-label="Navigation de la démonstration d’administration">
        <Link className={styles.brand} href="/admin/tableau-de-bord" aria-label="Delifast — tableau de bord de démonstration">
          <span className={styles.brandMark} aria-hidden="true"><span /></span>
          <span className={styles.brandName}>DELI<span>FAST</span></span>
        </Link>
        <p className={styles.sidebarLabel}>Espace administration</p>
        <nav className={styles.navigation} aria-label="Rubriques de démonstration">
          <Link
            className={styles.navItem}
            href="/admin/tableau-de-bord"
          >
            <LayoutDashboard size={15} aria-hidden="true" />
            <span>Général</span>
          </Link>
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = item.section === section;
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`${styles.navItem} ${active ? styles.navActive : ""}`}
                href={item.href}
                key={item.section}
              >
                <Icon size={15} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className={styles.sidebarFoot}>
          <span className={styles.footDot} aria-hidden="true" />
          <span>Mode démonstration</span>
          <p>Aucune donnée réelle · aucune session</p>
          <div className={styles.systemLinks}>
            <Link href="/admin/erreur">Écran système · erreur</Link>
            <Link href="/admin/page-introuvable">Écran système · 404</Link>
          </div>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <nav className={styles.breadcrumb} aria-label="Fil d’Ariane">
            <Link href="/">Delifast</Link>
            <span aria-hidden="true">/</span>
            <Link href="/admin/tableau-de-bord">Administration</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className={styles.currentCrumb}>{title}</span>
          </nav>
          <div className={styles.topActions}>
            <label className={styles.searchBox}>
              <Search size={14} aria-hidden="true" />
              <span className={styles.visuallyHidden}>Rechercher dans les exemples fictifs</span>
              <input
                aria-label="Rechercher dans les exemples fictifs"
                disabled={!onSearch}
                onChange={(event) => onSearch?.(event.currentTarget.value)}
                placeholder="Rechercher"
                type="search"
                value={searchValue ?? ""}
              />
            </label>
            <span className={styles.avatar} aria-label="Profil fictif de démonstration">DF</span>
          </div>
        </header>
        <main className={styles.content} id="contenu-principal">{children}</main>
      </div>
    </div>
  );
}

function PageHeading({ screen, title, description }: { screen: number; title: string; description: string }) {
  return (
    <div className={styles.pageHeading}>
      <p className={styles.eyebrow}>Administration · Démonstration · Écran {screen}</p>
      <h1>{title}</h1>
      <p className={styles.subtitle}>{description}</p>
    </div>
  );
}

function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.demoNotice} role="note">
      <CircleAlert size={15} aria-hidden="true" />
      <p>
        <strong>Démonstration locale uniquement.</strong>{" "}
        {children ?? "Toutes les personnes, références, dates et sommes d’exemple sont fictives. Aucune authentification réelle, API, transmission ou sauvegarde."}
      </p>
    </div>
  );
}

function StatusBadge({ children }: { children: string }) {
  const normalized = children.toLocaleLowerCase("fr-FR");
  const tone = normalized.includes("validé") || normalized.includes("actif") || normalized.includes("visible") || normalized.includes("terminée")
    ? styles.statusPositive
    : normalized.includes("attente") || normalized.includes("examiner") || normalized.includes("en cours")
      ? styles.statusPending
      : normalized.includes("refus")
        ? styles.statusNegative
        : styles.statusNeutral;
  return <span className={`${styles.statusBadge} ${tone}`}>{children}</span>;
}

function filterMatches(page: DemoListPage, row: DemoListRow, index: number, filter: string) {
  if (filter === "Tous") return true;
  if (filter === "Récents") return index < 2;
  const text = row.cells.join(" ").toLocaleLowerCase("fr-FR");
  if (filter === "En attente") return /en attente|à examiner|annulation en cours/i.test(text);
  if (filter === "Validés") return /validé/i.test(text);
  if (filter === "Refusés") return /refusé/i.test(text);
  return text.includes(filter.toLocaleLowerCase("fr-FR"));
}

function DemoListScreen({ page }: { page: DemoListPage }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(page.filters[0] ?? "Tous");
  const normalizedQuery = query.trim().toLocaleLowerCase("fr-FR");
  const rows = page.rows.filter((row, index) => {
    const matchesQuery = !normalizedQuery || row.cells.join(" ").toLocaleLowerCase("fr-FR").includes(normalizedQuery);
    return matchesQuery && filterMatches(page, row, index, filter);
  });
  const sectionName = page.section.toLocaleLowerCase("fr-FR");

  return (
    <AdminShell
      onSearch={setQuery}
      screen={page.screen}
      searchValue={query}
      section={Object.keys(demoListPages).find((key) => demoListPages[key].screen === page.screen) ?? ""}
      title={page.title}
    >
      <PageHeading screen={page.screen} title={page.title} description={page.description} />
      <DemoNotice>
        Les valeurs affichées sont fictives et filtrées uniquement dans cette page. Rien n’est envoyé ou conservé; aucun compte réel n’est consulté.
      </DemoNotice>

      <section className={styles.listPanel} aria-label={`Éléments de démonstration : ${sectionName}`}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Éléments · {sectionName}</h2>
            <p>{page.rows.length} lignes de démonstration</p>
          </div>
          <span className={styles.demoBadge}><span aria-hidden="true" /> Données fictives</span>
        </div>

        <div className={styles.listTools}>
          <label className={styles.listSearch}>
            <Search size={15} aria-hidden="true" />
            <span className={styles.visuallyHidden}>Rechercher dans cette liste fictive</span>
            <input
              aria-label="Rechercher dans cette liste fictive"
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Rechercher..."
              type="search"
              value={query}
            />
          </label>
          <div className={styles.filterList} aria-label="Filtres locaux">
            {page.filters.map((item) => (
              <button
                aria-pressed={filter === item}
                className={`${styles.filterButton} ${filter === item ? styles.filterActive : ""}`}
                key={item}
                onClick={() => setFilter(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tableScroll} role="region" aria-label={`Tableau ${sectionName} — défilement horizontal sur petit écran`} tabIndex={0}>
          <table className={styles.dataTable}>
            <caption className={styles.visuallyHidden}>{page.title} — données fictives</caption>
            <thead><tr>{page.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
            <tbody>
              {rows.map((row) => {
                const linkColumn = row.cells[row.cells.length - 1] === "Ouvrir" ? row.cells.length - 1 : 0;
                return (
                  <tr key={row.id}>
                    {row.cells.map((cell, cellIndex) => (
                      <td key={`${row.id}-${cellIndex}`}>
                        {cellIndex === page.statusColumn ? <StatusBadge>{cell}</StatusBadge> : null}
                        {cellIndex !== page.statusColumn && row.href && cellIndex === linkColumn ? (
                          <Link className={styles.cellLink} href={row.href}>{cell}<ArrowRight size={13} aria-hidden="true" /></Link>
                        ) : null}
                        {cellIndex !== page.statusColumn && !(row.href && cellIndex === linkColumn) ? cell : null}
                      </td>
                    ))}
                  </tr>
                );
              })}
              {rows.length === 0 ? (
                <tr><td className={styles.emptyCell} colSpan={page.columns.length}>Aucun résultat dans cet aperçu fictif.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className={styles.tableFooter}>
          <span aria-live="polite">{rows.length} élément{rows.length === 1 ? "" : "s"} affiché{rows.length === 1 ? "" : "s"} · données fictives</span>
          <span>Recherche et filtres temporaires · aucune persistance</span>
        </div>
      </section>

      {page.screen === 48 ? (
        <div className={styles.infoStrip}>
          Paiements de commande : bénéficiaire restaurant. Abonnements : bénéficiaire Delifast. Preuves et références ci-dessus entièrement fictives.
          <Link href="/admin/abonnements/sub-demo-0001">Examiner un abonnement · aperçu <ArrowRight size={13} aria-hidden="true" /></Link>
        </div>
      ) : null}
      {page.screen === 50 ? (
        <div className={styles.infoStrip}>
          Pour les commandes, l’administration supervise sans remplacer la décision du restaurant. Pour les abonnements dus à Delifast, voir l’écran 49.
          <Link href="/admin/paiements/pay-demo-0001">Consulter le détail · aperçu <ArrowRight size={13} aria-hidden="true" /></Link>
        </div>
      ) : null}
    </AdminShell>
  );
}

function HistoryPanel({ items }: { items: DemoSimpleDetail["history"] }) {
  return (
    <section className={styles.panel} aria-labelledby="history-title">
      <div className={styles.panelHeader}>
        <h2 id="history-title"><History size={15} aria-hidden="true" /> Historique</h2>
        <span className={styles.panelHint}>Fictif · démonstration</span>
      </div>
      <ol className={styles.timeline}>
        {items.map((item, index) => (
          <li className={styles.timelineItem} key={`${item.title}-${index}`}>
            <span className={styles.timelineDot} aria-hidden="true" />
            <div><strong>{item.title}</strong><p>{item.detail}</p></div>
            {item.tag ? <span className={styles.demoBadge}>{item.tag}</span> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

function SimpleDetailScreen({ detail }: { detail: DemoSimpleDetail }) {
  return (
    <AdminShell screen={detail.screen} section={detail.section} title={detail.title}>
      <PageHeading screen={detail.screen} title={detail.title} description={detail.description} />
      <DemoNotice>Fiche et historique fictifs. Consultation uniquement : aucune modification, suppression ou transmission n’est disponible dans cette maquette.</DemoNotice>
      <div className={styles.detailLayout}>
        <div className={styles.detailMain}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Informations</h2>
              <span className={styles.demoBadge}><span aria-hidden="true" /> Démo</span>
            </div>
            {detail.status ? <div className={styles.statusLine}><StatusBadge>{detail.status}</StatusBadge></div> : null}
            <dl className={styles.infoList}>
              {detail.fields.map((field) => (
                <div className={styles.infoRow} key={field.label}>
                  <dt>{field.label}</dt><dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          </section>
          <HistoryPanel items={detail.history} />
        </div>
        <aside className={styles.panel}>
          <div className={styles.panelHeader}><h2>Actions disponibles</h2><span className={styles.panelHint}>Navigation uniquement</span></div>
          <p className={styles.panelCopy}>Aucune modification n’est transmise depuis cette maquette.</p>
          <Link className={styles.primaryLink} href={`/admin/${detail.section}`}><ArrowLeft size={15} aria-hidden="true" /> Retour à la liste</Link>
          <p className={styles.smallNote}>Aucune donnée réelle · aucune session · rien n’est enregistré.</p>
        </aside>
      </div>
    </AdminShell>
  );
}

function OrderDetailScreen() {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  function previewRejection() {
    if (!reason.trim()) {
      setFeedback("Aperçu local : un motif est requis pour présenter un rejet. Aucun motif ne sera enregistré ou transmis.");
      return;
    }
    setFeedback("Aperçu local seulement : le motif reste dans cette page et n’est ni envoyé au commerçant ni enregistré.");
  }

  return (
    <AdminShell screen={47} section="commandes" title="Détail d’une commande">
      <PageHeading screen={47} title="Détail d’une commande" description="Vérifiez le remboursement de commande, consignez un motif de rejet et examinez toute preuve corrigée." />
      <DemoNotice>Commande, montants et preuves fictifs. Aucun remboursement, notification, dépôt, upload ou décision réelle n’est effectué; rien n’est sauvegardé.</DemoNotice>

      <section className={styles.orderHero} aria-label="Commande de démonstration">
        <div>
          <p className={styles.eyebrow}>Commande · exemple fictif</p>
          <h2>#DF-24018 <StatusBadge>Annulation en cours</StatusBadge></h2>
          <p>Aminata Démo · Saveurs du Faso · date fictive</p>
        </div>
        <div className={styles.orderTotal}><span>Total effectivement payé</span><strong>10 000 FCFA · fictif</strong></div>
      </section>

      <div className={styles.detailLayout}>
        <div className={styles.detailMain}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Résumé de la commande</h2><span className={styles.panelHint}>Instantané fictif</span></div>
            <dl className={styles.infoList}>
              <div className={styles.infoRow}><dt>Sous-total des articles</dt><dd>Montant fictif · détail non spécifié</dd></div>
              <div className={styles.infoRow}><dt>Frais éventuels</dt><dd>Exemple fictif · non spécifié</dd></div>
              <div className={styles.infoRow}><dt>Total effectivement payé</dt><dd>10 000 FCFA · fictif</dd></div>
              <div className={styles.infoRow}><dt>Client / commerce</dt><dd>Aminata Démo · Saveurs du Faso</dd></div>
            </dl>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Articles et composition historique</h2><span className={styles.demoBadge}>Exemple</span></div>
            <ul className={styles.lineItems}>
              <li><span>Poulet braisé × 1</span><small>Prix et options · fictifs, non spécifiés</small></li>
              <li><span>Menu du jour × 1</span><small>Composition et options · fictives, non spécifiées</small></li>
            </ul>
            <div className={styles.compareGrid}>
              <div><span>Composition conservée</span><strong>Instantané historique · démo</strong></div>
              <div><span>Nouvelle composition proposée</span><strong>Proposition fictive · à examiner</strong></div>
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Annulation et remboursement</h2><StatusBadge>En attente de régularisation</StatusBadge></div>
            <div className={styles.statusTiles}>
              <div><span>Après un refus</span><strong>Arrêt de préparation · événement démo</strong><small>Annulation et remboursement présentés à titre fictif.</small></div>
              <div><span>Annulation totale</span><strong>Exemple de démonstration</strong><small>Aucune opération n’est déclenchée.</small></div>
              <div><span>Annulation partielle</span><strong>Périmètre fictif</strong><small>État illustratif uniquement.</small></div>
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Vérification par Delifast</h2><StatusBadge>Preuve à vérifier · fictif</StatusBadge></div>
            <div className={styles.proofBox}>
              <FileTextIcon />
              <div><strong>Preuve reçue · aperçu fictif</strong><p>PREUVE-DEMO-0002 · aucun fichier réel · capture non consultable</p></div>
              <span className={styles.disabledAction}>Aucun upload</span>
            </div>
            <label className={styles.fieldLabel} htmlFor="order-rejection-reason">Motif de rejet · obligatoire en démo</label>
            <textarea id="order-rejection-reason" className={styles.textarea} onChange={(event) => setReason(event.currentTarget.value)} placeholder="Exemple fictif — motif non transmis" value={reason} />
            <button className={styles.secondaryButton} onClick={previewRejection} type="button">Prévisualiser le rejet · démo</button>
            <p className={styles.smallNote}>Les dépôts et décisions sont append-only dans les règles métier; ce formulaire ne crée aucune entrée réelle.</p>
            {feedback ? <p className={styles.feedback} role="status" aria-live="polite">{feedback}</p> : null}
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Après renvoi d’une preuve corrigée</h2><StatusBadge>À examiner · exemple fictif</StatusBadge></div>
            <div className={styles.proofBox}>
              <FileTextIcon />
              <div><strong>Nouvelle preuve distincte</strong><p>Identifiant fictif non fourni · aucun fichier réel n’est joint.</p></div>
              <span className={styles.disabledAction}>Téléversement indisponible</span>
            </div>
            <p className={styles.smallNote}>Seul l’administrateur vérifie la preuve corrigée; les renvois ne sont ni limités ni expirés par cette maquette.</p>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Réservation de stock · exemple distinct</h2><StatusBadge>Réservation active · fictif</StatusBadge></div>
            <dl className={styles.infoList}>
              <div className={styles.infoRow}><dt>Article réservé</dt><dd>Poulet braisé × 1 · fictif</dd></div>
              <div className={styles.infoRow}><dt>Consommation du stock</dt><dd>Après validation manuelle du paiement</dd></div>
            </dl>
            <button className={styles.secondaryButton} onClick={() => setFeedback("Aperçu local : aucune réservation de stock n’a été modifiée ou libérée.")} type="button">Prévisualiser la libération · démo</button>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Historique de commande</h2><span className={styles.panelHint}>Append-only · événements fictifs</span></div>
            <ol className={styles.timeline}>
              <li className={styles.timelineItem}><span className={styles.timelineDot} /><div><strong>Commande reçue</strong><p>Événement de démonstration · heure fictive</p></div></li>
              <li className={styles.timelineItem}><span className={styles.timelineDot} /><div><strong>Annulation en cours</strong><p>Référence d’événement fictive · aucune notification réelle</p></div></li>
              <li className={styles.timelineItem}><span className={styles.timelineDot} /><div><strong>Remboursement à régulariser</strong><p>État d’exemple · aucune décision enregistrée</p></div></li>
            </ol>
          </section>
        </div>

        <aside className={styles.detailSide}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Règles illustrées</h2><ShieldCheck size={16} aria-hidden="true" /></div>
            <ul className={styles.ruleList}>
              <li>Le refus d’une preuve exige un motif.</li>
              <li>Une preuve corrigée reste à examiner par l’administration.</li>
              <li>Les événements métier sont append-only selon le cahier.</li>
              <li>Aucune action n’est transmise depuis cet aperçu.</li>
            </ul>
          </section>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Navigation</h2></div>
            <Link className={styles.primaryLink} href="/admin/commandes"><ArrowLeft size={15} aria-hidden="true" /> Retour aux commandes</Link>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}

function FileTextIcon() {
  return <span className={styles.fileIcon} aria-hidden="true">DOC</span>;
}

function SubscriptionDetailScreen() {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  function previewDecision(kind: "validation" | "refus") {
    if (kind === "refus" && !reason.trim()) {
      setFeedback("Aperçu local : le motif est obligatoire pour présenter un refus. Aucun motif n’est enregistré.");
      return;
    }
    setFeedback(kind === "validation"
      ? "Aperçu local : aucune approbation n’est enregistrée; le statut reste En attente."
      : "Aperçu local : aucun refus ni notification n’est transmis; le statut reste En attente.");
  }

  return (
    <AdminShell screen={49} section="abonnements" title="Vérification d’un abonnement">
      <PageHeading screen={49} title="Vérification d’un abonnement" description="Comparez le montant mensuel et la preuve au SMS réellement reçu par Delifast." />
      <DemoNotice>Référence, commerçant, preuve, numéro et dates ci-dessous fictifs. La vérification n’accède à aucun SMS ni à aucun fichier réel.</DemoNotice>

      <div className={styles.detailLayout}>
        <div className={styles.detailMain}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Abonnement SUB-DEMO-0001</h2><StatusBadge>En attente · fictif</StatusBadge></div>
            <dl className={styles.infoList}>
              <div className={styles.infoRow}><dt>Type</dt><dd>Abonnement restaurant · fictif</dd></div>
              <div className={styles.infoRow}><dt>Commerçant</dt><dd>Commerçant Démo · fictif</dd></div>
              <div className={styles.infoRow}><dt>Restaurant</dt><dd>Restaurant Démo · fictif</dd></div>
              <div className={styles.infoRow}><dt>Formule</dt><dd>Découverte · exemple fictif</dd></div>
              <div className={styles.infoRow}><dt>Montant attendu</dt><dd>3 000 FCFA / mois · tarif de référence</dd></div>
              <div className={styles.infoRow}><dt>Opérateur</dt><dd>Orange Money · démonstration</dd></div>
              <div className={styles.infoRow}><dt>Bénéficiaire Delifast</dt><dd>+226 XX XX XX XX · numéro masqué fictif</dd></div>
              <div className={styles.infoRow}><dt>Référence transaction</dt><dd>TXN-DEMO-0002 · fictif</dd></div>
              <div className={styles.infoRow}><dt>Date de soumission</dt><dd>Date fictive</dd></div>
            </dl>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Capture du SMS de confirmation</h2><span className={styles.panelHint}>Fichier privé · démonstration</span></div>
            <div className={styles.proofBox}>
              <FileTextIcon />
              <div><strong>Capture fictive · non consultable</strong><p>PREUVE-DEMO-0002 · aucun fichier réel</p></div>
              <button className={styles.disabledAction} disabled type="button">Agrandir la capture · désactivé</button>
            </div>
            <p className={styles.smallNote}>Le bénéficiaire compare la référence et les détails au SMS reçu sur son numéro Mobile Money. Cette page n’ouvre aucun SMS.</p>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Historique des soumissions</h2><span className={styles.panelHint}>Append-only · données fictives</span></div>
            <ol className={styles.timeline}>
              <li className={styles.timelineItem}><span className={styles.timelineDot} /><div><strong>Soumission 1 · Refusé · fictif</strong><p>PAY-DEMO-0001 · TXN-DEMO-0001 · motif « référence non rapprochée » · vérificateur Administrateur Démo · PREUVE-DEMO-0001</p></div></li>
              <li className={styles.timelineItem}><span className={styles.timelineDot} /><div><strong>Soumission 2 · En attente · fictif</strong><p>TXN-DEMO-0002 · nouvelle preuve distincte · PREUVE-DEMO-0002 · vérificateur et date de décision à renseigner</p></div></li>
            </ol>
            <div className={styles.referenceGrid}>
              <span>Identifiant paiement <strong>PAY-DEMO-0001 · fictif</strong></span>
              <span>Numéro de soumission <strong>2 · exemple fictif</strong></span>
              <span>Chemin fichier <strong>PREUVE-DEMO-0002 · fictif</strong></span>
            </div>
          </section>
        </div>

        <aside className={styles.detailSide}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Vérifier le bon circuit</h2><ShieldCheck size={16} aria-hidden="true" /></div>
            <p className={styles.panelCopy}>Le bénéficiaire est Delifast. L’administrateur compare la preuve au SMS réellement reçu sur le numéro Delifast et décide. Aucun autre rôle ne se substitue au bénéficiaire.</p>
            <ul className={styles.ruleList}>
              <li>Découverte : 3 000 F CFA par mois.</li>
              <li>Professionnel : 4 500 F CFA par mois.</li>
              <li>Premier mois gratuit une seule fois par compte marchand.</li>
              <li>Renouvellement mensuel payant après approbation administrative.</li>
              <li>Après expiration : délai de grâce de 72 heures, puis suspension sans renouvellement validé.</li>
              <li>Seule la validation administrative réactive un compte suspendu pour non-paiement; une suspension administrative indépendante demeure.</li>
            </ul>
            <p className={styles.smallNote}>Les tarifs et règles sont présentés comme règles métier; la transaction affichée reste fictive.</p>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Décision réservée à l’administration</h2><span className={styles.demoBadge}>Aperçu</span></div>
            <label className={styles.fieldLabel} htmlFor="subscription-reason">Motif requis en cas de refus</label>
            <textarea className={styles.textarea} id="subscription-reason" onChange={(event) => setReason(event.currentTarget.value)} placeholder="Exemple fictif — aucun motif n’est enregistré" value={reason} />
            <div className={styles.actionStack}>
              <button className={styles.primaryButton} onClick={() => previewDecision("validation")} type="button"><CheckCircle2 size={15} aria-hidden="true" /> Valider après vérification</button>
              <button className={styles.secondaryButton} onClick={() => previewDecision("refus")} type="button">Refuser avec un motif</button>
            </div>
            <p className={styles.smallNote}>Ces commandes ne changent pas le statut, n’envoient aucune notification et ne sauvegardent aucune décision.</p>
            {feedback ? <p className={styles.feedback} role="status" aria-live="polite">{feedback}</p> : null}
            <Link className={styles.textLink} href="/admin/abonnements"><ArrowLeft size={14} aria-hidden="true" /> Retour aux abonnements · aperçu</Link>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}

function PaymentDetailScreen() {
  return (
    <AdminShell screen={51} section="paiements" title="Détail d’un paiement">
      <PageHeading screen={51} title="Détail d’un paiement" description="Consultez les informations, la preuve et l’historique sans remplacer la décision du restaurant sur les commandes." />
      <DemoNotice>Paiement, client, montants, dates, référence et justificatifs fictifs. Aucune preuve réelle n’est accessible et aucune décision n’est transmise.</DemoNotice>

      <div className={styles.detailLayout}>
        <div className={styles.detailMain}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Paiement PAY-DEMO-0001</h2><StatusBadge>En attente · fictif</StatusBadge></div>
            <dl className={styles.infoList}>
              <div className={styles.infoRow}><dt>Type</dt><dd>Paiement de commande · fictif</dd></div>
              <div className={styles.infoRow}><dt>Restaurant bénéficiaire</dt><dd>Restaurant Démo · fictif</dd></div>
              <div className={styles.infoRow}><dt>Commerçant concerné</dt><dd>Commerçant Démo · fictif</dd></div>
              <div className={styles.infoRow}><dt>Commande ou abonnement associé</dt><dd>CMD-DEMO-0001 · commande fictive</dd></div>
              <div className={styles.infoRow}><dt>Client</dt><dd>Client Démo · fictif</dd></div>
              <div className={styles.infoRow}><dt>Montant attendu</dt><dd>9 500 FCFA · fictif</dd></div>
              <div className={styles.infoRow}><dt>Opérateur</dt><dd>Orange Money · démo fictive</dd></div>
              <div className={styles.infoRow}><dt>Numéro bénéficiaire historique</dt><dd>+226 70 XX XX XX · fictif</dd></div>
              <div className={styles.infoRow}><dt>Référence de transaction</dt><dd>TXN-DEMO-0002 · fictif</dd></div>
              <div className={styles.infoRow}><dt>Date de soumission</dt><dd>Date fictive</dd></div>
              <div className={styles.infoRow}><dt>Statut</dt><dd><StatusBadge>En attente · fictif</StatusBadge></dd></div>
            </dl>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Capture du SMS de confirmation</h2><span className={styles.panelHint}>Fichier privé · démonstration</span></div>
            <div className={styles.proofBox}>
              <FileTextIcon />
              <div><strong>Capture fictive · non consultable</strong><p>PREUVE-DEMO-0002 · aucun fichier réel</p></div>
              <button className={styles.disabledAction} disabled type="button">Agrandir la capture · désactivé</button>
            </div>
            <p className={styles.smallNote}>Dans un vrai circuit, le bénéficiaire compare la référence et les détails au SMS reçu sur son numéro Mobile Money. Aucun SMS n’est ouvert ici.</p>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Historique des soumissions</h2><span className={styles.panelHint}>Append-only · données fictives</span></div>
            <ol className={styles.timeline}>
              <li className={styles.timelineItem}><span className={styles.timelineDot} /><div><strong>Soumission 1 · Refusé · fictif</strong><p>PAY-DEMO-0001 · TXN-DEMO-0001 · motif obligatoire fictif « référence non rapprochée » · vérificateur Restaurant bénéficiaire · PREUVE-DEMO-0001</p></div></li>
              <li className={styles.timelineItem}><span className={styles.timelineDot} /><div><strong>Soumission 2 · En attente · fictif</strong><p>TXN-DEMO-0002 · nouvelle preuve distincte · chemin PREUVE-DEMO-0002 · vérificateur et date de décision à renseigner</p></div></li>
            </ol>
            <div className={styles.referenceGrid}>
              <span>Identifiant du paiement <strong>PAY-DEMO-0001 · fictif</strong></span>
              <span>Numéro de soumission <strong>2 · exemple fictif</strong></span>
              <span>Chemin du fichier <strong>PREUVE-DEMO-0002 · fictif</strong></span>
            </div>
          </section>
        </div>

        <aside className={styles.detailSide}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Vérifier le bon circuit</h2><ShieldCheck size={16} aria-hidden="true" /></div>
            <p className={styles.panelCopy}>Le bénéficiaire est le restaurant choisi. Seul ce restaurant compare la preuve au SMS reçu sur son numéro et prend la décision; aucun autre rôle ne s’y substitue.</p>
            <div className={styles.ruleList}>
              <p><StatusBadge>En attente</StatusBadge> · valeur d’exemple</p>
              <p><StatusBadge>Validé</StatusBadge> · valeur d’exemple</p>
              <p><StatusBadge>Refusé · motif obligatoire</StatusBadge></p>
              <p>Justificatif manquant · état illustratif</p>
            </div>
          </section>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Accès d’administration · supervision</h2><span className={styles.demoBadge}>Lecture seule</span></div>
            <p className={styles.panelCopy}>Pour un paiement de commande, l’administration consulte sans remplacer la décision du restaurant. Pour un abonnement destiné à Delifast, la décision administrative est présentée à l’écran 49.</p>
            <nav className={styles.relatedLinks} aria-label="Autres aperçus de démonstration">
              <Link href="/admin/commandes">Voir les commandes · aperçu <ArrowRight size={13} aria-hidden="true" /></Link>
              <Link href="/admin/abonnements">Voir les abonnements · aperçu <ArrowRight size={13} aria-hidden="true" /></Link>
              <Link href="/admin/commercants">Voir les commerçants · aperçu <ArrowRight size={13} aria-hidden="true" /></Link>
              <Link href="/admin/paiements">Retour à la liste · aperçu <ArrowRight size={13} aria-hidden="true" /></Link>
            </nav>
            <p className={styles.smallNote}>Ces listes sont d’autres exemples fictifs; aucun lien n’effectue de décision ou d’opération.</p>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}

function DemoErrorPage() {
  const [message, setMessage] = useState("");
  return (
    <main className={styles.systemPage} data-testid="admin-demo-screen-52" data-screen="52">
      <section className={styles.systemCard}>
        <span className={styles.errorIcon} aria-hidden="true"><CircleAlert size={27} /></span>
        <p className={styles.systemEyebrow}>Un problème est survenu</p>
        <h1>Impossible d’afficher cette page</h1>
        <p className={styles.systemDescription}>Une erreur empêche temporairement l’affichage de cette page.</p>
        <button className={styles.primaryButton} onClick={() => setMessage("Écran de démonstration : aucun rechargement externe ni appel réseau n’a été effectué.")} type="button">Réessayer</button>
        {message ? <p className={styles.feedback} role="status" aria-live="polite">{message}</p> : null}
        <p className={styles.systemFoot}>Écran système de démonstration · aucune panne réelle</p>
      </section>
    </main>
  );
}

export function DemoNotFoundPage() {
  return (
    <main className={styles.systemPage} data-testid="admin-demo-screen-53" data-screen="53">
      <section className={styles.systemCard}>
        <span className={styles.notFoundCode} aria-hidden="true">404</span>
        <p className={styles.systemEyebrow}>Page introuvable</p>
        <h1>Cette page n’existe pas</h1>
        <p className={styles.systemDescription}>Cette adresse ne correspond à aucune page de démonstration.</p>
        <Link className={styles.primaryLink} href="/">Retour à l’accueil <ArrowRight size={15} aria-hidden="true" /></Link>
        <p className={styles.systemFoot}>Écran système de démonstration · aucune panne réelle</p>
      </section>
    </main>
  );
}

export default function AdminDemoScreens({ segments }: { segments: string[] }) {
  if (segments[0] === "erreur") return <DemoErrorPage />;
  if (segments[0] === "page-introuvable") return <DemoNotFoundPage />;

  const page = demoListPages[segments[0] ?? ""];
  if (!page) return <DemoNotFoundPage />;
  if (segments.length === 1) return <DemoListScreen page={page} />;

  const detailKey = `${segments[0]}/${segments[1]}`;
  const simple = demoSimpleDetails[detailKey];
  if (simple) return <SimpleDetailScreen detail={simple} />;
  if (detailKey === "commandes/df-24018") return <OrderDetailScreen />;
  if (detailKey === "abonnements/sub-demo-0001") return <SubscriptionDetailScreen />;
  if (detailKey === "paiements/pay-demo-0001") return <PaymentDetailScreen />;
  return <DemoNotFoundPage />;
}

import { DEMO_HELP_FAQS, DEMO_HELP_NOTICE } from "../../lib/demo-data/public-help";
import pageStyles from "./public-pages.module.css";
import styles from "./help-center.module.css";

export function HelpCenter() {
  return (
    <section className={pageStyles.main} aria-labelledby="help-title">
      <div className={pageStyles.wrap}>
        <p className={pageStyles.eyebrow}>Nous sommes là pour vous guider</p>
        <div className={styles.heading}>
          <div>
            <h1 className={pageStyles.title} id="help-title">
              Comment pouvons-nous vous aider ?
            </h1>
            <p className={pageStyles.intro}>
              Des réponses pratiques pour parcourir Delifast.
            </p>
          </div>
        </div>

        <div className={styles.helpGrid}>
          <section className={styles.faqList} aria-label="Questions fréquentes">
            {DEMO_HELP_FAQS.map((item, index) => (
              <details className={styles.faqItem} key={item.question} open>
                <summary className={styles.faqSummary}>
                  <h2 className={styles.faqQuestion}>
                    <span className={styles.faqNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.question}
                  </h2>
                  <span className={styles.chevron} aria-hidden="true">
                    ⌄
                  </span>
                </summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </section>

          <aside className={styles.contactCard} aria-labelledby="help-contact-title">
            <span className={styles.contactIcon} aria-hidden="true">
              ✉
            </span>
            <h2 className={styles.contactTitle} id="help-contact-title">
              Besoin d’un contact ?
            </h2>
            <p className={styles.contactCopy}>
              Préparez le numéro de commande ou la référence de paiement concernée.
            </p>
            <button
              className={styles.contactButton}
              type="button"
              disabled
              aria-describedby="help-demo-note"
            >
              Consulter mon espace
            </button>
            <p className={styles.demoNote} id="help-demo-note">
              {DEMO_HELP_NOTICE}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

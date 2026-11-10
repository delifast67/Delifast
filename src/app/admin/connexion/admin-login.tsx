"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import styles from "./admin-login.module.css";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowDemoNotice(true);
  }

  return (
    <main className={styles.page}>
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/" aria-label="Retourner à l’accueil Delifast">
            <span className={styles.brandMark} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className={styles.brandName}>deli<span>fast</span></span>
          </Link>
          <span className={styles.portalLabel}>
            <span className={styles.portalDot} />
            Portail privé
          </span>
        </header>

        <section className={styles.content} aria-labelledby="login-title">
          <div className={styles.intro}>
            <div className={styles.introIcon} aria-hidden="true">
              <ShieldCheck size={23} strokeWidth={1.8} />
            </div>
            <p className={styles.kicker}>Administration <span>·</span> Écran 38 / 53</p>
            <h1>Un accès réservé à l’administration.</h1>
            <p className={styles.introCopy}>
              Accès réservé à l’unique compte administrateur provisionné côté serveur.
            </p>
            <div className={styles.securityNote}>
              <LockKeyhole size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>Un espace privé, sans inscription publique.</span>
            </div>
            <div className={styles.decorativeLine} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeading}>
              <p className={styles.cardEyebrow}>Espace administration</p>
              <h2 id="login-title">Accès sécurisé</h2>
              <p>Connectez-vous avec le compte administrateur autorisé.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
              <div className={styles.field}>
                <label htmlFor="admin-email">Adresse e-mail administrateur</label>
                <input
                  id="admin-email"
                  name="admin-email"
                  type="email"
                  autoComplete="off"
                  placeholder="Compte provisionné côté serveur"
                  required
                  onChange={() => setShowDemoNotice(false)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="admin-password">Mot de passe</label>
                <div className={styles.passwordWrap}>
                  <input
                    id="admin-password"
                    name="admin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    placeholder="Saisir le mot de passe"
                    required
                    onChange={() => setShowDemoNotice(false)}
                  />
                  <button
                    className={styles.visibilityButton}
                    type="button"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button className={styles.submit} type="submit">
                Ouvrir la session sécurisée
                <span aria-hidden="true">→</span>
              </button>

              {showDemoNotice ? (
                <p className={styles.demoAlert} role="alert">
                  Démonstration locale : l’authentification n’est pas connectée. Aucun accès ni aucune session n’a été créé.
                </p>
              ) : null}
            </form>

            <div className={styles.divider} />
            <div className={styles.privateNotice}>
              <span className={styles.noticeIcon} aria-hidden="true">i</span>
              <p>Aucune inscription publique ni création d’un autre compte administrateur.</p>
            </div>
            <div className={styles.demoEntry}>
              <span>Sans ouverture de session</span>
              <Link href="/admin/tableau-de-bord">
                Voir l’aperçu fictif (écran 39) <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className={styles.cardFoot}>Delifast <span>·</span> Accès privé</p>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>DELI<span>FAST</span></span>
          <span>Interface de démonstration locale</span>
        </footer>
      </div>
    </main>
  );
}

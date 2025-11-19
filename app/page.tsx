import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <section className={styles.intro}>
          <p>
            בעמוד זה תוכלו לבחור בין שלושת חלקי האתר. לחיצה על כל כרטיס תיקח
            אתכם לעמוד אחר באתר: משחק איקס־עיגול, עבודה עם API של אמנות, או
            מימוש עיצוב מפיגמה. שימו לב- אפשר לעבור בין חלקי האתר גם על ידי סרגל הניווט למעלה!
          </p>
        </section>

        <section className={styles.sections}>
          <article className={styles.card}>
            <p className={styles.cardLabel}>חלק 1</p>
            <h2 className={styles.cardTitle}>איקס־עיגול ב־React</h2>
            <p className={styles.cardText}>
              משחק איקס עיגול אינטראקטיבי
            </p>
            <Link href="/tic-tac-toe" className={styles.cardLink}>
              לעמוד האיקס־עיגול
            </Link>
          </article>

          <article className={styles.card}>
            <p className={styles.cardLabel}>חלק 2</p>
            <h2 className={styles.cardTitle}>גלריית אמנות מה־MET</h2>
            <p className={styles.cardText}>
              אמנות אסייאתית
            </p>
            <Link href="/art" className={styles.cardLink}>
              לעמוד ה־API
            </Link>
          </article>

          <article className={styles.card}>
            <p className={styles.cardLabel}>חלק 3</p>
            <h2 className={styles.cardTitle}>מימוש עיצוב חשבונית</h2>
            <p className={styles.cardText}>
              חשבונית נגה קפון
            </p>
            <Link href="/design" className={styles.cardLink}>
              לעמוד העיצוב
            </Link>
          </article>
        </section>
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";
import styles from "./design.module.css";

export default function DesignPage() {
  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.screen}>
        <section className={styles.heroSection}>
  {/* בלוק ירוק-ליים אחורי */}
  <div className={styles.heroBackCard}>
    <div className={styles.heroDate}>12.11.25</div>
  </div>

  {/* בלוק לבן קדמי */}
  <div className={styles.heroMainCard}>
    <div className={styles.heroMeta}>
      ג’אם עיצוב מוצר - חשבונית אפיון
    </div>

    <div className={styles.heroTitle}>בואו לבשל איתי</div>
    <div className={styles.heroSubtitle}>לבשל. לשתף. ללמוד.</div>
  </div>
</section>

        {/* בלוק כתום – תיאור כללי */}
        <section className={styles.orangeIntroSection}>
          <div className={styles.orangeIntroLabel}>
            פלטפורמת וידאו אינטראקטיבית להורים צעירים
          </div>
          <p className={styles.orangeIntroText}>
            בישול יומיומי לילדים יכול להפוך ממטלה לחוויה שיתופית.
            האפליקציה מאפשרת להורים לבשל יחד בזמן אמת, לשתף מתכונים,
            לשאול שאלות ולקבל ייעוץ ממציא המתכון – תוך כדי הבישול.
          </p>
        </section>

        {/* מטרות */}
        <section className={styles.targetsSection}>
          <h2 className={styles.sectionSubtitleDark}>מטרות</h2>

          <div className={styles.targetsGrid}>
            {/* מטרה 1 – כרטיס ימין */}
            <div className={styles.targetCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/design/image5.png"
                  alt="הורה וילד מבשלים יחד במטבח"
                  fill
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.targetText}>
                מטרה 1: להפוך את חוויית הבישול לחברתית ותומכת.
              </div>
            </div>

            {/* מטרה 2 – כרטיס שמאל */}
            <div className={styles.targetCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/design/image4.png"
                  alt="הורים וילדים מבשלים במטבח"
                  fill
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.targetText}>
                מטרה 2: לעודד שיתופיות, למידה הדדית
                <br />
                וגיוון תפריט המשפחה.
              </div>
            </div>
          </div>
        </section>

        {/* קהל יעד */}
        <section className={styles.audienceSection}>
          <h2 className={styles.sectionSubtitleLight}>קהל יעד</h2>

          <div className={styles.audienceCard}>
            <div className={styles.imageWrapper}>
              <Image
                src="/design/image3.png"
                alt="קבוצת הורים צעירים עם תינוקות"
                fill
                className={styles.cardImage}
              />
            </div>
            <div className={styles.audienceText}>
              הורים לילדים צעירים, דוברי עברית, שמחפשים קהילה ודרכים לגוון את
              הארוחות.
            </div>
          </div>
        </section>

        {/* קונטקסט שימוש */}
        <section className={styles.contextSection}>
          <h2 className={styles.sectionSubtitleDark}>קונטקסט שימוש</h2>

          <div className={styles.contextGrid}>
            {/* שימוש שקט – שמאל בתמונה המקורית, כאן נשמור על שתי עמודות */}
            <div className={styles.contextCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/design/image2.png"
                  alt="הורה מבשל במטבח בבית"
                  fill
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.contextText}>
                שימוש יומיומי בבית בזמן בישול (מיועד למובייל בלבד)
              </div>
            </div>

            {/* שימוש יומיומי – ימין */}
            <div className={styles.contextCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/design/image1.png"
                  alt="ילד ישן על ספה"
                  fill
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.contextText}>
                מתאים גם לשימוש שקט (באמצעות צ’אט בזמן שילדים ישנים)
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

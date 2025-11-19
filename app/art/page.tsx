"use client";

import { useEffect, useState } from "react";
import styles from "./art.module.css";

type ArtItem = {
  objectID: number;
  title: string;
  primaryImageSmall: string;
  artistDisplayName: string;
  objectDate: string;
  medium: string;
  culture: string;
  department: string;
  objectName: string;
};

type Department = {
  departmentId: number;
  displayName: string;
};

/**
 * מביאה מערך של יצירות אמנות מתוך מחלקה מסוימת במוזיאון,
 * בגודל count, בצורה רנדומלית.
 */
async function getArtData(
  departmentId: string,
  count: number
): Promise<ArtItem[]> {
  const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1";

  // 1. מביאים את כל ה־objectIDs של המחלקה
  const listRes = await fetch(
    `${baseUrl}/objects?departmentIds=${departmentId}`
  );
  if (!listRes.ok) {
    throw new Error("אירעה שגיאה בזמן טעינת רשימת היצירות מה־MET.");
  }
  const listData = await listRes.json();

  const allIds: number[] = listData.objectIDs || [];
  if (!allIds.length) {
    throw new Error("לא נמצאו יצירות במחלקה המבוקשת.");
  }

  // 2. בוחרים מזהים רנדומליים (ללא כפילויות)
  const shuffled = [...allIds].sort(() => Math.random() - 0.5);
  const selectedIds = shuffled.slice(0, Math.min(count * 3, shuffled.length)); // לוקחים קצת יותר כדי לסנן בלי תמונה

  // 3. מביאים נתונים מפורטים לכל יצירה
  const itemPromises = selectedIds.map(async (id) => {
    const res = await fetch(`${baseUrl}/objects/${id}`);
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    // נשמור רק יצירות שיש להן תמונה קטנה להצגה
    if (!data.primaryImageSmall) return null;

    const item: ArtItem = {
      objectID: data.objectID,
      title: data.title,
      primaryImageSmall: data.primaryImageSmall,
      artistDisplayName: data.artistDisplayName || "Unknown artist",
      objectDate: data.objectDate || "",
      medium: data.medium || "",
      culture: data.culture || "",
      department: data.department || "",
      objectName: data.objectName || "",
    };

    return item;
  });

  const itemsWithNulls = await Promise.all(itemPromises);
  const items = itemsWithNulls.filter(
    (item): item is ArtItem => item !== null
  );

  // מחזירים בדיוק count פריטים (או פחות אם אין)
  return items.slice(0, count);
}

/** מביא את שם המחלקה מה־API */
async function getDepartmentTitle(departmentId: string): Promise<string> {
  const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1";

  const res = await fetch(`${baseUrl}/departments`);
  if (!res.ok) {
    throw new Error("אירעה שגיאה בזמן טעינת המחלקות מה־MET.");
  }
  const data = await res.json();
  const dept = (data.departments as Department[]).find(
    (d) => String(d.departmentId) === departmentId
  );

  return dept?.displayName ?? "Unknown Department";
}

const DEFAULT_DEPARTMENT_ID = "6"; 
const ART_COUNT = 6;

export default function ArtPage() {
  const [art, setArt] = useState<ArtItem[]>([]);
  const [departmentTitle, setDepartmentTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadArt() {
    setLoading(true);
    setError(null);

    try {
      const [title, items] = await Promise.all([
        getDepartmentTitle(DEFAULT_DEPARTMENT_ID),
        getArtData(DEFAULT_DEPARTMENT_ID, ART_COUNT),
      ]);

      setDepartmentTitle(title);
      setArt(items);
    } catch (err: any) {
      setError(err?.message || "אירעה שגיאה בלתי צפויה בטעינת הנתונים.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArt();
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <p className={styles.badge}>חלק 2 · עבודה עם נתונים</p>
        <h1 className={styles.title}>גלריית אמנות מה־MET</h1>
        {departmentTitle && (
          <p className={styles.subtitle}>מחלקה נבחרת: {departmentTitle}</p>
        )}
        <p className={styles.helper}>
          לכל יצירה ניתן לראות את הפרטים הבאים: שם היצירה, האמן, שנה,
          מדיום, תרבות ועוד.
        </p>
        <button className={styles.reloadButton} onClick={loadArt}>
          טען יצירות אחרות
        </button>
      </section>

      {loading && <p className={styles.info}>טוען יצירות...</p>}

      {error && (
        <div className={styles.errorBox}>
          <p>{error}</p>
          <button className={styles.errorButton} onClick={loadArt}>
            נסו לטעון מחדש
          </button>
        </div>
      )}

      {!loading && !error && (
        <section className={styles.grid}>
          {art.map((item) => (
            <article key={item.objectID} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.primaryImageSmall}
                  alt={item.title}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardArtist}>{item.artistDisplayName}</p>

                <dl className={styles.metaList}>
                  <div>
                    <dt>שנה</dt>
                    <dd>{item.objectDate || "לא ידוע"}</dd>
                  </div>
                  <div>
                    <dt>מדיום</dt>
                    <dd>{item.medium || "לא צוין"}</dd>
                  </div>
                  <div>
                    <dt>תרבות</dt>
                    <dd>{item.culture || "לא צוין"}</dd>
                  </div>
                  <div>
                    <dt>סוג אובייקט</dt>
                    <dd>{item.objectName || "לא צוין"}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

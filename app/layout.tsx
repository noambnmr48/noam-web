import type { Metadata } from "next";
import "./../styles/global.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product Jam Web App",
  description: "Starter kit for Noam's assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <header>
          <nav>
            <Link href="/">בית</Link>
            <Link href="/tic-tac-toe">איקס־עיגול</Link>
            <Link href="/art">גלריית אמנות</Link>
            <Link href="/design">חשבונית</Link>
          </nav>
        </header>

        {children}

        <footer>
          <p>noam-web@</p>
        </footer>
      </body>
    </html>
  );
}

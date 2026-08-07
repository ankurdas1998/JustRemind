import { type ReactNode } from "react";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>JustRemind</h1>
        <nav aria-label="Main navigation"></nav>
      </header>

      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}

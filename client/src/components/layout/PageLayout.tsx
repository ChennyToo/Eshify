import React from 'react';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Eshify</h1>
      </header>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default PageLayout; 
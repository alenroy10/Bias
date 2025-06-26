import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>BiasCheck</h3>
            <p className={styles.tagline}>Fairer hiring starts here.</p>
          </div>
          <div className={styles.links}>
            <a href="/" className={styles.link}>Home</a>
            <a href="/analyze" className={styles.link}>Analyze</a>
            <a href="/dashboard" className={styles.link}>Dashboard</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
          </div>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} BiasCheck. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
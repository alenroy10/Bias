import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>BiasCheck</h1>
          <p className={styles.subtitle}>
            Detect and eliminate bias or toxicity from job descriptions using AI
          </p>
          <Link to="/analyze" className={styles.ctaButton}>
            Analyze a Job Description
          </Link>
        </div>
        <div className={styles.heroImage}>
          {/* Placeholder for an illustration */}
          <div className={styles.illustration}>
            <div className={styles.illustrationContent}>
              <div className={styles.icon}>🔍</div>
              <h3>AI-Powered Analysis</h3>
              <p>Detect bias and toxicity in job descriptions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
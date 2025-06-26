import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>About BiasCheck</h2>
        <div className={styles.contentWrapper}>
          <div className={styles.aboutCard}>
            <div className={styles.icon}>🎯</div>
            <h3 className={styles.title}>Mission</h3>
            <p className={styles.description}>
              BiasCheck helps both job seekers and recruiters by detecting toxic workplace signals and bias in job descriptions. Our AI-powered tool ensures fair hiring practices and promotes inclusive workplace cultures.
            </p>
          </div>
          
          <div className={styles.aboutCard}>
            <div className={styles.icon}>🤖</div>
            <h3 className={styles.title}>Technology Used</h3>
            <p className={styles.description}>
              We use advanced natural language processing and machine learning algorithms to analyze job descriptions for various types of bias, toxic language patterns, and inclusivity issues.
            </p>
          </div>
          
          <div className={styles.aboutCard}>
            <div className={styles.icon}>🔒</div>
            <h3 className={styles.title}>Privacy Promise</h3>
            <p className={styles.description}>
              Your data is processed securely and never stored permanently. We prioritize your privacy and ensure that all analyses are conducted with the highest security standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 
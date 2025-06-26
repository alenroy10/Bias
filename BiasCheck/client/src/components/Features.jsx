import React from 'react';
import styles from './Features.module.css';

const featureData = [
  {
    icon: '🔍',
    title: 'Bias Detection',
    description: 'Advanced AI algorithms detect various types of bias including gender, age, cultural, and disability bias in job descriptions.',
  },
  {
    icon: '⚠️',
    title: 'Toxic Signal Alerts',
    description: 'Identify red flags and toxic workplace signals that could indicate problematic company culture or management.',
  },
  {
    icon: '✍️',
    title: 'Inclusive Rewrite Suggestions',
    description: 'Get intelligent suggestions to replace biased or problematic language with inclusive, professional alternatives.',
  }
];

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Key Features</h2>
        <div className={styles.featuresGrid}>
          {featureData.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 
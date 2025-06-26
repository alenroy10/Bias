import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.aboutPage}>
        <div className={styles.container}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <h1 className={styles.title}>About BiasCheck</h1>
            <p className={styles.subtitle}>
              Empowering inclusive hiring through AI-powered bias detection
            </p>
          </div>

          {/* Mission Section */}
          <div className={styles.missionSection}>
            <div className={styles.missionContent}>
              <h2>Our Mission</h2>
              <p>
                BiasCheck is dedicated to creating more inclusive workplaces by helping 
                organizations identify and eliminate biased language from their job descriptions. 
                We believe that inclusive language leads to diverse teams, which drive innovation 
                and better business outcomes.
              </p>
            </div>
            <div className={styles.missionImage}>
              <div className={styles.imagePlaceholder}>🎯</div>
            </div>
          </div>

          {/* How It Works */}
          <div className={styles.howItWorksSection}>
            <h2>How It Works</h2>
            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>1</div>
                <h3>Upload Your Text</h3>
                <p>Paste your job description or any text you want to analyze for potential bias.</p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>2</div>
                <h3>AI Analysis</h3>
                <p>Our advanced AI scans your text for various types of bias including gender, age, race, and more.</p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>3</div>
                <h3>Get Results</h3>
                <p>Receive detailed feedback with specific suggestions for more inclusive alternatives.</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className={styles.featuresSection}>
            <h2>Key Features</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔍</div>
                <h3>Comprehensive Detection</h3>
                <p>Detects multiple types of bias including gender, age, race, disability, and cultural bias.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>💡</div>
                <h3>Smart Suggestions</h3>
                <p>Provides specific, actionable suggestions to replace biased language with inclusive alternatives.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📊</div>
                <h3>Detailed Analytics</h3>
                <p>Get insights into your bias patterns and track improvements over time.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚡</div>
                <h3>Real-time Analysis</h3>
                <p>Instant results with no waiting time, powered by cutting-edge AI technology.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔒</div>
                <h3>Privacy First</h3>
                <p>Your data is processed securely and never stored or shared with third parties.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📱</div>
                <h3>Mobile Friendly</h3>
                <p>Works seamlessly across all devices, from desktop to mobile phones.</p>
              </div>
            </div>
          </div>

          {/* Bias Types */}
          <div className={styles.biasTypesSection}>
            <h2>Types of Bias We Detect</h2>
            <div className={styles.biasTypesGrid}>
              <div className={styles.biasTypeCard}>
                <h3>Gender Bias</h3>
                <p>Identifies language that may favor one gender over another, including masculine-coded words and gendered pronouns.</p>
                <div className={styles.example}>
                  <strong>Example:</strong> "seeking a strong craftsman" → "seeking a strong artisan"
                </div>
              </div>
              <div className={styles.biasTypeCard}>
                <h3>Age Bias</h3>
                <p>Detects language that may discriminate based on age, such as terms that favor younger or older candidates.</p>
                <div className={styles.example}>
                  <strong>Example:</strong> "recent graduate" → "entry-level candidate"
                </div>
              </div>
              <div className={styles.biasTypeCard}>
                <h3>Cultural Bias</h3>
                <p>Identifies language that may exclude candidates from different cultural backgrounds.</p>
                <div className={styles.example}>
                  <strong>Example:</strong> "native English speaker" → "fluent English speaker"
                </div>
              </div>
              <div className={styles.biasTypeCard}>
                <h3>Disability Bias</h3>
                <p>Detects language that may exclude candidates with disabilities or create unnecessary barriers.</p>
                <div className={styles.example}>
                  <strong>Example:</strong> "must be able to lift 50 pounds" → "must be able to perform physical tasks"
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <h2>Ready to Make Your Hiring More Inclusive?</h2>
            <p>Start analyzing your job descriptions today and take the first step toward building diverse, inclusive teams.</p>
            <div className={styles.ctaButtons}>
              <Link to="/analyze" className={styles.primaryButton}>
                Start Analysis
              </Link>
              <Link to="/dashboard" className={styles.secondaryButton}>
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Team Section */}
          <div className={styles.teamSection}>
            <h2>Our Team</h2>
            <p>
              BiasCheck is built by a team passionate about diversity, equity, and inclusion. 
              We combine expertise in AI, linguistics, and HR to create tools that make a real difference.
            </p>
            <div className={styles.teamGrid}>
              <div className={styles.teamMember}>
                <div className={styles.memberAvatar}>👩‍💻</div>
                <h3>AI & ML Engineers</h3>
                <p>Building the intelligent systems that power our bias detection.</p>
              </div>
              <div className={styles.teamMember}>
                <div className={styles.memberAvatar}>📚</div>
                <h3>Linguistics Experts</h3>
                <p>Ensuring accurate detection of subtle linguistic biases.</p>
              </div>
              <div className={styles.teamMember}>
                <div className={styles.memberAvatar}>👥</div>
                <h3>DEI Specialists</h3>
                <p>Providing insights into inclusive hiring practices.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About; 
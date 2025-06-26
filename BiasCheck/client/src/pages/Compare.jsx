import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './Compare.module.css';

const Compare = () => {
  const [jd1, setJd1] = useState('');
  const [jd2, setJd2] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = () => {
    if (!jd1.trim() || !jd2.trim()) return;
    setIsLoading(true);
    
    setTimeout(() => {
      setResults({
        jd1: {
          title: 'Job Description 1',
          score: 75,
          biases: [
            { type: 'Gender Bias', count: 2 },
            { type: 'Age Bias', count: 1 },
            { type: 'Toxic Signals', count: 0 }
          ]
        },
        jd2: {
          title: 'Job Description 2',
          score: 85,
          biases: [
            { type: 'Gender Bias', count: 1 },
            { type: 'Age Bias', count: 0 },
            { type: 'Toxic Signals', count: 1 }
          ]
        }
      });
      setIsLoading(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffa726';
    return '#ff6b6b';
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.comparePage}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Compare Job Descriptions</h1>
            <p className={styles.subtitle}>Side-by-side bias analysis comparison</p>
          </div>

          <div className={styles.compareSection}>
            <div className={styles.inputGrid}>
              <div className={styles.inputCard}>
                <h3>Job Description 1</h3>
                <textarea
                  className={styles.textarea}
                  rows="12"
                  placeholder="Paste your first job description here..."
                  value={jd1}
                  onChange={(e) => setJd1(e.target.value)}
                />
              </div>
              
              <div className={styles.inputCard}>
                <h3>Job Description 2</h3>
                <textarea
                  className={styles.textarea}
                  rows="12"
                  placeholder="Paste your second job description here..."
                  value={jd2}
                  onChange={(e) => setJd2(e.target.value)}
                />
              </div>
            </div>

            <button 
              className={styles.compareButton} 
              onClick={handleCompare} 
              disabled={isLoading || !jd1.trim() || !jd2.trim()}
            >
              {isLoading ? 'Comparing...' : 'Compare Now'}
            </button>
          </div>

          {isLoading && (
            <div className={styles.loadingSection}>
              <div className={styles.loader}></div>
              <p>Analyzing both job descriptions...</p>
            </div>
          )}

          {results && (
            <div className={styles.resultsSection}>
              <h2>Comparison Results</h2>
              <div className={styles.resultsGrid}>
                <div className={styles.resultCard}>
                  <h3>{results.jd1.title}</h3>
                  <div className={styles.scoreDisplay}>
                    <div 
                      className={styles.scoreCircle}
                      style={{borderColor: getScoreColor(results.jd1.score)}}
                    >
                      <span 
                        className={styles.scoreNumber}
                        style={{color: getScoreColor(results.jd1.score)}}
                      >
                        {results.jd1.score}
                      </span>
                    </div>
                    <span className={styles.scoreLabel}>Inclusivity Score</span>
                  </div>
                  <div className={styles.biasList}>
                    <h4>Detected Biases:</h4>
                    {results.jd1.biases.map((bias, index) => (
                      <div key={index} className={styles.biasItem}>
                        <span className={styles.biasType}>{bias.type}</span>
                        <span className={styles.biasCount}>{bias.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.resultCard}>
                  <h3>{results.jd2.title}</h3>
                  <div className={styles.scoreDisplay}>
                    <div 
                      className={styles.scoreCircle}
                      style={{borderColor: getScoreColor(results.jd2.score)}}
                    >
                      <span 
                        className={styles.scoreNumber}
                        style={{color: getScoreColor(results.jd2.score)}}
                      >
                        {results.jd2.score}
                      </span>
                    </div>
                    <span className={styles.scoreLabel}>Inclusivity Score</span>
                  </div>
                  <div className={styles.biasList}>
                    <h4>Detected Biases:</h4>
                    {results.jd2.biases.map((bias, index) => (
                      <div key={index} className={styles.biasItem}>
                        <span className={styles.biasType}>{bias.type}</span>
                        <span className={styles.biasCount}>{bias.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.conclusion}>
                <h3>Conclusion</h3>
                <p>
                  {results.jd1.score > results.jd2.score 
                    ? `${results.jd1.title} has a higher inclusivity score and is more inclusive.`
                    : results.jd1.score < results.jd2.score
                    ? `${results.jd2.title} has a higher inclusivity score and is more inclusive.`
                    : 'Both job descriptions have similar inclusivity scores.'
                  }
                </p>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <Link to="/analyze" className={styles.actionButton}>
              Analyze Single JD
            </Link>
            <Link to="/dashboard" className={styles.actionButton}>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Compare; 
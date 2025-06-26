import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './Results.module.css';

const Results = () => {
  const { id } = useParams();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analysis data
    setTimeout(() => {
      setAnalysisData({
        id: id || '1',
        title: 'Software Engineer Position',
        date: '2024-01-15',
        originalText: `We are seeking a strong craftsman to join our team. The ideal candidate should be a recent graduate with 5+ years of experience. Must be able to work long hours and lift heavy equipment. Native English speakers preferred.`,
        results: [
          {
            type: 'Gender Bias',
            severity: 'high',
            phrase: 'strong craftsman',
            explanation: 'The term "craftsman" is traditionally male-gendered and may discourage female applicants.',
            suggestion: 'strong artisan or skilled professional',
            category: 'gender',
            confidence: 95
          },
          {
            type: 'Age Bias',
            severity: 'medium',
            phrase: 'recent graduate with 5+ years of experience',
            explanation: 'This contradictory requirement may discourage older candidates or those with non-traditional career paths.',
            suggestion: 'entry-level candidate with relevant experience',
            category: 'age',
            confidence: 87
          },
          {
            type: 'Disability Bias',
            severity: 'high',
            phrase: 'lift heavy equipment',
            explanation: 'This requirement may exclude candidates with physical disabilities who could perform the job with accommodations.',
            suggestion: 'perform physical tasks as required',
            category: 'disability',
            confidence: 92
          },
          {
            type: 'Cultural Bias',
            severity: 'medium',
            phrase: 'Native English speakers preferred',
            explanation: 'This preference may exclude qualified candidates from diverse linguistic backgrounds.',
            suggestion: 'fluent English communication skills required',
            category: 'cultural',
            confidence: 78
          }
        ],
        summary: {
          totalBiases: 4,
          highSeverity: 2,
          mediumSeverity: 2,
          lowSeverity: 0,
          overallScore: 65
        }
      });
      setLoading(false);
    }, 1500);
  }, [id]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffa726';
      case 'low': return '#66bb6a';
      default: return '#666';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'gender': return '👥';
      case 'age': return '📅';
      case 'disability': return '♿';
      case 'cultural': return '🌍';
      case 'racial': return '🌈';
      default: return '⚠️';
    }
  };

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.resultsPage}>
          <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p>Loading analysis results...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.resultsPage}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>Analysis Results</h1>
              <p className={styles.subtitle}>{analysisData.title}</p>
              <div className={styles.metadata}>
                <span className={styles.date}>Analyzed on {analysisData.date}</span>
                <span className={styles.id}>ID: {analysisData.id}</span>
              </div>
            </div>
            <div className={styles.scoreCard}>
              <div className={styles.scoreCircle}>
                <span className={styles.scoreNumber}>{analysisData.summary.overallScore}</span>
                <span className={styles.scoreLabel}>Inclusivity Score</span>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className={styles.summarySection}>
            <h2>Summary</h2>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <div className={styles.summaryIcon}>⚠️</div>
                <div className={styles.summaryContent}>
                  <h3>{analysisData.summary.totalBiases}</h3>
                  <p>Total Biases Found</p>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <div className={styles.summaryIcon} style={{color: '#ff6b6b'}}>🔴</div>
                <div className={styles.summaryContent}>
                  <h3>{analysisData.summary.highSeverity}</h3>
                  <p>High Severity</p>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <div className={styles.summaryIcon} style={{color: '#ffa726'}}>🟡</div>
                <div className={styles.summaryContent}>
                  <h3>{analysisData.summary.mediumSeverity}</h3>
                  <p>Medium Severity</p>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <div className={styles.summaryIcon} style={{color: '#66bb6a'}}>🟢</div>
                <div className={styles.summaryContent}>
                  <h3>{analysisData.summary.lowSeverity}</h3>
                  <p>Low Severity</p>
                </div>
              </div>
            </div>
          </div>

          {/* Original Text */}
          <div className={styles.originalTextSection}>
            <h2>Original Text</h2>
            <div className={styles.textBox}>
              <p>{analysisData.originalText}</p>
            </div>
          </div>

          {/* Detailed Results */}
          <div className={styles.resultsSection}>
            <h2>Detailed Analysis</h2>
            <div className={styles.resultsList}>
              {analysisData.results.map((result, index) => (
                <div key={index} className={styles.resultCard}>
                  <div className={styles.resultHeader}>
                    <div className={styles.resultType}>
                      <span className={styles.categoryIcon}>{getCategoryIcon(result.category)}</span>
                      <h3>{result.type}</h3>
                    </div>
                    <div className={styles.resultMeta}>
                      <span 
                        className={styles.severityBadge}
                        style={{backgroundColor: getSeverityColor(result.severity)}}
                      >
                        {result.severity.toUpperCase()}
                      </span>
                      <span className={styles.confidence}>
                        {result.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.resultContent}>
                    <div className={styles.phraseSection}>
                      <h4>Biased Phrase:</h4>
                      <div className={styles.highlightedPhrase}>
                        "{result.phrase}"
                      </div>
                    </div>
                    
                    <div className={styles.explanationSection}>
                      <h4>Explanation:</h4>
                      <p>{result.explanation}</p>
                    </div>
                    
                    <div className={styles.suggestionSection}>
                      <h4>Suggested Alternative:</h4>
                      <div className={styles.suggestion}>
                        "{result.suggestion}"
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className={styles.recommendationsSection}>
            <h2>Overall Recommendations</h2>
            <div className={styles.recommendationsGrid}>
              <div className={styles.recommendationCard}>
                <div className={styles.recommendationIcon}>📝</div>
                <h3>Rewrite Job Description</h3>
                <p>Consider rewriting the job description using the suggested alternatives to make it more inclusive.</p>
              </div>
              <div className={styles.recommendationCard}>
                <div className={styles.recommendationIcon}>👥</div>
                <h3>Diverse Review Panel</h3>
                <p>Have a diverse group of people review your job descriptions before posting them.</p>
              </div>
              <div className={styles.recommendationCard}>
                <div className={styles.recommendationIcon}>📊</div>
                <h3>Track Improvements</h3>
                <p>Monitor your inclusivity scores over time to see how your language evolves.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionSection}>
            <div className={styles.actionButtons}>
              <Link to="/analyze" className={styles.primaryButton}>
                Analyze New Text
              </Link>
              <Link to="/dashboard" className={styles.secondaryButton}>
                Back to Dashboard
              </Link>
              <button className={styles.exportButton}>
                Export Results
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results; 
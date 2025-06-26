import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './History.module.css';

const History = () => {
  const [analyses, setAnalyses] = useState([]);
  const [filteredAnalyses, setFilteredAnalyses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading history data
    setTimeout(() => {
      const mockAnalyses = [
        {
          id: 1,
          title: 'Software Engineer Position',
          date: '2024-01-15',
          biasCount: 3,
          severity: 'high',
          status: 'completed',
          score: 65
        },
        {
          id: 2,
          title: 'Marketing Manager Role',
          date: '2024-01-14',
          biasCount: 2,
          severity: 'medium',
          status: 'completed',
          score: 78
        },
        {
          id: 3,
          title: 'Customer Service Representative',
          date: '2024-01-13',
          biasCount: 1,
          severity: 'low',
          status: 'completed',
          score: 85
        },
        {
          id: 4,
          title: 'Data Analyst Position',
          date: '2024-01-12',
          biasCount: 4,
          severity: 'high',
          status: 'completed',
          score: 55
        },
        {
          id: 5,
          title: 'Product Manager Role',
          date: '2024-01-11',
          biasCount: 0,
          severity: 'none',
          status: 'completed',
          score: 95
        }
      ];
      setAnalyses(mockAnalyses);
      setFilteredAnalyses(mockAnalyses);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = analyses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(analysis => 
        analysis.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by severity
    if (filterType !== 'all') {
      filtered = filtered.filter(analysis => analysis.severity === filterType);
    }

    setFilteredAnalyses(filtered);
  }, [searchTerm, filterType, analyses]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffa726';
      case 'low': return '#66bb6a';
      case 'none': return '#28a745';
      default: return '#666';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffa726';
    return '#ff6b6b';
  };

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.historyPage}>
          <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p>Loading analysis history...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.historyPage}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Analysis History</h1>
            <p className={styles.subtitle}>View and manage your past bias analyses</p>
          </div>

          {/* Filters */}
          <div className={styles.filtersSection}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search analyses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterButton} ${filterType === 'all' ? styles.active : ''}`}
                onClick={() => setFilterType('all')}
              >
                All
              </button>
              <button
                className={`${styles.filterButton} ${filterType === 'high' ? styles.active : ''}`}
                onClick={() => setFilterType('high')}
              >
                High Severity
              </button>
              <button
                className={`${styles.filterButton} ${filterType === 'medium' ? styles.active : ''}`}
                onClick={() => setFilterType('medium')}
              >
                Medium Severity
              </button>
              <button
                className={`${styles.filterButton} ${filterType === 'low' ? styles.active : ''}`}
                onClick={() => setFilterType('low')}
              >
                Low Severity
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className={styles.statsSection}>
            <div className={styles.statCard}>
              <h3>{analyses.length}</h3>
              <p>Total Analyses</p>
            </div>
            <div className={styles.statCard}>
              <h3>{analyses.filter(a => a.severity === 'high').length}</h3>
              <p>High Severity</p>
            </div>
            <div className={styles.statCard}>
              <h3>{Math.round(analyses.reduce((acc, a) => acc + a.score, 0) / analyses.length)}</h3>
              <p>Average Score</p>
            </div>
            <div className={styles.statCard}>
              <h3>{analyses.filter(a => a.biasCount === 0).length}</h3>
              <p>Bias-Free</p>
            </div>
          </div>

          {/* Analyses List */}
          <div className={styles.analysesSection}>
            <h2>Recent Analyses</h2>
            {filteredAnalyses.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📊</div>
                <h3>No analyses found</h3>
                <p>Try adjusting your search or filters to see more results.</p>
                <Link to="/analyze" className={styles.primaryButton}>
                  Start New Analysis
                </Link>
              </div>
            ) : (
              <div className={styles.analysesList}>
                {filteredAnalyses.map((analysis) => (
                  <div key={analysis.id} className={styles.analysisCard}>
                    <div className={styles.analysisInfo}>
                      <h3 className={styles.analysisTitle}>{analysis.title}</h3>
                      <p className={styles.analysisDate}>{analysis.date}</p>
                      <div className={styles.analysisTags}>
                        <span 
                          className={styles.severityTag}
                          style={{backgroundColor: getSeverityColor(analysis.severity)}}
                        >
                          {analysis.severity.toUpperCase()}
                        </span>
                        <span className={styles.biasCount}>
                          {analysis.biasCount} bias detected
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.analysisScore}>
                      <div 
                        className={styles.scoreCircle}
                        style={{borderColor: getScoreColor(analysis.score)}}
                      >
                        <span 
                          className={styles.scoreNumber}
                          style={{color: getScoreColor(analysis.score)}}
                        >
                          {analysis.score}
                        </span>
                      </div>
                      <span className={styles.scoreLabel}>Score</span>
                    </div>
                    
                    <div className={styles.analysisActions}>
                      <Link to={`/results/${analysis.id}`} className={styles.viewButton}>
                        View Details
                      </Link>
                      <button className={styles.deleteButton}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export Section */}
          <div className={styles.exportSection}>
            <h2>Export Data</h2>
            <p>Download your analysis history for reporting or backup purposes.</p>
            <div className={styles.exportButtons}>
              <button className={styles.exportButton}>
                Export as CSV
              </button>
              <button className={styles.exportButton}>
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History; 
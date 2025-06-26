import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Analyze.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:8000/analyze';

const Analyze = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to analyze. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffa726';
      case 'low': return '#66bb6a';
      default: return '#666';
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.analyzePage}>
        <div className={styles.container}>
          <div className={styles.contentPanel}>
            <h1 className={styles.title}>Analyze Job Description</h1>
            <p className={styles.subtitle}>Paste your job description or upload a file to detect bias and toxic signals.</p>
            
            <div className={styles.uploadSection}>
              <div className={styles.fileUpload}>
                <input
                  type="file"
                  accept=".txt,.pdf"
                  onChange={handleFileUpload}
                  id="file-upload"
                  className={styles.fileInput}
                />
                <label htmlFor="file-upload" className={styles.fileLabel}>
                  📁 Upload File (PDF/TXT)
                </label>
                {fileName && <span className={styles.fileName}>{fileName}</span>}
              </div>
            </div>

            <textarea
              className={styles.textarea}
              rows="12"
              placeholder="Or paste your job description here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            <button className={styles.analyzeButton} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze Now'}
            </button>
          </div>

          {loading && (
            <div className={styles.loadingSection}>
              <div className={styles.loader}></div>
              <p>Analyzing your text for bias and toxic signals...</p>
            </div>
          )}

          {error && (
            <div className={styles.errorSection}>
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className={styles.resultsSection}>
              <h2 className={styles.resultsTitle}>Analysis Complete!</h2>
              <p className={styles.resultsSubtitle}>Redirecting to detailed results...</p>
              <div className={styles.resultsGrid}>
                <div className={styles.resultCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Predicted Label</h3>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.phraseSection}>
                      <strong>Label:</strong> 
                      <mark className={styles.highlightedPhrase}>{result.label}</mark>
                    </div>
                  </div>
                </div>
                <div className={styles.resultCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Class Probabilities</h3>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.explanationSection}>
                      <strong>Probabilities:</strong> 
                      <div>
                        {Object.entries(result.probabilities).map(([label, prob]) => (
                          <div key={label} className={styles.probability}>
                            <span className={styles.label}>{label}</span>
                            <span className={styles.bar}>
                              <span style={{ width: `${prob * 100}%` }}></span>
                            </span>
                            <span className={styles.percentage}>{(prob * 100).toFixed(1)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.resultCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Gender-coded Words</h3>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.explanationSection}>
                      <strong>Words:</strong> 
                      {result.gender_words.length > 0 ? (
                        <ul>
                          {result.gender_words.map(word => <li key={word}>{word}</li>)}
                        </ul>
                      ) : (
                        <span>None</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analyze; 
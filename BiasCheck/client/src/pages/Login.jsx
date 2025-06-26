import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GOOGLE_CONFIG, GOOGLE_BUTTON_CONFIG } from '../config/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './Login.module.css';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const navigate = useNavigate();

  // Initialize Google Sign-In
  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CONFIG.client_id,
            callback: handleGoogleSignIn,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          window.google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            GOOGLE_BUTTON_CONFIG
          );
          
          setGoogleLoaded(true);
        } catch (error) {
          console.error('Google Sign-In initialization failed:', error);
          setError('Google Sign-In is currently unavailable. Please use email/password.');
        }
      }
    };

    script.onerror = () => {
      console.error('Failed to load Google Sign-In script');
      setError('Google Sign-In is currently unavailable. Please use email/password.');
    };

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleGoogleSignIn = (response) => {
    setLoading(true);
    setError('');

    try {
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      // Simulate API call to verify token and get user data
      setTimeout(() => {
        const userEmail = payload.email;
        const userName = payload.name;
        const userPicture = payload.picture;
        
        login(userEmail, userName, userPicture);
        navigate('/dashboard');
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError('Google Sign-In failed. Please try again or use email/password.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('demo@biascheck.com');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.loginPage}>
        <div className={styles.container}>
          <div className={styles.loginCard}>
            <div className={styles.header}>
              <h1 className={styles.title}>Welcome to BiasCheck</h1>
              <p className={styles.subtitle}>
                {isSignUp ? 'Create your account' : 'Sign in to your account'}
              </p>
            </div>

            {/* Google Sign-In Button */}
            <div className={styles.googleSection}>
              <div id="google-signin-button" className={styles.googleButton}></div>
              {!googleLoaded && (
                <div className={styles.googlePlaceholder}>
                  <button className={styles.googlePlaceholderButton} disabled>
                    Continue with Google
                  </button>
                </div>
              )}
              <div className={styles.divider}>
                <span>or</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <div className={styles.loadingSpinner}></div>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </button>
            </form>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <button 
              onClick={handleDemoLogin}
              className={styles.demoButton}
              disabled={loading}
            >
              Try Demo Account
            </button>

            <div className={styles.switchMode}>
              <p>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className={styles.switchButton}
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            <div className={styles.forgotPassword}>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className={styles.features}>
            <h2>Why Sign Up?</h2>
            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>📊</div>
                <div>
                  <h3>Track Your Progress</h3>
                  <p>Monitor your bias detection improvements over time</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>💾</div>
                <div>
                  <h3>Save Analyses</h3>
                  <p>Store and revisit your previous job description analyses</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>📈</div>
                <div>
                  <h3>Detailed Reports</h3>
                  <p>Generate comprehensive reports for your organization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login; 
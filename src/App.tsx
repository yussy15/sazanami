import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Top from './Top';
import { AuthProvider, useAuth } from './AuthContext';
import { performGoogleAuth, handleHashChange } from './AuthService';
import './App.css';
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {
  const { handleAuthSuccess, isAuthenticated, userEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Top');
    }
  }, [isAuthenticated, navigate]);

  // メールアドレスがDBに存在するかを確認
  const checkEmailInDatabase = async (email: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      if (data.exists) {
        handleAuthSuccess();
        navigate('/Top');
      } else {
        navigate('/Signup');
      }
    } catch (error) {
      console.error('Error checking email in DB:', error);
    }
  };

  // Googleauth
  const performGoogleAuthCallback = useCallback(() => {
    performGoogleAuth(handleAuthSuccess, checkEmailInDatabase);
  }, [handleAuthSuccess]);

  useEffect(() => {
    handleHashChange(performGoogleAuthCallback);

    window.addEventListener('hashchange', () => handleHashChange(performGoogleAuthCallback));

    return () => {
      window.removeEventListener('hashchange', () => handleHashChange(performGoogleAuthCallback));
    };
  }, [performGoogleAuthCallback]);

  const Home: React.FC = () => (
    <div className="home-container">
      <h1>さざなみポータル</h1>
      <button className="google-auth-button" onClick={performGoogleAuthCallback}>
        Google認証
      </button>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Top" element={
        <PrivateRoute>
          <Top />
        </PrivateRoute>
      } />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
};

const RootApp: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
};

export default RootApp;

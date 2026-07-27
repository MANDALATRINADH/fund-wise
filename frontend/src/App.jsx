import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StartupForm from './components/StartupForm';
import StartupList from './components/StartupList';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Analytics from './components/Analytics';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('Loaded user from localStorage:', userData);
        setIsLoggedIn(true);
        setUser(userData);
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  // Get user ID for API calls
  const getUserId = () => {
    if (user?.googleId) return user.googleId;
    if (user?.id) return user.id;
    if (user?.sub) return user.sub;
    return null;
  };

  const userId = getUserId();
  console.log('Current userId:', userId);

  return (
    <BrowserRouter>
      <Navbar 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={handleLogout}
      />
      
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Hero />
              <div className="container">
                <section id="submit" className="section">
                  <StartupForm onSuccess={handleSuccess} user={user} />
                </section>
                <section id="list" className="section">
                  <StartupList 
                    key={refreshKey} 
                    refresh={refreshKey} 
                    userId={userId}
                  />
                </section>
              </div>
            </>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard user={user} />
          </ProtectedRoute>
        } />
        
        <Route path="/submit" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <div className="container">
              <section className="section">
                <StartupForm onSuccess={handleSuccess} user={user} />
              </section>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/startups" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <div className="container">
              <section className="section">
                <StartupList 
                  key={refreshKey} 
                  refresh={refreshKey} 
                  userId={userId}
                />
              </section>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/analytics" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Analytics userId={userId} />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

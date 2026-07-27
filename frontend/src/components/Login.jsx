import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '633699024798-6qncpivqvgsqrj770rfeo3sf42jkdkvr.apps.googleusercontent.com';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 60; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 2,
          duration: Math.random() * 12 + 6,
          delay: Math.random() * 6,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  const handleGoogleSuccess = (response) => {
    setLoading(true);
    try {
      const token = response.credential;
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      const userData = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        token: token,
        googleId: payload.sub,
        sub: payload.sub
      };
      
      console.log('Google login success:', userData);
      onLogin(userData);
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
      alert('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
    alert('Google login failed. Please try again.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const userData = {
        name: email.split('@')[0] || 'Demo User',
        email: email || 'demo@example.com',
        picture: null,
        token: 'demo-token',
        googleId: 'demo_' + Date.now(),
        sub: 'demo_' + Date.now()
      };
      console.log('Demo login success:', userData);
      onLogin(userData);
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  const getSubmitButtonText = () => {
    if (loading) return 'Processing...';
    return isLogin ? 'Sign In' : 'Create Account';
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="login-advanced">
        <div className="login-background">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.x + '%',
                top: p.y + '%',
                width: p.size + 'px',
                height: p.size + 'px',
                animationDuration: p.duration + 's',
                animationDelay: p.delay + 's',
              }}
            />
          ))}
          <div className="login-glow glow-1"></div>
          <div className="login-glow glow-2"></div>
        </div>

        <div className="login-container">
          <div className="login-card glass">
            <div className="login-header">
              <div className="login-logo">
                <div className="logo-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <span>AI<span>Funding</span></span>
              </div>
              <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
              <p>{isLogin ? 'Sign in to access your funding dashboard' : 'Join thousands of innovators worldwide'}</p>
            </div>

            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="filled_black"
                shape="rectangular"
                text={isLogin ? "signin_with" : "signup_with"}
                size="large"
                width="100%"
              />
            </div>

            <div className="divider">
              <span>or continue with email</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group-login">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope"></i>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="input-group-login">
                <label>Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                  <button 
                    type="button" 
                    className="toggle-password" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="forgot-password">
                  <a href="#">Forgot Password?</a>
                </div>
              )}

              <button type="submit" className="btn-submit" disabled={loading}>
                {getSubmitButtonText()}
              </button>
            </form>

            <div className="login-footer">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
                  {isLogin ? ' Sign Up' : ' Sign In'}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = '633699024798-6qncpivqvgsqrj770rfeo3sf42jkdkvr.apps.googleusercontent.com';

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

      <style>{`
        .google-login-wrapper {
          margin-bottom: 8px;
        }
        .google-login-wrapper > div {
          width: 100% !important;
        }
        .google-login-wrapper button {
          width: 100% !important;
        }
        .login-advanced {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
          background: #0a0a1e;
        }
        .login-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(79,70,229,0.4), transparent);
          border-radius: 50%;
          animation: floatParticle infinite alternate ease-in-out;
        }
        @keyframes floatParticle {
          0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          100% { transform: translate(40px, -40px) scale(1.5); opacity: 0.7; }
        }
        .login-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: pulseGlow 8s ease-in-out infinite;
        }
        .glow-1 {
          width: 400px;
          height: 400px;
          background: #4f46e5;
          top: -100px;
          right: -100px;
        }
        .glow-2 {
          width: 300px;
          height: 300px;
          background: #7c3aed;
          bottom: -80px;
          left: -80px;
          animation-delay: 4s;
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }
        .login-container {
          width: 100%;
          max-width: 440px;
          position: relative;
          z-index: 1;
        }
        .glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(30px);
          border-radius: 28px;
          padding: 44px 40px;
          box-shadow: 0 20px 80px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
        }
        .glass:hover {
          box-shadow: 0 30px 100px rgba(0,0,0,0.6);
        }
        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .login-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 20px;
        }
        .logo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: white;
          box-shadow: 0 4px 20px rgba(79,70,229,0.3);
        }
        .login-logo span { color: #4f46e5; }
        .login-header h2 {
          color: #ffffff;
          font-size: 28px;
          margin-bottom: 6px;
          font-weight: 700;
        }
        .login-header p {
          color: rgba(255,255,255,0.4);
          font-size: 15px;
        }
        .btn-google {
          width: 100%;
          padding: 14px;
          background: #ffffff;
          color: #1a1a2e;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
        }
        .btn-google:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255,255,255,0.2);
        }
        .btn-google:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .divider {
          display: flex;
          align-items: center;
          margin: 24px 0;
          color: rgba(255,255,255,0.2);
          font-size: 13px;
        }
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }
        .divider span {
          padding: 0 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .input-group-login {
          margin-bottom: 18px;
        }
        .input-group-login label {
          display: block;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 6px;
        }
        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-with-icon i {
          position: absolute;
          left: 16px;
          color: rgba(255,255,255,0.2);
          font-size: 16px;
        }
        .input-with-icon input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          color: #ffffff;
          font-size: 15px;
          transition: all 0.3s ease;
        }
        .input-with-icon input:focus {
          outline: none;
          border-color: #4f46e5;
          background: rgba(255,255,255,0.08);
          box-shadow: 0 0 0 4px rgba(79,70,229,0.1);
        }
        .input-with-icon input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        .toggle-password {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.2);
          cursor: pointer;
          font-size: 16px;
        }
        .toggle-password:hover {
          color: rgba(255,255,255,0.5);
        }
        .forgot-password {
          text-align: right;
          margin-bottom: 22px;
        }
        .forgot-password a {
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.3s ease;
        }
        .forgot-password a:hover {
          color: #4f46e5;
        }
        .btn-submit {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #ffffff;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(79,70,229,0.3);
        }
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(79,70,229,0.4);
        }
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .login-footer {
          text-align: center;
          margin-top: 24px;
        }
        .login-footer p {
          color: rgba(255,255,255,0.3);
          font-size: 14px;
        }
        .login-footer a {
          color: #4f46e5;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .login-footer a:hover {
          color: #7c3aed;
        }
        @media (max-width: 768px) {
          .glass {
            padding: 32px 24px;
          }
          .login-header h2 {
            font-size: 24px;
          }
          .login-logo {
            font-size: 24px;
          }
        }
      `}</style>
    </GoogleOAuthProvider>
  );
};

export default Login;
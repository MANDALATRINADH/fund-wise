import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Navbar = ({ isLoggedIn, user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const currentPage = window.location.pathname;

  const handleLogout = () => {
    setShowDropdown(false);
    onLogout();
    navigate('/login');
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar-dark">
      <div className="container">
        <div className="nav-brand" onClick={() => handleNavClick('/')}>
          <Logo />
        </div>

        <div className="nav-links">
          <button 
            className={currentPage === '/' ? 'nav-link active' : 'nav-link'} 
            onClick={() => handleNavClick('/')}
          >
            <i className="fas fa-home"></i> Home
          </button>
          
          {isLoggedIn && (
            <>
              <button 
                className={currentPage === '/submit' ? 'nav-link active' : 'nav-link'} 
                onClick={() => handleNavClick('/submit')}
              >
                <i className="fas fa-pen-fancy"></i> Submit
              </button>
              <button 
                className={currentPage === '/startups' ? 'nav-link active' : 'nav-link'} 
                onClick={() => handleNavClick('/startups')}
              >
                <i className="fas fa-rocket"></i> Startups
              </button>
              <button 
                className={currentPage === '/dashboard' ? 'nav-link active' : 'nav-link'} 
                onClick={() => handleNavClick('/dashboard')}
              >
                <i className="fas fa-chart-pie"></i> Dashboard
              </button>
            </>
          )}
          
          <button 
            className={currentPage === '/analytics' ? 'nav-link active' : 'nav-link'} 
            onClick={() => handleNavClick('/analytics')}
          >
            <i className="fas fa-chart-bar"></i> Analytics
          </button>
          
          <button 
            className={currentPage === '/about' ? 'nav-link active' : 'nav-link'} 
            onClick={() => handleNavClick('/about')}
          >
            <i className="fas fa-info-circle"></i> About
          </button>
        </div>

        <div className="nav-actions">
          {isLoggedIn ? (
            <div className="user-profile-wrapper">
              <div className="user-profile" onClick={() => handleNavClick('/dashboard')}>
                <div className="user-avatar">
                  {user?.picture ? <img src={user.picture} alt={user.name} /> : <i className="fas fa-user-circle"></i>}
                </div>
                <span className="user-name">{user?.name || 'User'}</span>
              </div>
              <button 
                className="dropdown-toggle-btn" 
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <i className="fas fa-chevron-down"></i>
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => handleNavClick('/dashboard')}>
                    <i className="fas fa-chart-pie"></i> Dashboard
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('/submit')}>
                    <i className="fas fa-pen-fancy"></i> New Submission
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('/startups')}>
                    <i className="fas fa-rocket"></i> View Startups
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('/analytics')}>
                    <i className="fas fa-chart-bar"></i> Analytics
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => handleNavClick('/login')}>
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

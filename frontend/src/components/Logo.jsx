import React from 'react';

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-icon-modern">
        <div className="logo-ai-chip">
          <span className="logo-text-ai">AI</span>
          <div className="logo-pulse"></div>
        </div>
      </div>
      <div className="logo-text">
        <span className="logo-fund">Fund</span>
        <span className="logo-wise">Wise</span>
      </div>
    </div>
  );
};

export default Logo;

import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>About AI Funding Platform</h1>
          <p>Empowering innovators with AI-driven funding intelligence</p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To democratize access to funding by leveraging artificial intelligence to bridge the gap between innovative ideas and the right investors.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">🧠</div>
            <h3>AI-Powered Evaluation</h3>
            <p>Our advanced AI algorithms analyze startup ideas across 6 key dimensions: Innovation, Viability, Team, Market, Product, and Financial strength.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">🤝</div>
            <h3>Smart Investor Matching</h3>
            <p>We connect startups with the right investors based on industry fit, funding stage, investment range, and investor reputation.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">📊</div>
            <h3>Comprehensive Scoring</h3>
            <p>Get detailed scores with actionable feedback including strengths, weaknesses, opportunities, and threats analysis.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">🚀</div>
            <h3>For Everyone</h3>
            <p>Built for entrepreneurs, students, researchers, investors, and government organizations to streamline the funding process.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">🔒</div>
            <h3>Secure & Reliable</h3>
            <p>Your data is protected with enterprise-grade security. We use MongoDB Atlas for secure cloud database management.</p>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Investors Network</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">6</span>
            <span className="stat-label">Scoring Dimensions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">AI-Powered</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Available</span>
          </div>
        </div>

        <div className="about-tech">
          <h3>Built With Modern Technology</h3>
          <div className="tech-stack">
            <span className="tech-tag">React</span>
            <span className="tech-tag">Node.js</span>
            <span className="tech-tag">Express</span>
            <span className="tech-tag">MongoDB</span>
            <span className="tech-tag">AI/ML</span>
            <span className="tech-tag">Vite</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

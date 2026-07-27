import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-sparkles"></i> AI-Powered Analyzing Intelligence
          </div>
          <h1>
            Analyze <span className="gradient-text">Your</span> StartUp <span className="gradient-text"> With</span>  AI
          </h1>
          <p>
            Evaluate your startup, get analyzing readiness scores, and match with top investors — 
            all powered by artificial intelligence.
          </p>
          <div className="hero-buttons">
            <a href="#submit" className="btn btn-primary btn-lg">
              <i className="fas fa-paper-plane"></i> Submit Your Idea
            </a>
            <a href="#list" className="btn btn-secondary btn-lg">
              <i className="fas fa-chart-line"></i> Explore Startups
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

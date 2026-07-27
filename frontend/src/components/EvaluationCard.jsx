import React from 'react';

const EvaluationCard = ({ startup }) => {
  const { 
    name, description, industry, teamSize, fundingGoal,
    stage, businessModel, traction,
    innovationScore, viabilityScore, readinessScore,
    marketScore, teamScore, productScore, financialScore,
    overallScore, matchedInvestors, matchedInvestorDetails,
    feedback, detailedFeedback, status
  } = startup || {};

  const getScoreColor = (score) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreEmoji = (score) => {
    if (score >= 80) return '🚀';
    if (score >= 60) return '💪';
    return '📈';
  };

  // If no startup data, show nothing
  if (!startup || !startup.name) {
    return null;
  }

  return (
    <div className="evaluation-card">
      {/* Header */}
      <div className="eval-header">
        <div>
          <div className="eval-title">
            <h3>{name || 'Unnamed Startup'}</h3>
            <span className="eval-status">{status || 'Submitted'}</span>
          </div>
          <div className="eval-meta">
            <span><i className="fas fa-tag"></i> {industry || 'N/A'}</span>
            <span><i className="fas fa-users"></i> Team: {teamSize || 0}</span>
            <span><i className="fas fa-dollar-sign"></i> Goal: </span>
            {stage && <span><i className="fas fa-rocket"></i> {stage}</span>}
            {businessModel && <span><i className="fas fa-briefcase"></i> {businessModel}</span>}
            {traction && <span><i className="fas fa-chart-line"></i> {traction}</span>}
          </div>
          <p className="eval-description">{description || 'No description provided'}</p>
        </div>
        <div className="eval-score-badge">
          {getScoreEmoji(overallScore)} {overallScore || 0}%
        </div>
      </div>

      {/* 6 Scoring Dimensions */}
      <div className="eval-scores">
        <Score label="Innovation" value={innovationScore || 0} color={getScoreColor(innovationScore || 0)} />
        <Score label="Viability" value={viabilityScore || 0} color={getScoreColor(viabilityScore || 0)} />
        <Score label="Team" value={teamScore || 0} color={getScoreColor(teamScore || 0)} />
        <Score label="Market" value={marketScore || 0} color={getScoreColor(marketScore || 0)} />
        <Score label="Product" value={productScore || 0} color={getScoreColor(productScore || 0)} />
        <Score label="Financial" value={financialScore || 0} color={getScoreColor(financialScore || 0)} />
      </div>

      {/* AI Analysis Feedback */}
      <div className="eval-feedback">
        <div className="feedback-header">
          <i className="fas fa-comment"></i> AI Analysis
        </div>
        <p className="feedback-text">{feedback || 'Analysis in progress...'}</p>
        
        <div className="feedback-details">
          {detailedFeedback?.strengths && detailedFeedback.strengths.length > 0 && (
            <div className="feedback-strengths">
              <p className="feedback-label strengths">✅ Strengths</p>
              <ul>
                {detailedFeedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {detailedFeedback?.weaknesses && detailedFeedback.weaknesses.length > 0 && (
            <div className="feedback-weaknesses">
              <p className="feedback-label weaknesses">⚠️ Areas to Improve</p>
              <ul>
                {detailedFeedback.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {detailedFeedback?.opportunities && detailedFeedback.opportunities.length > 0 && (
            <div className="feedback-opportunities">
              <p className="feedback-label opportunities">💡 Opportunities</p>
              <ul>
                {detailedFeedback.opportunities.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {detailedFeedback?.threats && detailedFeedback.threats.length > 0 && (
            <div className="feedback-threats">
              <p className="feedback-label threats">🚨 Threats</p>
              <ul>
                {detailedFeedback.threats.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Matched Investors */}
      <div className="eval-investors">
        <div className="investors-header">
          <i className="fas fa-handshake"></i> Matched Investors
          <span className="investors-count-badge">
            {matchedInvestors?.length || 0} matched
          </span>
        </div>
        {matchedInvestorDetails && matchedInvestorDetails.length > 0 ? (
          <div className="investors-grid">
            {matchedInvestorDetails.map((inv, idx) => (
              <div key={idx} className="investor-card">
                <div className="investor-top">
                  <div className="investor-info">
                    <strong>{inv.name}</strong>
                    <span className="investor-type">{inv.type}</span>
                  </div>
                  <span className="investor-match-score">{inv.matchScore}% Match</span>
                </div>
                <div className="investor-details">
                  <div>Industry: {inv.industries?.slice(0, 3).join(', ')}</div>
                  <div className="investor-description">{inv.description || ''}</div>
                  <div className="investor-funding">
                    <span>💰 K - M</span>
                  </div>
                  {inv.website && (
                    <a href={inv.website} target="_blank" rel="noopener noreferrer" className="investor-link">
                      <i className="fas fa-external-link-alt"></i> Visit Website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-investors">
            <i className="fas fa-search"></i>
            <p>No investors matched yet. Submit your startup to get matches.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Score = ({ label, value, color }) => {
  return (
    <div className="score-item">
      <div className="score-label">
        <span>{label}</span>
        <span className="score-value" style={{ color: color }}>{value}%</span>
      </div>
      <div className="score-bar">
        <div className="score-fill" style={{ width: value + '%', background: color }}></div>
      </div>
    </div>
  );
};

export default EvaluationCard;

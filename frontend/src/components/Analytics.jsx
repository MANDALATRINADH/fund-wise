import React, { useState, useEffect } from 'react';
import { fetchMyStartups } from '../services/api';

const Analytics = ({ userId }) => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    avgInnovation: 0,
    avgViability: 0,
    avgReadiness: 0,
    avgTeam: 0,
    avgMarket: 0,
    avgProduct: 0,
    avgFinancial: 0,
    topIndustries: [],
    stageDistribution: {},
    totalFundingRequested: 0
  });

  useEffect(() => {
    loadAnalytics();
  }, [userId]);

  const loadAnalytics = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetchMyStartups(userId);
      const data = res.data;
      setStartups(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    if (!data || data.length === 0) {
      setStats({ ...stats, total: 0 });
      return;
    }

    const total = data.length;
    
    const avgInnovation = data.reduce((sum, s) => sum + (s.innovationScore || 0), 0) / total;
    const avgViability = data.reduce((sum, s) => sum + (s.viabilityScore || 0), 0) / total;
    const avgReadiness = data.reduce((sum, s) => sum + (s.overallScore || 0), 0) / total;
    const avgTeam = data.reduce((sum, s) => sum + (s.teamScore || 0), 0) / total;
    const avgMarket = data.reduce((sum, s) => sum + (s.marketScore || 0), 0) / total;
    const avgProduct = data.reduce((sum, s) => sum + (s.productScore || 0), 0) / total;
    const avgFinancial = data.reduce((sum, s) => sum + (s.financialScore || 0), 0) / total;
    const totalFundingRequested = data.reduce((sum, s) => sum + (s.fundingGoal || 0), 0);

    const industryCount = {};
    data.forEach(s => {
      if (s.industry) {
        industryCount[s.industry] = (industryCount[s.industry] || 0) + 1;
      }
    });
    const topIndustries = Object.entries(industryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    const stageDistribution = {};
    data.forEach(s => {
      const stage = s.stage || 'Unknown';
      stageDistribution[stage] = (stageDistribution[stage] || 0) + 1;
    });

    setStats({
      total,
      avgInnovation: Math.round(avgInnovation),
      avgViability: Math.round(avgViability),
      avgReadiness: Math.round(avgReadiness),
      avgTeam: Math.round(avgTeam),
      avgMarket: Math.round(avgMarket),
      avgProduct: Math.round(avgProduct),
      avgFinancial: Math.round(avgFinancial),
      topIndustries,
      stageDistribution,
      totalFundingRequested
    });
  };

  if (loading) {
    return (
      <div className="analytics-loading">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading your analytics...</p>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="container">
        <div className="analytics-header">
          <h1>📊 Your Analytics</h1>
          <p>Your personal startup performance insights</p>
        </div>

        <div className="analytics-grid">
          <div className="stat-card">
            <div className="stat-icon">🚀</div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Your Startups</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-value">M</div>
            <div className="stat-label">Total Funding Requested</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-value">{stats.avgReadiness}%</div>
            <div className="stat-label">Avg. Readiness Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💡</div>
            <div className="stat-value">{stats.avgInnovation}%</div>
            <div className="stat-label">Avg. Innovation Score</div>
          </div>
        </div>

        <div className="score-breakdown">
          <h3>📊 Your Average Scores Breakdown</h3>
          <div className="score-bars">
            <div className="score-row">
              <span>Innovation</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: stats.avgInnovation + '%', background: '#4f46e5' }}></div>
              </div>
              <span className="score-value">{stats.avgInnovation}%</span>
            </div>
            <div className="score-row">
              <span>Viability</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: stats.avgViability + '%', background: '#22c55e' }}></div>
              </div>
              <span className="score-value">{stats.avgViability}%</span>
            </div>
            <div className="score-row">
              <span>Team</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: stats.avgTeam + '%', background: '#f59e0b' }}></div>
              </div>
              <span className="score-value">{stats.avgTeam}%</span>
            </div>
            <div className="score-row">
              <span>Market</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: stats.avgMarket + '%', background: '#8b5cf6' }}></div>
              </div>
              <span className="score-value">{stats.avgMarket}%</span>
            </div>
            <div className="score-row">
              <span>Product</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: stats.avgProduct + '%', background: '#ec4899' }}></div>
              </div>
              <span className="score-value">{stats.avgProduct}%</span>
            </div>
            <div className="score-row">
              <span>Financial</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: stats.avgFinancial + '%', background: '#06b6d4' }}></div>
              </div>
              <span className="score-value">{stats.avgFinancial}%</span>
            </div>
          </div>
        </div>

        <div className="analytics-grid-2">
          <div className="analytics-card">
            <h3>🏢 Your Top Industries</h3>
            {stats.topIndustries.length > 0 ? (
              stats.topIndustries.map((industry, i) => (
                <div key={i} className="industry-item">
                  <span>{industry.name}</span>
                  <span className="industry-count">{industry.count}</span>
                </div>
              ))
            ) : (
              <p className="no-data">No data yet</p>
            )}
          </div>

          <div className="analytics-card">
            <h3>📌 Your Stage Distribution</h3>
            {Object.keys(stats.stageDistribution).length > 0 ? (
              Object.entries(stats.stageDistribution).map(([stage, count]) => (
                <div key={stage} className="stage-item">
                  <span>{stage}</span>
                  <span className="stage-count">{count}</span>
                </div>
              ))
            ) : (
              <p className="no-data">No data yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

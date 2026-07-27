import React, { useState, useEffect } from 'react';
import { fetchMyStartups } from '../services/api';

const Dashboard = ({ user }) => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    totalFunding: 0,
    avgReadiness: 0,
    avgInnovation: 0,
    avgViability: 0,
    matchedInvestors: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const userId = user.googleId || user.sub || user.id;
      const res = await fetchMyStartups(userId);
      const data = res.data || [];
      setStartups(data);
      
      // Calculate stats
      const total = data.length;
      let totalFunding = 0;
      let totalReadiness = 0;
      let totalInnovation = 0;
      let totalViability = 0;
      let allMatchedInvestors = 0;

      data.forEach(s => {
        totalFunding += s.fundingGoal || 0;
        totalReadiness += s.overallScore || 0;
        totalInnovation += s.innovationScore || 0;
        totalViability += s.viabilityScore || 0;
        allMatchedInvestors += s.matchedInvestors?.length || 0;
      });

      setStats({
        total,
        totalFunding,
        avgReadiness: total > 0 ? Math.round(totalReadiness / total) : 0,
        avgInnovation: total > 0 ? Math.round(totalInnovation / total) : 0,
        avgViability: total > 0 ? Math.round(totalViability / total) : 0,
        matchedInvestors: allMatchedInvestors
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '40px', color: '#4f46e5' }}></i>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '16px' }}>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ 
        background: 'rgba(255,255,255,0.05)', 
        backdropFilter: 'blur(10px)', 
        borderRadius: '20px', 
        padding: '40px', 
        border: '1px solid rgba(255,255,255,0.08)', 
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'white', 
            fontSize: '32px' 
          }}>
            {user?.picture ? <img src={user.picture} alt="user" style={{ width: '100%', borderRadius: '50%' }} /> : <i className="fas fa-user"></i>}
          </div>
          <div>
            <h1 style={{ fontSize: '28px', marginBottom: '4px', color: 'white' }}>Welcome back, {user?.name || 'User'}!</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Here's your startup funding overview</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '32px', color: '#4f46e5' }}>{stats.total}</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Startups Submitted</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '32px', color: '#4f46e5' }}>K</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Total Funding Requested</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '32px', color: '#4f46e5' }}>{stats.avgReadiness}%</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Avg. Readiness Score</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '32px', color: '#4f46e5' }}>{stats.matchedInvestors}</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Investor Matches</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(79,70,229,0.1)', padding: '15px', borderRadius: '10px' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Innovation</p>
            <p style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>{stats.avgInnovation}%</p>
          </div>
          <div style={{ background: 'rgba(34,197,94,0.1)', padding: '15px', borderRadius: '10px' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Viability</p>
            <p style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>{stats.avgViability}%</p>
          </div>
          <div style={{ background: 'rgba(245,158,11,0.1)', padding: '15px', borderRadius: '10px' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Readiness</p>
            <p style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>{stats.avgReadiness}%</p>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ marginBottom: '12px', color: 'white' }}>🚀 Quick Actions</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)' }}>
              ✅ Submit your first startup idea
            </li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)' }}>
              ✅ Get AI-powered evaluation
            </li>
            <li style={{ padding: '8px 0', color: 'rgba(255,255,255,0.7)' }}>
              ✅ Connect with matched investors
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

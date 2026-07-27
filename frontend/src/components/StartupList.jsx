import React, { useEffect, useState } from 'react';
import { fetchMyStartups } from '../services/api';
import EvaluationCard from './EvaluationCard';

const StartupList = ({ refresh, userId }) => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    if (!userId) {
      setLoading(false);
      setStartups([]);
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetchMyStartups(userId);
      console.log('Startups data:', res.data);
      setStartups(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error loading startups:', err);
      setError('Failed to load your startups');
      setStartups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refresh, userId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '40px', color: '#4f46e5' }}></i>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '16px' }}>Loading your startups...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', color: '#e17055' }}>
        <i className="fas fa-exclamation-circle" style={{ fontSize: '40px' }}></i>
        <p style={{ marginTop: '16px' }}>{error}</p>
      </div>
    );
  }

  if (!startups || startups.length === 0) {
    return (
      <div>
        <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: '#ffffff' }}>
          <i className="fas fa-list-ul" style={{ color: '#4f46e5' }}></i>
          Your Startups
          <span style={{ 
            background: 'rgba(79,70,229,0.2)', 
            color: '#4f46e5', 
            padding: '2px 12px', 
            borderRadius: '50px', 
            fontSize: '14px',
            fontWeight: 600
          }}>
            0 Startups
          </span>
        </h2>
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <i className="fas fa-rocket" style={{ fontSize: '48px', color: 'rgba(255,255,255,0.2)', marginBottom: '16px' }}></i>
          <h3 style={{ color: 'rgba(255,255,255,0.6)' }}>No startups yet</h3>
          <p style={{ color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>Submit your first startup idea to get AI evaluation!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: '#ffffff' }}>
        <i className="fas fa-list-ul" style={{ color: '#4f46e5' }}></i>
        Your Startups
        <span style={{ 
          background: 'rgba(79,70,229,0.2)', 
          color: '#4f46e5', 
          padding: '2px 12px', 
          borderRadius: '50px', 
          fontSize: '14px',
          fontWeight: 600
        }}>
          {startups.length} {startups.length === 1 ? 'Startup' : 'Startups'}
        </span>
      </h2>
      <div style={{ display: 'grid', gap: '24px' }}>
        {startups.map((item) => (
          <EvaluationCard key={item._id} startup={item} />
        ))}
      </div>
    </div>
  );
};

export default StartupList;

import React, { useState } from 'react';
import { submitStartup } from '../services/api';

const StartupForm = ({ onSuccess, user }) => {
  const [form, setForm] = useState({ 
    name: '', 
    description: '', 
    industry: '', 
    teamSize: '', 
    fundingGoal: '',
    yearFounded: '',
    stage: '',
    businessModel: '',
    revenueCurrent: '',
    revenueProjected: '',
    marketSize: '',
    competitors: '',
    traction: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const MAX_DESCRIPTION_CHARS = 2000;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'description' && value.length > MAX_DESCRIPTION_CHARS) {
      return;
    }
    
    setForm({ ...form, [name]: value });
    
    if (name === 'description') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (form.description.length > MAX_DESCRIPTION_CHARS) {
      setError('Description cannot exceed 2000 characters');
      setLoading(false);
      return;
    }
    
    try {
      const payload = { 
        ...form, 
        teamSize: Number(form.teamSize), 
        fundingGoal: Number(form.fundingGoal),
        yearFounded: form.yearFounded ? Number(form.yearFounded) : undefined,
        revenueCurrent: form.revenueCurrent ? Number(form.revenueCurrent) : undefined,
        revenueProjected: form.revenueProjected ? Number(form.revenueProjected) : undefined,
        marketSize: form.marketSize ? Number(form.marketSize) : undefined,
        competitors: form.competitors ? form.competitors.split(',').map(c => c.trim()) : undefined,
        userId: user?.googleId || user?.id || 'anonymous',
        userEmail: user?.email || 'anonymous@email.com',
        userName: user?.name || 'Anonymous User'
      };
      const res = await submitStartup(payload);
      if (res.status === 201) {
        setForm({ 
          name: '', description: '', industry: '', teamSize: '', fundingGoal: '',
          yearFounded: '', stage: '', businessModel: '', revenueCurrent: '',
          revenueProjected: '', marketSize: '', competitors: '', traction: ''
        });
        setCharCount(0);
        onSuccess && onSuccess();
        alert('✅ Startup submitted! AI evaluation completed.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const stageOptions = [
    { value: '', label: 'Select your startup stage...' },
    { value: 'Pre-seed', label: '🌱 Pre-seed', desc: 'Early development - building MVP', risk: 'High', funding: 'Friends & Family' },
    { value: 'Seed', label: '🌿 Seed', desc: 'Product-market fit - initial traction', risk: 'Medium-High', funding: 'Angels, Micro VCs' },
    { value: 'Series A', label: '🌳 Series A', desc: 'Scaling - proven model', risk: 'Medium', funding: 'Venture Capital' },
    { value: 'Series B', label: '🏢 Series B', desc: 'Growth stage - market expansion', risk: 'Medium-Low', funding: 'Growth VCs' },
    { value: 'Growth', label: '📈 Growth', desc: 'Late stage - scaling operations', risk: 'Low', funding: 'PE, Late-stage VCs' }
  ];

  const businessModelOptions = [
    { value: '', label: 'Select business model...' },
    { value: 'B2B', label: 'B2B (Business to Business)' },
    { value: 'B2C', label: 'B2C (Business to Consumer)' },
    { value: 'SaaS', label: 'SaaS (Software as a Service)' },
    { value: 'Marketplace', label: 'Marketplace' },
    { value: 'E-commerce', label: 'E-commerce' }
  ];

  const getStageInfo = (val) => stageOptions.find(o => o.value === val);

  const getProgressWidth = () => {
    if (!form.stage) return '0%';
    const idx = stageOptions.slice(1).findIndex(o => o.value === form.stage);
    return ((idx / (stageOptions.length - 2)) * 100) + '%';
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <div className="form-icon">
          <i className="fas fa-lightbulb"></i>
        </div>
        <div>
          <h2>Submit Your Idea</h2>
          <p>Get AI evaluation across 6 dimensions + investor matching</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Startup Name <span className="required">*</span></label>
          <input 
            type="text" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            maxLength="100"
            placeholder="e.g. AI HealthTech"
          />
          <div className="char-hint">{form.name.length}/100</div>
        </div>
        
        <div className="input-group">
          <label>Description <span className="required">*</span></label>
          <textarea 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            required 
            placeholder="Describe your startup idea in detail (max 2000 characters)..."
          />
          <div className={'char-hint ' + (charCount > MAX_DESCRIPTION_CHARS ? 'char-over' : '')}>
            {charCount}/{MAX_DESCRIPTION_CHARS} characters
            {charCount > MAX_DESCRIPTION_CHARS && ' ⚠️ Exceeded!'}
          </div>
        </div>
        
        <div className="grid-2">
          <div className="input-group">
            <label>Industry <span className="required">*</span></label>
            <input 
              type="text" 
              name="industry" 
              value={form.industry} 
              onChange={handleChange} 
              required 
              maxLength="50"
              placeholder="e.g. FinTech, HealthTech"
            />
            <div className="char-hint">{form.industry.length}/50</div>
          </div>
          <div className="input-group">
            <label>Team Size <span className="required">*</span></label>
            <input 
              type="number" 
              name="teamSize" 
              value={form.teamSize} 
              onChange={handleChange} 
              required 
              min="1" 
              max="1000"
              placeholder="e.g. 5"
            />
          </div>
        </div>
        
        <div className="grid-2">
          <div className="input-group">
            <label>Funding Goal ($) <span className="required">*</span></label>
            <input 
              type="number" 
              name="fundingGoal" 
              value={form.fundingGoal} 
              onChange={handleChange} 
              required 
              min="0" 
              max="999999999"
              placeholder="e.g. 250000"
            />
          </div>
          <div className="input-group stage-group">
            <label>Startup Stage <span className="required">*</span></label>
            <div className="stage-wrapper">
              <select 
                name="stage" 
                value={form.stage} 
                onChange={handleChange} 
                required
                className="stage-select"
              >
                {stageOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            
            {form.stage && (
              <div className="stage-info active">
                <div className="stage-desc">{getStageInfo(form.stage)?.desc}</div>
                <div className="stage-meta">
                  <span className="stage-risk">
                    <i className="fas fa-exclamation-triangle"></i> 
                    Risk: <span className={getStageInfo(form.stage)?.risk === 'High' ? 'risk-high' : getStageInfo(form.stage)?.risk === 'Medium' ? 'risk-medium' : 'risk-low'}>
                      {getStageInfo(form.stage)?.risk}
                    </span>
                  </span>
                  <span className="stage-funding">
                    <i className="fas fa-dollar-sign"></i> {getStageInfo(form.stage)?.funding}
                  </span>
                </div>
              </div>
            )}

            <div className="stage-progress">
              {stageOptions.slice(1).map((opt, idx) => {
                const isActive = form.stage === opt.value;
                const isComplete = stageOptions.slice(1).findIndex(o => o.value === form.stage) > idx && form.stage;
                return (
                  <React.Fragment key={opt.value}>
                    <div className={'progress-dot ' + (isActive ? 'active' : isComplete ? 'completed' : '')}></div>
                    {idx < stageOptions.slice(1).length - 1 && (
                      <div className="progress-line">
                        <div className="progress-fill" style={{ width: getProgressWidth() }}></div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="form-hint">
              <i className="fas fa-info-circle"></i> Select your startup stage for better investor matching
            </div>
          </div>
        </div>
        
        <div className="advanced-toggle">
          <button 
            type="button" 
            className="btn-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <i className={showAdvanced ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
            {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
          </button>
        </div>
        
        {showAdvanced && (
          <div className="advanced-section">
            <div className="grid-2">
              <div className="input-group">
                <label>Year Founded</label>
                <input 
                  type="number" 
                  name="yearFounded" 
                  value={form.yearFounded} 
                  onChange={handleChange} 
                  placeholder="e.g. 2023" 
                  min="2000" 
                  max={new Date().getFullYear()} 
                />
              </div>
              <div className="input-group">
                <label>Business Model</label>
                <select name="businessModel" value={form.businessModel} onChange={handleChange}>
                  {businessModelOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label>Current Revenue ($)</label>
                <input 
                  type="number" 
                  name="revenueCurrent" 
                  value={form.revenueCurrent} 
                  onChange={handleChange} 
                  placeholder="e.g. 50000" 
                  min="0" 
                  max="999999999"
                />
              </div>
              <div className="input-group">
                <label>Projected Revenue ($)</label>
                <input 
                  type="number" 
                  name="revenueProjected" 
                  value={form.revenueProjected} 
                  onChange={handleChange} 
                  placeholder="e.g. 500000" 
                  min="0" 
                  max="999999999"
                />
              </div>
            </div>
            <div className="input-group">
              <label>Market Size ($)</label>
              <input 
                type="number" 
                name="marketSize" 
                value={form.marketSize} 
                onChange={handleChange} 
                placeholder="e.g. 1000000" 
                min="0" 
                max="999999999"
              />
            </div>
            <div className="input-group">
              <label>Competitors (comma separated)</label>
              <input 
                type="text" 
                name="competitors" 
                value={form.competitors} 
                onChange={handleChange} 
                placeholder="e.g. Company A, Company B" 
                maxLength="200"
              />
              <div className="char-hint">{form.competitors.length}/200</div>
            </div>
            <div className="input-group">
              <label>Traction / Milestones</label>
              <input 
                type="text" 
                name="traction" 
                value={form.traction} 
                onChange={handleChange} 
                placeholder="e.g. 1000 users,  MRR" 
                maxLength="150"
              />
              <div className="char-hint">{form.traction.length}/150</div>
            </div>
          </div>
        )}
        
        {error && <p className="form-error">{error}</p>}
        
        <button 
          type="submit" 
          className="btn-submit-form" 
          disabled={loading}
        >
          {loading ? <><i className="fas fa-spinner fa-spin"></i> Analyzing...</> : <><i className="fas fa-robot"></i> Evaluate & Get Matched</>}
        </button>
      </form>
    </div>
  );
};

export default StartupForm;

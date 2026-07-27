import Startup from '../models/Startup.js';

// ========== INVESTOR DATABASE ==========
const INVESTOR_DATABASE = [
  {
    name: 'Sequoia Capital',
    type: 'VC',
    logo: 'https://logo.clearbit.com/sequoiacap.com',
    industries: ['FinTech', 'HealthTech', 'AI', 'SaaS', 'Cloud'],
    stageFocus: ['Seed', 'Series A', 'Series B', 'Growth'],
    minInvestment: 1000000,
    maxInvestment: 50000000,
    website: 'https://www.sequoiacap.com',
    reputation: 9.5,
    successRate: 92,
    description: 'One of the most prestigious VC firms globally'
  },
  {
    name: 'Y Combinator',
    type: 'Accelerator',
    logo: 'https://logo.clearbit.com/ycombinator.com',
    industries: ['All Industries'],
    stageFocus: ['Pre-seed', 'Seed'],
    minInvestment: 125000,
    maxInvestment: 500000,
    website: 'https://www.ycombinator.com',
    reputation: 9.8,
    successRate: 95,
    description: "World's most successful startup accelerator"
  },
  {
    name: 'Andreessen Horowitz',
    type: 'VC',
    logo: 'https://logo.clearbit.com/a16z.com',
    industries: ['AI', 'Tech', 'SaaS', 'Crypto', 'Biotech'],
    stageFocus: ['Seed', 'Series A', 'Series B'],
    minInvestment: 2000000,
    maxInvestment: 50000000,
    website: 'https://a16z.com',
    reputation: 9.7,
    successRate: 94,
    description: 'Leading venture capital firm backing bold founders'
  },
  {
    name: 'Techstars',
    type: 'Accelerator',
    logo: 'https://logo.clearbit.com/techstars.com',
    industries: ['All Industries'],
    stageFocus: ['Pre-seed', 'Seed'],
    minInvestment: 120000,
    maxInvestment: 500000,
    website: 'https://www.techstars.com',
    reputation: 9.2,
    successRate: 88,
    description: 'Global startup accelerator with mentor-driven approach'
  },
  {
    name: '500 Startups',
    type: 'VC',
    logo: 'https://logo.clearbit.com/500.co',
    industries: ['FinTech', 'Digital Media', 'Marketplace', 'E-commerce'],
    stageFocus: ['Seed', 'Series A'],
    minInvestment: 150000,
    maxInvestment: 3000000,
    website: 'https://500.co',
    reputation: 9.0,
    successRate: 85,
    description: 'Early-stage VC firm with global portfolio'
  },
  {
    name: 'Kleiner Perkins',
    type: 'VC',
    logo: 'https://logo.clearbit.com/kleinerperkins.com',
    industries: ['HealthTech', 'GreenTech', 'SaaS', 'Biotech'],
    stageFocus: ['Series A', 'Series B', 'Growth'],
    minInvestment: 5000000,
    maxInvestment: 100000000,
    website: 'https://www.kleinerperkins.com',
    reputation: 9.4,
    successRate: 90,
    description: 'Pioneering VC firm with 50+ years of history'
  },
  {
    name: 'Founders Fund',
    type: 'VC',
    logo: 'https://logo.clearbit.com/foundersfund.com',
    industries: ['DeepTech', 'AI', 'Biotech', 'Space', 'Crypto'],
    stageFocus: ['Seed', 'Series A', 'Series B'],
    minInvestment: 3000000,
    maxInvestment: 100000000,
    website: 'https://foundersfund.com',
    reputation: 9.6,
    successRate: 91,
    description: 'Founded by Peter Thiel, investing in frontier tech'
  },
  {
    name: 'First Round Capital',
    type: 'VC',
    logo: 'https://logo.clearbit.com/firstround.com',
    industries: ['SaaS', 'Marketplace', 'HealthTech', 'FinTech'],
    stageFocus: ['Pre-seed', 'Seed'],
    minInvestment: 500000,
    maxInvestment: 5000000,
    website: 'https://firstround.com',
    reputation: 9.3,
    successRate: 89,
    description: 'Seed-stage VC with deep founder support'
  },
  {
    name: 'Accel',
    type: 'VC',
    logo: 'https://logo.clearbit.com/accel.com',
    industries: ['FinTech', 'SaaS', 'AI', 'Cloud', 'Security'],
    stageFocus: ['Seed', 'Series A', 'Series B'],
    minInvestment: 1000000,
    maxInvestment: 30000000,
    website: 'https://www.accel.com',
    reputation: 9.4,
    successRate: 90,
    description: 'Global VC firm powering category-defining companies'
  },
  {
    name: 'Lightspeed Venture Partners',
    type: 'VC',
    logo: 'https://logo.clearbit.com/lsvp.com',
    industries: ['FinTech', 'AI', 'SaaS', 'Cloud', 'Consumer'],
    stageFocus: ['Seed', 'Series A', 'Series B'],
    minInvestment: 1000000,
    maxInvestment: 25000000,
    website: 'https://lsvp.com',
    reputation: 9.1,
    successRate: 87,
    description: 'Global VC firm investing in disruptive technologies'
  },
  {
    name: 'Bessemer Venture Partners',
    type: 'VC',
    logo: 'https://logo.clearbit.com/bvp.com',
    industries: ['SaaS', 'AI', 'Cloud', 'FinTech', 'HealthTech'],
    stageFocus: ['Seed', 'Series A', 'Series B', 'Growth'],
    minInvestment: 2000000,
    maxInvestment: 50000000,
    website: 'https://www.bvp.com',
    reputation: 9.2,
    successRate: 88,
    description: 'VC firm with century-long history of investing'
  },
  {
    name: 'SBIR Program',
    type: 'Government',
    logo: 'https://logo.clearbit.com/sbir.gov',
    industries: ['Technology', 'Research', 'Biotech', 'Defense'],
    stageFocus: ['Pre-seed', 'Seed'],
    minInvestment: 50000,
    maxInvestment: 250000,
    website: 'https://www.sbir.gov',
    reputation: 8.5,
    successRate: 75,
    description: 'US government grant program for small businesses'
  },
  {
    name: 'NSF Innovation Corps (I-Corps)',
    type: 'Government',
    logo: 'https://logo.clearbit.com/nsf.gov',
    industries: ['Research', 'Technology', 'Science', 'Education'],
    stageFocus: ['Pre-seed'],
    minInvestment: 50000,
    maxInvestment: 100000,
    website: 'https://www.nsf.gov',
    reputation: 8.7,
    successRate: 78,
    description: 'NSF program for moving research to market'
  }
];

// ========== AI EVALUATION ==========
function evaluateStartup(startup) {
  const { description, industry, teamSize, fundingGoal, yearFounded, stage, businessModel } = startup;
  
  let innovationScore = Math.floor(Math.random() * 20) + 70;
  let viabilityScore = Math.floor(Math.random() * 20) + 60;
  let teamScore = teamSize >= 10 ? 85 : teamSize >= 5 ? 75 : 60;
  if (yearFounded && (new Date().getFullYear() - yearFounded) > 2) teamScore += 10;
  let marketScore = Math.floor(Math.random() * 20) + 70;
  let productScore = Math.floor(Math.random() * 20) + 60;
  let financialScore = fundingGoal <= 500000 ? 80 : fundingGoal <= 2000000 ? 70 : 60;
  if (startup.revenueCurrent && startup.revenueCurrent > 100000) financialScore += 10;
  if (startup.revenueProjected && startup.revenueProjected > 1000000) financialScore += 10;
  
  const overallScore = (innovationScore*0.25 + viabilityScore*0.20 + teamScore*0.20 + marketScore*0.15 + productScore*0.10 + financialScore*0.10);
  
  const strengths = [];
  const weaknesses = [];
  const opportunities = [];
  const threats = [];
  if (innovationScore > 80) strengths.push('High innovation potential');
  else weaknesses.push('Innovation could be more disruptive');
  if (teamScore > 70) strengths.push('Strong team composition');
  else weaknesses.push('Team could be expanded');
  if (marketScore > 75) strengths.push('Strong market opportunity');
  else weaknesses.push('Market validation needed');
  if (productScore > 70) strengths.push('Product has good traction');
  else weaknesses.push('Product development needed');
  if (financialScore > 70) strengths.push('Strong financial projections');
  else weaknesses.push('Financial planning needs improvement');
  if (startup.competitors && startup.competitors.length > 0) opportunities.push('Competitor analysis available');
  if (startup.traction) opportunities.push('Existing traction - good for investor confidence');
  if (startup.businessModel) opportunities.push('Clear business model');
  if (fundingGoal > 2000000) threats.push('High funding goal may limit investor pool');
  if (teamSize < 3) threats.push('Small team may struggle with execution');
  if (!startup.traction) threats.push('No traction yet');
  
  const matchedInvestors = matchInvestors(startup, INVESTOR_DATABASE);
  
  console.log('Matched Investors:', matchedInvestors);
  
  let feedback = '';
  if (overallScore > 80) feedback = '🚀 Excellent! Your startup is well-positioned for funding. ';
  else if (overallScore > 65) feedback = '💪 Good potential! With some refinements, you could be funding-ready. ';
  else if (overallScore > 50) feedback = '📈 Promising idea! Focus on improving key areas. ';
  else feedback = '🔧 Your idea has potential. Consider our detailed feedback. ';
  if (innovationScore > 80) feedback += 'Strong innovation potential. ';
  else feedback += 'Consider enhancing your value proposition. ';
  if (teamScore > 70) feedback += 'Great team composition. ';
  else feedback += 'Consider expanding your team. ';
  if (marketScore > 75) feedback += 'Strong market opportunity. ';
  else feedback += 'Validate your market more thoroughly. ';
  
  return {
    innovationScore: Math.round(innovationScore),
    viabilityScore: Math.round(viabilityScore),
    readinessScore: Math.round(overallScore),
    marketScore: Math.round(marketScore),
    teamScore: Math.round(teamScore),
    productScore: Math.round(productScore),
    financialScore: Math.round(financialScore),
    overallScore: Math.round(overallScore),
    matchedInvestors: matchedInvestors.map(i => i.name),
    matchedInvestorDetails: matchedInvestors,
    feedback: feedback,
    detailedFeedback: {
      strengths: strengths.slice(0, 3),
      weaknesses: weaknesses.slice(0, 3),
      opportunities: opportunities.slice(0, 3),
      threats: threats.slice(0, 3)
    }
  };
}

function matchInvestors(startup, investors) {
  const { industry, fundingGoal, stage } = startup;
  return investors
    .map(investor => {
      let score = 0;
      if (investor.industries.includes(industry) || investor.industries.includes('All Industries')) score += 30;
      if (investor.stageFocus && stage && investor.stageFocus.includes(stage)) score += 25;
      if (investor.minInvestment <= fundingGoal && fundingGoal <= investor.maxInvestment) score += 25;
      score += (investor.reputation || 0) * 2;
      score += (investor.successRate || 0) * 0.5;
      return { ...investor, matchScore: Math.round(score) };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);
}

// ========== CONTROLLER FUNCTIONS ==========
export const createStartup = async (req, res) => {
  try {
    console.log('Creating startup with data:', req.body);
    
    const { 
      name, description, industry, teamSize, fundingGoal,
      yearFounded, stage, businessModel, revenueCurrent, 
      revenueProjected, marketSize, competitors, traction,
      userId, userEmail, userName
    } = req.body;
    
    if (!name || !description || !industry || !teamSize || !fundingGoal) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }
    
    if (description && description.length > 2000) {
      return res.status(400).json({ error: 'Description cannot exceed 2000 characters' });
    }
    
    const startupData = {
      name: name.trim(),
      description: description.trim(),
      industry: industry.trim(),
      teamSize: Number(teamSize),
      fundingGoal: Number(fundingGoal),
      yearFounded: yearFounded ? Number(yearFounded) : null,
      stage: stage || 'Pre-seed',
      businessModel: businessModel || 'B2B',
      revenueCurrent: revenueCurrent ? Number(revenueCurrent) : 0,
      revenueProjected: revenueProjected ? Number(revenueProjected) : 0,
      marketSize: marketSize ? Number(marketSize) : 0,
      competitors: competitors || [],
      traction: traction || '',
      userId: userId || 'anonymous',
      userEmail: userEmail || 'anonymous@email.com',
      userName: userName || 'Anonymous User',
      status: 'Submitted'
    };
    
    const evaluation = evaluateStartup(startupData);
    const newStartup = new Startup({ ...startupData, ...evaluation });
    const saved = await newStartup.save();
    
    console.log('Startup saved with investors:', saved.matchedInvestorDetails);
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating startup:', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
};

export const getMyStartups = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const startups = await Startup.find({ userId }).sort({ createdAt: -1 });
    console.log('Found ' + startups.length + ' startups for user ' + userId);
    res.json(startups);
  } catch (error) {
    console.error('Error fetching startups:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getStartups = async (req, res) => {
  try {
    const startups = await Startup.find().sort({ createdAt: -1 });
    res.json(startups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) return res.status(404).json({ error: 'Not found' });
    res.json(startup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import Startup from '../models/Startup.js';

// ========== SIMPLE INVESTOR DATABASE ==========
const INVESTOR_DATABASE = [
  {
    name: 'Sequoia Capital',
    type: 'VC',
    industries: ['FinTech', 'HealthTech', 'AI'],
    stageFocus: ['Seed', 'Series A'],
    minInvestment: 1000000,
    maxInvestment: 50000000,
    reputation: 9.5,
    successRate: 92
  },
  {
    name: 'Y Combinator',
    type: 'Accelerator',
    industries: ['All Industries'],
    stageFocus: ['Pre-seed', 'Seed'],
    minInvestment: 125000,
    maxInvestment: 500000,
    reputation: 9.8,
    successRate: 95
  },
  {
    name: 'Andreessen Horowitz',
    type: 'VC',
    industries: ['AI', 'Tech'],
    stageFocus: ['Seed', 'Series A'],
    minInvestment: 2000000,
    maxInvestment: 50000000,
    reputation: 9.7,
    successRate: 94
  }
];

// ========== AI EVALUATION ==========
function evaluateStartup(startup) {
  const { teamSize, fundingGoal, stage } = startup;
  
  const innovationScore = Math.floor(Math.random() * 20) + 70;
  const viabilityScore = Math.floor(Math.random() * 20) + 60;
  const teamScore = teamSize >= 5 ? 85 : 65;
  const marketScore = Math.floor(Math.random() * 20) + 70;
  const productScore = Math.floor(Math.random() * 20) + 60;
  const financialScore = fundingGoal <= 500000 ? 80 : 60;
  
  const overallScore = (innovationScore + viabilityScore + teamScore + marketScore + productScore + financialScore) / 6;
  
  // Match investors
  const matchedInvestors = matchInvestors(startup, INVESTOR_DATABASE);
  
  const feedback = 'Your startup shows good potential. Consider refining your business model.';
  
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
      strengths: ['Good team composition', 'Strong market potential'],
      weaknesses: ['Product development needed'],
      opportunities: ['Market growth'],
      threats: ['Competition']
    }
  };
}

function matchInvestors(startup, investors) {
  const { industry, fundingGoal, stage } = startup;
  return investors
    .map(investor => {
      let score = 0;
      if (investor.industries.includes(industry) || investor.industries.includes('All Industries')) score += 30;
      if (investor.stageFocus.includes(stage)) score += 25;
      if (investor.minInvestment <= fundingGoal && fundingGoal <= investor.maxInvestment) score += 25;
      score += (investor.reputation || 0) * 2;
      return { ...investor, matchScore: Math.round(score) };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}

// ========== CONTROLLER FUNCTIONS ==========
export const createStartup = async (req, res) => {
  try {
    console.log('📝 Creating startup...');
    console.log('📤 Received:', req.body);
    
    const { name, description, industry, teamSize, fundingGoal, stage, userId, userEmail } = req.body;
    
    if (!name || !description || !industry || !teamSize || !fundingGoal) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }
    
    const startupData = {
      name: name.trim(),
      description: description.trim(),
      industry: industry.trim(),
      teamSize: Number(teamSize),
      fundingGoal: Number(fundingGoal),
      stage: stage || 'Pre-seed',
      userId: userId || 'anonymous',
      userEmail: userEmail || 'anonymous@email.com',
      status: 'Submitted'
    };
    
    const evaluation = evaluateStartup(startupData);
    const newStartup = new Startup({ ...startupData, ...evaluation });
    const saved = await newStartup.save();
    
    console.log('✅ Startup saved! ID:', saved._id);
    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getMyStartups = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('📋 Fetching for userId:', userId);
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const startups = await Startup.find({ userId }).sort({ createdAt: -1 });
    console.log('📋 Found:', startups.length);
    res.json(startups);
  } catch (error) {
    console.error('❌ Error:', error);
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

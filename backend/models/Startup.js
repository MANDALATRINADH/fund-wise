import mongoose from 'mongoose';

const StartupSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  industry: { type: String, required: true, trim: true },
  teamSize: { type: Number, required: true, min: 1 },
  fundingGoal: { type: Number, required: true, min: 0 },
  
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String },
  
  yearFounded: { type: Number },
  stage: { type: String, default: 'Pre-seed' },
  businessModel: { type: String, default: 'B2B' },
  revenueCurrent: { type: Number, default: 0 },
  revenueProjected: { type: Number, default: 0 },
  marketSize: { type: Number, default: 0 },
  competitors: { type: [String], default: [] },
  traction: { type: String, default: '' },
  
  innovationScore: { type: Number, default: 0 },
  viabilityScore: { type: Number, default: 0 },
  readinessScore: { type: Number, default: 0 },
  marketScore: { type: Number, default: 0 },
  teamScore: { type: Number, default: 0 },
  productScore: { type: Number, default: 0 },
  financialScore: { type: Number, default: 0 },
  overallScore: { type: Number, default: 0 },
  
  matchedInvestors: { type: [String], default: [] },
  matchedInvestorDetails: { type: [Object], default: [] },
  
  feedback: { type: String, default: '' },
  detailedFeedback: {
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },
    opportunities: { type: [String], default: [] },
    threats: { type: [String], default: [] }
  },
  
  status: { type: String, default: 'Draft' },
}, { timestamps: true });

export default mongoose.model('Startup', StartupSchema);

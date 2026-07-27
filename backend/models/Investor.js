import mongoose from 'mongoose';

const InvestorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['VC', 'Angel', 'Accelerator', 'Government', 'Corporate'], required: true },
  industries: { type: [String], required: true },
  stageFocus: { type: [String], enum: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Growth', 'Late Stage'] },
  geographicFocus: { type: [String] },
  minInvestment: { type: Number },
  maxInvestment: { type: Number },
  website: { type: String },
  logo: { type: String },
  reputation: { type: Number, default: 0 },
  successRate: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Investor', InvestorSchema);

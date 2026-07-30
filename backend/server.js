import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import startupRoutes from './routes/startups.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Fund-Wise API is running' });
});

// Routes
app.use('/api/startups', startupRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// MongoDB connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set in environment variables');
} else {
  console.log('Attempting to connect to MongoDB...');
  
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000
  })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.error('Please check your MONGODB_URI and network access.');
  });
}

// Start server
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

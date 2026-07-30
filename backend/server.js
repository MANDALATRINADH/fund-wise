import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import startupRoutes from './routes/startups.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - Allow ALL origins for testing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Log all requests for debugging
app.use((req, res, next) => {
  console.log('Request:', req.method, req.url);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running on Render' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Fund-Wise API is running' });
});

// Mount startup routes
app.use('/api/startups', startupRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found: ' + req.method + ' ' + req.url });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => console.error('MongoDB connection error:', err));
} else {
  console.log('No MongoDB URI provided');
}

// Start server
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

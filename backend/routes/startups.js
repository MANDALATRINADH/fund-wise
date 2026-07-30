import express from 'express';
import { createStartup, getMyStartups, getStartups, getStartup } from '../controllers/startupController.js';

const router = express.Router();

// Route order matters - put specific routes before generic ones
router.get('/my', getMyStartups);        // GET /api/startups/my
router.post('/', createStartup);          // POST /api/startups
router.get('/', getStartups);             // GET /api/startups
router.get('/:id', getStartup);           // GET /api/startups/:id

export default router;

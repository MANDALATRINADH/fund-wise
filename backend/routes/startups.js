import express from 'express';
import { createStartup, getMyStartups, getStartups, getStartup } from '../controllers/startupController.js';

const router = express.Router();

// Order matters: specific routes first
router.get('/my', getMyStartups);
router.post('/', createStartup);
router.get('/', getStartups);
router.get('/:id', getStartup);

export default router;

import express from 'express';
import { createStartup, getMyStartups, getStartups, getStartup } from '../controllers/startupController.js';

const router = express.Router();

router.post('/', createStartup);
router.get('/my', getMyStartups);
router.get('/', getStartups);
router.get('/:id', getStartup);

export default router;

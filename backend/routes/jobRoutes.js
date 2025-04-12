// backend/routes/jobRoutes.js
import express from 'express';
import { postJob, getJobs } from '../controllers/jobController.js';
const router = express.Router();

router.post('/create', postJob);
router.get('/all', getJobs);

export default router;

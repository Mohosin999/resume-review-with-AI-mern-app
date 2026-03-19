import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import {
  analyzeJobMatch,
  getJobMatches,
  getJobMatch,
  deleteJobMatchController,
} from '../controllers/jobMatch';

const router = Router();

// All routes require authentication
router.use(authenticate);

// POST /api/job-match/analyze - Analyze resume against job description
router.post('/analyze', analyzeJobMatch);

// GET /api/job-match - Get all job matches for user
router.get('/', getJobMatches);

// GET /api/job-match/:id - Get specific job match
router.get('/:id', getJobMatch);

// DELETE /api/job-match/:id - Delete job match
router.delete('/:id', deleteJobMatchController);

export default router;

import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import {
  analyzeJobMatch,
  getJobMatches,
  getJobMatch,
  deleteJobMatchController,
  deleteAllJobMatchesController,
} from '../controllers/jobMatchHistory';

const router = Router();

router.use(authenticate);

router.post('/analyze', analyzeJobMatch);
router.get('/', getJobMatches);
router.get('/:id', getJobMatch);
router.delete('/:id', deleteJobMatchController);
router.delete('/', deleteAllJobMatchesController);

export default router;

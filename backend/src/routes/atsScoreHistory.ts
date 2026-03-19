import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import {
  analyzeAtsScore,
  getAtsScores,
  getAtsScore,
  deleteAtsScoreController,
  deleteAllAtsScoresController,
} from '../controllers/atsScoreHistory';

const router = Router();

router.use(authenticate);

router.post('/analyze', analyzeAtsScore);
router.get('/', getAtsScores);
router.get('/:id', getAtsScore);
router.delete('/:id', deleteAtsScoreController);
router.delete('/', deleteAllAtsScoresController);

export default router;

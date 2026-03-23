import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import {
  saveResumeBuild,
  getResumeBuilds,
  getResumeBuild,
  deleteResumeBuildController,
  deleteAllResumeBuildsController,
  updateResumeBuildController,
} from '../controllers/resumeBuildHistory';

const router = Router();

router.use(authenticate);

router.post('/', saveResumeBuild);
router.get('/', getResumeBuilds);
router.get('/:id', getResumeBuild);
router.put('/:id', updateResumeBuildController);
router.delete('/:id', deleteResumeBuildController);
router.delete('/', deleteAllResumeBuildsController);

export default router;

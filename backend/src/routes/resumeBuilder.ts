import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import {
  createTemplate,
  getTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
  generateSection,
  improveSection,
  checkAts,
} from '../controllers/resumeBuilder';

const router = Router();

// All routes require authentication
router.use(authenticate);

// POST /api/resume-builder/templates - Create new template
router.post('/templates', createTemplate);

// GET /api/resume-builder/templates - Get all templates
router.get('/templates', getTemplates);

// GET /api/resume-builder/templates/:id - Get specific template
router.get('/templates/:id', getTemplate);

// PUT /api/resume-builder/templates/:id - Update template
router.put('/templates/:id', updateTemplate);

// DELETE /api/resume-builder/templates/:id - Delete template
router.delete('/templates/:id', deleteTemplate);

// POST /api/resume-builder/generate-section - Generate section content with AI
router.post('/generate-section', generateSection);

// POST /api/resume-builder/improve-section - Improve existing section
router.post('/improve-section', improveSection);

// POST /api/resume-builder/check-ats - Check ATS friendliness
router.post('/check-ats', checkAts);

export default router;

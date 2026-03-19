import authRoutes from './auth';
import userRoutes from './users';
import resumeRoutes from './resumes';
import analysisRoutes from './analysis';
import jobRoutes from './jobs';
import atsScoreRoutes from './atsScore';
import jobMatchRoutes from './jobMatch';
import resumeBuilderRoutes from './resumeBuilder';

export {
  authRoutes,
  userRoutes,
  resumeRoutes,
  analysisRoutes,
  jobRoutes,
  atsScoreRoutes,
  jobMatchRoutes,
  resumeBuilderRoutes,
};

export const routes = [
  { path: '/api/auth', router: authRoutes },
  { path: '/api/users', router: userRoutes },
  { path: '/api/resumes', router: resumeRoutes },
  { path: '/api/analysis', router: analysisRoutes },
  { path: '/api/jobs', router: jobRoutes },
  { path: '/api/ats-score', router: atsScoreRoutes },
  { path: '/api/job-match', router: jobMatchRoutes },
  { path: '/api/resume-builder', router: resumeBuilderRoutes },
];

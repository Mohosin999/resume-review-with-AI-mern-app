import authRoutes from './auth';
import userRoutes from './users';
import analysisRoutes from './analysis';
import jobRoutes from './jobs';
import atsScoreHistoryRoutes from './atsScoreHistory';
import jobMatchHistoryRoutes from './jobMatchHistory';
import resumeBuildHistoryRoutes from './resumeBuildHistory';
import resumeBuilderRoutes from './resumeBuilder';
import resumeParserRoutes from './resumeParser';

export {
  authRoutes,
  userRoutes,
  analysisRoutes,
  jobRoutes,
  atsScoreHistoryRoutes,
  jobMatchHistoryRoutes,
  resumeBuildHistoryRoutes,
  resumeBuilderRoutes,
  resumeParserRoutes,
};

export const routes = [
  { path: '/api/auth', router: authRoutes },
  { path: '/api/users', router: userRoutes },
  { path: '/api/analysis', router: analysisRoutes },
  { path: '/api/jobs', router: jobRoutes },
  { path: '/api/ats-score-history', router: atsScoreHistoryRoutes },
  { path: '/api/job-match-history', router: jobMatchHistoryRoutes },
  { path: '/api/resume-build-history', router: resumeBuildHistoryRoutes },
  { path: '/api/resume-builder', router: resumeBuilderRoutes },
  { path: '/api/resume-parser', router: resumeParserRoutes },
];

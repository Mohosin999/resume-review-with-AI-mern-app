import { JobMatch } from '../../models/JobMatch';
import { Resume } from '../../models/Resume';
import { analyzeJobMatch as analyzeWithGemini } from '../aiAnalysis/gemini';

export const calculateJobMatch = async (
  userId: string,
  resumeId: string,
  jobDescription: string,
  jobTitle?: string,
  company?: string
) => {
  const resume = await Resume.findOne({
    _id: resumeId,
    userId,
  });

  if (!resume) {
    throw new Error('Resume not found');
  }

  // Analyze with Gemini AI
  const analysis = await analyzeWithGemini(
    resume.content,
    jobDescription,
    jobTitle,
    company
  );

  // Save the analysis result
  const jobMatch = await JobMatch.create({
    userId,
    resumeId,
    jobDescription,
    jobTitle,
    company,
    matchPercentage: analysis.matchPercentage,
    breakdown: analysis.breakdown,
    missingSkills: analysis.missingSkills,
    missingKeywords: analysis.missingKeywords,
    suggestions: analysis.suggestions,
  });

  return jobMatch;
};

export const getJobMatchHistory = async (userId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [matches, total] = await Promise.all([
    JobMatch.find({ userId })
      .populate('resumeId', 'metadata.filename content.personalInfo.fullName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    JobMatch.countDocuments({ userId }),
  ]);

  return {
    matches,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getJobMatchById = async (userId: string, matchId: string) => {
  const match = await JobMatch.findOne({
    _id: matchId,
    userId,
  }).populate('resumeId', 'metadata.filename content');

  if (!match) {
    throw new Error('Job Match not found');
  }

  return match;
};

export const deleteJobMatch = async (userId: string, matchId: string) => {
  const result = await JobMatch.deleteOne({
    _id: matchId,
    userId,
  });

  if (result.deletedCount === 0) {
    throw new Error('Job Match not found');
  }

  return { success: true };
};

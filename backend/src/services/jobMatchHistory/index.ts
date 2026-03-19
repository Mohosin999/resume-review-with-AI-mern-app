import { JobMatchHistory } from '../../models/JobMatchHistory';
import { analyzeJobMatch as analyzeWithGemini } from '../aiAnalysis/gemini';
import { ResumeContent } from '../../types';

export const createJobMatchHistory = async (
  userId: string,
  resumeName: string,
  resumeContent: ResumeContent,
  jobDescription: string
) => {
  const analysis = await analyzeWithGemini(
    resumeContent,
    jobDescription
  );

  const title = `${resumeName} – Job Match v${Date.now().toString(36).slice(-4)}`;

  const jobMatchHistory = await JobMatchHistory.create({
    userId,
    title,
    resumeName,
    jobDescription,
    matchPercentage: analysis.matchPercentage,
    breakdown: analysis.breakdown,
    missingSkills: analysis.missingSkills,
    missingKeywords: analysis.missingKeywords,
    suggestions: analysis.suggestions,
    resumeContent,
  });

  return jobMatchHistory;
};

export const getJobMatchHistory = async (userId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [matches, total] = await Promise.all([
    JobMatchHistory.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    JobMatchHistory.countDocuments({ userId }),
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

export const getJobMatchHistoryById = async (userId: string, historyId: string) => {
  const match = await JobMatchHistory.findOne({
    _id: historyId,
    userId,
  });

  if (!match) {
    throw new Error('Job Match history not found');
  }

  return match;
};

export const deleteJobMatchHistory = async (userId: string, historyId: string) => {
  const result = await JobMatchHistory.deleteOne({
    _id: historyId,
    userId,
  });

  if (result.deletedCount === 0) {
    throw new Error('Job Match history not found');
  }

  return { success: true };
};

export const deleteAllJobMatchHistory = async (userId: string) => {
  await JobMatchHistory.deleteMany({ userId });
  return { success: true };
};

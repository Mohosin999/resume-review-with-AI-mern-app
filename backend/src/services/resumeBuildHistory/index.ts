import { ResumeBuildHistory } from '../../models/ResumeBuildHistory';
import { ResumeContent } from '../../types';

export const createResumeBuildHistory = async (
  userId: string,
  resumeContent: ResumeContent
) => {
  const title = `${resumeContent.personalInfo?.fullName || 'Resume'} – Resume Builder v${Date.now().toString(36).slice(-4)}`;

  const resumeBuildHistory = await ResumeBuildHistory.create({
    userId,
    title,
    resumeContent,
  });

  return resumeBuildHistory;
};

export const getResumeBuildHistory = async (userId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [builds, total] = await Promise.all([
    ResumeBuildHistory.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    ResumeBuildHistory.countDocuments({ userId }),
  ]);

  return {
    builds,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getResumeBuildHistoryById = async (userId: string, historyId: string) => {
  const build = await ResumeBuildHistory.findOne({
    _id: historyId,
    userId,
  });

  if (!build) {
    throw new Error('Resume Build history not found');
  }

  return build;
};

export const deleteResumeBuildHistory = async (userId: string, historyId: string) => {
  const result = await ResumeBuildHistory.deleteOne({
    _id: historyId,
    userId,
  });

  if (result.deletedCount === 0) {
    throw new Error('Resume Build history not found');
  }

  return { success: true };
};

export const deleteAllResumeBuildHistory = async (userId: string) => {
  await ResumeBuildHistory.deleteMany({ userId });
  return { success: true };
};

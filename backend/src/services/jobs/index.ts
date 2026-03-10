import { JobDescription } from "../../models/JobDescription";

interface JobInput {
  title: string;
  company?: string;
  description: string;
}

interface PaginationOptions {
  page: number;
  limit: number;
}

export const getAllJobsByUser = async (
  userId: string,
  options: PaginationOptions
) => {
  const { page, limit } = options;
  const skip = (page - 1) * limit;

  const [jobs, total] = await Promise.all([
    JobDescription.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    JobDescription.countDocuments({ userId }),
  ]);

  return {
    jobs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const getJobById = async (jobId: string, userId: string) => {
  return JobDescription.findOne({ _id: jobId, userId });
};

export const createJob = async (jobData: JobInput, userId: string) => {
  return JobDescription.create({
    ...jobData,
    userId,
  });
};

export const updateJobById = async (
  jobId: string,
  userId: string,
  jobData: Partial<JobInput>
) => {
  return JobDescription.findOneAndUpdate(
    { _id: jobId, userId },
    { $set: jobData },
    { new: true, runValidators: true }
  );
};

export const deleteJobById = async (jobId: string, userId: string) => {
  return JobDescription.findOneAndDelete({ _id: jobId, userId });
};

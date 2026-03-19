import mongoose, { Document, Schema } from 'mongoose';

export interface IJobMatch extends Document {
  userId: mongoose.Types.ObjectId;
  resumeId: mongoose.Types.ObjectId;
  jobDescription: string;
  jobTitle?: string;
  company?: string;
  matchPercentage: number;
  breakdown: {
    keywords: { score: number; matched: string[]; missing: string[] };
    skills: { score: number; matched: string[]; missing: string[] };
    education: { score: number; details: string };
    experience: { score: number; yearsMatched: number; yearsRequired?: number };
  };
  missingSkills: string[];
  missingKeywords: string[];
  suggestions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const jobMatchSchema = new Schema<IJobMatch>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
      index: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
    },
    company: {
      type: String,
    },
    matchPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    breakdown: {
      keywords: {
        score: { type: Number, required: true, min: 0, max: 100 },
        matched: [{ type: String }],
        missing: [{ type: String }],
      },
      skills: {
        score: { type: Number, required: true, min: 0, max: 100 },
        matched: [{ type: String }],
        missing: [{ type: String }],
      },
      education: {
        score: { type: Number, required: true, min: 0, max: 100 },
        details: { type: String, required: true },
      },
      experience: {
        score: { type: Number, required: true, min: 0, max: 100 },
        yearsMatched: { type: Number, default: 0 },
        yearsRequired: { type: Number },
      },
    },
    missingSkills: [
      {
        type: String,
      },
    ],
    missingKeywords: [
      {
        type: String,
      },
    ],
    suggestions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

jobMatchSchema.index({ userId: 1, createdAt: -1 });

export const JobMatch = mongoose.model<IJobMatch>('JobMatch', jobMatchSchema);

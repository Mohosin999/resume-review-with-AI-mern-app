import mongoose, { Document, Schema } from 'mongoose';
import { IResume } from './Resume';

export interface IJobMatchHistory extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  resumeName: string;
  jobDescription: string;
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
  resumeContent: IResume['content'];
  createdAt: Date;
  updatedAt: Date;
}

const jobMatchHistorySchema = new Schema<IJobMatchHistory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    resumeName: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
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
    resumeContent: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

jobMatchHistorySchema.index({ userId: 1, createdAt: -1 });

export const JobMatchHistory = mongoose.model<IJobMatchHistory>('JobMatchHistory', jobMatchHistorySchema);

import mongoose, { Document, Schema } from 'mongoose';
import { IResume } from './Resume';

export interface IAtsScoreHistory extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  resumeName: string;
  overallScore: number;
  sectionScores: {
    summary: { score: number; feedback: string };
    experience: { score: number; feedback: string };
    projects: { score: number; feedback: string };
    skills: { score: number; feedback: string };
    contactInfo: { score: number; feedback: string; hasContactInfo: boolean };
  };
  spellingGrammar: {
    score: number;
    errors: Array<{ type: string; message: string; suggestion: string }>;
  };
  atsFriendliness: number;
  suggestions: string[];
  resumeContent: IResume['content'];
  createdAt: Date;
  updatedAt: Date;
}

const atsScoreHistorySchema = new Schema<IAtsScoreHistory>(
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
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    sectionScores: {
      summary: {
        score: { type: Number, required: true, min: 0, max: 100 },
        feedback: { type: String, required: true },
      },
      experience: {
        score: { type: Number, required: true, min: 0, max: 100 },
        feedback: { type: String, required: true },
      },
      projects: {
        score: { type: Number, required: true, min: 0, max: 100 },
        feedback: { type: String, required: true },
      },
      skills: {
        score: { type: Number, required: true, min: 0, max: 100 },
        feedback: { type: String, required: true },
      },
      contactInfo: {
        score: { type: Number, required: true, min: 0, max: 100 },
        feedback: { type: String, required: true },
        hasContactInfo: { type: Boolean, required: true },
      },
    },
    spellingGrammar: {
      score: { type: Number, required: true, min: 0, max: 100 },
      errors: [
        {
          type: { type: String, enum: ['spelling', 'grammar', 'punctuation', 'formatting', 'redundancy', 'content/formatting', 'grammar/punctuation'] },
          message: { type: String, required: true },
          suggestion: { type: String, required: true },
        },
      ],
    },
    atsFriendliness: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
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

atsScoreHistorySchema.index({ userId: 1, createdAt: -1 });

export const AtsScoreHistory = mongoose.model<IAtsScoreHistory>('AtsScoreHistory', atsScoreHistorySchema);

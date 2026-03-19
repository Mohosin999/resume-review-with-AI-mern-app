import mongoose, { Document, Schema } from 'mongoose';

export interface IAtsScore extends Document {
  userId: mongoose.Types.ObjectId;
  resumeId: mongoose.Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

const atsScoreSchema = new Schema<IAtsScore>(
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
          type: { type: String, enum: ['spelling', 'grammar', 'punctuation'] },
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
  },
  {
    timestamps: true,
  }
);

atsScoreSchema.index({ userId: 1, createdAt: -1 });

export const AtsScore = mongoose.model<IAtsScore>('AtsScore', atsScoreSchema);

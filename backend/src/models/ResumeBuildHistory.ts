import mongoose, { Document, Schema } from 'mongoose';
import { IResume } from './Resume';

export interface IResumeBuildHistory extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  resumeContent: IResume['content'];
  createdAt: Date;
  updatedAt: Date;
}

const resumeBuildHistorySchema = new Schema<IResumeBuildHistory>(
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
    resumeContent: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

resumeBuildHistorySchema.index({ userId: 1, createdAt: -1 });

export const ResumeBuildHistory = mongoose.model<IResumeBuildHistory>('ResumeBuildHistory', resumeBuildHistorySchema);

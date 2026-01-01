import { Schema, model, Document } from 'mongoose';
import { IAnalysisJob, IAnalysisMetadata } from '@shared/types';

export interface IAnalysisJobDocument extends Omit<IAnalysisJob, 'id'>, Document {
  id: string;
}

const analysisMetadataSchema = new Schema<IAnalysisMetadata>(
  {
    statement_bank: { type: String },
    period_start: { type: String },
    period_end: { type: String },
    account_type: { type: String },
  },
  { _id: false }
);

const analysisJobSchema = new Schema<IAnalysisJobDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['csv', 'txt', 'pdf'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
      index: true,
    },
    uploadedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
    metadata: {
      type: analysisMetadataSchema,
    },
    analysisResult: {
      type: Schema.Types.Mixed,
    },
    errorMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

analysisJobSchema.index({ userId: 1, uploadedAt: -1 });
analysisJobSchema.index({ code: 1, userId: 1 });

export const AnalysisJobModel = model<IAnalysisJobDocument>('AnalysisJob', analysisJobSchema);

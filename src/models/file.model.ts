import mongoose, { Schema, Document } from 'mongoose';
import { IFile } from '@shared/types';

export interface IFileDocument extends Omit<IFile, 'id'>, Document {
  id: string;
}

const fileSchema = new Schema<IFileDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    fileName: {
      type: String,
      required: true,
      index: true,
    },
    fileType: {
      type: String,
      enum: ['csv', 'txt', 'pdf'],
      required: true,
      index: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    processedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'files',
  }
);

fileSchema.index({ fileType: 1, processedAt: -1 });
fileSchema.index({ fileName: 1, processedAt: -1 });

export const FileModel = mongoose.model<IFileDocument>('File', fileSchema);

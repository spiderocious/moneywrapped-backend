export type FileType = 'csv' | 'txt' | 'pdf';

export interface IFile {
  id: string;
  fileName: string;
  fileType: FileType;
  fileSize: number;
  processedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileContentResponse {
  content: string;
}

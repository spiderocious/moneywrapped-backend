export interface IAnalysisMetadata {
  statement_bank?: string;
  period_start?: string;
  period_end?: string;
  account_type?: string;
}

export interface IAnalysisJob {
  id: string;
  code: string; // 8-char alphanumeric
  userId: string;
  fileName: string;
  fileSize: number;
  fileType: 'csv' | 'txt' | 'pdf';
  status: 'pending' | 'success' | 'failed';
  uploadedAt: Date;
  completedAt?: Date;
  metadata?: IAnalysisMetadata;
  analysisResult?: any; // Full JSON from OpenAI
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalysisJobListResponse {
  code: string;
  status: 'pending' | 'success' | 'failed';
  fileName: string;
  fileSize: number;
  fileType: 'csv' | 'txt' | 'pdf';
  uploadedAt: Date;
  completedAt?: Date;
  metadata?: IAnalysisMetadata;
}

export interface AnalysisJobDetailResponse {
  code: string;
  status: 'pending' | 'success' | 'failed';
  fileName: string;
  fileSize: number;
  fileType: 'csv' | 'txt' | 'pdf';
  uploadedAt: Date;
  completedAt?: Date;
  metadata?: IAnalysisMetadata;
  analysisResult?: any;
  errorMessage?: string;
}

export interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "xlsx";
  size: number;
  uploadedAt: string;
  status: "processing" | "completed" | "failed";
  summary?: string;
  insights?: string[];
  confidenceScore?: number;
}

export interface ProcessingStatus {
  stage: "uploading" | "extracting" | "summarizing" | "insights" | "completed";
  progress: number;
  message: string;
}

export interface SummarizationResult {
  summary: string;
  keyInsights: string[];
  entities: string[];
  confidenceScore: number;
}
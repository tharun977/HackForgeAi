// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  user: User;
  expires: Date;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  prompt: string;
  status: ProjectStatus;
  isPublic: boolean;
  language: string;
  framework: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectStatus = 'draft' | 'generating' | 'completed' | 'failed';

export interface ProjectFile {
  id: string;
  projectId: string;
  name: string;
  path: string;
  content: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

// Collaboration Types
export interface Collaborator {
  id: string;
  userId: string;
  projectId: string;
  role: CollaboratorRole;
  createdAt: Date;
  updatedAt: Date;
}

export type CollaboratorRole = 'owner' | 'editor' | 'viewer';

// Real-time Types
export interface UserPresence {
  userId: string;
  userName: string;
  userImage?: string;
  cursor?: {
    x: number;
    y: number;
  };
  selection?: {
    start: number;
    end: number;
    filePath: string;
  };
  lastActive: Date;
}

// Message Types
export interface Message {
  id: string;
  projectId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Analytics Types
export interface ProjectAnalytics {
  id: string;
  projectId: string;
  generationTime: number;
  codeLines: number;
  fileCount: number;
  languageDistribution: Record<string, number>;
  createdAt: Date;
}
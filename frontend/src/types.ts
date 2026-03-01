export type RecruiterInput = {
  recruiterName: string;
  company: string;
  roleTitle: string;
  jobDescription: string;
  tone: 'confident' | 'friendly' | 'technical';
};

export type PortfolioData = {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  coreSkills: string[];
  highlights: string[];
  projects: Array<{
    name: string;
    summary: string;
    tech: string[];
    impact: string;
    link: string;
  }>;
};

export type TailoredPortfolio = {
  mode: 'ai' | 'fallback';
  sessionId?: number;
  shareId?: string;
  headline: string;
  tailoredSummary: string;
  whyFit: string[];
  selectedProjects: Array<{
    name: string;
    angle: string;
    tech: string[];
    impact: string;
    link: string;
  }>;
  generatedAt: string;
};

export type HistoryItem = {
  sessionId: number;
  shareId: string;
  recruiterName: string;
  company: string;
  roleTitle: string;
  tone: string;
  createdAt: string;
  result: TailoredPortfolio;
};

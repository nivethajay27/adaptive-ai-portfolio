import type {
  HistoryItem,
  PortfolioData,
  RecruiterInput,
  TailoredPortfolio
} from './types';

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export async function tailorPortfolio(payload: {
  recruiter: RecruiterInput;
  basePortfolio: PortfolioData;
}): Promise<TailoredPortfolio> {
  const response = await fetch(`${API_URL}/api/tailor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to generate tailored portfolio');
  }

  return (await response.json()) as TailoredPortfolio;
}

export async function fetchHistory(): Promise<HistoryItem[]> {
  const response = await fetch(`${API_URL}/api/history`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to load history');
  }
  return (await response.json()) as HistoryItem[];
}

export async function fetchSharedResult(shareId: string): Promise<TailoredPortfolio> {
  const response = await fetch(`${API_URL}/api/share/${shareId}`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to load shared result');
  }
  return (await response.json()) as TailoredPortfolio;
}

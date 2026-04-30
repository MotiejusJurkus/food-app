import axios from 'axios';
import { analysisSchema } from '@/lib/schema';
import type { Analysis } from '@/lib/types';

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? ''
).replace(/\/$/, '');

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export async function analyzeImage(file: File): Promise<Analysis> {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await apiClient.post('/api/nutrition/analyze/', formData);
  return analysisSchema.parse(data);
}

export function resolveImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

import type { z } from 'zod';
import type {
  analysisSchema,
  ingredientSchema,
  nutriScoreSchema,
  nutritionalFieldsSchema,
} from '@/lib/schema';

export type Analysis = z.infer<typeof analysisSchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;
export type NutritionalFields = z.infer<typeof nutritionalFieldsSchema>;
export type NutriScore = z.infer<typeof nutriScoreSchema>;

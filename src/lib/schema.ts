import { z } from 'zod';

export const nutritionalFieldsSchema = z
  .object({
    energy_kcal: z.number().nullable().optional(),
    carbohydrate_g: z.number().nullable().optional(),
    protein_g: z.number().nullable().optional(),
    fat_total_g: z.number().nullable().optional(),
    fat_saturated_g: z.number().nullable().optional(),
    fat_polyunsaturated_g: z.number().nullable().optional(),
    fat_monounsaturated_g: z.number().nullable().optional(),
    fat_trans_g: z.number().nullable().optional(),
    fiber_total_dietary_g: z.number().nullable().optional(),
    sugars_total_g: z.number().nullable().optional(),
    sodium_mg: z.number().nullable().optional(),
    potassium_mg: z.number().nullable().optional(),
    magnesium_mg: z.number().nullable().optional(),
    vitamin_c_mg: z.number().nullable().optional(),
    vitamin_e_mg: z.number().nullable().optional(),
    vitamin_k_mcg: z.number().nullable().optional(),
    folate_mcg: z.number().nullable().optional(),
  })
  .passthrough();

export const ingredientSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_translated: z.string().nullable().optional(),
  serving_size: z.number().nullable().optional(),
  unit: z.string().nullable().optional(),
  nutritional_fields: nutritionalFieldsSchema,
});

export const nutriScoreSchema = z.enum(['A', 'B', 'C', 'D', 'E']);

export const analysisSchema = z.object({
  id: z.number(),
  status: z.string(),
  dish_name: z.string(),
  dish_name_translated: z.string().nullable().optional(),
  dish_description: z.string().nullable().optional(),
  dish_description_translated: z.string().nullable().optional(),
  nutri_score: nutriScoreSchema.nullable().optional(),
  serving_size: z.number().nullable().optional(),
  unit: z.string().nullable().optional(),
  consumed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  image_id: z.number().nullable().optional(),
  nutritional_fields: nutritionalFieldsSchema,
  ingredients: z.array(ingredientSchema).default([]),
});

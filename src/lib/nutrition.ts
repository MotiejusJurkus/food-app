export const NUTRITION_FIELD_KEYS = [
  'energy_kcal',
  'protein_g',
  'carbohydrate_g',
  'fat_total_g',
  'fat_saturated_g',
  'fat_monounsaturated_g',
  'fat_polyunsaturated_g',
  'fat_trans_g',
  'fiber_total_dietary_g',
  'sugars_total_g',
  'sodium_mg',
  'potassium_mg',
  'magnesium_mg',
  'vitamin_c_mg',
  'vitamin_e_mg',
  'vitamin_k_mcg',
  'folate_mcg',
] as const;

export type NutritionFieldKey = (typeof NUTRITION_FIELD_KEYS)[number];
export type NutritionFieldGroup = 'macros' | 'fats' | 'carbs' | 'minerals' | 'vitamins';

type FieldMeta = {
  key: NutritionFieldKey;
  unit: string;
  group: NutritionFieldGroup;
};

export const NUTRITION_FIELDS: FieldMeta[] = [
  { key: 'energy_kcal', unit: 'kcal', group: 'macros' },
  { key: 'protein_g', unit: 'g', group: 'macros' },
  { key: 'carbohydrate_g', unit: 'g', group: 'macros' },
  { key: 'fat_total_g', unit: 'g', group: 'macros' },

  { key: 'fat_saturated_g', unit: 'g', group: 'fats' },
  { key: 'fat_monounsaturated_g', unit: 'g', group: 'fats' },
  { key: 'fat_polyunsaturated_g', unit: 'g', group: 'fats' },
  { key: 'fat_trans_g', unit: 'g', group: 'fats' },

  { key: 'fiber_total_dietary_g', unit: 'g', group: 'carbs' },
  { key: 'sugars_total_g', unit: 'g', group: 'carbs' },

  { key: 'sodium_mg', unit: 'mg', group: 'minerals' },
  { key: 'potassium_mg', unit: 'mg', group: 'minerals' },
  { key: 'magnesium_mg', unit: 'mg', group: 'minerals' },

  { key: 'vitamin_c_mg', unit: 'mg', group: 'vitamins' },
  { key: 'vitamin_e_mg', unit: 'mg', group: 'vitamins' },
  { key: 'vitamin_k_mcg', unit: 'mcg', group: 'vitamins' },
  { key: 'folate_mcg', unit: 'mcg', group: 'vitamins' },
];

export function formatValue(value: number | null | undefined, unit: string): string {
  if (value === null || value === undefined) return '—';
  const rounded =
    value >= 100
      ? Math.round(value).toString()
      : value.toFixed(1).replace(/\.0$/, '');
  return `${rounded} ${unit}`;
}

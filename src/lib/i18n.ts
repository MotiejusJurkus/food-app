import type { Lang } from '@/store/languageStore';
import type { NutriScore } from '@/lib/types';
import type { NutritionFieldGroup, NutritionFieldKey } from '@/lib/nutrition';

export const UI_COPY = {
  en: {
    headerTagline: 'Understand what you eat',
    metadataTitle: 'Chief Cooking Technologies - understand what you eat',
    metadataDescription:
      'Chief Cooking Technologies helps you upload a meal photo and get an instant nutrition breakdown with ingredients, macros, and Nutri-Score.',
    languageToggleLabel: 'Language',
    themeToggleLabel: 'Toggle color mode',
    lightMode: 'Switch to light mode',
    darkMode: 'Switch to dark mode',
    heroTitle: "What's on your plate?",
    heroDescription:
      'Upload a photo of your meal and get an instant breakdown of calories, macros, and ingredients.',
    footer: 'Chief Cooking Technologies',
    uploadInvalidType: 'Please upload a JPEG or PNG image.',
    uploadTooLarge: 'Image is larger than 10 MB.',
    uploadAlt: 'Uploading',
    uploadPending: 'Analyzing your meal...',
    uploadPendingHint: 'This usually takes a few seconds.',
    uploadTitle: 'Drop a food photo here',
    uploadHint: 'or click to choose a JPEG or PNG (up to 10 MB)',
    uploadNetworkError:
      'Could not reach the analysis service. Check your network and the API URL.',
    uploadGenericError: 'Something went wrong while analyzing the image.',
    tryAgain: 'Try again',
    servingSize: 'Serving size:',
    nutritionBreakdown: 'Nutrition breakdown',
    ingredients: 'Ingredients',
    analyzeAnotherMeal: 'Analyze another meal',
    hide: 'Hide',
    details: 'Details',
    nutriScoreUnavailable: 'Nutri-Score unavailable',
    nutriScore: 'Nutri-Score',
  },
  lt: {
    headerTagline: 'Supraskite, ką valgote',
    metadataTitle: 'Chief Cooking Technologies - supraskite, ką valgote',
    metadataDescription:
      'Chief Cooking Technologies padeda įkelti patiekalo nuotrauką ir iškart gauti ingredientų, makroelementų bei Nutri-Score analizę.',
    languageToggleLabel: 'Kalba',
    themeToggleLabel: 'Keisti spalvų režimą',
    lightMode: 'Įjungti šviesų režimą',
    darkMode: 'Įjungti tamsų režimą',
    heroTitle: 'Kas jūsų lėkštėje?',
    heroDescription:
      'Įkelkite patiekalo nuotrauką ir iškart gaukite kalorijų, makroelementų bei ingredientų analizę.',
    footer: 'Chief Cooking Technologies',
    uploadInvalidType: 'Įkelkite JPEG arba PNG paveikslėlį.',
    uploadTooLarge: 'Paveikslėlis didesnis nei 10 MB.',
    uploadAlt: 'Įkeliama',
    uploadPending: 'Analizuojamas jūsų patiekalas...',
    uploadPendingHint: 'Paprastai tai užtrunka kelias sekundes.',
    uploadTitle: 'Nutempkite maisto nuotrauką čia',
    uploadHint: 'arba spustelėkite ir pasirinkite JPEG ar PNG (iki 10 MB)',
    uploadNetworkError:
      'Nepavyko pasiekti analizės paslaugos. Patikrinkite tinklą ir API adresą.',
    uploadGenericError: 'Analizuojant paveikslėlį įvyko klaida.',
    tryAgain: 'Bandyti dar kartą',
    servingSize: 'Porcijos dydis:',
    nutritionBreakdown: 'Maistinė analizė',
    ingredients: 'Ingredientai',
    analyzeAnotherMeal: 'Analizuoti kitą patiekalą',
    hide: 'Slėpti',
    details: 'Išsamiau',
    nutriScoreUnavailable: 'Nutri-Score nepasiekiamas',
    nutriScore: 'Nutri-Score',
  },
} satisfies Record<Lang, Record<string, string>>;

export type UiCopyKey = keyof typeof UI_COPY.en;

export const NUTRITION_FIELD_LABELS = {
  en: {
    energy_kcal: 'Energy',
    protein_g: 'Protein',
    carbohydrate_g: 'Carbohydrates',
    fat_total_g: 'Total fat',
    fat_saturated_g: 'Saturated fat',
    fat_monounsaturated_g: 'Monounsaturated fat',
    fat_polyunsaturated_g: 'Polyunsaturated fat',
    fat_trans_g: 'Trans fat',
    fiber_total_dietary_g: 'Fiber',
    sugars_total_g: 'Sugars',
    sodium_mg: 'Sodium',
    potassium_mg: 'Potassium',
    magnesium_mg: 'Magnesium',
    vitamin_c_mg: 'Vitamin C',
    vitamin_e_mg: 'Vitamin E',
    vitamin_k_mcg: 'Vitamin K',
    folate_mcg: 'Folate',
  },
  lt: {
    energy_kcal: 'Energija',
    protein_g: 'Baltymai',
    carbohydrate_g: 'Angliavandeniai',
    fat_total_g: 'Riebalai iš viso',
    fat_saturated_g: 'Sotieji riebalai',
    fat_monounsaturated_g: 'Mononesotieji riebalai',
    fat_polyunsaturated_g: 'Polinesotieji riebalai',
    fat_trans_g: 'Transriebalai',
    fiber_total_dietary_g: 'Skaidulos',
    sugars_total_g: 'Cukrūs',
    sodium_mg: 'Natris',
    potassium_mg: 'Kalis',
    magnesium_mg: 'Magnis',
    vitamin_c_mg: 'Vitaminas C',
    vitamin_e_mg: 'Vitaminas E',
    vitamin_k_mcg: 'Vitaminas K',
    folate_mcg: 'Folatai',
  },
} satisfies Record<Lang, Record<NutritionFieldKey, string>>;

export const NUTRITION_GROUP_LABELS = {
  en: {
    macros: 'Macros',
    fats: 'Fats',
    carbs: 'Carbs detail',
    minerals: 'Minerals',
    vitamins: 'Vitamins',
  },
  lt: {
    macros: 'Makroelementai',
    fats: 'Riebalai',
    carbs: 'Angliavandeniai',
    minerals: 'Mineralai',
    vitamins: 'Vitaminai',
  },
} satisfies Record<Lang, Record<NutritionFieldGroup, string>>;

export const NUTRI_SCORE_LABELS = {
  en: {
    A: 'Excellent nutritional quality',
    B: 'Good nutritional quality',
    C: 'Average nutritional quality',
    D: 'Lower nutritional quality',
    E: 'Poor nutritional quality',
  },
  lt: {
    A: 'Puiki maistinė kokybė',
    B: 'Gera maistinė kokybė',
    C: 'Vidutinė maistinė kokybė',
    D: 'Žemesnė maistinė kokybė',
    E: 'Prasta maistinė kokybė',
  },
} satisfies Record<Lang, Record<NutriScore, string>>;

export function t(lang: Lang, key: UiCopyKey): string {
  return UI_COPY[lang][key];
}

export function nutritionFieldLabel(
  lang: Lang,
  key: NutritionFieldKey,
): string {
  return NUTRITION_FIELD_LABELS[lang][key];
}

export function nutritionGroupLabel(
  lang: Lang,
  group: NutritionFieldGroup,
): string {
  return NUTRITION_GROUP_LABELS[lang][group];
}

export function nutriScoreLabel(lang: Lang, score: NutriScore): string {
  return NUTRI_SCORE_LABELS[lang][score];
}

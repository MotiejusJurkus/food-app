'use client';

import { resolveImageUrl } from '@/lib/api';
import { pickTranslated, useLanguageStore } from '@/store/languageStore';
import { t } from '@/lib/i18n';
import type { Analysis } from '@/lib/types';
import { IngredientCard } from '@/components/IngredientCard';
import { NutriScoreBadge } from '@/components/NutriScoreBadge';
import { NutritionTable } from '@/components/NutritionTable';

type Props = {
  analysis: Analysis;
  previewUrl: string | null;
  onReset: () => void;
};

export function AnalysisResult({ analysis, previewUrl, onReset }: Props) {
  const lang = useLanguageStore((s) => s.lang);

  const name = pickTranslated(lang, analysis.dish_name, analysis.dish_name_translated);
  const description = pickTranslated(
    lang,
    analysis.dish_description,
    analysis.dish_description_translated,
  );

  const apiImage = resolveImageUrl(analysis.image_url);
  const heroImage = previewUrl ?? apiImage;

  const kcal = analysis.nutritional_fields.energy_kcal;

  return (
    <article className="space-y-6">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
        {heroImage && (
          <div className="relative aspect-video w-full bg-neutral-100">
            {/* using <img> instead of next/image so we don't need to whitelist arbitrary remote hosts */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                {name}
              </h2>
              {description && (
                <p className="mt-2 text-neutral-600">{description}</p>
              )}
              {analysis.serving_size != null && (
                <p className="mt-3 text-sm text-neutral-500">
                  {t(lang, 'servingSize')}{' '}
                  <span className="font-medium text-neutral-700">
                    {analysis.serving_size} {analysis.unit ?? 'g'}
                  </span>
                </p>
              )}
            </div>
            <NutriScoreBadge score={analysis.nutri_score} />
          </div>

          {kcal != null && (
            <div className="mt-6 inline-flex items-baseline gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-white">
              <span className="text-3xl font-bold tabular-nums">
                {Math.round(kcal)}
              </span>
              <span className="text-sm font-medium text-neutral-300">kcal</span>
            </div>
          )}
        </div>
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 sm:p-8">
        <h3 className="mb-6 text-lg font-semibold tracking-tight">
          {t(lang, 'nutritionBreakdown')}
        </h3>
        <NutritionTable fields={analysis.nutritional_fields} />
      </section>

      {analysis.ingredients.length > 0 && (
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 sm:p-8">
          <h3 className="mb-4 text-lg font-semibold tracking-tight">
            {t(lang, 'ingredients')} ({analysis.ingredients.length})
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {analysis.ingredients.map((ingredient) => (
              <IngredientCard key={ingredient.id} ingredient={ingredient} />
            ))}
          </div>
        </section>
      )}

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          {t(lang, 'analyzeAnotherMeal')}
        </button>
      </div>
    </article>
  );
}

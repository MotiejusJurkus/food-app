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
      <div className="overflow-hidden border border-[var(--line)] bg-[var(--surface)]">
        {heroImage && (
          <div className="relative aspect-video w-full bg-[var(--surface-muted)]">
            {/* using <img> instead of next/image so we don't need to whitelist arbitrary remote hosts */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt={name}
              className="h-full w-full object-cover grayscale"
            />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-3xl font-light uppercase tracking-tighter text-[var(--text)] sm:text-4xl">
                {name}
              </h2>
              {description && (
                <p className="mt-3 max-w-2xl leading-relaxed text-[var(--muted)]">
                  {description}
                </p>
              )}
              {analysis.serving_size != null && (
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-[var(--faint)]">
                  {t(lang, 'servingSize')}{' '}
                  <span className="text-[var(--text)]">
                    {analysis.serving_size} {analysis.unit ?? 'g'}
                  </span>
                </p>
              )}
            </div>
            <NutriScoreBadge score={analysis.nutri_score} />
          </div>

          {kcal != null && (
            <div className="mt-6 inline-flex items-baseline gap-2 border border-[var(--accent)] bg-[var(--accent-soft)] px-5 py-3 text-[var(--text)]">
              <span className="font-mono text-3xl font-bold tabular-nums tracking-tighter">
                {Math.round(kcal)}
              </span>
              <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                kcal
              </span>
            </div>
          )}
        </div>
      </div>

      <section className="border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
        <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faint)]">
          {t(lang, 'nutritionBreakdown')}
        </h3>
        <NutritionTable fields={analysis.nutritional_fields} />
      </section>

      {analysis.ingredients.length > 0 && (
        <section className="border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
          <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faint)]">
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
          className="border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--inverse-text)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent-text)]"
        >
          {t(lang, 'analyzeAnotherMeal')}
        </button>
      </div>
    </article>
  );
}

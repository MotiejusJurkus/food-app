'use client';

import { useState } from 'react';
import { NUTRITION_FIELDS, formatValue } from '@/lib/nutrition';
import { nutritionFieldLabel, t } from '@/lib/i18n';
import { pickTranslated, useLanguageStore } from '@/store/languageStore';
import type { Ingredient } from '@/lib/types';

const MACRO_KEYS = ['energy_kcal', 'protein_g', 'carbohydrate_g', 'fat_total_g'] as const;

export function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  const lang = useLanguageStore((s) => s.lang);
  const [expanded, setExpanded] = useState(false);

  const name = pickTranslated(lang, ingredient.name, ingredient.name_translated);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 transition hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-medium text-neutral-900">{name}</h4>
          {ingredient.serving_size != null && (
            <p className="text-xs text-neutral-500">
              {ingredient.serving_size} {ingredient.unit ?? 'g'}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
        >
          {expanded ? t(lang, 'hide') : t(lang, 'details')}
        </button>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {MACRO_KEYS.map((key) => {
          const meta = NUTRITION_FIELDS.find((f) => f.key === key);
          if (!meta) return null;
          const value = ingredient.nutritional_fields[key] as number | null | undefined;
          return (
            <div
              key={key}
              className="rounded-lg bg-neutral-50 px-2 py-2 text-center"
            >
              <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                {nutritionFieldLabel(lang, meta.key)}
              </p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums text-neutral-900">
                {formatValue(value, meta.unit)}
              </p>
            </div>
          );
        })}
      </div>

      {expanded && (
        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-1 border-t border-neutral-100 pt-3 sm:grid-cols-2">
          {NUTRITION_FIELDS.map((field) => {
            const value = ingredient.nutritional_fields[field.key] as
              | number
              | null
              | undefined;
            return (
              <div
                key={field.key}
                className="flex items-baseline justify-between text-xs"
              >
                <dt className="text-neutral-500">
                  {nutritionFieldLabel(lang, field.key)}
                </dt>
                <dd className="font-medium tabular-nums text-neutral-800">
                  {formatValue(value, field.unit)}
                </dd>
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}

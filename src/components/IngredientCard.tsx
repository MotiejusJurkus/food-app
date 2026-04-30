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
    <div className="border border-[var(--line)] bg-[var(--surface-strong)] p-4 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-mono text-sm font-medium uppercase tracking-[0.12em] text-[var(--text)]">
            {name}
          </h4>
          {ingredient.serving_size != null && (
            <p className="mt-1 text-xs text-[var(--muted)]">
              {ingredient.serving_size} {ingredient.unit ?? 'g'}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 border border-[var(--line)] px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent-text)]"
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
              className="border border-[var(--line)] bg-[var(--surface-muted)] px-2 py-2 text-center"
            >
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--faint)]">
                {nutritionFieldLabel(lang, meta.key)}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-[var(--text)]">
                {formatValue(value, meta.unit)}
              </p>
            </div>
          );
        })}
      </div>

      {expanded && (
        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-1 border-t border-[var(--line)] pt-3 sm:grid-cols-2">
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
                <dt className="text-[var(--muted)]">
                  {nutritionFieldLabel(lang, field.key)}
                </dt>
                <dd className="font-mono font-medium tabular-nums text-[var(--text)]">
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

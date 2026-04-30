'use client';

import {
  NUTRITION_FIELDS,
  formatValue,
  type NutritionFieldGroup,
} from '@/lib/nutrition';
import { nutritionFieldLabel, nutritionGroupLabel } from '@/lib/i18n';
import { useLanguageStore } from '@/store/languageStore';
import type { NutritionalFields } from '@/lib/types';

type Props = {
  fields: NutritionalFields;
};

export function NutritionTable({ fields }: Props) {
  const lang = useLanguageStore((s) => s.lang);
  const grouped = NUTRITION_FIELDS.reduce<Record<string, typeof NUTRITION_FIELDS>>(
    (acc, field) => {
      (acc[field.group] ??= []).push(field);
      return acc;
    },
    {},
  );

  return (
    <div className="space-y-6">
      {(Object.keys(grouped) as NutritionFieldGroup[]).map((group) => (
        <section key={group}>
          <h3 className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faint)]">
            {nutritionGroupLabel(lang, group)}
          </h3>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {grouped[group].map((field) => {
              const value = fields[field.key] as number | null | undefined;
              return (
                <div
                  key={field.key}
                  className="flex items-baseline justify-between border-b border-[var(--line)] py-1.5"
                >
                  <dt className="text-sm text-[var(--muted)]">
                    {nutritionFieldLabel(lang, field.key)}
                  </dt>
                  <dd className="font-mono text-sm font-medium tabular-nums text-[var(--text)]">
                    {formatValue(value, field.unit)}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      ))}
    </div>
  );
}

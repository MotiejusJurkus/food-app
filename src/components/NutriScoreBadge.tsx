'use client';

import type { NutriScore } from '@/lib/types';
import { nutriScoreLabel, t } from '@/lib/i18n';
import { useLanguageStore } from '@/store/languageStore';

const SCORE_STYLES: Record<NutriScore, string> = {
  A: 'bg-emerald-500',
  B: 'bg-lime-500',
  C: 'bg-amber-500',
  D: 'bg-orange-500',
  E: 'bg-red-500',
};

export function NutriScoreBadge({ score }: { score: NutriScore | null | undefined }) {
  const lang = useLanguageStore((s) => s.lang);

  if (!score) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600">
        {t(lang, 'nutriScoreUnavailable')}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-3">
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white shadow-sm ${SCORE_STYLES[score]}`}
        aria-label={`Nutri-Score ${score}`}
      >
        {score}
      </span>
      <div className="leading-tight">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {t(lang, 'nutriScore')}
        </p>
        <p className="text-sm text-neutral-700">{nutriScoreLabel(lang, score)}</p>
      </div>
    </div>
  );
}

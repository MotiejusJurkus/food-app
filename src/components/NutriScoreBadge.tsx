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
      <span className="inline-flex items-center gap-2 border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
        {t(lang, 'nutriScoreUnavailable')}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-3">
      <span
        className={`inline-flex h-10 w-10 items-center justify-center font-mono text-lg font-bold text-white ${SCORE_STYLES[score]}`}
        aria-label={`Nutri-Score ${score}`}
      >
        {score}
      </span>
      <div className="leading-tight">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--faint)]">
          {t(lang, 'nutriScore')}
        </p>
        <p className="text-sm text-[var(--muted)]">{nutriScoreLabel(lang, score)}</p>
      </div>
    </div>
  );
}

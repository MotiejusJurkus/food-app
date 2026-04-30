'use client';

import { useLanguageStore, type Lang } from '@/store/languageStore';
import { t } from '@/lib/i18n';

const OPTIONS: Array<{ value: Lang; label: string }> = [
  { value: 'en', label: 'EN' },
  { value: 'lt', label: 'LT' },
];

export function LanguageToggle() {
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);

  return (
    <div
      role="radiogroup"
      aria-label={t(lang, 'languageToggleLabel')}
      className="inline-flex border border-[var(--line)] bg-[var(--surface)] p-1 font-mono text-xs uppercase tracking-[0.16em]"
    >
      {OPTIONS.map((option) => {
        const active = lang === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLang(option.value)}
            className={`px-3 py-1 font-medium transition ${
              active
                ? 'bg-[var(--accent)] text-[var(--inverse-text)]'
                : 'text-[var(--muted)] hover:text-[var(--accent-text)]'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

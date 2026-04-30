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
      className="inline-flex rounded-full border border-neutral-200 bg-white p-1 text-sm shadow-sm"
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
            className={`rounded-full px-3 py-1 font-medium transition ${
              active
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

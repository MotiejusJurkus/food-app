'use client';

import { LanguageToggle } from '@/components/LanguageToggle';
import { t } from '@/lib/i18n';
import { useLanguageStore } from '@/store/languageStore';

export function Header() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-neutral-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white"
          >
            A
          </span>
          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight text-neutral-900">
              AUROLI
            </p>
            <p className="text-xs text-neutral-500">
              {t(lang, 'headerTagline')}
            </p>
          </div>
        </div>
        <LanguageToggle />
      </div>
    </header>
  );
}

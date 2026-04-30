'use client';

import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { t } from '@/lib/i18n';
import { useLanguageStore } from '@/store/languageStore';

export function Header() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[var(--background)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--accent)] bg-[var(--accent-soft)] font-mono text-sm font-bold text-[var(--accent-text)] sm:h-9 sm:w-9"
          >
            C
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--text)] sm:text-sm sm:tracking-[0.2em]">
              <span className="sm:hidden">CCT •</span>
              <span className="hidden sm:inline">Chief Cooking Technologies •</span>
            </p>
            <p className="mt-1 hidden text-xs text-[var(--muted)] sm:block">
              {t(lang, 'headerTagline')}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}

'use client';

import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { t } from '@/lib/i18n';
import { useLanguageStore } from '@/store/languageStore';

export function Header() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[var(--background)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-flex h-9 w-9 items-center justify-center border border-[var(--accent)] bg-[var(--accent-soft)] font-mono text-sm font-bold text-[var(--accent-text)]"
          >
            C
          </span>
          <div className="leading-tight">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-[var(--text)]">
              Chief Cooking Technologies •
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              {t(lang, 'headerTagline')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}

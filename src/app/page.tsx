'use client';

import { Header } from '@/components/Header';
import { UploadDropzone } from '@/components/UploadDropzone';
import { t } from '@/lib/i18n';
import { useLanguageStore } from '@/store/languageStore';
import { useEffect } from 'react';

export default function Home() {
  const lang = useLanguageStore((s) => s.lang);

  useEffect(() => {
    document.title = t(lang, 'metadataTitle');
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t(lang, 'metadataDescription'));
  }, [lang]);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <section className="mb-8 border-l border-[var(--accent)] pl-4 sm:mb-12 sm:pl-6">
          <p className="mb-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-[var(--faint)] sm:mb-4 sm:text-xs sm:tracking-[0.3em]">
            CHIEF COOKING TECHNOLOGIES / {t(lang, 'foodAnalysis')}
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold uppercase leading-[1.05] tracking-tighter text-[var(--text)] sm:text-5xl sm:leading-none md:text-6xl">
            {t(lang, 'heroTitle')}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-lg">
            {t(lang, 'heroDescription')}
          </p>
        </section>
        <UploadDropzone />
      </main>
      <footer className="border-t border-[var(--line)] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--faint)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-xs sm:tracking-[0.2em]">
          <span>{t(lang, 'footer')}</span>
          <span>2026</span>
        </div>
      </footer>
    </>
  );
}

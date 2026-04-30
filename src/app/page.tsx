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
      <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
        <section className="mb-12 border-l border-[var(--accent)] pl-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--faint)]">
            CHIEF COOKING TECHNOLOGIES / FOOD ANALYSIS
          </p>
          <h1 className="max-w-3xl text-5xl font-extrabold uppercase leading-none tracking-tighter text-[var(--text)] sm:text-6xl">
            {t(lang, 'heroTitle')}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
            {t(lang, 'heroDescription')}
          </p>
        </section>
        <UploadDropzone />
      </main>
      <footer className="border-t border-[var(--line)] px-6 py-8">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--faint)]">
          <span>{t(lang, 'footer')}</span>
          <span>2026</span>
        </div>
      </footer>
    </>
  );
}

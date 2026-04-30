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
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="mb-8 text-center sm:mb-12 sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            {t(lang, 'heroTitle')}
          </h1>
          <p className="mt-2 max-w-xl text-neutral-600 sm:text-lg">
            {t(lang, 'heroDescription')}
          </p>
        </section>
        <UploadDropzone />
      </main>
      <footer className="mx-auto w-full max-w-3xl px-4 py-8 text-center text-xs text-neutral-400 sm:px-6">
        {t(lang, 'footer')}
      </footer>
    </>
  );
}

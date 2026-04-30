'use client';

import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { analyzeImage } from '@/lib/api';
import { AnalysisResult } from '@/components/AnalysisResult';
import { t } from '@/lib/i18n';
import { useLanguageStore, type Lang } from '@/store/languageStore';

const ACCEPTED = ['image/jpeg', 'image/png'];
const MAX_BYTES = 10 * 1024 * 1024;

export function UploadDropzone() {
  const lang = useLanguageStore((s) => s.lang);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: analyzeImage,
  });

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      setValidationError(null);

      if (!ACCEPTED.includes(file.type)) {
        setValidationError(t(lang, 'uploadInvalidType'));
        return;
      }
      if (file.size > MAX_BYTES) {
        setValidationError(t(lang, 'uploadTooLarge'));
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
      mutation.mutate(file);
    },
    [lang, mutation, previewUrl],
  );

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setValidationError(null);
    mutation.reset();
    if (inputRef.current) inputRef.current.value = '';
  }, [mutation, previewUrl]);

  if (mutation.isSuccess && mutation.data) {
    return (
      <AnalysisResult
        analysis={mutation.data}
        previewUrl={previewUrl}
        onReset={reset}
      />
    );
  }

  if (mutation.isPending) {
    return (
      <div className="border border-[var(--line)] bg-[var(--surface)] p-8 text-center">
        {previewUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={previewUrl}
            alt={t(lang, 'uploadAlt')}
            className="mx-auto mb-6 h-56 w-full max-w-xl border border-[var(--line)] object-cover grayscale"
          />
        )}
        <div className="flex items-center justify-center gap-3">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)]" />
          <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-[var(--text)]">
            {t(lang, 'uploadPending')}
          </p>
        </div>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {t(lang, 'uploadPendingHint')}
        </p>
      </div>
    );
  }

  const apiError =
    mutation.isError && mutation.error
      ? extractErrorMessage(mutation.error, lang)
      : null;

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`group flex w-full flex-col items-center justify-center border border-dashed bg-[var(--surface)] p-10 text-center transition sm:p-16 ${
          dragOver
            ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
            : 'border-[var(--line)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]'
        }`}
      >
        <span
          aria-hidden
          className="mb-5 inline-flex h-14 w-14 items-center justify-center border border-[var(--line)] bg-[var(--surface-muted)] text-2xl transition-colors group-hover:border-[var(--accent)]"
        >
          <UploadIcon />
        </span>
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text)]">
          {t(lang, 'uploadTitle')}
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {t(lang, 'uploadHint')}
        </p>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
      />

      {(validationError || apiError) && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm text-[var(--text)]"
        >
          <p>{validationError ?? apiError}</p>
          {apiError && (
            <button
              type="button"
              onClick={reset}
              className="shrink-0 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent-text)] underline hover:no-underline"
            >
              {t(lang, 'tryAgain')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function extractErrorMessage(error: unknown, lang: Lang): string {
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: string }).message;
    if (typeof message === 'string' && message.length > 0) {
      if (message.includes('Network Error')) {
        return t(lang, 'uploadNetworkError');
      }
      return message;
    }
  }
  return t(lang, 'uploadGenericError');
}

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-[var(--muted)]"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

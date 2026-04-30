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
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-neutral-200">
        {previewUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={previewUrl}
            alt={t(lang, 'uploadAlt')}
            className="mx-auto mb-6 h-48 w-full max-w-sm rounded-xl object-cover"
          />
        )}
        <div className="flex items-center justify-center gap-3">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
          <p className="text-sm font-medium text-neutral-700">
            {t(lang, 'uploadPending')}
          </p>
        </div>
        <p className="mt-2 text-xs text-neutral-500">
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
        className={`flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white p-10 text-center transition sm:p-16 ${
          dragOver
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50'
        }`}
      >
        <span
          aria-hidden
          className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-2xl"
        >
          <UploadIcon />
        </span>
        <p className="text-base font-semibold text-neutral-900">
          {t(lang, 'uploadTitle')}
        </p>
        <p className="mt-1 text-sm text-neutral-500">
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
          className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <p>{validationError ?? apiError}</p>
          {apiError && (
            <button
              type="button"
              onClick={reset}
              className="shrink-0 font-medium underline hover:no-underline"
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
      className="h-6 w-6 text-neutral-600"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

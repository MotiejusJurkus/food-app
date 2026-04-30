import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Lang = 'en' | 'lt';

type LanguageState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'food-analysis-lang' },
  ),
);

export function pickTranslated(
  lang: Lang,
  primary: string | null | undefined,
  translated: string | null | undefined,
): string {
  if (lang === 'lt') return translated ?? primary ?? '';
  return primary ?? translated ?? '';
}

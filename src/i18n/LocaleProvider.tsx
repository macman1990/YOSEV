import { IntlProvider } from "react-intl";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultLocale, messages, type Locale } from "./messages";

const STORAGE_KEY = "portfolio-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (value: Locale) => void;
  messages: (typeof messages)[Locale];
  isArabic: boolean;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "ar" ? "ar" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocale(getInitialLocale());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.body.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.style.setProperty(
      "--font-display",
      locale === "ar"
        ? '"Tajawal", "Noto Sans Arabic", ui-sans-serif, system-ui, sans-serif'
        : '"Sora", ui-sans-serif, system-ui, sans-serif',
    );
    document.documentElement.style.setProperty(
      "--font-sans",
      locale === "ar"
        ? '"Tajawal", "Noto Sans Arabic", ui-sans-serif, system-ui, sans-serif'
        : '"Manrope", ui-sans-serif, system-ui, sans-serif',
    );
  }, [locale, mounted]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      messages: messages[locale],
      isArabic: locale === "ar",
    }),
    [locale],
  );

  return (
    <IntlProvider locale={locale} messages={messages[locale]} textComponent="span">
      <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
    </IntlProvider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}

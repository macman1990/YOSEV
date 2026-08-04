import { enMessages } from "./en";
import { arMessages } from "./ar";

export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

export const messages = {
  en: enMessages,
  ar: arMessages,
};

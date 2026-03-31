import { CONSTANTS } from "./constants";

export const formatDate = (date: unknown): string => {
  if (!date) return "";

  const timestamp = date as { seconds?: number; toDate?: () => Date };

  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString(
      CONSTANTS.DATE.LOCALE,
      CONSTANTS.DATE.DATE_FORMAT_OPTIONS
    );
  }

  if (timestamp.toDate && typeof timestamp.toDate === "function") {
    return timestamp
      .toDate()
      .toLocaleDateString(CONSTANTS.DATE.LOCALE, CONSTANTS.DATE.DATE_FORMAT_OPTIONS);
  }

  if (date instanceof Date) {
    return date.toLocaleDateString(CONSTANTS.DATE.LOCALE, CONSTANTS.DATE.DATE_FORMAT_OPTIONS);
  }

  return "";
};

export const formatDateShort = (date: unknown): string => {
  if (!date) return "";

  const timestamp = date as { seconds?: number; toDate?: () => Date };

  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString(
      CONSTANTS.DATE.LOCALE,
      CONSTANTS.DATE.DATE_SHORT_FORMAT
    );
  }

  if (timestamp.toDate && typeof timestamp.toDate === "function") {
    return timestamp
      .toDate()
      .toLocaleDateString(CONSTANTS.DATE.LOCALE, CONSTANTS.DATE.DATE_SHORT_FORMAT);
  }

  if (date instanceof Date) {
    return date.toLocaleDateString(CONSTANTS.DATE.LOCALE, CONSTANTS.DATE.DATE_SHORT_FORMAT);
  }

  return "";
};

export const calculateReadTime = (body: string | undefined): number => {
  if (!body) return 1;
  const cleanText = body.replace(/<[^>]*>/g, "");
  const words = cleanText.split(/\s+/).filter((word) => word.length > 0).length;
  return Math.max(1, Math.ceil(words / CONSTANTS.READ_TIME.WORDS_PER_MINUTE));
};

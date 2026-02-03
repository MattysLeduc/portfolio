export type Language = 'en' | 'fr';

type LocalizedEntity = Record<string, unknown>;

export const getLocalizedField = <T extends LocalizedEntity>(
  item: T,
  base: string,
  language: Language
): string => {
  const suffix = language === 'fr' ? 'Fr' : 'En';
  const localizedKey = `${base}${suffix}`;
  const localizedValue = item[localizedKey];
  if (typeof localizedValue === 'string' && localizedValue.trim().length > 0) {
    return localizedValue;
  }
  const fallback = item[base];
  if (typeof fallback === 'string') {
    return fallback;
  }
  return '';
};

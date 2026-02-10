/**
 * Input sanitization utilities to prevent XSS attacks
 */

/**
 * Sanitizes text input by removing potentially dangerous characters and scripts
 * This provides basic XSS protection on the frontend
 */
export const sanitizeText = (input: string): string => {
  if (!input) return "";

  // Remove any HTML tags
  let sanitized = input.replace(/<[^>]*>/g, "");

  // Remove script content
  sanitized = sanitized.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    "",
  );

  // Remove dangerous event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, "");

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
};

/**
 * Sanitizes email input
 */
export const sanitizeEmail = (email: string): string => {
  if (!email) return "";

  // Remove any HTML tags and convert to lowercase
  let sanitized = email
    .replace(/<[^>]*>/g, "")
    .toLowerCase()
    .trim();

  // Remove any whitespace
  sanitized = sanitized.replace(/\s/g, "");

  return sanitized;
};

/**
 * Sanitizes URL input
 */
export const sanitizeUrl = (url: string): string => {
  if (!url) return "";

  // Remove HTML tags
  let sanitized = url.replace(/<[^>]*>/g, "").trim();

  // Ensure URL uses safe protocols (http, https)
  if (sanitized && !sanitized.match(/^https?:\/\//i)) {
    sanitized = `https://${sanitized}`;
  }

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, "");

  return sanitized;
};

/**
 * Truncates text to a maximum length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength);
};

/**
 * Sanitizes and validates form data object
 */
export const sanitizeFormData = <T extends Record<string, unknown>>(
  data: T,
  fieldTypes?: Partial<Record<keyof T, "text" | "email" | "url">>,
): T => {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      const fieldType = fieldTypes?.[key as keyof T] || "text";

      switch (fieldType) {
        case "email":
          sanitized[key] = sanitizeEmail(value);
          break;
        case "url":
          sanitized[key] = sanitizeUrl(value);
          break;
        default:
          sanitized[key] = sanitizeText(value);
      }
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
};

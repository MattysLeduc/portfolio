import { z } from "zod";

/**
 * Validation schemas for public forms
 */

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(
      /^[a-zA-Z\s\-'.]+$/,
      "Name can only contain letters, spaces, hyphens, apostrophes, and periods",
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),

  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must not exceed 200 characters"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Testimonial form validation schema (base - language fields are optional)
export const testimonialFormSchema = z.object({
  authorName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(
      /^[a-zA-Z\s\-'.]+$/,
      "Name can only contain letters, spaces, hyphens, apostrophes, and periods",
    ),

  authorTitleEn: z
    .string()
    .max(150, "Title must not exceed 150 characters")
    .optional()
    .or(z.literal("")),

  authorTitleFr: z
    .string()
    .max(150, "Title must not exceed 150 characters")
    .optional()
    .or(z.literal("")),

  companyEn: z
    .string()
    .max(150, "Company name must not exceed 150 characters")
    .optional()
    .or(z.literal("")),

  companyFr: z
    .string()
    .max(150, "Company name must not exceed 150 characters")
    .optional()
    .or(z.literal("")),

  contentEn: z
    .string()
    .max(1000, "Testimonial must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),

  contentFr: z
    .string()
    .max(1000, "Testimonial must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),

  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
});

// Language-specific validation
export const validateTestimonialForLanguage = (
  data: z.infer<typeof testimonialFormSchema>,
  language: "en" | "fr",
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (language === "en") {
    if (!data.authorTitleEn || data.authorTitleEn.length < 2) {
      errors.authorTitleEn = "Title must be at least 2 characters";
    }
    if (!data.companyEn || data.companyEn.length < 2) {
      errors.companyEn = "Company name must be at least 2 characters";
    }
    if (!data.contentEn || data.contentEn.length < 10) {
      errors.contentEn = "Testimonial must be at least 10 characters";
    }
  } else {
    if (!data.authorTitleFr || data.authorTitleFr.length < 2) {
      errors.authorTitleFr = "Title must be at least 2 characters";
    }
    if (!data.companyFr || data.companyFr.length < 2) {
      errors.companyFr = "Company name must be at least 2 characters";
    }
    if (!data.contentFr || data.contentFr.length < 10) {
      errors.contentFr = "Testimonial must be at least 10 characters";
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
};

export type TestimonialFormData = z.infer<typeof testimonialFormSchema>;

/**
 * Validates email format using regex
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format (international format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phone.length >= 10 && phone.length <= 20 && phoneRegex.test(phone);
};

/**
 * Validates URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

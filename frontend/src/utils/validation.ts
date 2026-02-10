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
    .regex(/^[a-zA-Z\s\-'.]+$/, "Name can only contain letters, spaces, hyphens, apostrophes, and periods"),
  
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

// Testimonial form validation schema
export const testimonialFormSchema = z.object({
  authorName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s\-'.]+$/, "Name can only contain letters, spaces, hyphens, apostrophes, and periods"),
  
  authorTitleEn: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(150, "Title must not exceed 150 characters"),
  
  authorTitleFr: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(150, "Title must not exceed 150 characters"),
  
  companyEn: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(150, "Company name must not exceed 150 characters"),
  
  companyFr: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(150, "Company name must not exceed 150 characters"),
  
  contentEn: z
    .string()
    .min(10, "Testimonial must be at least 10 characters")
    .max(1000, "Testimonial must not exceed 1000 characters"),
  
  contentFr: z
    .string()
    .min(10, "Testimonial must be at least 10 characters")
    .max(1000, "Testimonial must not exceed 1000 characters"),
  
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
});

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

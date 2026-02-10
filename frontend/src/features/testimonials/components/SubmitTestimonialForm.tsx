import { useState } from "react";
import { submitTestimonial } from "../api/submitTestimonial";
import type { TestimonialRequestModel } from "../models/TestimonialRequestModel";
import "../styles/SubmitTestimonialForm.css";
import { useLanguage } from "@/context/LanguageContext";
import { testimonialFormSchema, validateTestimonialForLanguage } from "@/utils/validation";
import { sanitizeFormData } from "@/utils/sanitization";
import { z } from "zod";

export const SubmitTestimonialForm: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<TestimonialRequestModel>({
    authorName: "",
    authorTitleEn: "",
    authorTitleFr: "",
    companyEn: "",
    companyFr: "",
    contentEn: "",
    contentFr: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Apply character limits
    let processedValue = value;
    if (name === "authorName" && value.length > 100) {
      processedValue = value.slice(0, 100);
    } else if (
      (name === "authorTitleEn" ||
        name === "authorTitleFr" ||
        name === "companyEn" ||
        name === "companyFr") &&
      value.length > 150
    ) {
      processedValue = value.slice(0, 150);
    } else if (
      (name === "contentEn" || name === "contentFr") &&
      value.length > 1000
    ) {
      processedValue = value.slice(0, 1000);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(processedValue) : processedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});
    setLoading(true);

    try {
      // Sanitize input data
      const sanitizedData = sanitizeFormData(
        formData as unknown as Record<string, unknown>,
        {
          authorName: "text",
          authorTitleEn: "text",
          authorTitleFr: "text",
          companyEn: "text",
          companyFr: "text",
          contentEn: "text",
          contentFr: "text",
        },
      );

      // Validate the sanitized data with base schema
      const validatedData = testimonialFormSchema.parse(sanitizedData);

      // Validate language-specific fields
      const languageValidation = validateTestimonialForLanguage(
        validatedData,
        language as "en" | "fr",
      );
      if (!languageValidation.valid) {
        setValidationErrors(languageValidation.errors);
        setError("Please fill in all required fields.");
        return;
      }

      await submitTestimonial(validatedData);
      setSuccess(true);
      setFormData({
        authorName: "",
        authorTitleEn: "",
        authorTitleFr: "",
        companyEn: "",
        companyFr: "",
        contentEn: "",
        contentFr: "",
        rating: 5,
      });
      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 3000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            errors[error.path[0] as string] = error.message;
          }
        });
        setValidationErrors(errors);
        setError("Please fix the validation errors below.");
      } else {
        // Log error silently without exposing details
        setError(t("testimonialsSubmitError"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-testimonial-form-container">
      <div className="form-header">
        <h2 className="form-title">{t("testimonialsShareTitle")}</h2>
        <p className="form-subtitle">{t("testimonialsShareSubtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="submit-testimonial-form">
        <div className="form-group">
          <label htmlFor="authorName">
            {t("testimonialsYourName")} *{" "}
            <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>
              (max 100 chars)
            </span>
          </label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            placeholder={t("testimonialsNamePlaceholder")}
            required
            maxLength={100}
            className={`form-input ${validationErrors.authorName ? "error" : ""}`}
          />
          {validationErrors.authorName && (
            <div
              className="error-message"
              style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}
            >
              {validationErrors.authorName}
            </div>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor={language === "en" ? "authorTitleEn" : "authorTitleFr"}
          >
            {language === "en"
              ? t("testimonialsTitleEn")
              : t("testimonialsTitleFr")}{" "}
            *{" "}
            <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>
              (max 150 chars)
            </span>
          </label>
          <input
            type="text"
            id={language === "en" ? "authorTitleEn" : "authorTitleFr"}
            name={language === "en" ? "authorTitleEn" : "authorTitleFr"}
            value={
              language === "en"
                ? formData.authorTitleEn || ""
                : formData.authorTitleFr || ""
            }
            onChange={handleChange}
            placeholder={
              language === "en"
                ? t("testimonialsTitlePlaceholder")
                : t("testimonialsTitlePlaceholderFr")
            }
            maxLength={150}
            className={`form-input ${validationErrors[language === "en" ? "authorTitleEn" : "authorTitleFr"] ? "error" : ""}`}
          />
          {validationErrors[
            language === "en" ? "authorTitleEn" : "authorTitleFr"
          ] && (
            <div
              className="error-message"
              style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}
            >
              {
                validationErrors[
                  language === "en" ? "authorTitleEn" : "authorTitleFr"
                ]
              }
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor={language === "en" ? "companyEn" : "companyFr"}>
            {language === "en"
              ? t("testimonialsCompanyEn")
              : t("testimonialsCompanyFr")}{" "}
            <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>
              (max 150 chars)
            </span>
          </label>
          <input
            type="text"
            id={language === "en" ? "companyEn" : "companyFr"}
            name={language === "en" ? "companyEn" : "companyFr"}
            value={
              language === "en"
                ? formData.companyEn || ""
                : formData.companyFr || ""
            }
            onChange={handleChange}
            placeholder={
              language === "en"
                ? t("testimonialsCompanyPlaceholder")
                : t("testimonialsCompanyPlaceholderFr")
            }
            maxLength={150}
            className={`form-input ${validationErrors[language === "en" ? "companyEn" : "companyFr"] ? "error" : ""}`}
          />
          {validationErrors[language === "en" ? "companyEn" : "companyFr"] && (
            <div
              className="error-message"
              style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}
            >
              {validationErrors[language === "en" ? "companyEn" : "companyFr"]}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="rating">{t("testimonialsRating")} *</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="form-input"
          >
            <option value={1}>⭐ 1 - {t("ratingPoor")}</option>
            <option value={2}>⭐⭐ 2 - {t("ratingFair")}</option>
            <option value={3}>⭐⭐⭐ 3 - {t("ratingGood")}</option>
            <option value={4}>⭐⭐⭐⭐ 4 - {t("ratingGreat")}</option>
            <option value={5}>⭐⭐⭐⭐⭐ 5 - {t("ratingExcellent")}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor={language === "en" ? "contentEn" : "contentFr"}>
            {language === "en"
              ? t("testimonialsContentEn")
              : t("testimonialsContentFr")}{" "}
            *{" "}
            <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>
              (
              {
                (language === "en" ? formData.contentEn : formData.contentFr)
                  .length
              }
              /1000 chars)
            </span>
          </label>
          <textarea
            id={language === "en" ? "contentEn" : "contentFr"}
            name={language === "en" ? "contentEn" : "contentFr"}
            value={language === "en" ? formData.contentEn : formData.contentFr}
            onChange={handleChange}
            placeholder={
              language === "en"
                ? t("testimonialsContentPlaceholder")
                : t("testimonialsContentPlaceholderFr")
            }
            rows={6}
            required
            maxLength={1000}
            className={`form-input textarea ${validationErrors[language === "en" ? "contentEn" : "contentFr"] ? "error" : ""}`}
          ></textarea>
          {validationErrors[language === "en" ? "contentEn" : "contentFr"] && (
            <div
              className="error-message"
              style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}
            >
              {validationErrors[language === "en" ? "contentEn" : "contentFr"]}
            </div>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            ✓ {t("testimonialsSubmitSuccess")}
          </div>
        )}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? t("testimonialsSubmitting") : t("testimonialsSubmit")}
        </button>
      </form>
    </div>
  );
};

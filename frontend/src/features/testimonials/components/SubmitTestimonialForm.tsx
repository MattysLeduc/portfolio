import { useState } from "react";
import { submitTestimonial } from "../api/submitTestimonial";
import type { TestimonialRequestModel } from "../models/TestimonialRequestModel";
import "../styles/SubmitTestimonialForm.css";
import { useLanguage } from "@/context/LanguageContext";

export const SubmitTestimonialForm: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<TestimonialRequestModel>({
    authorName: "",
    authorTitleEn: "",
    authorTitleFr: "",
    contentEn: "",
    contentFr: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await submitTestimonial(formData);
      setSuccess(true);
      setFormData({
        authorName: "",
        authorTitleEn: "",
        authorTitleFr: "",
        contentEn: "",
        contentFr: "",
        rating: 5,
      });
      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 3000);
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      setError(t("testimonialsSubmitError"));
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
          <label htmlFor="authorName">{t("testimonialsYourName")} *</label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            placeholder={t("testimonialsNamePlaceholder")}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor={language === "en" ? "authorTitleEn" : "authorTitleFr"}
          >
            {language === "en"
              ? t("testimonialsTitleEn")
              : t("testimonialsTitleFr")}{" "}
            *
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
            className="form-input"
          />
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
            *
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
            className="form-input textarea"
          ></textarea>
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

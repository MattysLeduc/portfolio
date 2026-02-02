import { useState } from "react";
import { submitTestimonial } from "../api/submitTestimonial";
import type { TestimonialRequestModel } from "../models/TestimonialRequestModel";
import "../styles/SubmitTestimonialForm.css";

export const SubmitTestimonialForm: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const [formData, setFormData] = useState<TestimonialRequestModel>({
    authorName: "",
    authorTitle: "",
    content: "",
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
        authorTitle: "",
        content: "",
        rating: 5,
      });
      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 3000);
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      setError("Failed to submit testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-testimonial-form-container">
      <div className="form-header">
        <h2 className="form-title">Share Your Testimonial</h2>
        <p className="form-subtitle">
          Help others learn from your experience working with me
        </p>
      </div>

      <form onSubmit={handleSubmit} className="submit-testimonial-form">
        <div className="form-group">
          <label htmlFor="authorName">Your Name *</label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="authorTitle">Title/Position *</label>
          <input
            type="text"
            id="authorTitle"
            name="authorTitle"
            value={formData.authorTitle || ""}
            onChange={handleChange}
            placeholder="e.g., Product Manager, Team Lead"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating *</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="form-input"
          >
            <option value={1}>⭐ 1 - Poor</option>
            <option value={2}>⭐⭐ 2 - Fair</option>
            <option value={3}>⭐⭐⭐ 3 - Good</option>
            <option value={4}>⭐⭐⭐⭐ 4 - Great</option>
            <option value={5}>⭐⭐⭐⭐⭐ 5 - Excellent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Testimonial *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Share your experience and thoughts..."
            rows={6}
            required
            className="form-input textarea"
          ></textarea>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            ✓ Testimonial submitted successfully! It will be reviewed and
            published shortly.
          </div>
        )}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Submitting..." : "Submit Testimonial"}
        </button>
      </form>
    </div>
  );
};

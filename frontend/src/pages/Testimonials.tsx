import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTestimonials } from '../features/testimonials/api/getTestimonials';
import { submitTestimonial } from '../features/testimonials/api/submitTestimonial';
import type { TestimonialRequestModel } from '../features/testimonials/models/TestimonialRequestModel';
import type { TestimonialResponseModel } from '../features/testimonials/models/TestimonialResponseModel';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialResponseModel[]>([]);
  const [formData, setFormData] = useState<TestimonialRequestModel>({
    authorName: '',
    authorTitle: '',
    content: '',
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Failed to load testimonials', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitTestimonial(formData);
      setSubmitted(true);
      setFormData({ authorName: '', authorTitle: '', content: '', rating: 5 });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Failed to submit testimonial', error);
    }
  };

  return (
    <div className="testimonials-page">
      <h1>{t('testimonials')}</h1>
      
      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.testimonialId} className="testimonial-card">
            <p className="testimonial-message">"{testimonial.content}"</p>
            <div className="testimonial-author">
              <strong>{testimonial.authorName}</strong>
              {testimonial.authorTitle && (
                <p>{testimonial.authorTitle}</p>
              )}
              {testimonial.rating !== undefined && <p>Rating: {testimonial.rating}/5</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="testimonial-form">
        <h2>Submit Your Testimonial</h2>
        {submitted && <div className="success-message">Thank you! Your testimonial is pending review.</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t('name')}
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder={t('position')}
            value={formData.authorTitle}
            onChange={(e) => setFormData({ ...formData, authorTitle: e.target.value })}
          />
          <textarea
            placeholder={t('message')}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={5}
          />
          <label className="rating-label">
            Rating
            <input
              type="number"
              min={1}
              max={5}
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
            />
          </label>
          <button type="submit" className="btn-primary">{t('submit')}</button>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;

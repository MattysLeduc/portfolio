import { useState, useEffect } from 'react';
import { publicAPI } from '../shared/api/api';
import { useLanguage } from '../context/LanguageContext';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await publicAPI.getTestimonials();
      setTestimonials(response.data.data);
    } catch (error) {
      console.error('Failed to load testimonials', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await publicAPI.submitTestimonial(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', position: '', message: '' });
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
          <div key={testimonial.id} className="testimonial-card">
            <p className="testimonial-message">"{testimonial.message}"</p>
            <div className="testimonial-author">
              <strong>{testimonial.name}</strong>
              {testimonial.position && testimonial.company && (
                <p>{testimonial.position} at {testimonial.company}</p>
              )}
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder={t('email')}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder={t('company')}
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <input
            type="text"
            placeholder={t('position')}
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          />
          <textarea
            placeholder={t('message')}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={5}
          />
          <button type="submit" className="btn-primary">{t('submit')}</button>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;

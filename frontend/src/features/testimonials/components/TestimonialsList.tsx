import { useEffect, useState } from 'react';
import { portfolioService } from '../../../shared/api/portfolioService';

export const TestimonialsList: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await portfolioService.getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return <div>Loading testimonials...</div>;

  return (
    <div className="testimonials-grid">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="testimonial-card">
          {testimonial.authorImage && <img src={testimonial.authorImage} alt={testimonial.authorName} className="author-image" />}
          <div className="rating">{'⭐'.repeat(testimonial.rating)}</div>
          <p className="content">"{testimonial.content}"</p>
          <p className="author">{testimonial.authorName}</p>
          <p className="title">{testimonial.authorTitle}</p>
        </div>
      ))}
    </div>
  );
};

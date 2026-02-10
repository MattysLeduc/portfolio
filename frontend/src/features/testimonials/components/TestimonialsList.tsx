import { useEffect, useState } from "react";
import { getTestimonials } from "../api/getTestimonials";
import type { TestimonialResponseModel } from "../models/TestimonialResponseModel";

export const TestimonialsList: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialResponseModel[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        // Handle error silently
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
        <div key={testimonial.testimonialId} className="testimonial-card">
          {testimonial.authorImage && (
            <img
              src={testimonial.authorImage}
              alt={testimonial.authorName}
              className="author-image"
            />
          )}
          <div className="rating">{"⭐".repeat(testimonial.rating)}</div>
          <p className="content">"{testimonial.content}"</p>
          <p className="author">{testimonial.authorName}</p>
          <p className="title">{testimonial.authorTitle}</p>
        </div>
      ))}
    </div>
  );
};

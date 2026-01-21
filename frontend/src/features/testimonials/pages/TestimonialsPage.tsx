import { TestimonialsList } from '../components/TestimonialsList';
import './TestimonialsPage.css';

export const TestimonialsPage: React.FC = () => {
  return (
    <div className="page testimonials-page">
      <div className="container">
        <h1>Testimonials</h1>
        <TestimonialsList />
      </div>
    </div>
  );
};

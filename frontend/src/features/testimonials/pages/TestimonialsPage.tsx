import { useState } from "react";
import { TestimonialsList } from "../components/TestimonialsList";
import { SubmitTestimonialForm } from "../components/SubmitTestimonialForm";

export const TestimonialsPage: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTestimonialSubmitted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-sm font-mono mb-2">
              WHAT OTHERS SAY
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Testimonials
            </h1>
            <p className="text-cyan-300">
              Feedback from colleagues, clients, and collaborators
            </p>
          </div>
          <TestimonialsList key={refreshKey} />

          <div className="mt-20 pt-20 border-t border-cyan-500/20">
            <div className="text-center mb-12">
              <p className="text-cyan-400 text-sm font-mono mb-2">
                SHARE YOUR EXPERIENCE
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Leave a Testimonial
              </h2>
              <p className="text-cyan-300">
                Have worked with me? I'd love to hear about your experience!
              </p>
            </div>
            <SubmitTestimonialForm onSuccess={handleTestimonialSubmitted} />
          </div>
        </div>
      </section>
    </div>
  );
};

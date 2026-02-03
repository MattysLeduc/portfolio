import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navigation from "@/components/portfolio/Navigation";
import { Quote, Star } from "lucide-react";
import { SubmitTestimonialForm } from "@/features/testimonials/components/SubmitTestimonialForm";
import { portfolioService } from "@/shared/api/portfolioService";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedField } from "@/utils/localization";

interface Testimonial {
  [key: string]: any;
  id?: number;
  name: string;
  authorTitleEn?: string;
  authorTitleFr?: string;
  role?: string;
  position?: string;
  company?: string;
  content: string;
  contentEn?: string;
  contentFr?: string;
  message?: string;
  rating: number;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await portfolioService.getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setError(t("loadError"));
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-primary/20 rounded mx-auto mb-4"></div>
              <div className="h-4 w-96 bg-primary/10 rounded mx-auto"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-primary text-sm tracking-widest">
              {t("testimonialsTag")}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold">
              <span className="text-gradient neon-text">{t("testimonialsTitle")}</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {t("testimonialsSubtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => {
              const localizedTitle = getLocalizedField(testimonial, "authorTitle", language) || testimonial.role || testimonial.position || "";
              const roleText = testimonial.company
                ? `${localizedTitle} ${t("at")} ${testimonial.company}`
                : localizedTitle;
              const content = getLocalizedField(testimonial, "content", language) || testimonial.content || testimonial.message || "";
              const rating = testimonial.rating || 5;

              return (
                <motion.div
                  key={testimonial.id || testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="group glass p-6 rounded-sm hover:neon-border transition-all duration-300 flex flex-col"
                >
                  <Quote className="text-primary/30 mb-4" size={32} />

                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                    "{content}"
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="text-primary fill-primary"
                        size={14}
                      />
                    ))}
                  </div>

                  <div className="border-t border-primary/20 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center">
                        <span className="font-display text-sm text-primary">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-mono text-sm font-bold">
                          {testimonial.name}
                        </h4>
                        {roleText && (
                          <p className="font-mono text-xs text-muted-foreground">
                            {roleText}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 pt-16 border-t border-primary/20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <span className="font-mono text-primary text-sm tracking-widest">
                {t("testimonialsShareTag")}
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold">
                <span className="text-gradient neon-text">
                  {t("testimonialsLeaveTitle")}
                </span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                {t("testimonialsLeaveSubtitle")}
              </p>
            </motion.div>
            <SubmitTestimonialForm
              onSuccess={() => {
                /* optional refresh */
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Testimonials;

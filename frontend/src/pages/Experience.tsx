import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navigation from "@/components/portfolio/Navigation";
import { Briefcase, Calendar } from "lucide-react";
import { portfolioService } from "@/shared/api/portfolioService";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedField } from "@/utils/localization";

interface Experience {
  [key: string]: any;
  id?: number;
  title: string;
  titleEn?: string;
  titleFr?: string;
  company: string;
  companyEn?: string;
  companyFr?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  descriptionEn?: string;
  descriptionFr?: string;
  achievements?: string[];
  responsibilities?: string;
  responsibilitiesEn?: string;
  responsibilitiesFr?: string;
  location?: string;
  locationEn?: string;
  locationFr?: string;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await portfolioService.getExperiences();
        setExperiences(data);
      } catch (err) {
        // Handle error silently
        setError(t("loadError"));
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
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
          <div className="max-w-4xl mx-auto text-center">
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-primary text-sm tracking-widest">
              {t("experienceTag")}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold">
              <span className="text-gradient neon-text">
                {t("experienceTitle")}
              </span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {t("experienceSubtitle")}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const localizedTitle =
                  getLocalizedField(exp, "title", language) || exp.title;
                const localizedCompany =
                  getLocalizedField(exp, "company", language) || exp.company;
                const localizedDescription =
                  getLocalizedField(exp, "description", language) ||
                  exp.description;
                const localizedResponsibilities =
                  getLocalizedField(exp, "responsibilities", language) ||
                  exp.responsibilities ||
                  "";
                const period =
                  exp.period ||
                  `${exp.startDate || ""} - ${exp.endDate || t("currentRole")}`.trim();
                const achievementsList =
                  exp.achievements ||
                  (localizedResponsibilities
                    ? localizedResponsibilities.split("\n").filter(Boolean)
                    : []);

                return (
                  <motion.div
                    key={exp.id || localizedCompany}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="relative pl-20"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 top-0 w-5 h-5 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
                    </div>

                    <div className="glass p-6 rounded-sm hover:neon-border transition-all duration-300">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-display text-xl font-bold text-primary">
                            {localizedTitle}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                            <Briefcase size={14} />
                            <span className="font-mono text-sm">
                              {localizedCompany}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={14} />
                          <span className="font-mono text-sm">{period}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">
                        {localizedDescription}
                      </p>

                      {achievementsList.length > 0 && (
                        <ul className="space-y-2">
                          {achievementsList.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-primary mt-1">▹</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Experience;

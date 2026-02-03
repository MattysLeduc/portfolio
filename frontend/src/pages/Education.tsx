import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navigation from "@/components/portfolio/Navigation";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { portfolioService } from "@/shared/api/portfolioService";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedField } from "@/utils/localization";

interface Education {
  [key: string]: any;
  id?: number;
  degree: string;
  degreeEn?: string;
  degreeFr?: string;
  institution: string;
  institutionEn?: string;
  institutionFr?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  descriptionEn?: string;
  descriptionFr?: string;
  gpa?: string;
  type?: string;
}

const Education = () => {
  const [educationData, setEducationData] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const data = await portfolioService.getEducation();
        setEducationData(data);
      } catch (err) {
        console.error("Failed to fetch education:", err);
        setError(t("loadError"));
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
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

  const degrees = educationData.filter(
    (edu) => !edu.type || edu.type === "degree",
  );
  const certifications = educationData.filter(
    (edu) => edu.type === "certification",
  );
  const courses = educationData.filter((edu) => edu.type === "course");

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
              {t("educationTag")}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold">
              <span className="text-gradient neon-text">
                {t("educationTitle")}
              </span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {t("educationSubtitle")}
            </p>
          </motion.div>

          {/* Degrees */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-display text-2xl font-bold mb-8 flex items-center gap-4"
            >
              <GraduationCap className="text-primary" />
              <span>{t("educationDegrees")}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {degrees.map((edu, index) => {
                const period =
                  edu.period ||
                  `${edu.startDate || ""} - ${edu.endDate || ""}`.trim();
                const degreeTitle =
                  getLocalizedField(edu, "degree", language) || edu.degree;
                const institutionName =
                  getLocalizedField(edu, "institution", language) ||
                  edu.institution;
                const description =
                  getLocalizedField(edu, "description", language) ||
                  edu.description;

                return (
                  <motion.div
                    key={edu.id || degreeTitle}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="glass p-6 rounded-sm hover:neon-border transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-display text-lg font-bold">
                        {degreeTitle}
                      </h3>
                      {edu.gpa && (
                        <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-sm text-foreground/60 mb-2">
                      {institutionName}
                    </p>
                    <p className="font-mono text-xs text-primary mb-4">
                      {period}
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-16">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display text-2xl font-bold mb-8 flex items-center gap-4"
              >
                <Award className="text-primary" />
                <span>{t("educationCertifications")}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {certifications.map((cert, index) => {
                  const year = cert.period || cert.endDate || "";
                  const certTitle =
                    getLocalizedField(cert, "degree", language) || cert.degree;
                  const certInstitution =
                    getLocalizedField(cert, "institution", language) ||
                    cert.institution;

                  return (
                    <motion.div
                      key={cert.id || certTitle}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + 0.1 * index }}
                      className="glass p-4 rounded-sm hover:neon-border transition-all duration-300 text-center"
                    >
                      <Award className="mx-auto mb-3 text-primary" size={24} />
                      <h4 className="font-display text-sm font-bold mb-1 text-foreground line-clamp-2">
                        {certTitle}
                      </h4>
                      <p className="font-mono text-xs text-foreground/60 mb-1 line-clamp-1">
                        {certInstitution}
                      </p>
                      <p className="font-mono text-xs text-primary">{year}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Online Courses */}
          {courses.length > 0 && (
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="font-display text-2xl font-bold mb-8 flex items-center gap-4"
              >
                <BookOpen className="text-primary" />
                <span>{t("educationCourses")}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="glass p-6 rounded-sm"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  {courses.map((course) => {
                    const courseTitle =
                      getLocalizedField(course, "degree", language) ||
                      course.degree;
                    const courseInstitution =
                      getLocalizedField(course, "institution", language) ||
                      course.institution;
                    return (
                      <div
                        key={course.id || courseTitle}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="text-primary mt-1">▹</span>
                        <span className="text-foreground/60">
                          {courseTitle} - {courseInstitution}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Education;

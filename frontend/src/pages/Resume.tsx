import { motion } from "framer-motion";
import Navigation from "@/components/portfolio/Navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { portfolioService } from "@/shared/api/portfolioService";

interface PersonalInfo {
  resumeEnUrl?: string;
  resumeFrUrl?: string;
}

const Resume = () => {
  const { t } = useLanguage();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const data = await portfolioService.getPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonalInfo();
  }, []);

  const handleViewResume = (lang: "en" | "fr") => {
    const resumeUrl =
      lang === "en" ? personalInfo?.resumeEnUrl : personalInfo?.resumeFrUrl;
    if (resumeUrl) {
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleDownloadResume = (lang: "en" | "fr") => {
    const resumeUrl =
      lang === "en" ? personalInfo?.resumeEnUrl : personalInfo?.resumeFrUrl;
    if (resumeUrl) {
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download =
        lang === "fr" ? "CV_Mattys_Leduc_FR.pdf" : "CV_Mattys_Leduc_EN.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

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
              {t("resume")}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold">
              <span className="text-gradient neon-text">{t("resume")}</span>
            </h1>
          </motion.div>

          {loading ? (
            <div className="text-center text-foreground/60">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* English CV */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-sm p-8 border border-primary/20"
              >
                <h2 className="font-display text-2xl font-bold mb-6 text-center">
                  <span className="text-gradient">English</span>
                </h2>
                {personalInfo?.resumeEnUrl ? (
                  <div className="flex flex-col gap-4">
                    <button
                      type="button"
                      onClick={() => handleViewResume("en")}
                      className="group relative px-8 py-4 font-mono text-sm uppercase tracking-wider"
                    >
                      <span className="absolute inset-0 glass rounded-sm border-primary/20" />
                      <span className="relative z-10 text-foreground/80 group-hover:text-primary transition-colors">
                        {t("viewCV")}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadResume("en")}
                      className="group relative px-8 py-4 font-mono text-sm uppercase tracking-wider overflow-hidden"
                    >
                      <span className="absolute inset-0 border border-primary neon-border transition-all duration-300 group-hover:neon-border-strong" />
                      <span className="relative z-10 text-primary group-hover:text-foreground transition-colors flex items-center justify-center gap-2">
                        <Download size={20} />
                        {t("downloadCV")}
                      </span>
                      <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-foreground/60 py-8">
                    No English resume uploaded yet
                  </div>
                )}
              </motion.div>

              {/* French CV */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-sm p-8 border border-primary/20"
              >
                <h2 className="font-display text-2xl font-bold mb-6 text-center">
                  <span className="text-gradient">Français</span>
                </h2>
                {personalInfo?.resumeFrUrl ? (
                  <div className="flex flex-col gap-4">
                    <button
                      type="button"
                      onClick={() => handleViewResume("fr")}
                      className="group relative px-8 py-4 font-mono text-sm uppercase tracking-wider"
                    >
                      <span className="absolute inset-0 glass rounded-sm border-primary/20" />
                      <span className="relative z-10 text-foreground/80 group-hover:text-primary transition-colors">
                        {t("viewCV")}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadResume("fr")}
                      className="group relative px-8 py-4 font-mono text-sm uppercase tracking-wider overflow-hidden"
                    >
                      <span className="absolute inset-0 border border-primary neon-border transition-all duration-300 group-hover:neon-border-strong" />
                      <span className="relative z-10 text-primary group-hover:text-foreground transition-colors flex items-center justify-center gap-2">
                        <Download size={20} />
                        {t("downloadCV")}
                      </span>
                      <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-foreground/60 py-8">
                    No French resume uploaded yet
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Resume;

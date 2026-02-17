import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioService } from "@/shared/api/portfolioService";
import { getLocalizedField } from "@/utils/localization";

const HeroSection = () => {
  const { t, language } = useLanguage();
  const [personalInfo, setPersonalInfo] = useState<any>(null);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const data = await portfolioService.getPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error("Failed to load personal info:", error);
      }
    };
    fetchPersonalInfo();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none" />

      {/* Animated circles */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full border border-primary/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full border border-primary/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full border border-primary/40 animate-glow-pulse"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="font-mono text-primary/80 text-sm tracking-[0.3em] uppercase">
            {personalInfo
              ? getLocalizedField(personalInfo, "heroWelcome", language)
              : t("heroWelcome")}
          </span>
        </motion.div>

        <motion.h1
          className="mt-6 text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="text-gradient neon-text">
            {personalInfo
              ? getLocalizedField(personalInfo, "name", language) ||
                "MATTYS LEDUC"
              : "MATTYS LEDUC"}
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {personalInfo
            ? getLocalizedField(personalInfo, "tagline", language)
            : t("heroSubtitle")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a
            href="/projects"
            className="group relative px-8 py-4 font-mono text-sm uppercase tracking-wider overflow-hidden"
          >
            <span className="absolute inset-0 border border-primary neon-border transition-all duration-300 group-hover:neon-border-strong" />
            <span className="relative z-10 text-primary group-hover:text-foreground transition-colors">
              {t("viewProjects")}
            </span>
            <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>

          <a
            href="/contact"
            className="group relative px-8 py-4 font-mono text-sm uppercase tracking-wider"
          >
            <span className="absolute inset-0 glass rounded-sm border-primary/20" />
            <span className="relative z-10 text-foreground/80 group-hover:text-primary transition-colors">
              {t("contactMe")}
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

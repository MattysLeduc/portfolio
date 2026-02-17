import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navigation from "@/components/portfolio/Navigation";
import { portfolioService } from "@/shared/api/portfolioService";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedField } from "@/utils/localization";
import {
  Code2,
  Server,
  Database,
  Layout,
  Braces,
  FileJson,
  GitBranch,
  Cloud,
  Container,
  Settings,
  Terminal,
  Package,
  Lightbulb,
  Sparkles,
  Cpu,
} from "lucide-react";

interface Skill {
  [key: string]: any;
  id?: number;
  name: string;
  nameEn?: string;
  nameFr?: string;
  description?: string;
  descriptionEn?: string;
  descriptionFr?: string;
  level: number;
  category: string;
}

// Icon mapping for common skills
const getSkillIcon = (skillName: string) => {
  const name = skillName.toLowerCase();

  // Frontend technologies
  if (
    name.includes("react") ||
    name.includes("vue") ||
    name.includes("angular")
  )
    return Layout;
  if (
    name.includes("html") ||
    name.includes("css") ||
    name.includes("tailwind")
  )
    return Code2;
  if (name.includes("javascript") || name.includes("typescript"))
    return FileJson;
  if (
    name.includes("next") ||
    name.includes("vite") ||
    name.includes("webpack")
  )
    return Package;

  // Backend technologies
  if (name.includes("java") || name.includes("spring")) return Server;
  if (
    name.includes("python") ||
    name.includes("django") ||
    name.includes("flask")
  )
    return Braces;
  if (name.includes("node") || name.includes("express")) return Terminal;
  if (name.includes("api") || name.includes("rest") || name.includes("graphql"))
    return Settings;

  // Database
  if (
    name.includes("sql") ||
    name.includes("postgres") ||
    name.includes("mongo")
  )
    return Database;
  if (name.includes("redis") || name.includes("cache")) return Cpu;

  // DevOps
  if (name.includes("docker") || name.includes("kubernetes")) return Container;
  if (name.includes("aws") || name.includes("azure") || name.includes("cloud"))
    return Cloud;
  if (
    name.includes("git") ||
    name.includes("ci/cd") ||
    name.includes("jenkins")
  )
    return GitBranch;

  // Default icons
  return Sparkles;
};

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await portfolioService.getSkills();
        setSkills(data);
      } catch (err) {
        // Handle error silently
        setError(t("loadError"));
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categories = [
    { key: "categoryFrontend", value: "Frontend" },
    { key: "categoryBackend", value: "Backend" },
    { key: "categoryDevops", value: "DevOps" },
  ];

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
              {t("skillsTag")}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold">
              <span className="text-gradient neon-text">
                {t("skillsTitle")}
              </span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {t("skillsSubtitle")}
            </p>
          </motion.div>

          <div className="grid gap-16">
            {categories.map((category, catIndex) => (
              <motion.div
                key={category.value}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * catIndex }}
              >
                <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-4">
                  <span className="text-primary">{t(category.key)}</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {skills
                    .filter((skill) => skill.category === category.value)
                    .map((skill, index) => {
                      const SkillIcon = getSkillIcon(
                        skill.name || skill.nameEn || "",
                      );

                      return (
                        <motion.div
                          key={skill.id || skill.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + 0.1 * index }}
                          className="glass p-6 rounded-sm group hover:neon-border transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/20 transition-all">
                              <SkillIcon className="text-primary" size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-mono text-lg">
                                  {getLocalizedField(skill, "name", language) ||
                                    skill.name}
                                </span>
                                <span className="font-mono text-sm text-primary">
                                  {skill.level}%
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{
                                duration: 1,
                                delay: 0.5 + 0.1 * index,
                              }}
                              style={{
                                boxShadow: "0 0 20px hsl(190 100% 50% / 0.5)",
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;

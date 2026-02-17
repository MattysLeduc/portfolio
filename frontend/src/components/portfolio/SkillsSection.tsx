import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Code2,
  Server,
  Database,
  FileJson,
  Cloud,
  Terminal,
} from "lucide-react";
import { portfolioService } from "@/shared/api/portfolioService";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedField } from "@/utils/localization";

// Icon mapping for skills
const getSkillIcon = (skillName: string) => {
  const name = skillName?.toLowerCase() || "";
  if (name.includes("react") || name.includes("vue") || name.includes("angular")) return Code2;
  if (name.includes("typescript") || name.includes("javascript")) return FileJson;
  if (name.includes("node") || name.includes("express")) return Terminal;
  if (name.includes("python") || name.includes("java") || name.includes("spring")) return Server;
  if (name.includes("aws") || name.includes("azure") || name.includes("cloud")) return Cloud;
  if (name.includes("sql") || name.includes("postgres") || name.includes("mongo")) return Database;
  return Code2; // default
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const [skills, setSkills] = useState<any[]>([]);
  const [allSkills, setAllSkills] = useState<any[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await portfolioService.getSkills();
        setSkills(data.slice(0, 6)); // Get first 6 skills for the proficiency bars
        setAllSkills(data); // All skills for the technologies grid
      } catch (error) {
        console.error("Failed to load skills:", error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-32 px-6 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="font-mono text-primary text-sm">02.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Skills & Technologies</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skill bars */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="font-mono text-sm text-primary/80 uppercase tracking-wider mb-8"
            >
              Proficiency Level
            </motion.h3>
            
            {skills.map((skill, index) => {
              const skillName = getLocalizedField(skill, "name", language) || skill.name;
              const SkillIcon = getSkillIcon(skillName);
              
              return (
                <motion.div
                  key={skill.skillId || skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                        <SkillIcon className="text-primary" size={16} />
                      </div>
                      <span className="font-mono text-sm">{skillName}</span>
                    </div>
                    <span className="font-mono text-xs text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.3 + 0.1 * index, ease: "easeOut" }}
                      style={{
                        boxShadow: "0 0 20px hsl(190 100% 50% / 0.5)",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tech grid */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="font-mono text-sm text-primary/80 uppercase tracking-wider mb-8"
            >
              Technologies I Work With
            </motion.h3>
            
            <div className="grid grid-cols-2 gap-3">
              {allSkills.map((skill, index) => (
                <motion.div
                  key={skill.skillId || skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="group"
                >
                  <div className="flex items-center gap-2 p-3 glass rounded-sm hover:border-primary/50 transition-all duration-300 hover:neon-border">
                    <span className="text-primary text-sm">▹</span>
                    <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {getLocalizedField(skill, "name", language) || skill.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
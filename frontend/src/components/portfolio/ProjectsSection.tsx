import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { portfolioService } from "@/shared/api/portfolioService";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedField } from "@/utils/localization";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await portfolioService.getFeaturedProjects();
        setProjects(data.slice(0, 3)); // Get first 3 featured projects
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-primary text-sm">03.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Featured Projects
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * index }}
              className={`relative grid md:grid-cols-12 gap-4 items-center ${
                index % 2 === 1 ? "md:text-right" : ""
              }`}
            >
              {/* Project image/preview */}
              <div
                className={`md:col-span-7 ${index % 2 === 1 ? "md:col-start-6" : ""}`}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all duration-300 z-10" />
                  <div className="aspect-video glass overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={
                          getLocalizedField(project, "name", language) ||
                          project.title
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 mx-auto rounded-full border border-primary/50 flex items-center justify-center mb-4 animate-glow-pulse">
                            <span className="font-display text-2xl text-primary">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <p className="font-mono text-sm text-primary/70">
                            Project Preview
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 transition-all duration-300 neon-border opacity-0 group-hover:opacity-100" />
                </div>
              </div>

              {/* Project content */}
              <div
                className={`md:col-span-6 md:row-start-1 relative z-20 ${
                  index % 2 === 1 ? "md:col-start-1" : "md:col-start-6"
                }`}
              >
                <div className="space-y-4">
                  <p className="font-mono text-primary text-sm">
                    Featured Project
                  </p>
                  <h3 className="font-display text-2xl font-bold">
                    {getLocalizedField(project, "name", language) ||
                      project.title}
                  </h3>

                  <div className="glass p-6 rounded-sm">
                    <p className="text-muted-foreground">
                      {getLocalizedField(project, "description", language) ||
                        project.description}
                    </p>
                  </div>

                  <div
                    className={`flex flex-wrap gap-3 ${index % 2 === 1 ? "md:justify-end" : ""}`}
                  >
                    {(
                      project.tech ||
                      (project.technologies
                        ? project.technologies
                            .split(",")
                            .map((t: string) => t.trim())
                        : [])
                    ).map((tech: string) => (
                      <span
                        key={tech}
                        className="font-mono text-xs text-primary/80 px-2 py-1 bg-primary/10 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`flex gap-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}
                  >
                    {(project.github || project.repoUrl) && (
                      <a
                        href={project.github || project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {(project.live || project.demoUrl) && (
                      <a
                        href={project.live || project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

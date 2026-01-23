import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navigation from "@/components/portfolio/Navigation";
import { ExternalLink, Github } from "lucide-react";
import { portfolioService } from "@/shared/api/portfolioService";

interface Project {
  id?: number;
  title: string;
  description: string;
  tech?: string[];
  technologies?: string;
  github?: string;
  githubUrl?: string;
  live?: string;
  liveUrl?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await portfolioService.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
            <span className="font-mono text-primary text-sm tracking-widest">MY WORK</span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold">
              <span className="text-gradient neon-text">Featured Projects</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A selection of projects I've worked on, from web apps to AI tools
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const techArray = project.tech || (project.technologies ? project.technologies.split(',').map(t => t.trim()) : []);
              const githubUrl = project.github || project.githubUrl || '#';
              const liveUrl = project.live || project.liveUrl || '#';
              
              return (
                <motion.div
                  key={project.id || project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="group glass rounded-sm overflow-hidden hover:neon-border transition-all duration-300"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all" />
                    <div className="w-16 h-16 rounded-full border border-primary/50 flex items-center justify-center animate-glow-pulse">
                      <span className="font-display text-2xl text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {project.description}
                    </p>
                    
                    {techArray.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {techArray.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-xs text-primary/80 px-2 py-1 bg-primary/10 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex gap-4 pt-2">
                      {githubUrl && githubUrl !== '#' && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                      {liveUrl && liveUrl !== '#' && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
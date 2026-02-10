import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { portfolioService } from '../../../shared/api/portfolioService';

export const HomePage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await portfolioService.getPortfolioSummary();
        setPortfolioData(data);
      } catch (error) {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-cyan-400">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated background circles */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-cyan-500/20 opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-cyan-500/10 opacity-30"></div>
          </div>

          <div className="mb-8">
            <p className="text-cyan-400 text-sm font-mono mb-4">WELCOME TO MY PORTFOLIO</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 drop-shadow-lg">
              MATTYS LEDUC
            </h1>
            <p className="text-xl text-cyan-300 mb-8">Full-Stack Developer & Digital Architect</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => navigate('/projects')}
              className="px-8 py-3 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all font-mono text-sm font-semibold"
            >
              VIEW PROJECTS
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 py-3 bg-cyan-600 text-black hover:bg-cyan-400 transition-all font-mono text-sm font-semibold flex items-center justify-center gap-2"
            >
              CONTACT ME <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      {portfolioData?.projects && portfolioData.projects.length > 0 && (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-cyan-400 text-sm font-mono mb-2">MY WORK</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
              <p className="text-cyan-300">A selection of projects I've worked on, from web apps to AI tools</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {portfolioData.projects.slice(0, 3).map((project: any, idx: number) => (
                <div key={project.id} className="group">
                  <div className="aspect-video bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded border border-cyan-500/30 flex items-center justify-center hover:border-cyan-500/60 transition-all overflow-hidden">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-6xl font-bold text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={() => navigate('/projects')}
                className="inline-block px-6 py-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all font-mono text-sm"
              >
                View All Projects
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Skills Preview */}
      {portfolioData?.skills && portfolioData.skills.length > 0 && (
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-cyan-400 text-sm font-mono mb-2">WHAT I DO</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Skills & Expertise</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[0, 1].map((col) => (
                <div key={col} className="space-y-4">
                  {portfolioData.skills.slice(col * 3, (col + 1) * 3).map((skill: any) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">{skill.name}</span>
                        <span className="text-cyan-400">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" 
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Preview */}
      {portfolioData?.testimonials && portfolioData.testimonials.length > 0 && (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-cyan-400 text-sm font-mono mb-2">WHAT OTHERS SAY</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Testimonials</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {portfolioData.testimonials.slice(0, 3).map((testimonial: any) => (
                <div key={testimonial.id} className="border border-cyan-500/30 rounded p-6 hover:border-cyan-500/60 transition-all">
                  <p className="text-cyan-400 mb-4">❝{testimonial.content.substring(0, 100)}...❞</p>
                  <p className="text-white font-semibold">{testimonial.authorName}</p>
                  <p className="text-cyan-300 text-sm">{testimonial.authorPosition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to work together?</h2>
          <p className="text-cyan-300 mb-8">Let's create something amazing</p>
          <button 
            onClick={() => navigate('/contact')}
            className="inline-block px-8 py-3 bg-cyan-600 text-black hover:bg-cyan-400 transition-all font-mono text-sm font-semibold"
          >
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
};


import { ProjectsList } from '../components/ProjectsList';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-sm font-mono mb-2">MY WORK</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Featured Projects</h1>
            <p className="text-cyan-300">A selection of projects I've worked on, from web apps to AI tools</p>
          </div>
          <ProjectsList />
        </div>
      </section>
    </div>
  );
};

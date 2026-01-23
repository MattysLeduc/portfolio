import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="font-mono text-primary text-sm">01.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm a passionate developer who loves building digital experiences that live on the internet. 
              My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Fast-forward to today, and I've had the privilege of working at a start-up, a huge corporation, and a student-led design studio. 
              My main focus these days is building accessible, inclusive products and digital experiences.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              When I'm not at the computer, I'm usually rock climbing, reading sci-fi novels, or exploring new coffee shops.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative frame */}
              <div className="absolute inset-0 border border-primary/30 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
              
              {/* Image container */}
              <div className="relative overflow-hidden glass">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full border-2 border-primary/50 flex items-center justify-center mb-4 neon-border">
                      <span className="font-display text-4xl text-primary">JD</span>
                    </div>
                    <p className="font-mono text-sm text-primary/70">Developer & Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
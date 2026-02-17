import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioService } from "@/shared/api/portfolioService";
import { getLocalizedField } from "@/utils/localization";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
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

  const socialLinks = [
    { icon: Github, href: personalInfo?.githubUrl || "#", label: "GitHub", show: !!personalInfo?.githubUrl },
    { icon: Linkedin, href: personalInfo?.linkedinUrl || "#", label: "LinkedIn", show: !!personalInfo?.linkedinUrl },
    { icon: Twitter, href: personalInfo?.twitterUrl || "#", label: "Twitter", show: !!personalInfo?.twitterUrl },
    { icon: Mail, href: `mailto:${personalInfo?.email || "hello@example.com"}`, label: "Email", show: !!personalInfo?.email },
  ].filter(link => link.show);

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-primary text-sm">04. What's Next?</span>
        </motion.div>

        <motion.h2
          className="mt-4 font-display text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-gradient neon-text">Get In Touch</span>
        </motion.h2>

        <motion.p
          className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {personalInfo ? (getLocalizedField(personalInfo, "contactMessage", language) || "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open. I'll try my best to get back to you!") : "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open. I'll try my best to get back to you!"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          <a
            href={`mailto:${personalInfo?.email || "hello@example.com"}`}
            className="relative group inline-flex items-center gap-3 px-10 py-4 font-mono text-sm uppercase tracking-wider overflow-hidden"
          >
            <span className="absolute inset-0 border border-primary neon-border transition-all duration-300 group-hover:neon-border-strong" />
            <span className="relative z-10 text-primary group-hover:text-background transition-colors">
              Say Hello
            </span>
            <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="mt-16 flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              className="group relative p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + 0.1 * index }}
              aria-label={social.label}
            >
              <span className="absolute inset-0 border border-transparent group-hover:border-primary/50 rounded-full transition-all duration-300 group-hover:neon-border" />
              <social.icon
                size={22}
                className="text-muted-foreground group-hover:text-primary transition-colors"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-32 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p className="font-mono text-xs text-muted-foreground">
          Designed & Built by <span className="text-primary">John Doe</span>
        </p>
        <p className="font-mono text-xs text-muted-foreground/50 mt-2">
          © 2024 All Rights Reserved
        </p>
      </motion.div>
    </section>
  );
};

export default ContactSection;
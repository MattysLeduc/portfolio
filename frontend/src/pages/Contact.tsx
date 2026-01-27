import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/portfolio/Navigation";
import { Mail, Github, Linkedin, MapPin, Phone, Send } from "lucide-react";
import { portfolioService } from "@/shared/api/portfolioService";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError(null);
      await portfolioService.submitContact(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub", username: "@mattsleduc" },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      username: "in/mattysleduc",
    },
  ];

  const contactInfo = [
    { icon: Mail, label: "Email", value: "mattys.leduc@gmail.com" },
    { icon: Phone, label: "Phone", value: "+1 (514) 506-1001" },
    { icon: MapPin, label: "Location", value: "Montreal, QC" },
  ];

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
              GET IN TOUCH
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold">
              <span className="text-gradient neon-text">Contact Me</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from
              you!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form
                onSubmit={handleSubmit}
                className="glass p-8 rounded-sm space-y-6"
              >
                <div>
                  <label className="font-mono text-sm text-muted-foreground block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-secondary/30 border border-primary/20 rounded-sm px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary focus:neon-border transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="font-mono text-sm text-muted-foreground block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-secondary/30 border border-primary/20 rounded-sm px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary focus:neon-border transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="font-mono text-sm text-muted-foreground block mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full bg-secondary/30 border border-primary/20 rounded-sm px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary focus:neon-border transition-all resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                {success && (
                  <div className="p-4 bg-primary/10 border border-primary rounded-sm">
                    <p className="text-primary text-sm font-mono text-center">
                      Message sent successfully!
                    </p>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500 rounded-sm">
                    <p className="text-red-500 text-sm font-mono text-center">
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative w-full px-8 py-4 font-mono text-sm uppercase tracking-wider overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 border border-primary neon-border transition-all duration-300 group-hover:neon-border-strong" />
                  <span className="relative z-10 text-primary group-hover:text-background transition-colors flex items-center justify-center gap-2">
                    <Send size={16} />
                    {submitting ? "Sending..." : "Send Message"}
                  </span>
                  <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Info cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + 0.1 * index }}
                    className="glass p-6 rounded-sm flex items-center gap-4 hover:neon-border transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center">
                      <info.icon className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                        {info.label}
                      </p>
                      <p className="font-mono text-sm">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass p-6 rounded-sm"
              >
                <h3 className="font-display text-lg font-bold mb-4">
                  Connect With Me
                </h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex items-center gap-4 p-3 rounded hover:bg-primary/5 transition-colors group"
                    >
                      <social.icon
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                        size={20}
                      />
                      <div>
                        <p className="font-mono text-sm group-hover:text-primary transition-colors">
                          {social.label}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {social.username}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Availability status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="glass p-6 rounded-sm text-center"
              >
                <div className="inline-flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-sm text-accent">
                    Available for work
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Currently accepting new projects and collaborations
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;

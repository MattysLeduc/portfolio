import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/portfolio/Navigation";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { portfolioService } from "@/shared/api/portfolioService";
import { useLanguage } from "@/context/LanguageContext";
import { contactFormSchema } from "@/utils/validation";
import { sanitizeFormData } from "@/utils/sanitization";
import { z } from "zod";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    setError(null);

    try {
      // Sanitize input data
      const sanitizedData = sanitizeFormData(
        formData as unknown as Record<string, unknown>,
        {
          name: "text",
          email: "email",
          subject: "text",
          message: "text",
        },
      );

      // Validate the sanitized data
      const validatedData = contactFormSchema.parse(sanitizedData);

      setSubmitting(true);
      await portfolioService.submitContact(validatedData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            errors[error.path[0] as string] = error.message;
          }
        });
        setValidationErrors(errors);
        setError("Please fix the validation errors below.");
      } else {
        // Check if it's a rate limit error
        const axiosError = err as {
          response?: { status?: number; data?: { message?: string } };
        };
        if (axiosError.response?.status === 429) {
          setError(
            axiosError.response.data?.message ||
              "Too many requests. Please try again later.",
          );
        } else {
          // Log error silently without exposing details
          setError(t("contactSendError"));
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/MattysLeduc",
      label: "GitHub",
      username: "@mattsleduc",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mattys-leduc-405435307",
      label: "LinkedIn",
      username: "in/mattysleduc",
    },
  ];

  const contactInfo = [
    { icon: Mail, label: t("email"), value: "mattys.leduc@gmail.com" },
    { icon: MapPin, label: t("location"), value: "Montreal, QC" },
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
              {t("contactTag")}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold">
              <span className="text-gradient neon-text">
                {t("contactTitle")}
              </span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {t("contactSubtitle")}
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
                    {t("name")}{" "}
                    <span className="text-xs text-muted-foreground/60">
                      (max 100 chars)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value.slice(0, 100),
                      })
                    }
                    className={`w-full bg-secondary/30 border rounded-sm px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary focus:neon-border transition-all ${
                      validationErrors.name
                        ? "border-red-500"
                        : "border-primary/20"
                    }`}
                    placeholder={t("contactNamePlaceholder")}
                    required
                    maxLength={100}
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-xs font-mono mt-1">
                      {validationErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-sm text-muted-foreground block mb-2">
                    {t("email")}{" "}
                    <span className="text-xs text-muted-foreground/60">
                      (max 255 chars)
                    </span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value.slice(0, 255),
                      })
                    }
                    className={`w-full bg-secondary/30 border rounded-sm px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary focus:neon-border transition-all ${
                      validationErrors.email
                        ? "border-red-500"
                        : "border-primary/20"
                    }`}
                    placeholder={t("contactEmailPlaceholder")}
                    required
                    maxLength={255}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-xs font-mono mt-1">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-sm text-muted-foreground block mb-2">
                    {t("subject")}{" "}
                    <span className="text-xs text-muted-foreground/60">
                      (max 200 chars)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subject: e.target.value.slice(0, 200),
                      })
                    }
                    className={`w-full bg-secondary/30 border rounded-sm px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary focus:neon-border transition-all ${
                      validationErrors.subject
                        ? "border-red-500"
                        : "border-primary/20"
                    }`}
                    placeholder={t("contactSubjectPlaceholder")}
                    required
                    maxLength={200}
                  />
                  {validationErrors.subject && (
                    <p className="text-red-500 text-xs font-mono mt-1">
                      {validationErrors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-sm text-muted-foreground block mb-2">
                    {t("message")}{" "}
                    <span className="text-xs text-muted-foreground/60">
                      ({formData.message.length}/2000 chars)
                    </span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value.slice(0, 2000),
                      })
                    }
                    rows={5}
                    className={`w-full bg-secondary/30 border rounded-sm px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary focus:neon-border transition-all resize-none ${
                      validationErrors.message
                        ? "border-red-500"
                        : "border-primary/20"
                    }`}
                    placeholder={t("contactMessagePlaceholder")}
                    required
                    maxLength={2000}
                  />
                  {validationErrors.message && (
                    <p className="text-red-500 text-xs font-mono mt-1">
                      {validationErrors.message}
                    </p>
                  )}
                </div>

                {success && (
                  <div className="p-4 bg-primary/10 border border-primary rounded-sm">
                    <p className="text-primary text-sm font-mono text-center">
                      {t("contactSuccess")}
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
                    {submitting ? t("contactSending") : t("contactSend")}
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
                  {t("contactConnect")}
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
                    {t("contactAvailable")}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("contactAvailability")}
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

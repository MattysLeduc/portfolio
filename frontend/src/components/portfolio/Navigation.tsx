import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { key: "skills", href: "/skills" },
  { key: "projects", href: "/projects" },
  { key: "experience", href: "/experience" },
  { key: "education", href: "/education" },
  { key: "hobbies", href: "/hobbies" },
  { key: "testimonials", href: "/testimonials" },
  { key: "resume", href: "/resume" },
  { key: "contact", href: "/contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="font-display text-2xl font-bold text-primary neon-text"
          >
            ML
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + 0.05 * index }}
            >
              <Link
                to={item.href}
                className={`font-mono text-sm transition-colors relative group ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t(item.key)}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-primary transition-all ${
                    location.pathname === item.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </motion.div>
          ))}

          <button
            type="button"
            onClick={toggleLanguage}
            className="px-3 py-2 border border-primary/40 text-primary hover:bg-primary hover:text-background transition-all font-mono text-xs rounded-md"
            aria-label={t("language")}
          >
            {language === "en" ? "FR" : "EN"}
          </button>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.95 }}
              >
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-2 border border-primary/50 text-primary hover:bg-primary hover:text-background transition-all font-mono text-sm rounded-md"
                >
                  <LayoutDashboard size={16} />
                  <span>Admin Panel</span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 border border-primary/50 text-primary hover:bg-primary hover:text-background transition-all font-mono text-sm rounded-md"
                >
                  <LogOut size={16} />
                  <span>{t("logout")}</span>
                </button>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95 }}
            >
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 border border-primary/50 text-primary hover:bg-primary hover:text-background transition-all font-mono text-sm rounded-md"
              >
                <LogIn size={16} />
                <span>{t("signIn")}</span>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        className={`lg:hidden absolute top-full left-0 right-0 glass ${isOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
      >
        <div className="px-6 py-8 flex flex-col gap-4">
          {/* Auth Buttons - Mobile */}
          {isAuthenticated ? (
            <>
              <Link
                to="/admin"
                className="flex items-center justify-center gap-2 px-4 py-3 border border-primary/50 text-primary hover:bg-primary hover:text-background transition-all font-mono text-sm rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={16} />
                <span>Admin Panel</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-primary/50 text-primary hover:bg-primary hover:text-background transition-all font-mono text-sm rounded-md"
              >
                <LogOut size={16} />
                <span>{t("logout")}</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-primary/50 text-primary hover:bg-primary hover:text-background transition-all font-mono text-sm rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={16} />
              <span>{t("signIn")}</span>
            </Link>
          )}
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className={`font-mono text-lg transition-colors ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className="px-3 py-2 border border-primary/40 text-primary hover:bg-primary hover:text-background transition-all font-mono text-sm rounded-md"
          >
            {language === "en" ? "FR" : "EN"}
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navigation;

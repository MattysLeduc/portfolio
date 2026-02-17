import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navigation from "@/components/portfolio/Navigation";
import {
  Camera,
  Mountain,
  Gamepad2,
  BookOpen,
  Music,
  Coffee,
  Heart,
  Code,
  Palette,
  Plane,
  Dumbbell,
  Film,
  Utensils,
  Bike,
  Guitar,
  Users,
  Globe,
  Sparkles,
} from "lucide-react";
import { portfolioService } from "@/shared/api/portfolioService";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedField } from "@/utils/localization";

interface Hobby {
  [key: string]: any;
  id?: number;
  name: string;
  nameEn?: string;
  nameFr?: string;
  description: string;
  descriptionEn?: string;
  descriptionFr?: string;
  icon?: string;
}

const iconMap: Record<string, any> = {
  Camera,
  Mountain,
  Gamepad2,
  BookOpen,
  Music,
  Coffee,
  Heart,
  Code,
  Palette,
  Plane,
  Dumbbell,
  Film,
  Utensils,
  Bike,
  Guitar,
  Users,
  Globe,
  Sparkles,
};

const colorGradients = [
  "from-orange-500 to-red-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-teal-500",
  "from-blue-500 to-cyan-500",
  "from-indigo-500 to-purple-500",
  "from-amber-500 to-orange-500",
  "from-pink-500 to-rose-500",
  "from-cyan-500 to-blue-500",
  "from-teal-500 to-green-500",
  "from-violet-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-sky-500 to-blue-500",
  "from-fuchsia-500 to-pink-500",
  "from-lime-500 to-green-500",
  "from-red-500 to-pink-500",
];

const Hobbies = () => {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        setLoading(true);
        const data = await portfolioService.getHobbies();
        setHobbies(data);
      } catch (err) {
        // Handle error silently
        setError(t("loadError"));
      } finally {
        setLoading(false);
      }
    };

    fetchHobbies();
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
            <span className="font-mono text-primary text-sm tracking-widest">
              {t("hobbiesTag")}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold">
              <span className="text-gradient neon-text">
                {t("hobbiesTitle")}
              </span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {t("hobbiesSubtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hobbies.map((hobby, index) => {
              const IconComponent =
                hobby.icon && iconMap[hobby.icon] ? iconMap[hobby.icon] : Heart;
              const colorGradient =
                colorGradients[index % colorGradients.length];
              const hobbyName =
                getLocalizedField(hobby, "name", language) || hobby.name;
              const hobbyDescription =
                getLocalizedField(hobby, "description", language) ||
                hobby.description;

              return (
                <motion.div
                  key={hobby.id || hobbyName}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="group glass p-8 rounded-sm hover:neon-border transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorGradient} p-0.5 mb-6 group-hover:animate-glow-pulse`}
                  >
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <IconComponent className="text-primary" size={28} />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {hobbyName}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {hobbyDescription}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Fun facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 glass p-8 rounded-sm"
          >
            <h3 className="font-display text-xl font-bold mb-6 text-center">
              <span className="text-primary">{t("hobbiesFunFacts")}</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-display text-4xl font-bold text-gradient neon-text mb-2">
                  2000KM+
                </div>
                <p className="font-mono text-sm text-muted-foreground">
                  {t("hobbiesFactTravel")}
                </p>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-gradient neon-text mb-2">
                  400m
                </div>
                <p className="font-mono text-sm text-muted-foreground">
                  {t("hobbiesFactSwim")}
                </p>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-gradient neon-text mb-2">
                  Argentina
                </div>
                <p className="font-mono text-sm text-muted-foreground">
                  {t("hobbiesFactTrip")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Hobbies;

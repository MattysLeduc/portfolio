import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PersonalInfoForm from "@/features/admin/components/PersonalInfoForm";
import SkillsForm from "@/features/admin/components/SkillsForm";
import ProjectsForm from "@/features/admin/components/ProjectsForm";
import ExperienceForm from "@/features/admin/components/ExperienceForm";
import EducationForm from "@/features/admin/components/EducationForm";
import HobbiesForm from "@/features/admin/components/HobbiesForm";
import TestimonialsForm from "@/features/admin/components/TestimonialsForm";
import MessagesForm from "@/features/admin/components/MessagesForm";
import ResumeForm from "@/features/admin/components/ResumeForm";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:text-primary/80"
              >
                <LayoutDashboard size={20} />
              </Button>
            </Link>
            <h1 className="font-display text-xl font-bold">
              <span className="text-gradient">{t("adminPanel")}</span>
            </h1>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="border-primary/50">
              <ArrowLeft size={16} className="mr-2" />
              {t("backToSite")}
            </Button>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-sm p-6"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 lg:grid-cols-9 gap-2 bg-transparent h-auto p-0 mb-8">
                {[
                  { value: "personalInfo", label: "Personal Info" },
                  { value: "skills", label: t("skills") },
                  { value: "projects", label: t("projects") },
                  { value: "experience", label: t("experience") },
                  { value: "education", label: t("education") },
                  { value: "hobbies", label: t("hobbies") },
                  { value: "testimonials", label: t("testimonials") },
                  { value: "messages", label: t("messages") },
                  { value: "resume", label: t("resume") },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-primary/30 data-[state=active]:border-primary"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="personalInfo">
                <PersonalInfoForm />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsForm />
              </TabsContent>

              <TabsContent value="projects">
                <ProjectsForm />
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceForm />
              </TabsContent>

              <TabsContent value="education">
                <EducationForm />
              </TabsContent>

              <TabsContent value="hobbies">
                <HobbiesForm />
              </TabsContent>

              <TabsContent value="testimonials">
                <TestimonialsForm />
              </TabsContent>

              <TabsContent value="messages">
                <MessagesForm />
              </TabsContent>

              <TabsContent value="resume">
                <ResumeForm />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Admin;

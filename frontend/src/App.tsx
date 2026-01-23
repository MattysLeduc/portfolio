import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Footer } from "@/components/Footer";
import Index from "@/pages/Index";
import Skills from "@/pages/Skills";
import Projects from "@/pages/Projects";
import Experience from "@/pages/Experience";
import Education from "@/pages/Education";
import Hobbies from "@/pages/Hobbies";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminLayout } from "@/features/admin/layouts/AdminLayout";
import { AdminDashboardPage } from "@/features/admin/pages/AdminDashboardPage";
import { AdminSkillsPage } from "@/features/admin/pages/AdminSkillsPage";
import { AdminProjectsPage } from "@/features/admin/pages/AdminProjectsPage";
import { AdminExperiencePage } from "@/features/admin/pages/AdminExperiencePage";
import { AdminEducationPage } from "@/features/admin/pages/AdminEducationPage";
import { AdminHobbiesPage } from "@/features/admin/pages/AdminHobbiesPage";
import { AdminTestimonialsPage } from "@/features/admin/pages/AdminTestimonialsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground flex flex-col">
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/hobbies" element={<Hobbies />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />

                  {/* Admin routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="skills" element={<AdminSkillsPage />} />
                    <Route path="projects" element={<AdminProjectsPage />} />
                    <Route path="experience" element={<AdminExperiencePage />} />
                    <Route path="experiences" element={<AdminExperiencePage />} />
                    <Route path="education" element={<AdminEducationPage />} />
                    <Route path="hobbies" element={<AdminHobbiesPage />} />
                    <Route path="testimonials" element={<AdminTestimonialsPage />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

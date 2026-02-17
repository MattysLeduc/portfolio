import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { personalInfoAdminService } from "@/shared/api/adminService";

interface PersonalInfo {
  id?: number;
  nameEn: string;
  nameFr: string;
  taglineEn: string;
  taglineFr: string;
  heroWelcomeEn: string;
  heroWelcomeFr: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  email: string;
  contactMessageEn: string;
  contactMessageFr: string;
  resumeEnUrl?: string;
  resumeFrUrl?: string;
}

const PersonalInfoForm = () => {
  const [formData, setFormData] = useState<PersonalInfo>({
    nameEn: "",
    nameFr: "",
    taglineEn: "",
    taglineFr: "",
    heroWelcomeEn: "",
    heroWelcomeFr: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    email: "",
    contactMessageEn: "",
    contactMessageFr: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const loadPersonalInfo = async () => {
    try {
      setLoading(true);
      const data = await personalInfoAdminService.getPersonalInfo();
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error("Failed to load personal info:", error);
      toast({
        title: "Error",
        description: "Failed to load personal information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await personalInfoAdminService.updatePersonalInfo(formData);
      toast({
        title: "Success",
        description: "Personal information updated successfully",
      });
    } catch (error) {
      console.error("Failed to update personal info:", error);
      toast({
        title: "Error",
        description: "Failed to update personal information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.nameEn) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div>
        <h3 className="font-mono text-sm text-primary uppercase tracking-wider mb-2">
          Hero Section
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Displayed on the <strong>Home Page</strong> - Hero section with your
          name and introduction
        </p>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nameEn">Name (English)</Label>
              <Input
                id="nameEn"
                value={formData.nameEn}
                onChange={(e) => handleChange("nameEn", e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary"
                placeholder="e.g., John Doe"
              />
              <p className="text-xs text-muted-foreground">
                Displayed prominently in the hero section
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nameFr">Name (French)</Label>
              <Input
                id="nameFr"
                value={formData.nameFr}
                onChange={(e) => handleChange("nameFr", e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary"
                placeholder="e.g., Jean Dupont"
              />
              <p className="text-xs text-muted-foreground">
                Version française du nom
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taglineEn">Tagline (English)</Label>
              <Input
                id="taglineEn"
                value={formData.taglineEn}
                onChange={(e) => handleChange("taglineEn", e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary"
                placeholder="e.g., Full Stack Developer | AI Enthusiast"
              />
              <p className="text-xs text-muted-foreground">
                Short professional title/subtitle
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="taglineFr">Tagline (French)</Label>
              <Input
                id="taglineFr"
                value={formData.taglineFr}
                onChange={(e) => handleChange("taglineFr", e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary"
                placeholder="e.g., Développeur Full Stack | Passionné d'IA"
              />
              <p className="text-xs text-muted-foreground">
                Titre professionnel en français
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heroWelcomeEn">Welcome Text (English)</Label>
              <Textarea
                id="heroWelcomeEn"
                value={formData.heroWelcomeEn}
                onChange={(e) => handleChange("heroWelcomeEn", e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary"
                rows={3}
                placeholder="Brief introduction message..."
              />
              <p className="text-xs text-muted-foreground">
                Welcome message shown in the hero section
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroWelcomeFr">Welcome Text (French)</Label>
              <Textarea
                id="heroWelcomeFr"
                value={formData.heroWelcomeFr}
                onChange={(e) => handleChange("heroWelcomeFr", e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary"
                rows={3}
                placeholder="Message d'introduction bref..."
              />
              <p className="text-xs text-muted-foreground">
                Message de bienvenue en français
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div>
        <h3 className="font-mono text-sm text-primary uppercase tracking-wider mb-2">
          Contact Section
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Displayed on the <strong>Contact Page</strong> - Contact section with
          email and call-to-action message
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-background/50 border-primary/30 focus:border-primary"
              placeholder="your.email@example.com"
            />
            <p className="text-xs text-muted-foreground">
              Used for the contact button mailto link
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactMessageEn">
                Contact Message (English)
              </Label>
              <Textarea
                id="contactMessageEn"
                value={formData.contactMessageEn}
                onChange={(e) =>
                  handleChange("contactMessageEn", e.target.value)
                }
                className="bg-background/50 border-primary/30 focus:border-primary"
                rows={3}
                placeholder="Brief message inviting visitors to contact you..."
              />
              <p className="text-xs text-muted-foreground">
                Call-to-action text in the contact section
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactMessageFr">Contact Message (French)</Label>
              <Textarea
                id="contactMessageFr"
                value={formData.contactMessageFr}
                onChange={(e) =>
                  handleChange("contactMessageFr", e.target.value)
                }
                className="bg-background/50 border-primary/30 focus:border-primary"
                rows={3}
                placeholder="Message invitant les visiteurs à vous contacter..."
              />
              <p className="text-xs text-muted-foreground">
                Texte d'appel à l'action en français
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="font-mono text-sm text-primary uppercase tracking-wider mb-2">
          Social Links
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Displayed on the <strong>Contact Page</strong> - Social media icons
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              value={formData.githubUrl}
              onChange={(e) => handleChange("githubUrl", e.target.value)}
              className="bg-background/50 border-primary/30 focus:border-primary"
              placeholder="https://github.com/username"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to hide the icon
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={(e) => handleChange("linkedinUrl", e.target.value)}
              className="bg-background/50 border-primary/30 focus:border-primary"
              placeholder="https://linkedin.com/in/username"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to hide the icon
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitterUrl">Twitter URL</Label>
            <Input
              id="twitterUrl"
              value={formData.twitterUrl}
              onChange={(e) => handleChange("twitterUrl", e.target.value)}
              className="bg-background/50 border-primary/30 focus:border-primary"
              placeholder="https://twitter.com/username"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to hide the icon
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-primary hover:bg-primary/90"
        >
          <Save size={16} className="mr-2" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

const PersonalInfoForm = ({ data, onUpdate }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev: PersonalInfo) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    toast({
      title: "Personal info updated!",
      description: "Your changes have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="font-mono text-sm text-primary uppercase tracking-wider mb-4">
        Personal Information
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-background/50 border-primary/30 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="bg-background/50 border-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Tagline / Subtitle</Label>
        <Input
          id="subtitle"
          value={formData.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
          className="bg-background/50 border-primary/30 focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          className="bg-background/50 border-primary/30 focus:border-primary min-h-[120px]"
        />
      </div>

      <h4 className="font-mono text-sm text-primary/80 uppercase tracking-wider pt-4">
        Contact Information
      </h4>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="bg-background/50 border-primary/30 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="bg-background/50 border-primary/30 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="bg-background/50 border-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <h4 className="font-mono text-sm text-primary/80 uppercase tracking-wider pt-4">
        Social Links
      </h4>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            value={formData.github}
            onChange={(e) => handleChange("github", e.target.value)}
            className="bg-background/50 border-primary/30 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            className="bg-background/50 border-primary/30 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter URL</Label>
          <Input
            id="twitter"
            value={formData.twitter}
            onChange={(e) => handleChange("twitter", e.target.value)}
            className="bg-background/50 border-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;

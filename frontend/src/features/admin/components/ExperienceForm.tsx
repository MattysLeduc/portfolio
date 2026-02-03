import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getAllExperiences } from "@/features/experience/api/getAllExperiences";
import { createExperience } from "@/features/experience/api/createExperience";
import { updateExperience } from "@/features/experience/api/updateExperience";
import { deleteExperience } from "@/features/experience/api/deleteExperience";
import type { Experience } from "@/features/experience/models/Experience";

const ExperienceForm = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await getAllExperiences();
      setExperiences(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load experiences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addExperience = () => {
    const tempId = `temp-${Date.now()}`;
    const newExperience: Experience = {
      experienceId: tempId,
      titleEn: "",
      titleFr: "",
      companyEn: "",
      companyFr: "",
      locationEn: "",
      locationFr: "",
      startDate: "",
      endDate: null,
      current: false,
      descriptionEn: "",
      descriptionFr: "",
      responsibilitiesEn: "",
      responsibilitiesFr: "",
    };
    setExperiences([...experiences, newExperience]);
    setOpenItems([...openItems, tempId]);
  };

  const removeExperience = async (id: string) => {
    if (id.startsWith("temp-")) {
      setExperiences(experiences.filter((e) => e.experienceId !== id));
      return;
    }

    try {
      await deleteExperience(id);
      setExperiences(experiences.filter((e) => e.experienceId !== id));
      toast({ title: "Success", description: "Experience deleted" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete experience",
        variant: "destructive",
      });
    }
  };

  const updateField = (id: string, field: keyof Experience, value: any) => {
    setExperiences(
      experiences.map((e) => (e.experienceId === id ? { ...e, [field]: value } : e))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const exp of experiences) {
        if (!exp.titleEn?.trim()) continue;

        const { experienceId, ...payload } = exp;

        if (exp.experienceId.startsWith("temp-")) {
          await createExperience(payload);
        } else {
          await updateExperience(exp.experienceId, payload);
        }
      }

      await fetchExperiences();
      toast({ title: "Success", description: "Experiences saved successfully" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save experiences",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-sm text-primary uppercase tracking-wider">Work Experience</h3>
        <Button variant="outline" size="sm" onClick={addExperience} className="border-primary/50">
          <Plus size={16} className="mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <Collapsible
            key={exp.experienceId}
            open={openItems.includes(exp.experienceId)}
            onOpenChange={() => toggleItem(exp.experienceId)}
          >
            <div className="bg-background/30 rounded-sm border border-primary/20 overflow-hidden">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-primary/5">
                  <div>
                    <span className="font-mono text-sm">{exp.titleEn || "Untitled Position"}</span>
                    {exp.companyEn && (
                      <span className="text-muted-foreground text-sm ml-2">@ {exp.companyEn}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExperience(exp.experienceId);
                      }}
                      className="text-destructive hover:bg-destructive/10 h-8 w-8"
                    >
                      <Trash2 size={14} />
                    </Button>
                    {openItems.includes(exp.experienceId) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-4 border-t border-primary/10">
                  {/* Job Title */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Job Title (English)</Label>
                      <Input
                        value={exp.titleEn || ""}
                        onChange={(e) => updateField(exp.experienceId, "titleEn", e.target.value)}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Job Title (French)</Label>
                      <Input
                        value={exp.titleFr || ""}
                        onChange={(e) => updateField(exp.experienceId, "titleFr", e.target.value)}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company (English)</Label>
                      <Input
                        value={exp.companyEn || ""}
                        onChange={(e) => updateField(exp.experienceId, "companyEn", e.target.value)}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company (French)</Label>
                      <Input
                        value={exp.companyFr || ""}
                        onChange={(e) => updateField(exp.experienceId, "companyFr", e.target.value)}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Location (English)</Label>
                      <Input
                        value={exp.locationEn || ""}
                        onChange={(e) => updateField(exp.experienceId, "locationEn", e.target.value)}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location (French)</Label>
                      <Input
                        value={exp.locationFr || ""}
                        onChange={(e) => updateField(exp.experienceId, "locationFr", e.target.value)}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => updateField(exp.experienceId, "startDate", e.target.value)}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={exp.endDate || ""}
                        onChange={(e) => updateField(exp.experienceId, "endDate", e.target.value || null)}
                        disabled={exp.current}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-8">
                      <Checkbox
                        id={`current-${exp.experienceId}`}
                        checked={exp.current}
                        onCheckedChange={(checked) => {
                          updateField(exp.experienceId, "current", checked);
                          if (checked) updateField(exp.experienceId, "endDate", null);
                        }}
                      />
                      <Label htmlFor={`current-${exp.experienceId}`} className="cursor-pointer">
                        I currently work here
                      </Label>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Description (English)</Label>
                      <Textarea
                        value={exp.descriptionEn || ""}
                        onChange={(e) => updateField(exp.experienceId, "descriptionEn", e.target.value)}
                        className="bg-background/50 border-primary/30 min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description (French)</Label>
                      <Textarea
                        value={exp.descriptionFr || ""}
                        onChange={(e) => updateField(exp.experienceId, "descriptionFr", e.target.value)}
                        className="bg-background/50 border-primary/30 min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Responsibilities (English)</Label>
                      <Textarea
                        value={exp.responsibilitiesEn || ""}
                        onChange={(e) => updateField(exp.experienceId, "responsibilitiesEn", e.target.value)}
                        className="bg-background/50 border-primary/30 min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Responsibilities (French)</Label>
                      <Textarea
                        value={exp.responsibilitiesFr || ""}
                        onChange={(e) => updateField(exp.experienceId, "responsibilitiesFr", e.target.value)}
                        className="bg-background/50 border-primary/30 min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90">
          {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ExperienceForm;

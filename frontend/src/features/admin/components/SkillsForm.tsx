import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getAllSkills } from "@/features/skills/api/getAllSkills";
import { createSkill } from "@/features/skills/api/createSkill";
import { updateSkill } from "@/features/skills/api/updateSkill";
import { deleteSkill } from "@/features/skills/api/deleteSkill";
import type { SkillResponseModel } from "@/features/skills/models/SkillResponseModel";
import type { SkillRequestModel } from "@/features/skills/models/SkillRequestModel";

const SkillsForm = () => {
  const [skills, setSkills] = useState<SkillResponseModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await getAllSkills();
      setSkills(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load skills",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    const tempId = `temp-${Date.now()}`;
    const newSkill: SkillResponseModel = {
      skillId: tempId,
      name: "",
      nameEn: "",
      nameFr: "",
      description: "",
      descriptionEn: "",
      descriptionFr: "",
      category: "",
      level: 50,
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = async (id: string) => {
    if (id.startsWith("temp-")) {
      setSkills(skills.filter((s) => s.skillId !== id));
      return;
    }

    try {
      await deleteSkill(id);
      setSkills(skills.filter((s) => s.skillId !== id));
      toast({ title: "Success", description: "Skill deleted" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  };

  const updateField = (
    id: string,
    field: keyof SkillResponseModel,
    value: any,
  ) => {
    setSkills(
      skills.map((s) => (s.skillId === id ? { ...s, [field]: value } : s)),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const skill of skills) {
        if (!skill.nameEn?.trim()) continue;

        const payload: SkillRequestModel = {
          nameEn: skill.nameEn || "",
          nameFr: skill.nameFr || "",
          descriptionEn: skill.descriptionEn || "",
          descriptionFr: skill.descriptionFr || "",
          category: skill.category,
          level: skill.level,
        };

        if (skill.skillId.startsWith("temp-")) {
          await createSkill(payload);
        } else {
          await updateSkill(skill.skillId, payload);
        }
      }

      await fetchSkills();
      toast({ title: "Success", description: "Skills saved successfully" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save skills",
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
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-sm text-primary uppercase tracking-wider">
          Skills & Proficiency
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addSkill}
          className="border-primary/50"
        >
          <Plus size={16} className="mr-2" />
          Add Skill
        </Button>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div
            key={skill.skillId}
            className="flex items-start gap-4 p-4 bg-background/30 rounded-sm border border-primary/20"
          >
            <div className="flex-1 space-y-4">
              {/* Skill Names */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name (English)</Label>
                  <Input
                    value={skill.nameEn || ""}
                    onChange={(e) =>
                      updateField(skill.skillId, "nameEn", e.target.value)
                    }
                    placeholder="React"
                    className="bg-background/50 border-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Name (French)</Label>
                  <Input
                    value={skill.nameFr || ""}
                    onChange={(e) =>
                      updateField(skill.skillId, "nameFr", e.target.value)
                    }
                    placeholder="React"
                    className="bg-background/50 border-primary/30"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Description (English)</Label>
                  <Textarea
                    value={skill.descriptionEn || ""}
                    onChange={(e) =>
                      updateField(
                        skill.skillId,
                        "descriptionEn",
                        e.target.value,
                      )
                    }
                    className="bg-background/50 border-primary/30 min-h-[60px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description (French)</Label>
                  <Textarea
                    value={skill.descriptionFr || ""}
                    onChange={(e) =>
                      updateField(
                        skill.skillId,
                        "descriptionFr",
                        e.target.value,
                      )
                    }
                    className="bg-background/50 border-primary/30 min-h-[60px]"
                  />
                </div>
              </div>

              {/* Category and Level */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={skill.category || ""}
                    onChange={(e) =>
                      updateField(skill.skillId, "category", e.target.value)
                    }
                    placeholder="Frontend, Backend, Database..."
                    className="bg-background/50 border-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Level</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[skill.level || 50]}
                      onValueChange={(v) =>
                        updateField(skill.skillId, "level", v[0])
                      }
                      max={100}
                      min={0}
                      step={5}
                      className="flex-1"
                    />
                    <span className="font-mono text-sm text-primary w-12 text-right">
                      {skill.level || 50}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSkill(skill.skillId)}
              className="text-destructive hover:bg-destructive/10 mt-8"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/90"
        >
          {saving ? (
            <Loader2 size={16} className="mr-2 animate-spin" />
          ) : (
            <Save size={16} className="mr-2" />
          )}
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SkillsForm;

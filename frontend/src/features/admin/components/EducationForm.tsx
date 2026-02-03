import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getAllEducation } from "@/features/education/api/getAllEducation";
import { createEducation } from "@/features/education/api/createEducation";
import { updateEducation } from "@/features/education/api/updateEducation";
import { deleteEducation } from "@/features/education/api/deleteEducation";
import type { EducationResponseModel } from "@/features/education/models/EducationResponseModel";
import type { EducationRequestModel } from "@/features/education/models/EducationRequestModel";

const EducationForm = () => {
  const [education, setEducation] = useState<EducationResponseModel[]>([]);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const data = await getAllEducation();
      setEducation(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load education data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const addEducation = () => {
    const tempId = `temp-${Date.now()}`;
    const newEntry: EducationResponseModel = {
      educationId: tempId,
      degreeEn: "",
      degreeFr: "",
      institutionEn: "",
      institutionFr: "",
      locationEn: "",
      locationFr: "",
      descriptionEn: "",
      descriptionFr: "",
      startDate: "",
      endDate: null,
    };
    setEducation([...education, newEntry]);
    setOpenItems([...openItems, tempId]);
  };

  const removeEducation = async (id: string) => {
    if (id.startsWith("temp-")) {
      setEducation(education.filter((e) => e.educationId !== id));
      return;
    }

    try {
      await deleteEducation(id);
      setEducation(education.filter((e) => e.educationId !== id));
      toast({ title: "Success", description: "Education entry deleted" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete education entry",
        variant: "destructive",
      });
    }
  };

  const updateField = (
    id: string,
    field: keyof EducationResponseModel,
    value: any,
  ) => {
    setEducation(
      education.map((e) =>
        e.educationId === id ? { ...e, [field]: value } : e,
      ),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const entry of education) {
        if (!entry.degreeEn.trim() || !entry.institutionEn.trim()) continue;

        const payload: EducationRequestModel = {
          degreeEn: entry.degreeEn,
          degreeFr: entry.degreeFr,
          institutionEn: entry.institutionEn,
          institutionFr: entry.institutionFr,
          locationEn: entry.locationEn,
          locationFr: entry.locationFr,
          descriptionEn: entry.descriptionEn,
          descriptionFr: entry.descriptionFr,
          startDate: entry.startDate,
          endDate: entry.endDate,
        };

        if (entry.educationId.startsWith("temp-")) {
          await createEducation(payload);
        } else {
          await updateEducation(entry.educationId, payload);
        }
      }

      await fetchEducation();
      toast({
        title: "Success",
        description: "Education entries saved successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save education entries",
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
        <h3 className="font-mono text-sm text-primary uppercase tracking-wider">
          Education Management
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addEducation}
          className="border-primary/50"
        >
          <Plus size={16} className="mr-2" />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {education.map((entry) => (
          <Collapsible
            key={entry.educationId}
            open={openItems.includes(entry.educationId)}
            onOpenChange={() => toggleItem(entry.educationId)}
          >
            <div className="bg-background/30 rounded-sm border border-primary/20 overflow-hidden">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-primary/5">
                  <div>
                    <span className="font-mono text-sm">
                      {entry.degreeEn || "New Education Entry"}
                    </span>
                    {entry.institutionEn && (
                      <span className="text-muted-foreground text-sm ml-2">
                        @ {entry.institutionEn}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEducation(entry.educationId);
                      }}
                      className="text-destructive hover:bg-destructive/10 h-8 w-8"
                    >
                      <Trash2 size={14} />
                    </Button>
                    {openItems.includes(entry.educationId) ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-4 border-t border-primary/10">
                  {/* Degree */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Degree (English)</Label>
                      <Input
                        value={entry.degreeEn}
                        onChange={(e) =>
                          updateField(
                            entry.educationId,
                            "degreeEn",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                        placeholder="Bachelor of Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree (French)</Label>
                      <Input
                        value={entry.degreeFr}
                        onChange={(e) =>
                          updateField(
                            entry.educationId,
                            "degreeFr",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                        placeholder="Baccalauréat en informatique"
                      />
                    </div>
                  </div>

                  {/* Institution */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution (English)</Label>
                      <Input
                        value={entry.institutionEn}
                        onChange={(e) =>
                          updateField(
                            entry.educationId,
                            "institutionEn",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Institution (French)</Label>
                      <Input
                        value={entry.institutionFr}
                        onChange={(e) =>
                          updateField(
                            entry.educationId,
                            "institutionFr",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Location (English)</Label>
                      <Input
                        value={entry.locationEn}
                        onChange={(e) =>
                          updateField(
                            entry.educationId,
                            "locationEn",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location (French)</Label>
                      <Input
                        value={entry.locationFr}
                        onChange={(e) =>
                          updateField(
                            entry.educationId,
                            "locationFr",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={entry.startDate}
                        onChange={(e) =>
                          updateField(
                            entry.educationId,
                            "startDate",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={entry.endDate || ""}
                        onChange={(e) =>
                          updateField(
                            entry.educationId,
                            "endDate",
                            e.target.value || null,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Description (English)</Label>
                      <Textarea
                        value={entry.descriptionEn}
                        onChange={(e) =>
                          updateField(
                            entry.educationId,
                            "descriptionEn",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30 min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description (French)</Label>
                      <Textarea
                        value={entry.descriptionFr}
                        onChange={(e) =>
                          updateField(
                            entry.educationId,
                            "descriptionFr",
                            e.target.value,
                          )
                        }
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

export default EducationForm;

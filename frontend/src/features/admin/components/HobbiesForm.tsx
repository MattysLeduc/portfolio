import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getAllHobbies } from "@/features/hobbies/api/getAllHobbies";
import { createHobby } from "@/features/hobbies/api/createHobby";
import { updateHobby as updateHobbyApi } from "@/features/hobbies/api/updateHobby";
import { deleteHobby } from "@/features/hobbies/api/deleteHobby";
import type { HobbyResponseModel } from "@/features/hobbies/models/HobbyResponseModel";
import type { HobbyRequestModel } from "@/features/hobbies/models/HobbyRequestModel";

const HobbiesForm = () => {
  const [hobbies, setHobbies] = useState<HobbyResponseModel[]>([]);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHobbies();
  }, []);

  const fetchHobbies = async () => {
    try {
      const data = await getAllHobbies();
      setHobbies(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load hobbies",
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

  const addHobby = () => {
    const tempId = `temp-${Date.now()}`;
    const newHobby: HobbyResponseModel = {
      hobbyId: tempId,
      nameEn: "",
      nameFr: "",
      descriptionEn: "",
      descriptionFr: "",
      iconUrl: "",
    };
    setHobbies([...hobbies, newHobby]);
    setOpenItems([...openItems, tempId]);
  };

  const removeHobby = async (id: string) => {
    if (id.startsWith("temp-")) {
      setHobbies(hobbies.filter((h) => h.hobbyId !== id));
      return;
    }

    try {
      await deleteHobby(id);
      setHobbies(hobbies.filter((h) => h.hobbyId !== id));
      toast({ title: "Success", description: "Hobby deleted" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete hobby",
        variant: "destructive",
      });
    }
  };

  const updateField = (id: string, field: keyof HobbyResponseModel, value: any) => {
    setHobbies(
      hobbies.map((h) => (h.hobbyId === id ? { ...h, [field]: value } : h))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const hobby of hobbies) {
        if (!hobby.nameEn.trim()) continue;

        const payload: HobbyRequestModel = {
          nameEn: hobby.nameEn,
          nameFr: hobby.nameFr,
          descriptionEn: hobby.descriptionEn,
          descriptionFr: hobby.descriptionFr,
          iconUrl: hobby.iconUrl,
        };

        if (hobby.hobbyId.startsWith("temp-")) {
          await createHobby(payload);
        } else {
          await updateHobbyApi(hobby.hobbyId, payload);
        }
      }

      await fetchHobbies();
      toast({ title: "Success", description: "Hobbies saved successfully" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save hobbies",
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
          Hobbies & Interests
        </h3>
        <Button variant="outline" size="sm" onClick={addHobby} className="border-primary/50">
          <Plus size={16} className="mr-2" />
          Add Hobby
        </Button>
      </div>

      <div className="space-y-4">
        {hobbies.map((hobby) => (
          <Collapsible
            key={hobby.hobbyId}
            open={openItems.includes(hobby.hobbyId)}
            onOpenChange={() => toggleItem(hobby.hobbyId)}
          >
            <div className="bg-background/30 rounded-sm border border-primary/20 overflow-hidden">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-primary/5">
                  <div>
                    <span className="font-mono text-sm">
                      {hobby.nameEn || "New Hobby"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeHobby(hobby.hobbyId);
                      }}
                      className="text-destructive hover:bg-destructive/10 h-8 w-8"
                    >
                      <Trash2 size={14} />
                    </Button>
                    {openItems.includes(hobby.hobbyId) ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-4 border-t border-primary/10">
                  {/* Name */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name (English)</Label>
                      <Input
                        value={hobby.nameEn}
                        onChange={(e) => updateField(hobby.hobbyId, "nameEn", e.target.value)}
                        className="bg-background/50 border-primary/30"
                        placeholder="Photography"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Name (French)</Label>
                      <Input
                        value={hobby.nameFr}
                        onChange={(e) => updateField(hobby.hobbyId, "nameFr", e.target.value)}
                        className="bg-background/50 border-primary/30"
                        placeholder="Photographie"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Description (English)</Label>
                      <Textarea
                        value={hobby.descriptionEn}
                        onChange={(e) => updateField(hobby.hobbyId, "descriptionEn", e.target.value)}
                        className="bg-background/50 border-primary/30 min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description (French)</Label>
                      <Textarea
                        value={hobby.descriptionFr}
                        onChange={(e) => updateField(hobby.hobbyId, "descriptionFr", e.target.value)}
                        className="bg-background/50 border-primary/30 min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Icon URL */}
                  <div className="space-y-2">
                    <Label>Icon URL (optional)</Label>
                    <Input
                      value={hobby.iconUrl || ""}
                      onChange={(e) => updateField(hobby.hobbyId, "iconUrl", e.target.value)}
                      className="bg-background/50 border-primary/30"
                      placeholder="https://..."
                    />
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

export default HobbiesForm;

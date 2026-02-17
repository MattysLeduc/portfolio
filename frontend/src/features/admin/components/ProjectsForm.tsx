import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getAllProjects } from "@/features/projects/api/getAllProjects";
import { createProject } from "@/features/projects/api/createProject";
import { updateProject } from "@/features/projects/api/updateProject";
import { deleteProject } from "@/features/projects/api/deleteProject";
import { imageService } from "@/shared/api/imageService";
import type { ProjectResponseModel } from "@/features/projects/models/ProjectResponseModel";
import type { ProjectRequestModel } from "@/features/projects/models/ProjectRequestModel";

const ProjectsForm = () => {
  const [projects, setProjects] = useState<ProjectResponseModel[]>([]);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load projects",
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

  const addProject = () => {
    const tempId = `temp-${Date.now()}`;
    const newProject: ProjectResponseModel = {
      projectId: tempId,
      nameEn: "",
      nameFr: "",
      descriptionEn: "",
      descriptionFr: "",
      imageUrl: "",
      technologies: "",
      repoUrl: "",
      demoUrl: "",
      featured: false,
    };
    setProjects([...projects, newProject]);
    setOpenItems([...openItems, tempId]);
  };

  const removeProject = async (id: string) => {
    if (id.startsWith("temp-")) {
      setProjects(projects.filter((p) => p.projectId !== id));
      return;
    }

    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.projectId !== id));
      toast({ title: "Success", description: "Project deleted" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const updateField = (
    id: string,
    field: keyof ProjectResponseModel,
    value: any,
  ) => {
    setProjects(
      projects.map((p) => (p.projectId === id ? { ...p, [field]: value } : p)),
    );
  };

  const handleImageUpload = async (projectId: string, file: File) => {
    setUploadingImages((prev) => ({ ...prev, [projectId]: true }));
    try {
      const response = await imageService.uploadImage(file);
      updateField(projectId, "imageUrl", response.imageUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploadingImages((prev) => ({ ...prev, [projectId]: false }));
    }
  };

  const handleFileSelect = (projectId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      handleImageUpload(projectId, file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const project of projects) {
        if (!project.nameEn.trim()) continue;

        const payload: ProjectRequestModel = {
          nameEn: project.nameEn,
          nameFr: project.nameFr,
          descriptionEn: project.descriptionEn,
          descriptionFr: project.descriptionFr,
          imageUrl: project.imageUrl,
          technologies: project.technologies,
          repoUrl: project.repoUrl,
          demoUrl: project.demoUrl,
          featured: project.featured,
        };

        if (project.projectId.startsWith("temp-")) {
          await createProject(payload);
        } else {
          await updateProject(project.projectId, payload);
        }
      }

      await fetchProjects();
      toast({ title: "Success", description: "Projects saved successfully" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save projects",
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
          Projects
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addProject}
          className="border-primary/50"
        >
          <Plus size={16} className="mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <Collapsible
            key={project.projectId}
            open={openItems.includes(project.projectId)}
            onOpenChange={() => toggleItem(project.projectId)}
          >
            <div className="bg-background/30 rounded-sm border border-primary/20 overflow-hidden">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-primary/5">
                  <span className="font-mono text-sm">
                    {project.nameEn || "Untitled Project"}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProject(project.projectId);
                      }}
                      className="text-destructive hover:bg-destructive/10 h-8 w-8"
                    >
                      <Trash2 size={14} />
                    </Button>
                    {openItems.includes(project.projectId) ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-4 border-t border-primary/10">
                  {/* Project Names */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name (English)</Label>
                      <Input
                        value={project.nameEn}
                        onChange={(e) =>
                          updateField(
                            project.projectId,
                            "nameEn",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Name (French)</Label>
                      <Input
                        value={project.nameFr}
                        onChange={(e) =>
                          updateField(
                            project.projectId,
                            "nameFr",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Description (English)</Label>
                      <Textarea
                        value={project.descriptionEn}
                        onChange={(e) =>
                          updateField(
                            project.projectId,
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
                        value={project.descriptionFr}
                        onChange={(e) =>
                          updateField(
                            project.projectId,
                            "descriptionFr",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30 min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-2">
                    <Label>Project Image</Label>
                    
                    {/* Image Preview */}
                    {project.imageUrl && (
                      <div className="relative w-full aspect-video bg-background/50 border border-primary/30 rounded overflow-hidden mb-2">
                        <img
                          src={project.imageUrl}
                          alt={project.nameEn || "Project preview"}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => updateField(project.projectId, "imageUrl", "")}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    )}

                    {/* File Upload Button */}
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileSelect(project.projectId, e)}
                          className="hidden"
                          id={`file-upload-${project.projectId}`}
                          disabled={uploadingImages[project.projectId]}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-primary/50"
                          onClick={() => {
                            document.getElementById(`file-upload-${project.projectId}`)?.click();
                          }}
                          disabled={uploadingImages[project.projectId]}
                        >
                          {uploadingImages[project.projectId] ? (
                            <Loader2 size={16} className="mr-2 animate-spin" />
                          ) : (
                            <Upload size={16} className="mr-2" />
                          )}
                          {uploadingImages[project.projectId] ? "Uploading..." : "Upload Image"}
                        </Button>
                      </div>
                    </div>

                    {/* Or use URL input */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex-1 h-px bg-primary/20" />
                      <span>or enter URL</span>
                      <div className="flex-1 h-px bg-primary/20" />
                    </div>
                    
                    <Input
                      value={project.imageUrl || ""}
                      onChange={(e) =>
                        updateField(
                          project.projectId,
                          "imageUrl",
                          e.target.value,
                        )
                      }
                      placeholder="https://..."
                      className="bg-background/50 border-primary/30"
                    />
                  </div>

                  {/* URLs */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Technologies (comma-separated)</Label>
                      <Input
                        value={project.technologies || ""}
                        onChange={(e) =>
                          updateField(
                            project.projectId,
                            "technologies",
                            e.target.value,
                          )
                        }
                        placeholder="React, TypeScript, Spring Boot"
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Repository URL</Label>
                      <Input
                        value={project.repoUrl || ""}
                        onChange={(e) =>
                          updateField(
                            project.projectId,
                            "repoUrl",
                            e.target.value,
                          )
                        }
                        placeholder="https://github.com/..."
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label>Demo URL</Label>
                      <Input
                        value={project.demoUrl || ""}
                        onChange={(e) =>
                          updateField(
                            project.projectId,
                            "demoUrl",
                            e.target.value,
                          )
                        }
                        placeholder="https://..."
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                  </div>

                  {/* Featured */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`featured-${project.projectId}`}
                      checked={project.featured}
                      onCheckedChange={(checked) =>
                        updateField(project.projectId, "featured", checked)
                      }
                    />
                    <Label
                      htmlFor={`featured-${project.projectId}`}
                      className="cursor-pointer"
                    >
                      Featured Project
                    </Label>
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

export default ProjectsForm;

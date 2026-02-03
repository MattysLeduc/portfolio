import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Star,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getAllTestimonials } from "@/features/testimonials/api/admin/getAllTestimonials";
import { createTestimonial } from "@/features/testimonials/api/admin/createTestimonial";
import { updateTestimonial as updateTestimonialApi } from "@/features/testimonials/api/admin/updateTestimonial";
import { deleteTestimonial } from "@/features/testimonials/api/admin/deleteTestimonial";
import { approveTestimonial } from "@/features/testimonials/api/admin/approveTestimonial";
import { declineTestimonial } from "@/features/testimonials/api/admin/declineTestimonial";
import type { TestimonialResponseModel } from "@/features/testimonials/models/TestimonialResponseModel";
import type { TestimonialRequestModel } from "@/features/testimonials/models/TestimonialRequestModel";

const TestimonialsForm = () => {
  const [testimonials, setTestimonials] = useState<TestimonialResponseModel[]>(
    [],
  );
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await getAllTestimonials();
      setTestimonials(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load testimonials",
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

  const addTestimonial = () => {
    const tempId = `temp-${Date.now()}`;
    const newTestimonial: TestimonialResponseModel = {
      testimonialId: tempId,
      authorName: "",
      authorTitleEn: "",
      authorTitleFr: "",
      contentEn: "",
      contentFr: "",
      rating: 5,
      content: "",
      company: "",
      authorImage: "",
    };
    setTestimonials([...testimonials, newTestimonial]);
    setOpenItems([...openItems, tempId]);
  };

  const removeTestimonial = async (id: string) => {
    if (id.startsWith("temp-")) {
      setTestimonials(testimonials.filter((t) => t.testimonialId !== id));
      return;
    }

    try {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter((t) => t.testimonialId !== id));
      toast({ title: "Success", description: "Testimonial deleted" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveTestimonial(id);
      setTestimonials(
        testimonials.map((t) =>
          t.testimonialId === id ? { ...t, status: "APPROVED" as const } : t,
        ),
      );
      toast({ title: "Success", description: "Testimonial approved" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve testimonial",
        variant: "destructive",
      });
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await declineTestimonial(id);
      setTestimonials(
        testimonials.map((t) =>
          t.testimonialId === id ? { ...t, status: "REJECTED" as const } : t,
        ),
      );
      toast({ title: "Success", description: "Testimonial declined" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline testimonial",
        variant: "destructive",
      });
    }
  };

  const updateField = (
    id: string,
    field: keyof TestimonialResponseModel,
    value: any,
  ) => {
    setTestimonials(
      testimonials.map((t) =>
        t.testimonialId === id ? { ...t, [field]: value } : t,
      ),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const testimonial of testimonials) {
        if (!testimonial.authorName.trim() || !testimonial.contentEn?.trim())
          continue;

        const payload: TestimonialRequestModel = {
          authorName: testimonial.authorName,
          authorTitleEn: testimonial.authorTitleEn,
          authorTitleFr: testimonial.authorTitleFr,
          authorImage: testimonial.authorImage,
          contentEn: testimonial.contentEn || "",
          contentFr: testimonial.contentFr || "",
          rating: testimonial.rating,
          company: testimonial.company,
        };

        if (testimonial.testimonialId.startsWith("temp-")) {
          await createTestimonial(payload);
        } else {
          await updateTestimonialApi(testimonial.testimonialId, payload);
        }
      }

      await fetchTestimonials();
      toast({
        title: "Success",
        description: "Testimonials saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save testimonials",
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
          Testimonials Management
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addTestimonial}
          className="border-primary/50"
        >
          <Plus size={16} className="mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Collapsible
            key={testimonial.testimonialId}
            open={openItems.includes(testimonial.testimonialId)}
            onOpenChange={() => toggleItem(testimonial.testimonialId)}
          >
            <div className="bg-background/30 rounded-sm border border-primary/20 overflow-hidden">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-primary/5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm">
                      {testimonial.authorName || "New Testimonial"}
                    </span>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="text-primary fill-primary"
                            size={12}
                          />
                        ),
                      )}
                    </div>
                    {testimonial.status && (
                      <Badge
                        variant={
                          testimonial.status === "APPROVED"
                            ? "default"
                            : testimonial.status === "REJECTED"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {testimonial.status}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTestimonial(testimonial.testimonialId);
                      }}
                      className="text-destructive hover:bg-destructive/10 h-8 w-8"
                    >
                      <Trash2 size={14} />
                    </Button>
                    {openItems.includes(testimonial.testimonialId) ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-4 border-t border-primary/10">
                  {/* Author Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Author Name</Label>
                      <Input
                        value={testimonial.authorName}
                        onChange={(e) =>
                          updateField(
                            testimonial.testimonialId,
                            "authorName",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={testimonial.company || ""}
                        onChange={(e) =>
                          updateField(
                            testimonial.testimonialId,
                            "company",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                      />
                    </div>
                  </div>

                  {/* Author Title */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Author Title (English)</Label>
                      <Input
                        value={testimonial.authorTitleEn || ""}
                        onChange={(e) =>
                          updateField(
                            testimonial.testimonialId,
                            "authorTitleEn",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                        placeholder="Senior Developer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Author Title (French)</Label>
                      <Input
                        value={testimonial.authorTitleFr || ""}
                        onChange={(e) =>
                          updateField(
                            testimonial.testimonialId,
                            "authorTitleFr",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30"
                        placeholder="Développeur Senior"
                      />
                    </div>
                  </div>

                  {/* Author Image */}
                  <div className="space-y-2">
                    <Label>Author Image URL</Label>
                    <Input
                      value={testimonial.authorImage || ""}
                      onChange={(e) =>
                        updateField(
                          testimonial.testimonialId,
                          "authorImage",
                          e.target.value,
                        )
                      }
                      className="bg-background/50 border-primary/30"
                      placeholder="https://..."
                    />
                  </div>

                  {/* Content */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Content (English)</Label>
                      <Textarea
                        value={testimonial.contentEn || ""}
                        onChange={(e) =>
                          updateField(
                            testimonial.testimonialId,
                            "contentEn",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30 min-h-[120px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content (French)</Label>
                      <Textarea
                        value={testimonial.contentFr || ""}
                        onChange={(e) =>
                          updateField(
                            testimonial.testimonialId,
                            "contentFr",
                            e.target.value,
                          )
                        }
                        className="bg-background/50 border-primary/30 min-h-[120px]"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[testimonial.rating]}
                        onValueChange={(v) =>
                          updateField(testimonial.testimonialId, "rating", v[0])
                        }
                        max={5}
                        min={1}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="text-primary fill-primary"
                              size={16}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Approve/Decline Actions */}
                  {!testimonial.testimonialId.startsWith("temp-") && (
                    <div className="flex items-center gap-2 pt-4 border-t border-primary/10">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApprove(testimonial.testimonialId)}
                        disabled={testimonial.status === "APPROVED"}
                        className="border-green-500/50 text-green-600 hover:bg-green-500/10"
                      >
                        <CheckCircle size={14} className="mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDecline(testimonial.testimonialId)}
                        disabled={testimonial.status === "REJECTED"}
                        className="border-red-500/50 text-red-600 hover:bg-red-500/10"
                      >
                        <XCircle size={14} className="mr-2" />
                        Decline
                      </Button>
                      {testimonial.status === "APPROVED" && (
                        <span className="text-xs text-green-600 ml-2">
                          ✓ Visible on website
                        </span>
                      )}
                      {testimonial.status === "REJECTED" && (
                        <span className="text-xs text-red-600 ml-2">
                          ✗ Hidden from website
                        </span>
                      )}
                    </div>
                  )}
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

export default TestimonialsForm;

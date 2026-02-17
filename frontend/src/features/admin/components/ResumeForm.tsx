import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { uploadResume } from "@/features/resume/api/admin/uploadResume";
import { personalInfoAdminService } from "@/shared/api/adminService";

const ResumeForm = () => {
  const [enFile, setEnFile] = useState<File | null>(null);
  const [frFile, setFrFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<"en" | "fr" | null>(null);
  const [personalInfo, setPersonalInfo] = useState<any>(null);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const data = await personalInfoAdminService.getPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
      }
    };
    fetchPersonalInfo();
  }, []);

  const handleUpload = async (language: "en" | "fr") => {
    const file = language === "en" ? enFile : frFile;
    if (!file) {
      toast({
        title: "Missing file",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(language);
      const result = await uploadResume(language, file);

      // Update PersonalInfo with the new resume URL
      const updatedInfo = {
        ...personalInfo,
        [language === "en" ? "resumeEnUrl" : "resumeFrUrl"]: result.fileUrl,
      };

      console.log("Updating personal info with:", updatedInfo);
      await personalInfoAdminService.updatePersonalInfo(updatedInfo);

      // Refetch to verify the update was saved
      const refreshedInfo = await personalInfoAdminService.getPersonalInfo();
      console.log("Refreshed personal info:", refreshedInfo);
      setPersonalInfo(refreshedInfo);

      toast({
        title: "Success",
        description: `Resume (${language.toUpperCase()}) uploaded to Supabase and saved to database`,
      });
      // Clear file after successful upload
      if (language === "en") setEnFile(null);
      else setFrFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload resume",
        variant: "destructive",
      });
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="font-mono text-sm text-primary uppercase tracking-wider">
          Resume / CV Upload
        </h3>
        <p className="text-xs text-muted-foreground mt-2">
          Upload your resume PDFs to Supabase Storage. View uploaded files in
          your Supabase dashboard under Storage → project-images → resumes/
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* English */}
        <div className="bg-background/30 rounded-sm border border-primary/20 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-primary" />
            <span className="font-mono text-sm">English CV (PDF)</span>
          </div>

          <div className="space-y-3">
            <Label>Upload English PDF</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("resume-en")?.click()}
                className="border-primary/50 flex-1"
              >
                <FileText size={16} className="mr-2" />
                {enFile ? enFile.name : "Choose File"}
              </Button>
              <Input
                id="resume-en"
                type="file"
                accept="application/pdf"
                onChange={(e) => setEnFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
              <Button
                onClick={() => handleUpload("en")}
                disabled={uploading === "en" || !enFile}
                className="bg-primary hover:bg-primary/90"
              >
                {uploading === "en" ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Upload size={16} className="mr-2" />
                )}
                Upload
              </Button>
            </div>
          </div>
        </div>

        {/* French */}
        <div className="bg-background/30 rounded-sm border border-primary/20 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-primary" />
            <span className="font-mono text-sm">French CV (PDF)</span>
          </div>

          <div className="space-y-3">
            <Label>Upload French PDF</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("resume-fr")?.click()}
                className="border-primary/50 flex-1"
              >
                <FileText size={16} className="mr-2" />
                {frFile ? frFile.name : "Choose File"}
              </Button>
              <Input
                id="resume-fr"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFrFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
              <Button
                onClick={() => handleUpload("fr")}
                disabled={uploading === "fr" || !frFile}
                className="bg-primary hover:bg-primary/90"
              >
                {uploading === "fr" ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Upload size={16} className="mr-2" />
                )}
                Upload
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, FileText, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getResumeInfo } from "@/features/resume/api/admin/getResumeInfo";
import { uploadResume } from "@/features/resume/api/admin/uploadResume";
import type { ResumeInfoResponseModel } from "@/features/resume/models/ResumeInfoResponseModel";

const ResumeForm = () => {
  const [enFile, setEnFile] = useState<File | null>(null);
  const [frFile, setFrFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<"en" | "fr" | null>(null);
  const [resumeInfo, setResumeInfo] = useState<{
    en: ResumeInfoResponseModel | null;
    fr: ResumeInfoResponseModel | null;
  }>({
    en: null,
    fr: null,
  });

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const [enInfo, frInfo] = await Promise.all([
        getResumeInfo("en").catch(() => null),
        getResumeInfo("fr").catch(() => null),
      ]);
      setResumeInfo({ en: enInfo, fr: frInfo });
    } catch {
      toast({
        title: "Error",
        description: "Failed to load resume info",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
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
      const info = await uploadResume(language, file);
      setResumeInfo((prev) => ({ ...prev, [language]: info }));
      toast({
        title: "Success",
        description: `Resume (${language.toUpperCase()}) uploaded`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to upload resume",
        variant: "destructive",
      });
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const renderInfo = (info: ResumeInfoResponseModel | null) => {
    if (!info)
      return (
        <span className="text-xs text-muted-foreground">No file uploaded</span>
      );
    return (
      <div className="text-xs text-muted-foreground space-y-1">
        <div>File: {info.fileName}</div>
        <div>Size: {(info.sizeBytes / 1024).toFixed(1)} KB</div>
        <div>Updated: {new Date(info.updatedAt).toLocaleString()}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-sm text-primary uppercase tracking-wider">
          Resume / CV
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchInfo}
          className="border-primary/50"
        >
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* English */}
        <div className="bg-background/30 rounded-sm border border-primary/20 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-primary" />
            <span className="font-mono text-sm">English CV (PDF)</span>
          </div>

          {renderInfo(resumeInfo.en)}

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

          {renderInfo(resumeInfo.fr)}

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

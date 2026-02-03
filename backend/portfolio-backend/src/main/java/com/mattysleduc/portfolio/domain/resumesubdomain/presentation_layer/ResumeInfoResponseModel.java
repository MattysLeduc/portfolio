package com.mattysleduc.portfolio.domain.resumesubdomain.presentation_layer;

public class ResumeInfoResponseModel {
    private String language;
    private String fileName;
    private long sizeBytes;
    private String updatedAt;

    public ResumeInfoResponseModel() {}

    public ResumeInfoResponseModel(String language, String fileName, long sizeBytes, String updatedAt) {
        this.language = language;
        this.fileName = fileName;
        this.sizeBytes = sizeBytes;
        this.updatedAt = updatedAt;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public long getSizeBytes() {
        return sizeBytes;
    }

    public void setSizeBytes(long sizeBytes) {
        this.sizeBytes = sizeBytes;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}

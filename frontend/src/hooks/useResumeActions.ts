/* ===================================
Custom Hook: useResumeActions
=================================== */
import { useState } from "react";
import { Resume, ResumeContent } from "../types";
import { resumeApi } from "../api/api";
import { useAppDispatch } from "./redux";
import { setUserCredits } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultContent: ResumeContent = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    whatsapp: "",
    address: { city: "", division: "", zipCode: "" },
    linkedIn: "",
    socialLinks: { github: "", portfolio: "", website: "" },
  },
  summary: "",
  experience: [],
  projects: [],
  achievements: [],
  certifications: [],
  education: [],
  skills: [],
};

export function useResumeActions() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [content, setContent] = useState<ResumeContent>(defaultContent);
  const [saving, setSaving] = useState(false);

  const handleSelectResume = (resume: Resume) => {
    setSelectedResume(resume);
    setContent(resume.content);
  };

  const handleSaveResume = async (fetchResumes?: () => Promise<void>) => {
    setSaving(true);
    try {
      if (selectedResume) {
        await resumeApi.update(selectedResume._id, { content });
        toast.success("Resume updated successfully");
      } else {
        const response = await resumeApi.createFromContent(content);
        setSelectedResume(response.data.data);
        const remainingCredits = response.data.remainingCredits;
        if (remainingCredits !== undefined) {
          dispatch(setUserCredits(remainingCredits));
        }
        toast.success("Resume saved successfully! 1 credit used.");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to save resume";
      if (errorMessage.includes("Insufficient credits")) {
        toast.error("Insufficient credits! Please upgrade your plan or add more credits.");
        navigate("/plans");
      } else {
        toast.error(errorMessage);
      }
      return; // Don't fetch resumes if save failed
    } finally {
      setSaving(false);
    }
    
    // Fetch resumes after successful save (silently)
    await fetchResumes?.();
  };

  const handleNewResume = () => {
    setSelectedResume(null);
    setContent(defaultContent);
  };

  return {
    selectedResume,
    content,
    setContent,
    saving,
    setSelectedResume,
    handleSelectResume,
    handleSaveResume,
    handleNewResume,
  };
}

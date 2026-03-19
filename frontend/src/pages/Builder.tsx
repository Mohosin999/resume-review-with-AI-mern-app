/* ===================================
Builder Page - Main Component
=================================== */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, FileText, Briefcase, Code, Award, GraduationCap, Wrench } from "lucide-react";
import { toast } from "react-toastify";
import { useAppSelector } from "../hooks/redux";
import { useResumeBuilder, useResumeContent } from "../hooks/useResumeBuilder";
import { Resume } from "../types";
import { exportToPdf } from "../utils/pdfExport";
import { BackButton } from "../components/ui";
import {
  PersonalInfoEditor, SummaryEditorAI, ExperienceEditorAI, ProjectsEditorAI,
  AchievementsEditor, CertificationsEditor, EducationEditor, SkillsEditorAI,
  BuilderHeader, BuilderProgress, BuilderSection, PreviewModal,
} from "../components/shared";

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  completed: boolean;
}

const SECTIONS: Section[] = [
  { id: "personal", title: "Personal Information", icon: User, completed: false },
  { id: "summary", title: "Professional Summary", icon: FileText, completed: false },
  { id: "experience", title: "Work Experience", icon: Briefcase, completed: false },
  { id: "projects", title: "Projects", icon: Code, completed: false },
  { id: "achievements", title: "Achievements", icon: Award, completed: false },
  { id: "certifications", title: "Certifications", icon: Award, completed: false },
  { id: "education", title: "Education", icon: GraduationCap, completed: false },
  { id: "skills", title: "Skills", icon: Wrench, completed: false },
];

export default function Builder() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const builder = useResumeBuilder();
  const contentActions = useResumeContent(builder.content, builder.setContent);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [sectionStates, setSectionStates] = useState<Section[]>(SECTIONS);

  useEffect(() => {
    const passedResume = location.state?.resume as Resume | undefined;
    if (passedResume) {
      builder.setSelectedResume(passedResume);
      builder.setContent(passedResume.content);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const checkSectionCompletion = (sectionId: string): boolean => {
    const { content } = builder;
    switch (sectionId) {
      case "personal": return !!content.personalInfo?.fullName && !!content.personalInfo?.email;
      case "summary": return !!content.summary && content.summary.length > 0;
      case "experience": return content.experience.length > 0;
      case "projects": return !!(content.projects && content.projects.length > 0);
      case "achievements": return !!(content.achievements && content.achievements.length > 0);
      case "certifications": return !!(content.certifications && content.certifications.length > 0);
      case "education": return content.education.length > 0;
      case "skills": return content.skills.length > 0;
      default: return false;
    }
  };

  const goToNextStep = () => {
    const isCompleted = checkSectionCompletion(sectionStates[currentStep].id);
    if (isCompleted) {
      const updated = [...sectionStates];
      updated[currentStep] = { ...updated[currentStep], completed: true };
      setSectionStates(updated);
    }
    if (currentStep < sectionStates.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleExportPDF = async () => {
    try {
      await exportToPdf(builder.content);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Failed to export PDF");
    }
  };

  const handleSave = async () => {
    await builder.handleSaveResume();
  };

  const renderSectionEditor = (section: Section) => {
    const { content, setContent } = builder;
    switch (section.id) {
      case "personal": return <PersonalInfoEditor content={content} updateField={contentActions.updatePersonalInfo} />;
      case "summary": return <SummaryEditorAI value={content.summary || ""} onChange={(val) => setContent({ ...content, summary: val })} personalInfo={content.personalInfo} skills={content.skills} />;
      case "experience": return <ExperienceEditorAI experience={content.experience} onAdd={contentActions.addExperience} onUpdate={contentActions.updateExperience} onRemove={contentActions.removeExperience} />;
      case "projects": return <ProjectsEditorAI projects={content.projects} onAdd={contentActions.addProject} onUpdate={contentActions.updateProject} onRemove={contentActions.removeProject} />;
      case "achievements": return <AchievementsEditor achievements={content.achievements} onAdd={contentActions.addAchievement} onUpdate={contentActions.updateAchievement} onRemove={contentActions.removeAchievement} />;
      case "certifications": return <CertificationsEditor certifications={content.certifications} onAdd={contentActions.addCertification} onUpdate={contentActions.updateCertification} onRemove={contentActions.removeCertification} />;
      case "education": return <EducationEditor education={content.education} onAdd={contentActions.addEducation} onUpdate={contentActions.updateEducation} onRemove={contentActions.removeEducation} />;
      case "skills": return <SkillsEditorAI skills={content.skills} onAdd={contentActions.addSkill} onRemove={contentActions.removeSkill} jobTitle={content.personalInfo.jobTitle} />;
      default: return null;
    }
  };

  if (builder.loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  const currentSection = sectionStates[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === sectionStates.length - 1;

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="mt-6 mb-1"><BackButton /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <BuilderHeader saving={builder.saving} onNewResume={builder.handleNewResume} onPreview={() => setShowPreviewModal(true)} />
        </motion.div>
        <BuilderProgress sections={sectionStates} currentStep={currentStep} />
        <div className="max-w-4xl mx-auto">
          <BuilderSection currentSection={currentSection} currentStep={currentStep} totalSteps={sectionStates.length} isFirstStep={isFirstStep} isLastStep={isLastStep} saving={builder.saving} onPrevious={() => setCurrentStep(currentStep - 1)} onNext={goToNextStep} onExportPDF={handleExportPDF} onSave={handleSave}>
            {renderSectionEditor(currentSection)}
          </BuilderSection>
        </div>
      </div>
      {showPreviewModal && <PreviewModal content={builder.content} onClose={() => setShowPreviewModal(false)} onExportPDF={handleExportPDF} />}
    </div>
  );
}

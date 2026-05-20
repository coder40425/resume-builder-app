import { createContext, useContext, useState, ReactNode } from "react";
import { ResumeData } from "../types/resume";
import { sampleResumeData } from "../data/sampleResume";

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  updateResumeData: (data: Partial<ResumeData>) => void;
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void;
  updateEducation: (index: number, data: Partial<ResumeData["education"][0]>) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  updateExperience: (index: number, data: Partial<ResumeData["experience"][0]>) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  updateProject: (index: number, data: Partial<ResumeData["projects"][0]>) => void;
  addProject: () => void;
  removeProject: (index: number) => void;
  updateSkill: (index: number, data: Partial<ResumeData["skills"][0]>) => void;
  addSkill: () => void;
  removeSkill: (index: number) => void;
  updateCertification: (index: number, data: Partial<ResumeData["certifications"][0]>) => void;
  addCertification: () => void;
  removeCertification: (index: number) => void;
  updateAchievement: (index: number, data: Partial<ResumeData["achievements"][0]>) => void;
  addAchievement: () => void;
  removeAchievement: (index: number) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

interface ResumeProviderProps {
  children: ReactNode;
  initialData?: ResumeData;
}

export function ResumeProvider({ children, initialData }: ResumeProviderProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData ?? sampleResumeData);

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...data }));
  };

  const updatePersonalInfo = (info: Partial<ResumeData["personalInfo"]>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const updateEducation = (index: number, data: Partial<ResumeData["education"][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) => (i === index ? { ...edu, ...data } : edu))
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: `edu${Date.now()}`, degree: "", institution: "", location: "", startDate: "", endDate: "", gpa: "", description: "" }
      ]
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData((prev) => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  };

  const updateExperience = (index: number, data: Partial<ResumeData["experience"][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) => (i === index ? { ...exp, ...data } : exp))
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: `exp${Date.now()}`, title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: [] }
      ]
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData((prev) => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  };

  const updateProject = (index: number, data: Partial<ResumeData["projects"][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) => (i === index ? { ...proj, ...data } : proj))
    }));
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: `proj${Date.now()}`, name: "", description: "", technologies: [], link: "" }
      ]
    }));
  };

  const removeProject = (index: number) => {
    setResumeData((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const updateSkill = (index: number, data: Partial<ResumeData["skills"][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? { ...skill, ...data } : skill))
    }));
  };

  const addSkill = () => {
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, { category: "", items: [] }] }));
  };

  const removeSkill = (index: number) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const updateCertification = (index: number, data: Partial<ResumeData["certifications"][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => (i === index ? { ...cert, ...data } : cert))
    }));
  };

  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { id: `cert${Date.now()}`, name: "", issuer: "", date: "", credentialId: "" }
      ]
    }));
  };

  const removeCertification = (index: number) => {
    setResumeData((prev) => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }));
  };

  const updateAchievement = (index: number, data: Partial<ResumeData["achievements"][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((ach, i) => (i === index ? { ...ach, ...data } : ach))
    }));
  };

  const addAchievement = () => {
    setResumeData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, { id: `ach${Date.now()}`, title: "", description: "" }]
    }));
  };

  const removeAchievement = (index: number) => {
    setResumeData((prev) => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updateResumeData,
        updatePersonalInfo,
        updateEducation,
        addEducation,
        removeEducation,
        updateExperience,
        addExperience,
        removeExperience,
        updateProject,
        addProject,
        removeProject,
        updateSkill,
        addSkill,
        removeSkill,
        updateCertification,
        addCertification,
        removeCertification,
        updateAchievement,
        addAchievement,
        removeAchievement
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within ResumeProvider");
  return context;
}
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  summary: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  achievements: Achievement[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  atsOptimized: boolean;
  thumbnail: string;
}

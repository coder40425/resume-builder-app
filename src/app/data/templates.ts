import { Template } from "../types/resume";

export const templates: Template[] = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean sidebar layout with accent highlights",
    category: "Professional",
    atsOptimized: true,
    thumbnail: "modern-professional"
  },
  {
    id: "ats-classic",
    name: "ATS Classic",
    description: "Simple black and white recruiter-optimized design",
    category: "ATS",
    atsOptimized: true,
    thumbnail: "ats-classic"
  },
  {
    id: "minimal-elegant",
    name: "Minimal Elegant",
    description: "Spacious clean design with elegant typography",
    category: "Minimal",
    atsOptimized: true,
    thumbnail: "minimal-elegant"
  },
  {
    id: "developer-resume",
    name: "Developer Resume",
    description: "Tech-focused layout with skill chips and projects",
    category: "Tech",
    atsOptimized: true,
    thumbnail: "developer-resume"
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional enterprise style with strong hierarchy",
    category: "Corporate",
    atsOptimized: true,
    thumbnail: "corporate"
  },
  {
    id: "creative-clean",
    name: "Creative Clean",
    description: "Modern creative feel while staying ATS-friendly",
    category: "Creative",
    atsOptimized: true,
    thumbnail: "creative-clean"
  }
];

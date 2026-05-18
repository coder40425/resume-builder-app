import { forwardRef } from "react";
import { useResume } from "../store/resumeStore";
import { ModernProfessionalTemplate } from "../templates/ModernProfessionalTemplate";
import { ATSClassicTemplate } from "../templates/ATSClassicTemplate";
import { MinimalElegantTemplate } from "../templates/MinimalElegantTemplate";
import { DeveloperResumeTemplate } from "../templates/DeveloperResumeTemplate";
import { CorporateTemplate } from "../templates/CorporateTemplate";
import { CreativeCleanTemplate } from "../templates/CreativeCleanTemplate";

interface ResumePreviewProps {
  templateId: string;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ templateId }, ref) => {
  const { resumeData } = useResume();

  const templates: Record<string, React.ComponentType> = {
    "modern-professional": ModernProfessionalTemplate,
    "ats-classic": ATSClassicTemplate,
    "minimal-elegant": MinimalElegantTemplate,
    "developer-resume": DeveloperResumeTemplate,
    corporate: CorporateTemplate,
    "creative-clean": CreativeCleanTemplate
  };

  const Template = templates[templateId] || ModernProfessionalTemplate;

  return (
    <div ref={ref} className="bg-white shadow-lg" style={{ width: "210mm", minHeight: "297mm" }}>
      <Template />
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";

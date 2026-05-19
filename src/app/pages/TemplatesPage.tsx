import { Link } from "react-router";
import { FileText, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { templates } from "../data/templates";
import logo from "../data/logo-skilldzire.png";

export function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .tpl-nav {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #f3f4f6;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .tpl-card {
          background: white;
          border-radius: 16px;
          border: 1.5px solid #f3f4f6;
          overflow: hidden;
          transition: all 0.25s ease;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
        }
        .tpl-card:hover {
          border-color: #fed7aa;
          box-shadow: 0 12px 32px rgba(234,88,12,0.1);
          transform: translateY(-5px);
        }

        .tpl-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(234,88,12,0.07);
          opacity: 0;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          justify-center;
        }
        .tpl-card:hover .tpl-hover-overlay { opacity: 1; }

        .preview-btn {
          background: white;
          border: 1.5px solid #ea580c;
          color: #ea580c;
          padding: 7px 18px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transform: translateY(4px);
          transition: transform 0.2s;
        }
        .tpl-card:hover .preview-btn { transform: translateY(0); }

        .use-btn {
          display: flex;
          width: 100%;
          background: linear-gradient(135deg, #ea580c, #f97316);
          color: white;
          border: none;
          border-radius: 9px;
          padding: 10px 0;
          font-size: 0.875rem;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 3px 10px rgba(234,88,12,0.25);
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .use-btn:hover {
          box-shadow: 0 5px 16px rgba(234,88,12,0.38);
          transform: translateY(-1px);
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className="tpl-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 no-underline">
            <img src={logo} alt="SkillDzire" className="h-8 sm:h-10 w-auto object-contain" />
            <div className="hidden sm:block w-px h-5 bg-gray-200" />
            <span className="hidden sm:inline font-bold text-sm sm:text-base text-gray-900">Resume Builder</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors px-3 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm font-medium no-underline">
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Back to</span> Home
          </Link>
        </div>
      </nav>

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 py-8 sm:py-12 md:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-800 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
            <Check size={11} /> 6 ATS-Optimized Templates
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Choose Your Resume Template
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            Select a professional template and start building your resume instantly — with pre-filled sample data to guide you.
          </p>
        </div>
      </div>

      {/* ── Templates Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: any }) {
  return (
    <div className="tpl-card">
      {/* Preview */}
      <Link to={`/builder/${template.id}`} className="relative block overflow-hidden border-b border-gray-100" style={{ textDecoration: "none" }}>
        <div className="aspect-[8.5/11] bg-white">
          <TemplatePreview templateId={template.id} />
        </div>
        <div className="tpl-hover-overlay">
          <div className="preview-btn">
            <ArrowRight size={13} /> Open Template
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm sm:text-base text-gray-900">{template.name}</h3>
          {template.atsOptimized && (
            <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
              <Check size={9} /> ATS
            </span>
          )}
        </div>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed flex-1">{template.description}</p>
        <Link to={`/builder/${template.id}`} className="use-btn">
          Use Template <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function TemplatePreview({ templateId }: { templateId: string }) {
  const previewStyles: Record<string, React.ReactNode> = {
    "modern-professional": <ModernProfessionalPreview />,
    "ats-classic": <ATSClassicPreview />,
    "minimal-elegant": <MinimalElegantPreview />,
    "developer-resume": <DeveloperResumePreview />,
    "corporate": <CorporatePreview />,
    "creative-clean": <CreativeCleanPreview />,
  };
  return (
    <div className="w-full h-full overflow-hidden bg-white">
      {previewStyles[templateId] || <DefaultPreview />}
    </div>
  );
}

function ModernProfessionalPreview() {
  return (
    <div className="w-full h-full bg-white flex">
      {/* Sidebar */}
      <div className="w-2/5 bg-slate-800 p-3 flex flex-col gap-2">
        <div className="w-12 h-12 bg-slate-600 rounded-full mx-auto mt-2 mb-1" />
        <div className="h-2 bg-slate-500 rounded w-3/4 mx-auto" />
        <div className="h-1.5 bg-slate-600 rounded w-2/3 mx-auto" />
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 bg-orange-500 rounded w-2/3" />
          <div className="h-1 bg-slate-600 rounded" />
          <div className="h-1 bg-slate-600 rounded w-5/6" />
          <div className="h-1 bg-slate-600 rounded w-4/6" />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 bg-orange-500 rounded w-2/3" />
          <div className="h-1 bg-slate-600 rounded w-full" />
          <div className="h-1 bg-slate-600 rounded w-5/6" />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 bg-orange-500 rounded w-1/2" />
          <div className="flex flex-wrap gap-1">
            <div className="h-2 bg-slate-600 rounded px-2 w-8" />
            <div className="h-2 bg-slate-600 rounded px-2 w-6" />
            <div className="h-2 bg-slate-600 rounded px-2 w-10" />
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 p-3 flex flex-col gap-3">
        <div className="space-y-1">
          <div className="h-2.5 bg-gray-800 rounded w-3/4" />
          <div className="h-1.5 bg-orange-500 rounded w-1/2" />
          <div className="h-1 bg-gray-300 rounded w-2/3" />
        </div>
        <div className="space-y-1">
          <div className="h-1.5 bg-gray-700 rounded w-1/3 border-b border-orange-400 pb-0.5" />
          <div className="h-1 bg-gray-200 rounded" />
          <div className="h-1 bg-gray-200 rounded w-11/12" />
          <div className="h-1 bg-gray-200 rounded w-4/5" />
        </div>
        <div className="space-y-1">
          <div className="h-1.5 bg-gray-700 rounded w-1/3" />
          <div className="h-1 bg-gray-200 rounded w-3/4" />
          <div className="h-1 bg-gray-200 rounded" />
          <div className="h-1 bg-gray-200 rounded w-5/6" />
          <div className="h-1 bg-gray-200 rounded w-4/5" />
        </div>
        <div className="space-y-1">
          <div className="h-1.5 bg-gray-700 rounded w-1/3" />
          <div className="h-1 bg-gray-200 rounded" />
          <div className="h-1 bg-gray-200 rounded w-11/12" />
          <div className="h-1 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}

function ATSClassicPreview() {
  return (
    <div className="w-full h-full bg-white p-4 flex flex-col gap-3">
      <div className="text-center border-b-2 border-gray-800 pb-3">
        <div className="h-3 bg-gray-800 rounded w-1/2 mx-auto mb-1.5" />
        <div className="h-1.5 bg-gray-500 rounded w-2/3 mx-auto mb-1" />
        <div className="h-1 bg-gray-400 rounded w-1/2 mx-auto" />
      </div>
      {["EXPERIENCE", "EDUCATION", "SKILLS"].map((section) => (
        <div key={section} className="space-y-1.5">
          <div className="h-1.5 bg-gray-800 rounded w-1/3 border-b border-gray-400 pb-0.5" />
          <div className="h-1 bg-gray-300 rounded" />
          <div className="h-1 bg-gray-300 rounded w-11/12" />
          <div className="h-1 bg-gray-300 rounded w-4/5" />
          <div className="h-1 bg-gray-300 rounded w-5/6" />
        </div>
      ))}
    </div>
  );
}

function MinimalElegantPreview() {
  return (
    <div className="w-full h-full bg-white p-4 flex flex-col gap-3">
      <div className="text-center pb-3" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div className="h-3 bg-gray-900 rounded w-2/5 mx-auto mb-1.5" />
        <div className="h-1.5 bg-gray-500 rounded w-1/3 mx-auto mb-1" />
        <div className="h-1 bg-gray-400 rounded w-1/2 mx-auto" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-1.5">
          <div className="h-1.5 bg-gray-800 rounded w-1/4" />
          <div style={{ height: 1, background: "#e5e7eb" }} />
          <div className="h-1 bg-gray-200 rounded" />
          <div className="h-1 bg-gray-200 rounded w-11/12" />
          <div className="h-1 bg-gray-200 rounded w-4/5" />
        </div>
      ))}
    </div>
  );
}

function DeveloperResumePreview() {
  return (
    <div className="w-full h-full bg-white p-4 flex flex-col gap-3">
      <div style={{ borderBottom: "2px solid #3b82f6" }} className="pb-2">
        <div className="h-3 bg-gray-900 rounded w-2/5 mb-1.5" />
        <div className="h-1.5 bg-blue-500 rounded w-1/3 mb-1" />
        <div className="h-1 bg-gray-400 rounded w-1/2" />
      </div>
      <div className="flex gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 bg-blue-500 rounded w-1/3" />
          <div className="h-1 bg-gray-300 rounded" />
          <div className="h-1 bg-gray-300 rounded w-5/6" />
          <div className="h-1 bg-gray-300 rounded w-4/5" />
          <div className="h-1.5 bg-blue-500 rounded w-1/3 mt-2" />
          <div className="h-1 bg-gray-300 rounded" />
          <div className="h-1 bg-gray-300 rounded w-11/12" />
        </div>
        <div className="w-1/3 space-y-1.5">
          <div className="h-1.5 bg-blue-500 rounded w-2/3" />
          <div className="flex flex-wrap gap-1">
            {[8, 10, 7, 12, 9, 8].map((w, i) => (
              <div key={i} className="h-2 bg-blue-100 border border-blue-200 rounded" style={{ width: `${w * 4}px` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CorporatePreview() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="bg-gray-800 px-4 py-3">
        <div className="h-3 bg-white rounded w-2/5 mb-1.5" />
        <div className="h-1.5 bg-gray-400 rounded w-1/3 mb-1" />
        <div className="h-1 bg-gray-500 rounded w-1/2" />
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-1.5 bg-gray-800 rounded w-1/3" />
            <div className="bg-gray-50 border border-gray-200 rounded p-1.5 space-y-1">
              <div className="h-1 bg-gray-400 rounded w-3/4" />
              <div className="h-1 bg-gray-300 rounded" />
              <div className="h-1 bg-gray-300 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreativeCleanPreview() {
  return (
    <div className="w-full h-full bg-white p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3 pb-3" style={{ borderBottom: "2px solid #f97316" }}>
        <div className="w-14 h-14 rounded-lg flex-shrink-0" style={{ background: "linear-gradient(135deg, #ea580c, #f97316)" }} />
        <div className="flex-1 space-y-1">
          <div className="h-3 bg-gray-900 rounded w-3/4" />
          <div className="h-1.5 bg-orange-500 rounded w-1/2" />
          <div className="h-1 bg-gray-400 rounded w-2/3" />
        </div>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-1.5">
          <div className="h-1.5 bg-orange-500 rounded w-1/4" />
          <div className="h-1 bg-gray-200 rounded" />
          <div className="h-1 bg-gray-200 rounded w-11/12" />
          <div className="h-1 bg-gray-200 rounded w-4/5" />
        </div>
      ))}
    </div>
  );
}

function DefaultPreview() {
  return (
    <div className="w-full h-full bg-white p-4 flex items-center justify-center">
      <FileText className="w-16 h-16 text-gray-300" />
    </div>
  );
}
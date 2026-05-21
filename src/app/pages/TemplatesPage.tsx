import { useEffect } from "react";
import { Link } from "react-router";
import { FileText, Check, ArrowLeft, ArrowRight, Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import { templates } from "../data/templates";
import { sampleResumeData } from "../data/sampleResume";
import { sampleResumeCommerce } from "../data/sampleResumeCommerce";
import logo from "../data/logo-skilldzire.png";

type D = typeof sampleResumeData;

function fmtDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr + "-01");
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function fmtDateMM(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr + "-01");
  return date.toLocaleDateString("en-US", { month: "2-digit", year: "numeric" });
}

export function TemplatesPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

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
          justify-content: center;
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
            <Check size={11} /> 8 ATS-Optimized Templates
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
      <Link
        to={`/builder/${template.id}`}
        className="relative block overflow-hidden border-b border-gray-100"
        style={{ textDecoration: "none" }}
      >
        {/* Aspect-ratio box matching letter paper 8.5:11 */}
        <div style={{ position: "relative", width: "100%", paddingBottom: "129.41%", background: "white" }}>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <ScaledPreview templateId={template.id} />
          </div>
        </div>
        <div className="tpl-hover-overlay">
          <div className="preview-btn">
            <ArrowRight size={13} /> Open Template
          </div>
        </div>
      </Link>

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

// Renders the real template at 794px then CSS-scales it down to fit the card width
function ScaledPreview({ templateId }: { templateId: string }) {
  const d = sampleResumeData;

  const c = sampleResumeCommerce as unknown as D;

  const inner: Record<string, React.ReactNode> = {
    "modern-professional":    <ModernProfessionalStatic d={d} />,
    "ats-classic":            <ATSClassicStatic d={d} />,
    "minimal-elegant":        <MinimalElegantStatic d={d} />,
    "developer-resume":       <DeveloperResumeStatic d={d} />,
    "corporate":              <CorporateStatic d={d} />,
    "creative-clean":         <CreativeCleanStatic d={d} />,
    "finance-professional":   <FinanceProfessionalStatic d={c} />,
    "business-analyst":       <BusinessAnalystStatic d={c} />,
  };

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{ width: 794, transformOrigin: "top left", pointerEvents: "none", userSelect: "none" }}
        ref={(el) => {
          if (!el) return;
          const parent = el.parentElement;
          if (!parent) return;
          const scale = parent.offsetWidth / 794;
          el.style.transform = `scale(${scale})`;
          el.style.height = `${parent.offsetHeight / scale}px`;
        }}
      >
        {inner[templateId] ?? (
          <div className="flex items-center justify-center h-full">
            <FileText className="w-16 h-16 text-gray-300" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Static template components ───────────────────────────────────────────────

function ModernProfessionalStatic({ d }: { d: D }) {
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = d;
  return (
    <div className="flex bg-white text-sm" style={{ minHeight: 1030 }}>
      {/* Sidebar */}
      <div className="bg-slate-800 text-white p-6 flex flex-col" style={{ width: 220, flexShrink: 0 }}>
        <div className="w-20 h-20 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
          {personalInfo.fullName.split(" ").map(n => n[0]).join("")}
        </div>
        <div className="mb-5">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-300">Contact</h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-start gap-1.5"><Mail className="w-3 h-3 mt-0.5 flex-shrink-0" /><span className="break-all">{personalInfo.email}</span></div>
            <div className="flex items-start gap-1.5"><Phone className="w-3 h-3 mt-0.5 flex-shrink-0" /><span>{personalInfo.phone}</span></div>
            <div className="flex items-start gap-1.5"><MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" /><span>{personalInfo.location}</span></div>
            {personalInfo.linkedin && <div className="flex items-start gap-1.5"><Linkedin className="w-3 h-3 mt-0.5 flex-shrink-0" /><span className="break-all">{personalInfo.linkedin}</span></div>}
            {personalInfo.github && <div className="flex items-start gap-1.5"><Github className="w-3 h-3 mt-0.5 flex-shrink-0" /><span className="break-all">{personalInfo.github}</span></div>}
          </div>
        </div>
        {skills.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-300">Skills</h3>
            <div className="space-y-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="text-xs">
                  <div className="font-semibold mb-0.5">{skill.category}</div>
                  <div className="text-slate-300">{skill.items.join(", ")}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {certifications.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-300">Certifications</h3>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <div className="font-semibold">{cert.name}</div>
                  <div className="text-slate-300">{cert.issuer}</div>
                  <div className="text-slate-400">{fmtDate(cert.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>
          <p className="text-gray-700 leading-relaxed text-xs">{personalInfo.summary}</p>
        </div>
        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide border-b-2 border-orange-600 pb-1">Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs">{exp.title}</h3>
                      <div className="text-gray-700 text-xs">{exp.company} • {exp.location}</div>
                    </div>
                    <div className="text-xs text-gray-600 whitespace-nowrap ml-2">{fmtDate(exp.startDate)} - {exp.current ? "Present" : fmtDate(exp.endDate)}</div>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs">
                    {exp.description.map((desc, idx) => <li key={idx}>{desc}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide border-b-2 border-orange-600 pb-1">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-xs">{edu.degree}</h3>
                  <div className="text-gray-700 text-xs">{edu.institution} • {edu.location}</div>
                  {edu.gpa && <div className="text-gray-600 text-xs">GPA: {edu.gpa}</div>}
                </div>
                <div className="text-xs text-gray-600 whitespace-nowrap ml-2">{fmtDate(edu.startDate)} - {fmtDate(edu.endDate)}</div>
              </div>
            ))}
          </div>
        )}
        {projects.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide border-b-2 border-orange-600 pb-1">Projects</h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-gray-900 text-xs">{project.name}</h3>
                  <p className="text-gray-700 text-xs">{project.description}</p>
                  <div className="text-xs text-gray-600"><span className="font-semibold">Tech:</span> {project.technologies.join(", ")}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {achievements.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide border-b-2 border-orange-600 pb-1">Achievements</h2>
            {achievements.map((a) => (
              <div key={a.id}>
                <h3 className="font-bold text-gray-900 text-xs">{a.title}</h3>
                <p className="text-gray-700 text-xs">{a.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ATSClassicStatic({ d }: { d: D }) {
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = d;
  return (
    <div className="p-10 bg-white text-sm" style={{ minHeight: 1030 }}>
      <div className="text-center border-b-2 border-gray-900 pb-4 mb-5">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
        <div className="text-gray-700 flex flex-wrap justify-center gap-2 text-xs">
          <span>{personalInfo.email}</span><span>•</span><span>{personalInfo.phone}</span><span>•</span><span>{personalInfo.location}</span>
          {personalInfo.linkedin && <><span>•</span><span>{personalInfo.linkedin}</span></>}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xs font-bold text-gray-900 mb-1 uppercase border-b border-gray-400 pb-1">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed text-xs">{personalInfo.summary}</p>
      </div>
      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">Work Experience</h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-gray-900 text-xs">{exp.title}</h3>
                  <span className="text-xs text-gray-600 ml-2 whitespace-nowrap">{fmtDate(exp.startDate)} - {exp.current ? "Present" : fmtDate(exp.endDate)}</span>
                </div>
                <div className="text-gray-700 mb-0.5 italic text-xs">{exp.company}, {exp.location}</div>
                <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs">
                  {exp.description.map((desc, idx) => <li key={idx}>{desc}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">Education</h2>
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900 text-xs">{edu.degree}</h3>
                <span className="text-xs text-gray-600 ml-2 whitespace-nowrap">{fmtDate(edu.startDate)} - {fmtDate(edu.endDate)}</span>
              </div>
              <div className="text-gray-700 text-xs">{edu.institution}, {edu.location}</div>
              {edu.gpa && <div className="text-gray-600 text-xs">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">Skills</h2>
          <div className="space-y-0.5">
            {skills.map((skill, idx) => (
              <div key={idx} className="text-gray-700 text-xs">
                <span className="font-semibold">{skill.category}:</span> {skill.items.join(", ")}
              </div>
            ))}
          </div>
        </div>
      )}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">Projects</h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900 text-xs">{project.name}</h3>
                <p className="text-gray-700 text-xs">{project.description}</p>
                <div className="text-gray-600 text-xs"><span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="text-gray-700 text-xs">
              <span className="font-bold">{cert.name}</span> - {cert.issuer} ({fmtDate(cert.date)})
            </div>
          ))}
        </div>
      )}
      {achievements.length > 0 && (
        <div>
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">Achievements</h2>
          {achievements.map((a) => (
            <div key={a.id} className="text-gray-700 text-xs">
              <span className="font-bold">{a.title}:</span> {a.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MinimalElegantStatic({ d }: { d: D }) {
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = d;
  return (
    <div className="p-14 bg-white text-sm" style={{ minHeight: 1030 }}>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-wide">{personalInfo.fullName}</h1>
        <div className="text-gray-600 flex flex-wrap justify-center gap-3 text-xs mb-2">
          <span>{personalInfo.email}</span><span className="text-gray-400">|</span>
          <span>{personalInfo.phone}</span><span className="text-gray-400">|</span>
          <span>{personalInfo.location}</span>
        </div>
        {personalInfo.linkedin && <div className="text-gray-600 text-xs">{personalInfo.linkedin}</div>}
      </div>
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed text-center max-w-xl mx-auto text-xs">{personalInfo.summary}</p>
      </div>
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 mb-3 text-center tracking-widest uppercase">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-200 pl-5">
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-xs">{exp.title}</h3>
                    <div className="text-gray-600 italic text-xs">{exp.company} • {exp.location}</div>
                  </div>
                  <span className="text-xs text-gray-500 ml-3 whitespace-nowrap">{fmtDate(exp.startDate)} - {exp.current ? "Present" : fmtDate(exp.endDate)}</span>
                </div>
                <ul className="space-y-0.5 text-gray-700 text-xs">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex gap-2"><span className="text-gray-400">•</span><span>{desc}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 mb-3 text-center tracking-widest uppercase">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="text-center">
              <h3 className="font-semibold text-gray-900 text-xs">{edu.degree}</h3>
              <div className="text-gray-600 text-xs">{edu.institution}, {edu.location}</div>
              <div className="text-xs text-gray-500">{fmtDate(edu.startDate)} - {fmtDate(edu.endDate)}{edu.gpa && ` • GPA: ${edu.gpa}`}</div>
            </div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 mb-3 text-center tracking-widest uppercase">Skills</h2>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill, idx) => (
              <div key={idx} className="text-center">
                <div className="font-semibold text-gray-900 text-xs mb-0.5">{skill.category}</div>
                <div className="text-gray-600 text-xs">{skill.items.join(" • ")}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 mb-3 text-center tracking-widest uppercase">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900 text-xs">{project.name}</h3>
                <p className="text-gray-700 text-xs">{project.description}</p>
                <div className="text-xs text-gray-600">{project.technologies.join(" • ")}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 mb-3 text-center tracking-widest uppercase">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="text-center text-xs">
              <span className="font-semibold text-gray-900">{cert.name}</span>
              <span className="text-gray-600"> - {cert.issuer}, {fmtDate(cert.date)}</span>
            </div>
          ))}
        </div>
      )}
      {achievements.length > 0 && (
        <div>
          <h2 className="text-sm font-light text-gray-900 mb-3 text-center tracking-widest uppercase">Achievements</h2>
          {achievements.map((a) => (
            <div key={a.id} className="text-center">
              <div className="font-semibold text-gray-900 text-xs">{a.title}</div>
              <div className="text-gray-700 text-xs">{a.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeveloperResumeStatic({ d }: { d: D }) {
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = d;
  return (
    <div className="p-8 bg-white text-sm" style={{ minHeight: 1030 }}>
      <div className="border-b-4 border-blue-600 pb-3 mb-5">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</div>
          <div className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</div>
          <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</div>
          {personalInfo.github && <div className="flex items-center gap-1"><Github className="w-3 h-3" />{personalInfo.github}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin}</div>}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-5">
          <div>
            <h2 className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wide">About</h2>
            <p className="text-gray-700 leading-relaxed text-xs">{personalInfo.summary}</p>
          </div>
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Experience</h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-0.5">
                      <div>
                        <h3 className="font-bold text-gray-900 text-xs">{exp.title}</h3>
                        <div className="text-gray-600 text-xs">{exp.company} • {exp.location}</div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{fmtDate(exp.startDate)} - {exp.current ? "Present" : fmtDate(exp.endDate)}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs">
                      {exp.description.map((desc, idx) => <li key={idx}>{desc}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Projects</h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-gray-900 text-xs">{project.name}</h3>
                    <p className="text-gray-700 text-xs mb-0.5">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs">{edu.degree}</h3>
                    <div className="text-gray-600 text-xs">{edu.institution}, {edu.location}</div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{fmtDate(edu.startDate)} - {fmtDate(edu.endDate)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-5">
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-gray-900 text-xs mb-0.5">{skill.category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.map((item, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Certifications</h2>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-bold text-gray-900 text-xs">{cert.name}</h3>
                    <div className="text-gray-600 text-xs">{cert.issuer}</div>
                    <div className="text-gray-500 text-xs">{fmtDate(cert.date)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Achievements</h2>
              <div className="space-y-1.5">
                {achievements.map((a) => (
                  <div key={a.id}>
                    <h3 className="font-bold text-gray-900 text-xs">{a.title}</h3>
                    <p className="text-gray-700 text-xs">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CorporateStatic({ d }: { d: D }) {
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = d;
  return (
    <div className="bg-white" style={{ minHeight: 1030 }}>
      <div className="bg-gray-900 text-white px-8 py-6">
        <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-3 text-xs text-gray-300">
          <span>{personalInfo.email}</span><span>•</span><span>{personalInfo.phone}</span><span>•</span><span>{personalInfo.location}</span>
          {personalInfo.linkedin && <><span>•</span><span>{personalInfo.linkedin}</span></>}
        </div>
      </div>
      <div className="p-8 text-sm">
        <div className="mb-5">
          <div className="bg-gray-100 p-3 rounded">
            <h2 className="text-xs font-bold text-gray-900 mb-1 uppercase">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed text-xs">{personalInfo.summary}</p>
          </div>
        </div>
        {skills.length > 0 && (
          <div className="mb-5">
            <div className="bg-gray-100 p-3 rounded">
              <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase">Core Competencies</h2>
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-gray-900 text-xs mb-0.5">{skill.category}</h3>
                    <div className="text-gray-700 text-xs">{skill.items.join(" • ")}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase pb-1 border-b-2 border-gray-900">Professional Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs">{exp.title}</h3>
                      <div className="text-gray-700 font-semibold text-xs">{exp.company}</div>
                      <div className="text-gray-600 text-xs">{exp.location}</div>
                    </div>
                    <div className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700 font-semibold whitespace-nowrap">{fmtDate(exp.startDate)} - {exp.current ? "Present" : fmtDate(exp.endDate)}</div>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs">
                    {exp.description.map((desc, idx) => <li key={idx}>{desc}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase pb-1 border-b-2 border-gray-900">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="bg-gray-50 p-2 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs">{edu.degree}</h3>
                    <div className="text-gray-700 text-xs">{edu.institution}, {edu.location}</div>
                    {edu.gpa && <div className="text-gray-600 text-xs">GPA: {edu.gpa}</div>}
                  </div>
                  <span className="text-xs text-gray-600 whitespace-nowrap">{fmtDate(edu.startDate)} - {fmtDate(edu.endDate)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {projects.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase pb-1 border-b-2 border-gray-900">Key Projects</h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-gray-900 text-xs">{project.name}</h3>
                  <p className="text-gray-700 text-xs">{project.description}</p>
                  <div className="text-xs text-gray-600"><span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-5">
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase pb-1 border-b-2 border-gray-900">Certifications</h2>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-bold text-gray-900 text-xs">{cert.name}</div>
                    <div className="text-gray-600 text-xs">{cert.issuer} • {fmtDate(cert.date)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase pb-1 border-b-2 border-gray-900">Achievements</h2>
              <div className="space-y-1.5">
                {achievements.map((a) => (
                  <div key={a.id}>
                    <div className="font-bold text-gray-900 text-xs">{a.title}</div>
                    <div className="text-gray-700 text-xs">{a.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CreativeCleanStatic({ d }: { d: D }) {
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = d;
  return (
    <div className="p-8 bg-white text-sm" style={{ minHeight: 1030 }}>
      <div className="flex items-start gap-5 border-b-2 border-orange-400 pb-5 mb-5">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
          {personalInfo.fullName.split(" ").map(n => n[0]).join("")}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-gray-600">
            <div className="flex items-center gap-1"><Mail className="w-3 h-3 text-orange-600" />{personalInfo.email}</div>
            <div className="flex items-center gap-1"><Phone className="w-3 h-3 text-orange-600" />{personalInfo.phone}</div>
            <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-orange-600" />{personalInfo.location}</div>
            {personalInfo.linkedin && <div className="flex items-center gap-1"><Linkedin className="w-3 h-3 text-orange-600" />{personalInfo.linkedin}</div>}
            {personalInfo.github && <div className="flex items-center gap-1"><Github className="w-3 h-3 text-orange-600" />{personalInfo.github}</div>}
          </div>
        </div>
      </div>
      <div className="mb-5">
        <h2 className="text-xs font-bold text-orange-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
          <div className="w-1 h-3 bg-orange-600"></div>About Me
        </h2>
        <p className="text-gray-700 leading-relaxed text-xs">{personalInfo.summary}</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-5">
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-orange-600 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                <div className="w-1 h-3 bg-orange-600"></div>Experience
              </h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-orange-200 pl-3">
                    <div className="flex justify-between items-start mb-0.5">
                      <div>
                        <h3 className="font-bold text-gray-900 text-xs">{exp.title}</h3>
                        <div className="text-gray-700 text-xs">{exp.company} • {exp.location}</div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{fmtDate(exp.startDate)} - {exp.current ? "Present" : fmtDate(exp.endDate)}</span>
                    </div>
                    <ul className="space-y-0.5 text-gray-700 text-xs">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="flex gap-1.5"><span className="text-orange-500 flex-shrink-0">▸</span><span>{desc}</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-orange-600 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                <div className="w-1 h-3 bg-orange-600"></div>Projects
              </h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.id} className="bg-orange-50 p-2 rounded-lg">
                    <h3 className="font-bold text-gray-900 text-xs">{project.name}</h3>
                    <p className="text-gray-700 text-xs mb-0.5">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-white text-orange-700 rounded text-xs font-medium">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-orange-600 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                <div className="w-1 h-3 bg-orange-600"></div>Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs">{edu.degree}</h3>
                    <div className="text-gray-700 text-xs">{edu.institution}, {edu.location}</div>
                    {edu.gpa && <div className="text-gray-600 text-xs">GPA: {edu.gpa}</div>}
                  </div>
                  <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{fmtDate(edu.startDate)} - {fmtDate(edu.endDate)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-5">
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-orange-600 mb-2 uppercase tracking-wide">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-gray-900 text-xs mb-0.5">{skill.category}</h3>
                    <div className="space-y-0.5">
                      {skill.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs text-gray-700">
                          <div className="w-1 h-1 bg-orange-500 rounded-full"></div>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-orange-600 mb-2 uppercase tracking-wide">Certifications</h2>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border-l-2 border-orange-300 pl-2">
                    <h3 className="font-bold text-gray-900 text-xs">{cert.name}</h3>
                    <div className="text-gray-600 text-xs">{cert.issuer}</div>
                    <div className="text-gray-500 text-xs">{fmtDate(cert.date)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-orange-600 mb-2 uppercase tracking-wide">Achievements</h2>
              <div className="space-y-1.5">
                {achievements.map((a) => (
                  <div key={a.id} className="bg-gradient-to-r from-orange-50 to-transparent p-1.5 rounded">
                    <h3 className="font-bold text-gray-900 text-xs">{a.title}</h3>
                    <p className="text-gray-700 text-xs">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── NEW: Finance Professional static preview ──────────────────────────────────

function FinanceProfessionalStatic({ d }: { d: D }) {
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = d;
  return (
    <div className="p-12 bg-white text-sm" style={{ minHeight: 1030 }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-wide">{personalInfo.fullName}</h1>
        <div className="text-gray-700 text-xs flex flex-wrap justify-center gap-2 mb-2">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="text-gray-700 text-xs flex flex-wrap justify-center gap-2">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.linkedin && personalInfo.website && <span>•</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Objective Statement */}
      {personalInfo.summary && (
        <div className="mb-5">
          <h2 className="text-center text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Objective Statement
          </h2>
          <p className="text-gray-700 leading-relaxed text-xs text-justify">{personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-center text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Skills
          </h2>
          <div className="space-y-0.5">
            {skills.map((skill, idx) => (
              <div key={idx} className="text-gray-700 text-xs">
                <span className="font-semibold">{skill.category}:</span> {skill.items.join(" • ")}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-center text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs">{edu.institution}</h3>
                    <div className="text-gray-700 italic text-xs">{edu.degree}</div>
                  </div>
                  <div className="text-gray-600 text-xs whitespace-nowrap ml-4">{edu.location}</div>
                </div>
                <div className="text-gray-700 text-xs">
                  Expected Graduation: {fmtDateMM(edu.endDate)}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Academic Projects */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-center text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Academic Projects
          </h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900 text-xs">{project.name}</h3>
                <div className="text-gray-700 mb-0.5 italic text-xs">{project.technologies.join(" • ")}</div>
                <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs">
                  {project.description.split(". ").filter(s => s.trim()).map((desc, idx) => (
                    <li key={idx}>{desc}{desc.endsWith(".") ? "" : "."}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-center text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs">{exp.company}</h3>
                    <div className="text-gray-700 italic text-xs">{exp.title}</div>
                  </div>
                  <div className="text-gray-600 text-xs whitespace-nowrap ml-4">{exp.location}</div>
                </div>
                <div className="text-xs text-gray-600 mb-0.5">
                  {fmtDateMM(exp.startDate)} - {exp.current ? "Present" : fmtDateMM(exp.endDate)}
                </div>
                <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs">
                  {exp.description.map((desc, idx) => <li key={idx}>{desc}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leadership & Extracurricular */}
      {achievements.length > 0 && (
        <div>
          <h2 className="text-center text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Leadership &amp; Extracurricular Experience
          </h2>
          <div className="space-y-1.5">
            {achievements.map((a) => (
              <div key={a.id}>
                <h3 className="font-bold text-gray-900 text-xs">{a.title}</h3>
                <p className="text-gray-700 text-xs">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NEW: Business Analyst static preview ─────────────────────────────────────

function BusinessAnalystStatic({ d }: { d: D }) {
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = d;
  return (
    <div className="p-10 bg-white text-sm" style={{ minHeight: 1030 }}>
      {/* Header */}
      <div className="text-center mb-5 pb-4 border-b-2 border-gray-800">
        <h1 className="text-4xl font-bold text-gray-900 mb-1 tracking-tight">{personalInfo.fullName}</h1>
        <div className="text-gray-600 text-xs mb-1">
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="text-gray-600 text-xs">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.linkedin && personalInfo.website && <span> | </span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 mb-1 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-xs">{personalInfo.summary}</p>
        </div>
      )}

      {/* Core Competencies */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs">
                <span className="text-gray-900 font-semibold mt-0.5">•</span>
                <div>
                  <span className="font-semibold text-gray-900">{skill.category}:</span>
                  <span className="text-gray-700 ml-1">{skill.items.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-xs">{edu.degree}</h3>
                    <div className="text-gray-700 text-xs">{edu.institution}, {edu.location}</div>
                    {edu.gpa && <div className="text-gray-700 text-xs">GPA: {edu.gpa}</div>}
                  </div>
                  <div className="text-xs text-gray-600 whitespace-nowrap ml-4">
                    {fmtDate(edu.startDate)} - {fmtDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Relevant Projects */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Relevant Projects &amp; Coursework
          </h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900 text-xs">{project.name}</h3>
                <div className="text-xs text-gray-600 mb-0.5 italic">
                  Key Skills: {project.technologies.join(" | ")}
                </div>
                <ul className="space-y-0.5 text-gray-700 text-xs">
                  {project.description.split(". ").filter(s => s.trim()).map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-gray-900 font-bold mt-0.5">→</span>
                      <span>{desc}{desc.endsWith(".") ? "" : "."}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Professional Experience
          </h2>
          <div className="space-y-2">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs">{exp.title}</h3>
                    <div className="text-gray-700 text-xs">{exp.company} | {exp.location}</div>
                  </div>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                    {fmtDate(exp.startDate)} - {exp.current ? "Present" : fmtDate(exp.endDate)}
                  </span>
                </div>
                <ul className="mt-1 space-y-0.5 text-gray-700 text-xs">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-gray-900 font-bold mt-0.5">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leadership & Activities */}
      {achievements.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Leadership &amp; Activities
          </h2>
          <div className="space-y-1">
            {achievements.map((a) => (
              <div key={a.id} className="flex items-start gap-1.5 text-xs">
                <span className="text-gray-900 font-bold mt-0.5">•</span>
                <div>
                  <span className="font-bold text-gray-900">{a.title}:</span>
                  <span className="text-gray-700 ml-1">{a.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Certifications
          </h2>
          <div className="space-y-0.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-start gap-1.5 text-xs text-gray-700">
                <span className="text-gray-900 font-bold mt-0.5">•</span>
                <div>
                  <span className="font-bold">{cert.name}</span> - {cert.issuer} ({fmtDate(cert.date)})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
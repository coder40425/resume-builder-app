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

        .tpl-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .brand-divider {
          width: 1px;
          height: 18px;
          background: #e5e7eb;
          margin: 0 2px;
        }

        .brand-label {
          font-weight: 700;
          font-size: 0.9rem;
          color: #111827;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          transition: all 0.15s;
          background: white;
        }
        .back-link:hover {
          color: #ea580c;
          border-color: #fed7aa;
          background: #fff7ed;
        }

        .tpl-header {
          background: white;
          border-bottom: 1px solid #f3f4f6;
          padding: 52px 24px 44px;
          text-align: center;
        }

        .tpl-header-inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #c2410c;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .tpl-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px 72px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
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

        .tpl-preview-wrap {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #f3f4f6;
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

        .ats-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 100px;
        }

        .use-btn {
          display: block;
          width: 100%;
          background: linear-gradient(135deg, #ea580c, #f97316);
          color: white;
          border: none;
          border-radius: 9px;
          padding: 10px 0;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 3px 10px rgba(234,88,12,0.25);
          display: flex;
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
        <div className="tpl-nav-inner">
          <Link to="/" className="brand-link">
            <img src={logo} alt="SkillDzire" style={{ height: 40, width: "auto", objectFit: "contain" }} />
            <div className="brand-divider" />
            <span className="brand-label">Resume Builder</span>
          </Link>
          <Link to="/" className="back-link">
            <ArrowLeft size={13} /> Back to Home
          </Link>
        </div>
      </nav>

      {/* ── Header ── */}
      <div className="tpl-header">
        <div className="tpl-header-inner">
          <div className="header-badge">
            <Check size={11} /> 6 ATS-Optimized Templates
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em", marginBottom: 12, lineHeight: 1.15 }}>
            Choose Your Resume Template
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1rem", lineHeight: 1.65 }}>
            Select a professional template and start building your resume instantly — with pre-filled sample data to guide you.
          </p>
        </div>
      </div>

      {/* ── Templates Grid ── */}
      <div className="tpl-grid">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: any }) {
  return (
    <div className="tpl-card">
      {/* Preview */}
      <Link to={`/builder/${template.id}`} className="tpl-preview-wrap" style={{ display: "block" }}>
        <div style={{ aspectRatio: "8.5/11", background: "white" }}>
          <TemplatePreview templateId={template.id} />
        </div>
        <div className="tpl-hover-overlay">
          <div className="preview-btn">
            <ArrowRight size={13} /> Open Template
          </div>
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#111827" }}>{template.name}</h3>
          {template.atsOptimized && <span className="ats-badge"><Check size={9} /> ATS</span>}
        </div>
        <p style={{ color: "#6b7280", fontSize: "0.82rem", lineHeight: 1.6, flex: 1 }}>{template.description}</p>
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
    <div style={{ width: "100%", height: "100%", padding: 24, overflow: "hidden" }}>
      {previewStyles[templateId] || <DefaultPreview />}
    </div>
  );
}

function ModernProfessionalPreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "white", display: "flex", gap: 8, fontSize: 4 }}>
      <div style={{ width: "35%", background: "#1e293b", padding: 8, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ width: 28, height: 28, background: "#475569", borderRadius: "50%", margin: "0 auto 4px" }} />
        <div style={{ height: 4, background: "#64748b", borderRadius: 2, width: "80%", margin: "0 auto" }} />
        <div style={{ height: 3, background: "#475569", borderRadius: 2, width: "60%", margin: "0 auto" }} />
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 2 }}>
          {[100, 85, 70, 90].map((w, i) => <div key={i} style={{ height: 2, background: "#475569", borderRadius: 1, width: `${w}%` }} />)}
        </div>
      </div>
      <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ height: 4, background: "#f97316", borderRadius: 2, width: "45%" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[100, 88, 72, 94, 60].map((w, i) => <div key={i} style={{ height: 2, background: "#e5e7eb", borderRadius: 1, width: `${w}%` }} />)}
        </div>
        <div style={{ height: 4, background: "#f97316", borderRadius: 2, width: "40%" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[100, 80, 65].map((w, i) => <div key={i} style={{ height: 2, background: "#e5e7eb", borderRadius: 1, width: `${w}%` }} />)}
        </div>
      </div>
    </div>
  );
}

function ATSClassicPreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "white", padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ textAlign: "center", borderBottom: "1px solid #d1d5db", paddingBottom: 6 }}>
        <div style={{ height: 6, background: "#111827", borderRadius: 2, width: "40%", margin: "0 auto 3px" }} />
        <div style={{ height: 3, background: "#9ca3af", borderRadius: 2, width: "55%", margin: "0 auto" }} />
      </div>
      {[["30%", "#374151"], ["40%", "#374151"], ["35%", "#374151"]].map(([w, c], i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 3, background: c, borderRadius: 2, width: w }} />
          {[100, 88, 75].map((pw, j) => <div key={j} style={{ height: 2, background: "#e5e7eb", borderRadius: 1, width: `${pw}%` }} />)}
        </div>
      ))}
    </div>
  );
}

function MinimalElegantPreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "white", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ textAlign: "center", paddingBottom: 6, borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ height: 7, background: "#111827", borderRadius: 2, width: "38%", margin: "0 auto 4px" }} />
        <div style={{ height: 2.5, background: "#9ca3af", borderRadius: 2, width: "50%", margin: "0 auto" }} />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 2.5, background: "#374151", borderRadius: 1, width: "25%" }} />
          {[100, 88].map((w, j) => <div key={j} style={{ height: 2, background: "#f3f4f6", borderRadius: 1, width: `${w}%` }} />)}
        </div>
      ))}
    </div>
  );
}

function DeveloperResumePreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "white", padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ borderBottom: "2px solid #3b82f6", paddingBottom: 5 }}>
        <div style={{ height: 6, background: "#111827", borderRadius: 2, width: "38%", marginBottom: 3 }} />
        <div style={{ height: 2.5, background: "#6b7280", borderRadius: 1, width: "55%" }} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ height: 3, background: "#3b82f6", borderRadius: 1, width: "40%" }} />
          {[100, 85, 70].map((w, i) => <div key={i} style={{ height: 2, background: "#e5e7eb", borderRadius: 1, width: `${w}%` }} />)}
        </div>
        <div style={{ width: "32%", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 3, background: "#3b82f6", borderRadius: 1, width: "70%" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {[60, 75, 50, 80, 65].map((w, i) => <div key={i} style={{ height: 5, background: "#dbeafe", borderRadius: 2, width: `${w}%` }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function CorporatePreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "white", display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ background: "#1f2937", padding: "10px 10px 8px" }}>
        <div style={{ height: 5, background: "white", borderRadius: 2, width: "38%", marginBottom: 3 }} />
        <div style={{ height: 2.5, background: "#9ca3af", borderRadius: 1, width: "55%" }} />
      </div>
      <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 5 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ background: "#f9fafb", borderRadius: 4, padding: "4px 6px", display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ height: 3, background: "#374151", borderRadius: 1, width: "30%" }} />
            {[100, 82].map((w, j) => <div key={j} style={{ height: 2, background: "#d1d5db", borderRadius: 1, width: `${w}%` }} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

function CreativeCleanPreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "white", padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "2px solid #fed7aa", paddingBottom: 6 }}>
        <div style={{ width: 22, height: 22, background: "linear-gradient(135deg,#f97316,#ea580c)", borderRadius: 4, flexShrink: 0 }} />
        <div>
          <div style={{ height: 5, background: "#111827", borderRadius: 2, width: 70, marginBottom: 2 }} />
          <div style={{ height: 2.5, background: "#9ca3af", borderRadius: 1, width: 50 }} />
        </div>
      </div>
      {[1, 2].map((i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 3, background: "#f97316", borderRadius: 1, width: "30%" }} />
          {[100, 85, 70].map((w, j) => <div key={j} style={{ height: 2, background: "#f3f4f6", borderRadius: 1, width: `${w}%` }} />)}
        </div>
      ))}
    </div>
  );
}

function DefaultPreview() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <FileText style={{ width: 48, height: 48, color: "#d1d5db" }} />
    </div>
  );
}
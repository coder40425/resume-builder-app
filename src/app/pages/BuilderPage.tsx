import { useState, useRef } from "react";
import { Link, useParams } from "react-router";
import { FileText, Download, ChevronLeft, ZoomIn, ZoomOut, Edit3, Eye } from "lucide-react";
import { ResumeProvider, useResume } from "../store/resumeStore";
import { ResumeForm } from "../components/ResumeForm";
import { ResumePreview } from "../components/ResumePreview";
import { templates } from "../data/templates";
import { sampleResumeData } from "../data/sampleResume";
import { sampleResumeCommerce } from "../data/sampleResumeCommerce";

const COMMERCE_TEMPLATES = ["finance-professional", "business-analyst"];

// ── BuilderPage: owns selectedTemplate so it can pick initialData
// before ResumeProvider mounts. The `key` forces a full remount
// (and store re-init) when switching between template groups.
export function BuilderPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const [selectedTemplate, setSelectedTemplate] = useState(
    templateId || "modern-professional"
  );

  const isCommerce = COMMERCE_TEMPLATES.includes(selectedTemplate);
  const providerKey = isCommerce ? "commerce" : "tech";
  const initialData = isCommerce ? sampleResumeCommerce : sampleResumeData;

  return (
    <ResumeProvider key={providerKey} initialData={initialData}>
      <BuilderContent
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />
    </ResumeProvider>
  );
}

// ── ATS Score Checker Panel ──────────────────────────────────────
interface ATSResult {
  score: number;
  suggestions: string[];
}

function ATSCheckerPanel({ resumeData }: { resumeData: any }) {
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsError, setAtsError] = useState<string | null>(null);

  const checkATS = async () => {
    setAtsLoading(true);
    setAtsError(null);
    setAtsResult(null);

    try {
      const resumeText = `
Name: ${resumeData.personalInfo.fullName}
Summary: ${resumeData.personalInfo.summary}
Experience: ${resumeData.experience.map((e: any) => `${e.title} at ${e.company}: ${e.description.join(", ")}`).join(" | ")}
Education: ${resumeData.education.map((e: any) => `${e.degree} from ${e.institution}`).join(" | ")}
Skills: ${resumeData.skills.map((s: any) => `${s.category}: ${s.items.join(", ")}`).join(" | ")}
Projects: ${resumeData.projects.map((p: any) => `${p.name}: ${p.description}`).join(" | ")}
Certifications: ${resumeData.certifications.map((c: any) => c.name).join(", ")}
Achievements: ${resumeData.achievements.map((a: any) => a.title).join(", ")}
      `.trim();

      const prompt = `
You are an expert ATS resume evaluator, recruiter, and hiring analyst.

Analyze the resume below like a real ATS system combined with human recruiter evaluation.

IMPORTANT:
- First identify the candidate's domain automatically:
  Examples: Software Engineering, Finance, Accounting, Consulting, Marketing, Sales, Data Analytics, Operations, Commerce, Product Management, Design, etc.
- Then evaluate the resume according to THAT industry's hiring expectations, keywords, achievements, and standards.
- Do NOT judge all resumes using software engineering standards.

Return ONLY a valid raw JSON object.
Do NOT return markdown, code fences, explanations, comments, headings, or extra text.

Return EXACTLY this structure:
{
  "score": <integer 0-100>,
  "rating": "<Excellent|Good|Average|Weak>",
  "suggestions": [
    "<suggestion 1>",
    "<suggestion 2>",
    "<suggestion 3>"
  ]
}

Rating Rules:
- 90-100 = "Excellent"
- 75-89 = "Good"
- 60-74 = "Average"
- Below 60 = "Weak"

ATS Evaluation Criteria:
Evaluate intelligently based on the candidate's industry and target role.

General ATS Checks:
- Strong action verbs and ownership language
- Quantified achievements and measurable business impact
- Relevant industry keywords and terminology
- Resume readability and formatting consistency
- Section completeness and organization
- Clarity, professionalism, and concise writing
- Experience relevance and practical exposure

For Tech / Software Resumes:
Focus on:
- Technical skills relevance
- Projects and engineering impact
- Scalability, optimization, APIs, databases, cloud, frameworks
- Problem-solving and measurable engineering outcomes
- Modern development tools and technologies

For Finance / Commerce / Business Resumes:
Focus on:
- Financial analysis and reporting terminology
- Business metrics, revenue impact, forecasting, budgeting
- Excel, Power BI, SQL, SAP, ERP, accounting tools, analytics
- ROI, cost reduction, efficiency improvements, audits
- Communication, stakeholder coordination, and operational impact

For Marketing / Sales / Consulting:
Focus on:
- Growth metrics, campaigns, conversions, engagement, revenue
- Client handling, strategy, presentations, leadership
- Analytical tools and business communication

Scoring Logic:
- 90-100:
  Highly optimized ATS-ready resume with strong achievements, domain keywords, and excellent clarity

- 75-89:
  Strong resume with minor gaps in metrics, keywords, or formatting

- 60-74:
  Average resume lacking measurable impact, optimization, or role alignment

- Below 60:
  Weak ATS alignment, poor structure, missing sections, weak achievements, or low relevance

Suggestion Rules (STRICT):
- Return EXACTLY 3 suggestions
- Each suggestion MUST be highly specific to THIS resume
- Avoid generic advice completely
- Each suggestion MUST contain between 10 and 13 words inclusive
- All suggestions must be different from each other
- Do NOT use numbering
- Do NOT use quotation marks inside suggestions

Suggestion Requirements:
- Suggestion 1:
  Focus ONLY on formatting, structure, readability, or section organization

- Suggestion 2:
  Focus ONLY on quantified achievements, measurable impact, revenue, optimization, or metrics

- Suggestion 3:
  MUST naturally include 2-3 ATS keywords highly relevant to the candidate's industry and target role

Additional Important Rules:
- Infer the target role intelligently from skills, projects, certifications, experience, and tools
- Penalize keyword stuffing and repetitive wording
- Reward domain-specific terminology and practical business/technical impact
- Ensure the final output is perfectly valid JSON parsable using JSON.parse()
- Never include trailing commas

Resume:
${resumeText}
`;

      const models = [
        "meta-llama/llama-3.2-3b-instruct:free",
        "meta-llama/llama-3.3-70b-instruct:free",
        "deepseek/deepseek-v4-flash:free",
        "google/gemma-4-26b-a4b-it:free",
        "google/gemma-4-31b-it:free",
        "openai/gpt-oss-20b:free",
        "openai/gpt-oss-120b:free",
        "qwen/qwen3-coder:free",
        "qwen/qwen3-next-80b-a3b-instruct:free",
        "nvidia/nemotron-3-nano-30b-a3b:free",
        "nvidia/nemotron-nano-9b-v2:free",
        "nvidia/nemotron-nano-12b-v2-vl:free",
        "nvidia/nemotron-3-super-120b-a12b:free",
        "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
        "liquid/lfm-2.5-1.2b-instruct:free",
        "liquid/lfm-2.5-1.2b-thinking:free",
        "minimax/minimax-m2.5:free",
        "arcee-ai/trinity-large-thinking:free",
        "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
        "nousresearch/hermes-3-llama-3.1-405b:free",
        "poolside/laguna-xs.2:free",
        "poolside/laguna-m.1:free",
        "baidu/cobuddy:free",
        "z-ai/glm-4.5-air:free",
        "openrouter/free",
      ];

      let lastError = "";
      for (const model of models) {
        try {
          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
              "HTTP-Referer": "http://localhost:5173",
              "X-Title": "AI Resume Builder",
            },
            body: JSON.stringify({
              model,
              max_tokens: 200,
              messages: [{ role: "user", content: prompt }],
            }),
          });

          if (response.status === 429 || response.status === 404) {
            lastError = `${model} rate limited`;
            continue;
          }
          if (!response.ok) {
            const err = await response.json();
            lastError = err.error?.message || "API error";
            continue;
          }

          const data = await response.json();
          const text = data.choices?.[0]?.message?.content || "";
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (!jsonMatch) { lastError = "No JSON in response"; continue; }

          const parsed: ATSResult = JSON.parse(jsonMatch[0]);
          setAtsResult(parsed);
          return;
        } catch {
          lastError = `${model} failed`;
          continue;
        }
      }
      throw new Error("All models are currently busy. Try again in a minute.");
    } catch (err: any) {
      setAtsError(err.message || "Could not analyze. Please try again.");
    } finally {
      setAtsLoading(false);
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) {
      return {
        bg: "#DCFCE7",
        color: "#166534",
        label: "Excellent",
      };
    }

    if (score >= 75) {
      return {
        bg: "#DBEAFE",
        color: "#1D4ED8",
        label: "Good",
      };
    }

    if (score >= 60) {
      return {
        bg: "#FEF9C3",
        color: "#854D0E",
        label: "Average",
      };
    }

    return {
      bg: "#FEE2E2",
      color: "#991B1B",
      label: "Weak",
    };
  };
  const badge = atsResult ? getScoreBadge(atsResult.score) : null;

  return (
    <div className="mb-4 w-full" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "12px 16px", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>ATS Score Checker</span>
        <button
          onClick={checkATS}
          disabled={atsLoading}
          style={{ background: atsLoading ? "#EA580CB3" : "#EA580C", color: "#fff", fontSize: "11px", fontWeight: 500, padding: "4px 10px", borderRadius: "6px", border: "none", cursor: atsLoading ? "not-allowed" : "pointer", opacity: atsLoading ? 0.7 : 1, transition: "background 0.15s" }}
          onMouseEnter={(e) => { if (!atsLoading) (e.currentTarget as HTMLButtonElement).style.background = "#C2410C"; }}
          onMouseLeave={(e) => { if (!atsLoading) (e.currentTarget as HTMLButtonElement).style.background = "#EA580C"; }}
        >
          {atsLoading ? "Checking..." : "Check ATS"}
        </button>
      </div>

      {atsLoading && (
        <div className="mt-3 space-y-2">
          <div className="h-3 rounded animate-pulse" style={{ background: "#E5E7EB", width: "40%" }} />
          <div className="h-2 rounded animate-pulse" style={{ background: "#E5E7EB", width: "80%" }} />
          <div className="h-2 rounded animate-pulse" style={{ background: "#E5E7EB", width: "65%" }} />
        </div>
      )}

      {atsError && <p className="mt-2" style={{ fontSize: "11px", color: "#991B1B" }}>⚠️ {atsError}</p>}

      {atsResult && !atsLoading && (
        <div style={{ animation: "atsFadeIn 0.4s ease" }}>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-1">
              <span style={{ fontSize: "28px", fontWeight: 700, color: "#EA580C", lineHeight: 1 }}>{atsResult.score}</span>
              <span style={{ fontSize: "14px", color: "#6B7280" }}>/100</span>
            </div>
            {badge && (
              <span style={{ background: badge.bg, color: badge.color, fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "999px" }}>
                {badge.label}
              </span>
            )}
          </div>
          {atsResult.suggestions.slice(0, 3).map((s, i) => (
            <p key={i} style={{ fontSize: "11px", color: "#4B5563", marginTop: "6px", display: "flex", alignItems: "flex-start", gap: "5px" }}>
              <span style={{ fontSize: "12px", flexShrink: 0 }}>💡</span>
              <span>{s}</span>
            </p>
          ))}
        </div>
      )}

      <style>{`
        @keyframes atsFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Main Builder ─────────────────────────────────────────────────
interface BuilderContentProps {
  selectedTemplate: string;
  setSelectedTemplate: (t: string) => void;
}

function BuilderContent({ selectedTemplate, setSelectedTemplate }: BuilderContentProps) {
  const [zoom, setZoom] = useState(0.75);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const previewRef = useRef<HTMLDivElement>(null);
  const { resumeData } = useResume();

  const template = templates.find((t) => t.id === selectedTemplate);

  const handleDownloadPDF = () => {
    const node = previewRef.current;
    if (!node) return;
    setIsDownloading(true);
    const resumeHTML = node.innerHTML;
    const styleSheets = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules).map((rule) => rule.cssText).join("\n");
        } catch {
          return sheet.href ? `@import url("${sheet.href}");` : "";
        }
      })
      .join("\n");

    const iframe = document.createElement("iframe");
    iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:none;";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) { setIsDownloading(false); document.body.removeChild(iframe); return; }

    const safeName = resumeData.personalInfo.fullName?.trim().replace(/\s+/g, "_") || "Resume";
    iframeDoc.open();
    iframeDoc.write(`<!DOCTYPE html><html><head><meta charset="utf-8"/>
      <title>${safeName}_Resume</title>
      <style>${styleSheets}
        @page{size:A4 portrait;margin:0;}
        *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
        html,body{margin:0;padding:0;background:white;}
        body>div{transform:none!important;}
      </style></head><body><div>${resumeHTML}</div></body></html>`);
    iframeDoc.close();

    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => { document.body.removeChild(iframe); setIsDownloading(false); }, 1000);
      }, 500);
    };
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Navbar */}
      <nav className="border-b border-gray-200 bg-white z-10 flex-shrink-0">
        <div className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              <span className="hidden sm:inline font-semibold text-gray-900 text-sm md:text-base">AI Resume Builder</span>
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link to="/templates" className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-xs md:text-sm">
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
              <span>Change Template</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="hidden sm:block px-2 md:px-3 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors font-medium text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 flex-shrink-0"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{isDownloading ? "Preparing..." : "Download PDF"}</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile Template Selector */}
        <div className="sm:hidden px-3 pb-3">
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden border-t border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${activeTab === "edit" ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${activeTab === "preview" ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
            >
              <Eye className="w-4 h-4" /> Preview
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel — Form */}
        <div className={`lg:w-1/2 overflow-y-auto border-r border-gray-200 bg-gray-50 ${activeTab === "edit" ? "flex-1 lg:flex-none" : "hidden lg:block"}`}>
          <ResumeForm />
        </div>

        {/* Right Panel — Preview */}
        <div className={`lg:w-1/2 overflow-y-auto bg-gray-100 ${activeTab === "preview" ? "flex-1 lg:flex-none" : "hidden lg:block"}`}>
          <div className="p-4 sm:p-6 md:p-8">

            {/* Zoom controls */}
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Zoom Out">
                  <ZoomOut className="w-4 h-4 text-gray-600" />
                </button>
                <span className="text-sm text-gray-600 min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Zoom In">
                  <ZoomIn className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Template: <span className="font-medium text-gray-700">{template?.name}</span>
              </div>
            </div>

            {/* ATS Score Checker */}
            <ATSCheckerPanel resumeData={resumeData} />

            {/* Resume preview */}
            <div className="overflow-auto">
              <div
                className="origin-top transition-transform duration-200"
                style={{ transform: `scale(${zoom})`, width: "fit-content", margin: "0 auto" }}
              >
                <div ref={previewRef}>
                  <ResumePreview templateId={selectedTemplate} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
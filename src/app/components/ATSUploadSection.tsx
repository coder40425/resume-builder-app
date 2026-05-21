import { Upload, FileText, Zap, X, CheckCircle, AlertCircle, TrendingUp, Award } from "lucide-react";
import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────
interface ATSQuick {
  score: number;
  rating: string;
  overview: string;
  verdict: string;
}

interface ATSFull extends ATSQuick {
  sections: {
    label: string;
    score: number;
    status: "strong" | "average" | "weak";
    comment: string;
  }[];
  strengths: string[];
  improvements: string[];
  keywords: { found: string[]; missing: string[] };
}

// ── Text extraction ──────────────────────────────────────────────
async function extractPDFText(file: File): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
  ).toString();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(" ") + "\n";
  }
  return text.trim();
}

async function extractDOCXText(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

async function extractText(file: File): Promise<string> {
  if (file.type === "application/pdf" || file.name.endsWith(".pdf"))
    return extractPDFText(file);
  if (
    file.type.includes("wordprocessingml") ||
    file.name.endsWith(".docx") ||
    file.name.endsWith(".doc")
  )
    return extractDOCXText(file);
  throw new Error("Unsupported file type. Please upload a PDF or DOCX.");
}

// ── All free models — race ALL at once ──────────────────────────
const ALL_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "deepseek/deepseek-v4-flash:free",
  "openai/gpt-oss-120b:free",
  "openai/gpt-oss-20b:free",
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "qwen/qwen3-coder:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "minimax/minimax-m2.5:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "arcee-ai/trinity-large-thinking:free",
  "liquid/lfm-2.5-1.2b-instruct:free",
  "poolside/laguna-xs.2:free",
  "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
  "baidu/cobuddy:free",
  "z-ai/glm-4.5-air:free",
  "openrouter/free",
];

const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
  "HTTP-Referer": "http://localhost:5173",
  "X-Title": "AI Resume Builder",
};

// Race ALL models simultaneously — first valid JSON wins
function raceAll<T>(
  models: string[],
  buildBody: (model: string) => object,
  validate: (parsed: any) => T
): Promise<T> {
  return new Promise((resolve, reject) => {
    let won = false;
    let failed = 0;
    const total = models.length;
    models.forEach((model) => {
      fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(buildBody(model)),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error(`${res.status}`);
          const data = await res.json();
          const text = data.choices?.[0]?.message?.content || "";
          const match = text.match(/\{[\s\S]*\}/);
          if (!match) throw new Error("no json");
          const validated = validate(JSON.parse(match[0]));
          if (!won) { won = true; resolve(validated); }
        })
        .catch(() => {
          failed++;
          if (failed === total && !won)
            reject(new Error("All models busy. Try again in a moment."));
        });
    });
  });
}

// Phase 1 — quick: score + overview only (small tokens = faster)
async function fetchQuick(resumeText: string): Promise<ATSQuick> {
  const prompt = `You are a senior ATS analyst. Auto-detect the candidate's industry, evaluate with THAT domain's standards.
Return ONLY raw JSON, no markdown, no code fences: (be quick and focus on the big picture. Detailed breakdown will come later)
{"score":<0-100>,"rating":"<Excellent|Good|Average|Weak>","overview":"<2-3 sentences>","verdict":"<1 bold sentence>"}
Rating: 90-100=Excellent|75-89=Good|60-74=Average|<60=Weak.
Resume:
${resumeText.slice(0, 5000)}`;

  return raceAll(
    ALL_MODELS,
    (model) => ({ model, max_tokens: 220, messages: [{ role: "user", content: prompt }] }),
    (p) => { if (typeof p.score !== "number") throw new Error("bad"); return p as ATSQuick; }
  );
}

// Phase 2 — full details (fires in parallel with phase 1)
async function fetchDetails(resumeText: string): Promise<ATSFull> {
  const prompt = `You are a senior ATS analyst. Auto-detect the candidate's industry/domain, evaluate using THAT domain's hiring standards.
Return ONLY raw JSON, no markdown, no code fences: (Be quick but comprehensive. Focus on actionable insights, not fluff.)
The overall ATS score, rating, overview, and verdict have ALREADY been generated separately. Do NOT re-evaluate or change those.

Your ONLY task is to generate:
- section-wise ATS evaluation
- detailed strengths
- actionable improvements
- keyword analysis

{"score":<0-100>,"rating":"<Excellent|Good|Average|Weak>","overview":"<2-3 sentences>","sections":[{"label":"Contact & Header","score":<0-100>,"status":"<strong|average|weak>","comment":"<1 sentence>"},{"label":"Professional Summary","score":<0-100>,"status":"<strong|average|weak>","comment":"<1 sentence>"},{"label":"Work Experience","score":<0-100>,"status":"<strong|average|weak>","comment":"<1 sentence>"},{"label":"Skills & Keywords","score":<0-100>,"status":"<strong|average|weak>","comment":"<1 sentence>"},{"label":"Education","score":<0-100>,"status":"<strong|average|weak>","comment":"<1 sentence>"},{"label":"Formatting & ATS","score":<0-100>,"status":"<strong|average|weak>","comment":"<1 sentence>"}],"strengths":["<s1>","<s2>","<s3>","<s4>","<s5>"],"improvements":["<i1>","<i2>","<i3>","<i4>","<i5>"],"keywords":{"found":["<k1>","<k2>","<k3>","<k4>","<k5>"],"missing":["<k1>","<k2>","<k3>","<k4>","<k5>"]},"verdict":"<1 bold sentence>"}
Rating:90-100=Excellent|75-89=Good|60-74=Average|<60=Weak. Status:>=75=strong|50-74=average|<50=weak.
Criteria: action verbs, quantified achievements, keyword density, section completeness, ATS-readability, Conciseness, professionalism.
- Avoid generic feedback completely (give detailed points in strength & improvements)
- Make all strengths and improvements highly specific to THIS resume
- Evaluate like a real recruiter, not just an ATS keyword checker
- Reward measurable impact and practical experience
- Penalize vague bullet points and weak descriptions
Resume:
${resumeText.slice(0, 7000)}`;

  return raceAll(
    ALL_MODELS,
    (model) => ({ model, max_tokens: 900, messages: [{ role: "user", content: prompt }] }),
    (p) => { if (typeof p.score !== "number" || !Array.isArray(p.sections)) throw new Error("bad"); return p as ATSFull; }
  );
}

// ── Sub-components ───────────────────────────────────────────────
function ScoreCircle({ score, rating }: { score: number; rating: string }) {
  const cfg =
    score >= 90 ? { bar: "#22c55e", bg: "#DCFCE7", color: "#166534" } :
    score >= 75 ? { bar: "#3b82f6", bg: "#DBEAFE", color: "#1D4ED8" } :
    score >= 60 ? { bar: "#eab308", bg: "#FEF9C3", color: "#854D0E" } :
                  { bar: "#ef4444", bg: "#FEE2E2", color: "#991B1B" };
  const r = 46, circ = 2 * Math.PI * r, dash = circ * (score / 100);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ position: "relative", display: "inline-flex" }}>
        <svg width={110} height={110} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={55} cy={55} r={r} fill="none" stroke="#f3f4f6" strokeWidth={9} />
          <circle cx={55} cy={55} r={r} fill="none" stroke={cfg.bar} strokeWidth={9}
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1.2s ease" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: 11, color: "#6b7280" }}>/100</span>
        </div>
      </div>
      <span style={{ background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 700, padding: "3px 14px", borderRadius: 999 }}>
        {score >= 90 ? "🏆" : score >= 75 ? "✅" : score >= 60 ? "⚠️" : "❌"} {rating}
      </span>
    </div>
  );
}

function SectionBar({ label, score, status, comment }: { label: string; score: number; status: string; comment: string }) {
  const color = status === "strong" ? "#22c55e" : status === "average" ? "#eab308" : "#ef4444";
  const bg    = status === "strong" ? "#f0fdf4"  : status === "average" ? "#fefce8"  : "#fef2f2";
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151" }}>{label}</span>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color, background: bg, padding: "1px 8px", borderRadius: 999 }}>{score}</span>
      </div>
      <div style={{ height: 6, background: "#f3f4f6", borderRadius: 99, overflow: "hidden", marginBottom: 3 }}>
        <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: 99, transition: "width 1s ease" }} />
      </div>
      <p style={{ fontSize: "0.73rem", color: "#6b7280", margin: 0, lineHeight: 1.4 }}>{comment}</p>
    </div>
  );
}

function SkeletonBlock({ width = "100%", height = 12, mb = 8 }: { width?: string; height?: number; mb?: number }) {
  return (
    <div style={{ width, height, background: "#f3f4f6", borderRadius: 6, marginBottom: mb, animation: "ats-pulse 1.4s ease-in-out infinite" }} />
  );
}

// ── Main Component ───────────────────────────────────────────────
type Stage = "idle" | "extracting" | "analyzing" | "quick_done" | "full_done" | "error";

export function ATSUploadSection() {
  const [fileName, setFileName] = useState("");
  const [stage, setStage]       = useState<Stage>("idle");
  const [quick, setQuick]       = useState<ATSQuick | null>(null);
  const [full, setFull]         = useState<ATSFull | null>(null);
  const [error, setError]       = useState("");

  const reset = () => {
    setFileName(""); setStage("idle");
    setQuick(null); setFull(null); setError("");
  };

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setQuick(null); setFull(null); setError("");

    try {
      setStage("extracting");
      const text = await extractText(file);
      if (!text || text.length < 50)
        throw new Error("Could not extract text. Make sure the file is not scanned/image-only.");

      setStage("analyzing");

      // Fire BOTH requests in parallel immediately
      const quickPromise   = fetchQuick(text);
      const detailsPromise = fetchDetails(text);

      // Show quick result as soon as it arrives (~4-6s)
      quickPromise
        .then((q) => { setQuick(q); setStage("quick_done"); })
        .catch(() => {}); // swallow — details might still succeed

      // Show full result when details arrive
      detailsPromise
        .then((f) => { setFull(f); setStage("full_done"); })
        .catch((e) => {
          // If details failed but quick succeeded, stay at quick_done
          setStage((prev) => {
            if (prev === "quick_done") return "quick_done";
            setError(e.message); return "error";
          });
        });

      await Promise.allSettled([quickPromise, detailsPromise]);

    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setStage("error");
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const isLoading    = stage === "extracting" || stage === "analyzing";
  const showReport   = stage === "quick_done" || stage === "full_done";
  const detailsReady = stage === "full_done";
  const displayData  = full ?? quick;

  return (
    <section className="py-16 sm:py-20" style={{ background: "linear-gradient(135deg,#fff7ed 0%,#ffffff 100%)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }} className="px-4 sm:px-6">
        <div className="rounded-3xl border p-8 sm:p-12" style={{ background: "white", borderColor: "#fed7aa" }}>

          {/* Top grid */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 mb-4"
                style={{ background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", padding: "6px 14px", borderRadius: 999, fontSize: "0.75rem", fontWeight: 700 }}>
                <Zap size={14} /> FREE ATS CHECKER
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#111827", lineHeight: 1.1 }}>
                Upload Your Resume &<span style={{ color: "#ea580c" }}> Get Full ATS Report</span>
              </h2>
              <p className="text-base sm:text-lg mb-6" style={{ color: "#6b7280", lineHeight: 1.7 }}>
                Quick Score & Summary. Full section breakdown, keyword gaps, and action plan follow automatically.
              </p>
              <div className="space-y-3">
                {[
                  "Score & summary appear in ~5-10 seconds",
                  "Section-by-section score breakdown",
                  "Keyword gap analysis for your industry",
                  "100% free · PDF & DOCX supported",
                ].map(item => (
                  <div key={item} className="flex items-center gap-2" style={{ fontSize: "0.875rem", color: "#374151" }}>
                    <CheckCircle size={15} color="#22c55e" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              {(stage === "idle" || stage === "error") && (
                <label
                  className="flex flex-col items-center justify-center text-center cursor-pointer"
                  style={{ border: "2px dashed #fdba74", borderRadius: 20, padding: "50px 24px", background: "#fffaf5" }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                >
                  <div className="mb-4 flex items-center justify-center"
                    style={{ width: 70, height: 70, borderRadius: "50%", background: "#fff7ed" }}>
                    <Upload size={32} color="#ea580c" />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "#111827", fontSize: "1.1rem" }}>
                    {stage === "error" ? "Try Another File" : "Upload Resume"}
                  </h3>
                  <p className="mb-4 text-sm" style={{ color: "#6b7280" }}>PDF or DOCX · Drag & drop or click to browse</p>
                  {stage === "error" && (
                    <p className="text-sm mb-3" style={{ color: "#991B1B", background: "#FEE2E2", padding: "8px 14px", borderRadius: 8 }}>
                      ⚠️ {error}
                    </p>
                  )}
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={onInputChange} />
                </label>
              )}

              {isLoading && (
                <div style={{ border: "1.5px solid #fed7aa", borderRadius: 20, padding: "48px 24px", background: "#fffaf5", textAlign: "center" }}>
                  <div className="flex items-center justify-center gap-2 mb-5">
                    <FileText size={18} color="#ea580c" />
                    <span style={{ fontWeight: 600, color: "#111827", fontSize: "0.9rem", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {fileName}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                    <div style={{ width: 44, height: 44, border: "4px solid #fed7aa", borderTopColor: "#ea580c", borderRadius: "50%", animation: "ats-spin 0.7s linear infinite" }} />
                  </div>
                  <p style={{ color: "#374151", fontSize: "0.9rem", fontWeight: 600, marginBottom: 4 }}>
                    {stage === "extracting" ? "📄 Reading your resume…" : `Analyzing with AI...`}
                  </p>
                  <p style={{ color: "#9ca3af", fontSize: "0.78rem" }}>
                    {stage === "extracting" ? "Extracting text content" : "Score & overview appear first — full report follows"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Progressive Report ── */}
          {showReport && displayData && (
            <div style={{ marginTop: 40, animation: "atsFadeIn 0.5s ease" }}>
              <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#fed7aa,transparent)", marginBottom: 36 }} />

              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={16} color="#ea580c" />
                    <span style={{ fontWeight: 700, color: "#111827", fontSize: "0.9rem", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {fileName}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#6b7280" }}>
                    {detailsReady
                      ? "✅ Full ATS Analysis Report"
                      : "⚡ Quick Results ready — Full report loading…"}
                  </p>
                </div>
                <button onClick={reset}
                  style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "6px 14px", cursor: "pointer", color: "#6b7280", fontSize: "0.8rem", fontWeight: 500 }}>
                  <X size={13} /> Check Another
                </button>
              </div>

              {/* Score + Overview — appears immediately */}
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fffaf5", border: "1.5px solid #fed7aa", borderRadius: 16, padding: "28px 16px" }}>
                  <ScoreCircle score={displayData.score} rating={displayData.rating} />
                  <p style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: 10, textAlign: "center" }}>Overall ATS Score</p>
                </div>
                <div className="sm:col-span-2" style={{ background: "#f9fafb", border: "1.5px solid #f3f4f6", borderRadius: 16, padding: "24px" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={16} color="#ea580c" />
                    <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#111827" }}>Overview</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>{displayData.overview}</p>
                  <div style={{ background: "linear-gradient(135deg,#fff7ed,#fef3c7)", border: "1px solid #fed7aa", borderRadius: 10, padding: "10px 14px" }}>
                    <p style={{ fontSize: "0.82rem", color: "#92400e", fontWeight: 600, margin: 0 }}>🎯 {displayData.verdict}</p>
                  </div>
                </div>
              </div>

              {/* Section breakdown + Strengths/Improvements */}
              {detailsReady && full ? (
                <div className="grid lg:grid-cols-2 gap-6 mb-6" style={{ animation: "atsFadeIn 0.5s ease" }}>
                  <div style={{ background: "#f9fafb", border: "1.5px solid #f3f4f6", borderRadius: 16, padding: "24px" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <Award size={16} color="#ea580c" />
                      <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#111827" }}>Section Breakdown</span>
                    </div>
                    {full.sections.map((sec) => <SectionBar key={sec.label} {...sec} />)}
                  </div>
                  <div className="flex flex-col gap-4">
                    <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 16, padding: "20px" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle size={15} color="#16a34a" />
                        <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#15803d" }}>What's Working</span>
                      </div>
                      {full.strengths.map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                          <span style={{ color: "#22c55e", flexShrink: 0, fontSize: 13 }}>✓</span>
                          <p style={{ fontSize: "0.82rem", color: "#166534", margin: 0, lineHeight: 1.5 }}>{s}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#fef2f2", border: "1.5px solid #fecaca", borderRadius: 16, padding: "20px" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle size={15} color="#dc2626" />
                        <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#dc2626" }}>Needs Improvement</span>
                      </div>
                      {full.improvements.map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                          <span style={{ color: "#ef4444", flexShrink: 0, fontSize: 13 }}>→</span>
                          <p style={{ fontSize: "0.82rem", color: "#991b1b", margin: 0, lineHeight: 1.5 }}>{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Animated skeleton while details load */
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  <div style={{ background: "#f9fafb", border: "1.5px solid #f3f4f6", borderRadius: 16, padding: "24px" }}>
                    <SkeletonBlock width="50%" height={14} mb={16} />
                    {[80,65,90,55,70,75].map((w,i) => (
                      <div key={i} style={{ marginBottom: 14 }}>
                        <SkeletonBlock width={`${w}%`} height={10} mb={6} />
                        <SkeletonBlock width="100%" height={6} mb={4} />
                        <SkeletonBlock width="60%" height={8} mb={0} />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4">
                    <div style={{ background: "#f9fafb", border: "1.5px solid #f3f4f6", borderRadius: 16, padding: "20px" }}>
                      <SkeletonBlock width="40%" height={12} mb={14} />
                      {[90,75,85].map((w,i) => <SkeletonBlock key={i} width={`${w}%`} height={10} mb={10} />)}
                    </div>
                    <div style={{ background: "#f9fafb", border: "1.5px solid #f3f4f6", borderRadius: 16, padding: "20px" }}>
                      <SkeletonBlock width="40%" height={12} mb={14} />
                      {[85,70,90,60].map((w,i) => <SkeletonBlock key={i} width={`${w}%`} height={10} mb={10} />)}
                    </div>
                  </div>
                </div>
              )}

              {/* Keywords */}
              {detailsReady && full ? (
                <div className="grid sm:grid-cols-2 gap-4 mb-6" style={{ animation: "atsFadeIn 0.5s ease" }}>
                  <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 16, padding: "20px" }}>
                    <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "#15803d", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>✅ Keywords Found</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {full.keywords.found.map((kw) => (
                        <span key={kw} style={{ background: "white", border: "1px solid #86efac", color: "#166534", fontSize: "0.75rem", fontWeight: 600, padding: "3px 10px", borderRadius: 999 }}>{kw}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: "#fef2f2", border: "1.5px solid #fecaca", borderRadius: 16, padding: "20px" }}>
                    <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "#dc2626", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>❌ Missing Keywords</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {full.keywords.missing.map((kw) => (
                        <span key={kw} style={{ background: "white", border: "1px solid #fca5a5", color: "#991b1b", fontSize: "0.75rem", fontWeight: 600, padding: "3px 10px", borderRadius: 999 }}>{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[0,1].map((i) => (
                    <div key={i} style={{ background: "#f9fafb", border: "1.5px solid #f3f4f6", borderRadius: 16, padding: "20px" }}>
                      <SkeletonBlock width="40%" height={10} mb={12} />
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {[60,80,50,70,55].map((w,j) => <SkeletonBlock key={j} width={`${w}px`} height={24} mb={0} />)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div style={{ textAlign: "center" }}>
                <a href="/templates"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#ea580c,#f97316)", color: "white", border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", textDecoration: "none", boxShadow: "0 4px 14px rgba(234,88,12,0.3)" }}>
                  Build an ATS-Optimized Resume <Zap size={15} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes atsFadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ats-spin  { to{transform:rotate(360deg)} }
        @keyframes ats-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  );
}
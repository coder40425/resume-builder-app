import { Upload, FileText, Zap, X, CheckCircle } from "lucide-react";
import { useState } from "react";

interface ATSResult {
  score: number;
  rating: string;
  suggestions: string[];
}

async function extractPDFText(file: File): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist");
  // Use the local worker bundled with pdfjs-dist
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
  if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
    return extractPDFText(file);
  }
  if (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx") ||
    file.name.endsWith(".doc")
  ) {
    return extractDOCXText(file);
  }
  throw new Error("Unsupported file type. Please upload a PDF or DOCX.");
}

const OPENROUTER_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "deepseek/deepseek-v4-flash:free",
  "google/gemma-4-31b-it:free",
  "openai/gpt-oss-120b:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "qwen/qwen3-coder:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
];

async function callATS(resumeText: string): Promise<ATSResult> {
  const prompt = `You are an expert ATS resume evaluator and hiring analyst.

Analyze the resume below. First identify the candidate's domain automatically (Software Engineering, Finance, Marketing, etc.), then evaluate according to THAT industry's hiring expectations.

Return ONLY a valid raw JSON object — no markdown, no code fences, no extra text.

Return EXACTLY this structure:
{
  "score": <integer 0-100>,
  "rating": "<Excellent|Good|Average|Weak>",
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"]
}

Rating: 90-100 = Excellent, 75-89 = Good, 60-74 = Average, below 60 = Weak

Evaluation criteria (adapt to the candidate's industry):
- Strong action verbs and ownership language
- Quantified achievements and measurable impact
- Relevant industry keywords and terminology
- Section completeness (summary, experience, education, skills)
- Clarity, formatting, and ATS-readability

Suggestion rules (STRICT):
- Exactly 3 suggestions, each 10-13 words
- Specific to THIS resume, not generic
- Suggestion 1: formatting/structure improvement
- Suggestion 2: quantified achievements or measurable impact
- Suggestion 3: include 2-3 ATS keywords for this industry/role

Resume:
${resumeText.slice(0, 6000)}`;

  let lastError = "";
  for (const model of OPENROUTER_MODELS) {
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
          max_tokens: 300,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (response.status === 429 || response.status === 404) {
        lastError = `${model} unavailable`; continue;
      }
      if (!response.ok) {
        const err = await response.json();
        lastError = err.error?.message || "API error"; continue;
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) { lastError = "No JSON in response"; continue; }

      return JSON.parse(jsonMatch[0]) as ATSResult;
    } catch {
      lastError = `${model} failed`; continue;
    }
  }
  throw new Error(`All models busy. Try again in a moment. (${lastError})`);
}

function ScoreBadge({ score, rating }: { score: number; rating: string }) {
  const config =
    score >= 90 ? { bg: "#DCFCE7", color: "#166534", bar: "#22c55e" } :
    score >= 75 ? { bg: "#DBEAFE", color: "#1D4ED8", bar: "#3b82f6" } :
    score >= 60 ? { bg: "#FEF9C3", color: "#854D0E", bar: "#eab308" } :
                  { bg: "#FEE2E2", color: "#991B1B", bar: "#ef4444" };

  return (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      {/* Circle */}
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
        <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="42" fill="none"
            stroke={config.bar} strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - score / 100)}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div style={{ position: "absolute", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 500 }}>/100</div>
        </div>
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", background: config.bg, color: config.color, fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 999 }}>
        {score >= 90 ? "🏆" : score >= 75 ? "✅" : score >= 60 ? "⚠️" : "❌"} {rating}
      </div>
    </div>
  );
}

type Stage = "idle" | "extracting" | "analyzing" | "done" | "error";

export function ATSUploadSection() {
  const [fileName, setFileName] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState("");

  const reset = () => {
    setFileName(""); setStage("idle"); setResult(null); setError("");
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // reset input so the same file can be re-selected
    e.target.value = "";

    setFileName(file.name);
    setResult(null);
    setError("");

    try {
      setStage("extracting");
      const text = await extractText(file);
      if (!text || text.length < 50) throw new Error("Could not extract text. Make sure the file is not scanned/image-only.");

      setStage("analyzing");
      const atsResult = await callATS(text);
      setResult(atsResult);
      setStage("done");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setStage("error");
    }
  };

  const isLoading = stage === "extracting" || stage === "analyzing";

  return (
    <section className="py-16 sm:py-20" style={{ background: "linear-gradient(135deg,#fff7ed 0%,#ffffff 100%)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }} className="px-4 sm:px-6">
        <div className="rounded-3xl border p-8 sm:p-12" style={{ background: "white", borderColor: "#fed7aa" }}>
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* ── Left: copy ── */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4" style={{ background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", padding: "6px 14px", borderRadius: 999, fontSize: "0.75rem", fontWeight: 700 }}>
                <Zap size={14} /> FREE ATS CHECKER
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#111827", lineHeight: 1.1 }}>
                Upload Your Resume &
                <span style={{ color: "#ea580c" }}> Check ATS Score</span>
              </h2>
              <p className="text-base sm:text-lg mb-6" style={{ color: "#6b7280", lineHeight: 1.7 }}>
                Get instant ATS analysis, keyword optimization, recruiter readability insights, and personalized improvement suggestions — all in seconds, no account needed.
              </p>
              <div className="space-y-3">
                {[
                  "Supports PDF and DOCX files",
                  "AI-powered industry-aware scoring",
                  "Actionable improvement suggestions",
                  "100% free, no sign-up needed",
                ].map(item => (
                  <div key={item} className="flex items-center gap-2" style={{ fontSize: "0.875rem", color: "#374151" }}>
                    <CheckCircle size={15} color="#22c55e" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: upload + results ── */}
            <div>
              {/* Upload zone */}
              {stage === "idle" || stage === "error" ? (
                <label
                  className="flex flex-col items-center justify-center text-center cursor-pointer transition-all"
                  style={{ border: "2px dashed #fdba74", borderRadius: 20, padding: "50px 24px", background: "#fffaf5" }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      const fakeEvent = { target: { files: [file], value: "" } } as any;
                      handleFile(fakeEvent);
                    }
                  }}
                >
                  <div className="mb-4 flex items-center justify-center" style={{ width: 70, height: 70, borderRadius: "50%", background: "#fff7ed" }}>
                    <Upload size={32} color="#ea580c" />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "#111827", fontSize: "1.1rem" }}>
                    {stage === "error" ? "Try Another File" : "Upload Resume"}
                  </h3>
                  <p className="mb-4 text-sm" style={{ color: "#6b7280" }}>PDF or DOCX · Drag & drop or click to browse</p>
                  {stage === "error" && (
                    <p className="text-sm mb-3" style={{ color: "#991B1B", background: "#FEE2E2", padding: "8px 14px", borderRadius: 8 }}>⚠️ {error}</p>
                  )}
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
                </label>
              ) : null}

              {/* Loading state */}
              {isLoading && (
                <div style={{ border: "1.5px solid #fed7aa", borderRadius: 20, padding: "40px 24px", background: "#fffaf5", textAlign: "center" }}>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <FileText size={20} color="#ea580c" />
                    <span style={{ fontWeight: 600, color: "#111827", fontSize: "0.95rem" }}>{fileName}</span>
                  </div>
                  {/* Spinner */}
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, border: "4px solid #fed7aa", borderTopColor: "#ea580c", borderRadius: "50%", animation: "ats-spin 0.8s linear infinite" }} />
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", fontWeight: 500 }}>
                    {stage === "extracting" ? "📄 Reading your resume…" : "Analyzing with AI…"}
                  </p>
                  <p style={{ color: "#9ca3af", fontSize: "0.78rem", marginTop: 6 }}>This takes 5–15 seconds</p>
                  <style>{`@keyframes ats-spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              )}

              {/* Results */}
              {stage === "done" && result && (
                <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 20, padding: "28px 24px", background: "white", animation: "atsFadeIn 0.4s ease" }}>
                  {/* File name + reset */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2" style={{ color: "#374151", fontSize: "0.85rem", fontWeight: 600 }}>
                      <FileText size={15} color="#ea580c" />
                      <span style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fileName}</span>
                    </div>
                    <button onClick={reset} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4, borderRadius: 6, display: "flex", alignItems: "center" }} title="Check another resume">
                      <X size={16} />
                    </button>
                  </div>

                  {/* Score circle */}
                  <ScoreBadge score={result.score} rating={result.rating} />

                  {/* Divider */}
                  <div style={{ height: 1, background: "#f3f4f6", margin: "16px 0" }} />

                  {/* Suggestions */}
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                    Improvement Tips
                  </div>
                  <div className="space-y-2">
                    {result.suggestions.slice(0, 3).map((s, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, background: "#fffaf5", border: "1px solid #fed7aa", borderRadius: 10, padding: "10px 12px" }}>
                        <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
                        <span style={{ fontSize: "0.82rem", color: "#374151", lineHeight: 1.5 }}>{s}</span>
                      </div>
                    ))}
                  </div>

                  {/* Re-check */}
                  <button
                    onClick={reset}
                    style={{ marginTop: 16, width: "100%", background: "linear-gradient(135deg,#ea580c,#f97316)", color: "white", border: "none", borderRadius: 10, padding: "10px 0", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}
                  >
                    Check Another Resume
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes atsFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
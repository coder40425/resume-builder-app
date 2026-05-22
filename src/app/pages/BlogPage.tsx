import { Link } from "react-router";
import {
    ArrowRight,
    CheckCircle,
    Sparkles,
    FileText,
    Copy,
    Zap,
} from "lucide-react";
import logo from "../data/logo-skilldzire.png";

const promptText = `You are an expert Resume Preparation Assistant.

Your job is to help me prepare all the information required for building a professional ATS-friendly resume.

You must guide me step-by-step by asking questions one section at a time.

Rules:

* Ask only one section at a time
* Wait for my response before moving to the next section
* If my answer is weak, ask follow-up questions to improve it
* Convert my raw answers into professional resume language
* Make achievements quantifiable whenever possible
* Use strong action verbs
* Keep the content concise and professional
* Generate ATS-friendly bullet points
* Suggest improvements wherever needed
* If I am a fresher, help me create strong project descriptions, internship points, certifications, and achievements
* If I am experienced, focus on impact, leadership, metrics, and technical contributions
* At the end, generate a complete structured resume dataset in this exact format:

PERSONAL INFORMATION

* Full Name
* Email
* Phone
* Location
* LinkedIn
* GitHub
* Portfolio/Website

PROFESSIONAL SUMMARY
(3–5 line ATS-friendly summary)

EDUCATION

* Degree
* College
* Location
* Start Date
* End Date
* GPA (Optional)
* Relevant Coursework

WORK EXPERIENCE
For each experience:

* Job Title
* Company
* Location
* Start Date
* End Date
* Responsibilities & Achievements
  (4–6 strong bullet points)

PROJECTS
For each project:

* Project Name
* Technologies Used
* Description
* Key Achievements

SKILLS
Categorize into:

* Programming Languages
* Frameworks/Libraries
* Databases
* Tools/Platforms
* Soft Skills

CERTIFICATIONS

* Certification Name
* Organization
* Year

ACHIEVEMENTS

* Awards
* Hackathons
* Rankings
* Scholarships
* Leadership Activities

After collecting everything, generate:

1. A professional ATS-friendly resume version
2. A concise one-page version
3. Improved professional bullet points
4. Suggested job titles based on profile
5. Keywords that improve ATS score

Start by asking for:

1. Career target/job role
2. Experience level (Fresher / Experienced)
3. Current education or current job`;

export function BlogPage() {
    const copyPrompt = async () => {
        await navigator.clipboard.writeText(promptText);
        alert("Prompt copied!");
    };

    return (
        <div
            className="min-h-screen bg-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #ea580c, #f97316);
  color: white;
  padding: 12px 28px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(234,88,12,0.3);
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(234,88,12,0.4);
}

        .section-card {
          background: white;
          border: 1px solid #f3f4f6;
          border-radius: 18px;
          padding: 28px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }

        .prompt-box {
          background: #111827;
          color: #f9fafb;
          border-radius: 16px;
          padding: 24px;
          overflow-x: auto;
          font-size: 14px;
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff7ed;
          color: #ea580c;
          border: 1px solid #fed7aa;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
        }
      `}</style>

            {/* NAVBAR */}
            <nav
                style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid #f3f4f6",
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        padding: "0 24px",
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            textDecoration: "none",
                        }}
                    >
                        <img
                            src={logo}
                            alt="SkillDzire"
                            className="h-8 sm:h-10 w-auto object-contain"
                        />

                        <div
                            className="hidden sm:block"
                            style={{
                                width: 1,
                                height: 20,
                                background: "#e5e7eb",
                                margin: "0 4px",
                            }}
                        />

                        <span
                            className="hidden sm:inline"
                            style={{
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                color: "#111827",
                            }}
                        >
                            Resume Builder
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/templates"
                            className="btn-primary"
                            style={{
                                padding: "9px 20px",
                                fontSize: "0.85rem",
                                boxShadow: "0 4px 14px rgba(234,88,12,0.3)",
                            }}
                        >
                            <span className="hidden xs:inline">
                                Build Resume
                            </span>

                            <span className="xs:hidden">
                                Build
                            </span>

                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "80px 24px 50px",
                }}
            >
                <div className="badge mb-6">
                    <Sparkles size={14} />
                    AI Resume Preparation Guide
                </div>

                <h1
                    style={{
                        fontSize: "clamp(2.0rem,5vw,3.8rem)",
                        lineHeight: 1.1,
                        fontWeight: 800,
                        color: "#111827",
                        letterSpacing: "-0.04em",
                        maxWidth: 900,
                    }}
                >
                    AI Resume Preparation Prompt to Build ATS-Friendly Resume Data Fast
                </h1>

                <p
                    style={{
                        marginTop: 24,
                        fontSize: "1.15rem",
                        lineHeight: 1.8,
                        color: "#6b7280",
                        maxWidth: 850,
                    }}
                >
                    This AI-powered prompt helps students and professionals prepare
                    complete ATS-friendly resume content step-by-step. It generates
                    structured resume datasets, strong bullet points, impactful project
                    descriptions, and recruiter-friendly keywords quickly.
                </p>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 14,
                        marginTop: 32,
                    }}
                >
                    {[
                        "ATS-friendly content",
                        "Strong bullet points",
                        "Structured resume data",
                        "Perfect for freshers",
                        "Professional summaries",
                    ].map((item) => (
                        <div
                            key={item}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                color: "#374151",
                                fontWeight: 500,
                            }}
                        >
                            <CheckCircle size={16} color="#22c55e" />
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "10px 24px 40px",
                }}
            >
                <div className="section-card">
                    <div className="badge mb-5">
                        <Zap size={14} />
                        How It Works
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2
                                style={{
                                    fontSize: "2rem",
                                    fontWeight: 800,
                                    marginBottom: 18,
                                    color: "#111827",
                                }}
                            >
                                Build Resume Data Faster with AI
                            </h2>

                            <p
                                style={{
                                    color: "#6b7280",
                                    lineHeight: 1.8,
                                    marginBottom: 24,
                                }}
                            >
                                Instead of manually writing resume content, this AI prompt asks
                                targeted questions one section at a time and converts your raw
                                answers into professional ATS-optimized resume content.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Collects resume information step-by-step",
                                    "Improves weak answers automatically",
                                    "Creates measurable achievement points",
                                    "Generates recruiter-friendly resume language",
                                    "Builds structured resume datasets instantly",
                                ].map((point) => (
                                    <div
                                        key={point}
                                        style={{
                                            display: "flex",
                                            alignItems: "start",
                                            gap: 12,
                                        }}
                                    >
                                        <CheckCircle
                                            size={18}
                                            color="#22c55e"
                                            style={{ marginTop: 3 }}
                                        />
                                        <span style={{ color: "#374151", lineHeight: 1.7 }}>
                                            {point}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                background:
                                    "linear-gradient(135deg,#fff7ed 0%,#fef3c7 100%)",
                                borderRadius: 18,
                                padding: 28,
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "1.4rem",
                                    fontWeight: 700,
                                    marginBottom: 18,
                                    color: "#111827",
                                }}
                            >
                                Best For
                            </h3>

                            <div className="space-y-4">
                                {[
                                    "College students building first resume",
                                    "Freshers preparing internship resumes",
                                    "Developers improving ATS scores",
                                    "Professionals rewriting resume content",
                                    "Fast resume dataset generation",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                        }}
                                    >
                                        <FileText size={18} color="#ea580c" />
                                        <span style={{ color: "#374151" }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROMPT */}
            <section
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "10px 24px 80px",
                }}
            >
                <div className="section-card">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 16,
                            marginBottom: 24,
                        }}
                    >
                        <div>
                            <div className="badge mb-3">
                                <Sparkles size={14} />
                                AI Resume Prompt
                            </div>

                            <h2
                                style={{
                                    fontSize: "2rem",
                                    fontWeight: 800,
                                    color: "#111827",
                                }}
                            >
                                Copy & Use This Prompt
                            </h2>
                        </div>

                        <button onClick={copyPrompt} className="btn-primary">
                            <Copy size={16} />
                            Copy Prompt
                        </button>
                    </div>

                    <div className="prompt-box">
                        {promptText}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section
                style={{
                    background: "#111827",
                    padding: "80px 24px",
                    textAlign: "center",
                }}
            >
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    <h2
                        style={{
                            fontSize: "clamp(2rem,4vw,3.5rem)",
                            fontWeight: 800,
                            color: "white",
                            lineHeight: 1.2,
                            marginBottom: 20,
                        }}
                    >
                        Ready to Build Your ATS-Friendly Resume?
                    </h2>

                    <p
                        style={{
                            color: "#9ca3af",
                            fontSize: "1.1rem",
                            lineHeight: 1.8,
                            marginBottom: 36,
                        }}
                    >
                        Generate structured resume content faster and build professional
                        resumes using SkillDzire Resume Builder.
                    </p>

                    <Link to="/templates" className="btn-primary">
                        Build Resume Now <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
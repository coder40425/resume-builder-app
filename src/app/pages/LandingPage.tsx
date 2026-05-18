import { Link } from "react-router";
import { FileText, Download, Eye, Zap, Shield, Layout, ArrowRight, CheckCircle } from "lucide-react";
import logo from "../data/logo-skilldzire.png";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .landing * { box-sizing: border-box; }

        .btn-primary {
          display: inline-flex;
          align-items: center;
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
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(234,88,12,0.4);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: #374151;
          padding: 12px 28px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.2s;
          border: 1.5px solid #e5e7eb;
        }
        .btn-secondary:hover {
          border-color: #f97316;
          color: #ea580c;
          background: #fff7ed;
        }

        .nav-link {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.15s;
        }
        .nav-link:hover { color: #111827; }

        .feature-card {
          background: white;
          border: 1.5px solid #f3f4f6;
          border-radius: 14px;
          padding: 28px;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
        }
        .feature-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ea580c, #f97316);
          transform: scaleX(0);
          transition: transform 0.25s;
          transform-origin: left;
        }
        .feature-card:hover {
          border-color: #fed7aa;
          box-shadow: 0 8px 24px rgba(234,88,12,0.08);
          transform: translateY(-3px);
        }
        .feature-card:hover::after { transform: scaleX(1); }

        .template-card {
          background: white;
          border-radius: 14px;
          overflow: hidden;
          border: 1.5px solid #f3f4f6;
          transition: all 0.25s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .template-card:hover {
          border-color: #fed7aa;
          box-shadow: 0 12px 32px rgba(234,88,12,0.1);
          transform: translateY(-5px);
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #c2410c;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .stat-card {
          background: white;
          border: 1.5px solid #f3f4f6;
          border-radius: 14px;
          padding: 28px 20px;
          text-align: center;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .section-tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ea580c;
          margin-bottom: 10px;
        }

        .ats-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 100px;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
          margin: 0;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-1 { animation: fadeUp 0.5s 0s both; }
        .fade-2 { animation: fadeUp 0.5s 0.1s both; }
        .fade-3 { animation: fadeUp 0.5s 0.2s both; }
        .fade-4 { animation: fadeUp 0.5s 0.3s both; }

        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float { animation: floatY 4s ease-in-out infinite; }
      `}</style>

      <div className="landing">

        {/* ── Navbar ── */}
        <nav style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #f3f4f6",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <img src={logo} alt="SkillDzire" style={{ height: 40, width: "auto", objectFit: "contain" }} />
              <div style={{ width: 1, height: 20, background: "#e5e7eb", margin: "0 4px" }} />
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827" }}>Resume Builder</span>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              <a href="#features" className="nav-link">Features</a>
              <Link to="/templates" className="nav-link">Templates</Link>
              <a href="#about" className="nav-link">About</a>
            </div>

            <Link to="/templates" className="btn-primary" style={{ padding: "9px 20px", fontSize: "0.85rem" }}>
              Build Resume <ArrowRight size={14} />
            </Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 24px 72px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="badge-pill fade-1" style={{ marginBottom: 20 }}>
                <Zap size={11} /> Free · ATS-Optimized · No Sign Up
              </div>
              <h1 className="fade-2" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)", fontWeight: 800, color: "#111827", lineHeight: 1.13, letterSpacing: "-0.03em", marginBottom: 18 }}>
                Build Resumes That<br />
                <span style={{ color: "#ea580c" }}>Actually Get You Hired</span>
              </h1>
              <p className="fade-3" style={{ color: "#6b7280", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 32, maxWidth: 430 }}>
                Create modern, ATS-friendly resumes with live preview and instant PDF export. Professional templates, zero hassle.
              </p>
              <div className="fade-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                <Link to="/templates" className="btn-primary">
                  Build My Resume <ArrowRight size={15} />
                </Link>
                <Link to="/templates" className="btn-secondary">
                  Explore Templates
                </Link>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                {["No account needed", "PDF in 1 click", "100% free"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 5, color: "#9ca3af", fontSize: "0.8rem" }}>
                    <CheckCircle size={13} color="#22c55e" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="float" style={{ position: "relative" }}>
              <div style={{
                background: "linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)",
                borderRadius: 20,
                padding: 28,
                boxShadow: "0 20px 60px rgba(234,88,12,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                border: "1.5px solid #fed7aa",
              }}>
                {/* Mock resume */}
                <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#ea580c,#f97316)", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 10, background: "#e5e7eb", borderRadius: 5, width: 130, marginBottom: 6 }} />
                      <div style={{ height: 7, background: "#f3f4f6", borderRadius: 4, width: 90 }} />
                    </div>
                    <div className="ats-pill">ATS ✓</div>
                  </div>
                  <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 14, marginBottom: 14 }}>
                    <div style={{ height: 7, background: "#fed7aa", borderRadius: 4, width: 70, marginBottom: 10 }} />
                    {[100, 85, 70].map((w, i) => <div key={i} style={{ height: 5, background: "#f3f4f6", borderRadius: 3, width: `${w}%`, marginBottom: 6 }} />)}
                  </div>
                  <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 14 }}>
                    <div style={{ height: 7, background: "#fed7aa", borderRadius: 4, width: 90, marginBottom: 10 }} />
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {["React", "TypeScript", "Node.js"].map(s => (
                        <span key={s} style={{ background: "#fff7ed", border: "1px solid #fed7aa", color: "#ea580c", fontSize: "0.68rem", padding: "2px 9px", borderRadius: 100, fontWeight: 600 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div style={{
                position: "absolute", bottom: -14, right: -14,
                background: "linear-gradient(135deg,#ea580c,#f97316)",
                color: "white", borderRadius: 12, padding: "10px 16px",
                display: "flex", alignItems: "center", gap: 7,
                boxShadow: "0 6px 20px rgba(234,88,12,0.4)",
                fontSize: "0.82rem", fontWeight: 700,
              }}>
                <Download size={14} /> PDF Ready
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── Stats ── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { value: "6+", label: "Resume Templates" },
              { value: "1-Click", label: "PDF Export" },
              { value: "100%", label: "ATS Compatible" },
            ].map(({ value, label }) => (
              <div key={label} className="stat-card">
                <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "#ea580c", marginBottom: 4, letterSpacing: "-0.02em" }}>{value}</div>
                <div style={{ color: "#6b7280", fontSize: "0.875rem", fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ── Features ── */}
        <section id="features" style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ marginBottom: 48 }}>
            <div className="section-tag">Why us</div>
            <h2 style={{ fontSize: "clamp(1.7rem, 2.5vw, 2.3rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em", marginBottom: 10 }}>
              Everything you need,<br />nothing you don't
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1rem", maxWidth: 400 }}>
              A focused set of tools built to help you land interviews faster.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { icon: <Eye size={20} />, title: "Live Preview", desc: "See every change reflected instantly. Edit with confidence — what you see is exactly what gets exported." },
              { icon: <Shield size={20} />, title: "ATS-Optimized", desc: "All templates pass modern Applicant Tracking Systems. Clean structure, correct formatting, every time." },
              { icon: <Download size={20} />, title: "Instant PDF", desc: "One-click PDF export. No watermarks, no account, no waiting. Download and send immediately." },
              { icon: <Layout size={20} />, title: "Pro Templates", desc: "6 thoughtfully designed templates covering every industry — tech, creative, executive, and more." },
              { icon: <Zap size={20} />, title: "Fast & Intuitive", desc: "Pre-filled smart examples guide you. Most users complete their first resume in under 10 minutes." },
              { icon: <FileText size={20} />, title: "No Sign Up", desc: "Start immediately. Zero registration, zero emails. Your privacy stays intact — we store nothing." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="feature-card">
                <div style={{ width: 44, height: 44, background: "#fff7ed", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c", marginBottom: 16 }}>
                  {icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#111827", marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ── Templates ── */}
        <section style={{ background: "#fafafa", padding: "72px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div className="section-tag">Templates</div>
                <h2 style={{ fontSize: "clamp(1.7rem, 2.5vw, 2.3rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>
                  Pick your style
                </h2>
              </div>
              <Link to="/templates" className="btn-secondary" style={{ padding: "9px 20px", fontSize: "0.85rem" }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 0 }}>
              {[
                { label: "Modern", accent: "#ea580c" },
                { label: "Minimal", accent: "#2563eb" },
                { label: "Executive", accent: "#7c3aed" },
              ].map(({ label, accent }) => (
                <div key={label} className="template-card">
                  <div style={{ aspectRatio: "8.5/11", padding: 24, display: "flex", flexDirection: "column", gap: 10, position: "relative", background: "white" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: accent, opacity: 0.85 }} />
                      <div>
                        <div style={{ height: 7, background: "#e5e7eb", borderRadius: 4, width: 80, marginBottom: 4 }} />
                        <div style={{ height: 5, background: "#f3f4f6", borderRadius: 3, width: 55 }} />
                      </div>
                    </div>
                    <div style={{ height: 2, background: accent, opacity: 0.35, borderRadius: 1 }} />
                    {[90, 75, 60, 82, 55].map((w, i) => <div key={i} style={{ height: 4, background: "#f3f4f6", borderRadius: 3, width: `${w}%` }} />)}
                    <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3, width: 60, marginTop: 4 }} />
                    {[80, 65].map((w, i) => <div key={i} style={{ height: 4, background: "#f3f4f6", borderRadius: 3, width: `${w}%` }} />)}
                    <div style={{ position: "absolute", top: 12, right: 12 }}>
                      <span className="ats-pill">ATS ✓</span>
                    </div>
                  </div>
                  <div style={{ padding: "12px 18px", borderTop: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between", background: "white" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#111827" }}>{label}</span>
                    <Link to="/templates" style={{ color: accent, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
                      Use this <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SkillDzire Brand Strip ── */}
        <section style={{ borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6", background: "white", padding: "36px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#d1d5db" }}>Powered by</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={logo} alt="SkillDzire" style={{ height: 38, width: "auto", objectFit: "contain" }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "#111827" }}>SkillDzire</div>
                <div style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 500 }}>Industry-ready career platform</div>
              </div>
            </div>
            <div style={{ width: 1, height: 36, background: "#f3f4f6" }} />
            <p style={{ color: "#9ca3af", fontSize: "0.85rem", maxWidth: 340, lineHeight: 1.55 }}>
              Helping students build industry-ready careers through modern learning and professional development.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{
            background: "linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)",
            border: "1.5px solid #fed7aa",
            borderRadius: 20,
            padding: "56px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, background: "rgba(234,88,12,0.06)", borderRadius: "50%", filter: "blur(30px)", pointerEvents: "none" }} />
            <div className="section-tag" style={{ marginBottom: 14 }}>Get started free</div>
            <h2 style={{ fontSize: "clamp(1.7rem, 2.5vw, 2.3rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em", marginBottom: 12 }}>
              Your next job starts with<br />a great resume
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1rem", marginBottom: 32 }}>
              No sign up. No credit card. Just a professional resume in minutes.
            </p>
            <Link to="/templates" className="btn-primary" style={{ fontSize: "1rem", padding: "14px 36px" }}>
              Build My Resume — It's Free <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ background: "#111827", padding: "52px 24px 28px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 44 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)" }} />
                  <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "white" }}>Resume Builder</span>
                </div>
                <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: 1.65, maxWidth: 230 }}>
                  Build professional, ATS-friendly resumes in minutes. Free, fast, no sign up required.
                </p>
              </div>
              {[
                { heading: "Product", links: [{ label: "Templates", href: "/templates" }, { label: "Features", href: "#features" }] },
                { heading: "Company", links: [{ label: "About", href: "#about" }, { label: "Contact", href: "#contact" }] },
                { heading: "Legal", links: [{ label: "Terms", href: "#terms" }, { label: "Privacy", href: "#privacy" }] },
              ].map(({ heading, links }) => (
                <div key={heading}>
                  <h4 style={{ color: "white", fontWeight: 700, fontSize: "0.875rem", marginBottom: 16 }}>{heading}</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        {href.startsWith("/") ? (
                          <Link to={href} style={{ color: "#6b7280", fontSize: "0.85rem", textDecoration: "none" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#f97316")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}>{label}</Link>
                        ) : (
                          <a href={href} style={{ color: "#6b7280", fontSize: "0.85rem", textDecoration: "none" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#f97316")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}>{label}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 24 }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <p style={{ color: "#4b5563", fontSize: "0.8rem" }}>© 2026 AI Resume Builder · A SkillDzire Product. All rights reserved.</p>
              <span className="ats-pill">ATS Optimized</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="feature-card">
      <div style={{ width: 44, height: 44, background: "#fff7ed", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c", marginBottom: 16 }}>
        {icon}
      </div>
      <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#111827", marginBottom: 8 }}>{title}</h3>
      <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.65 }}>{description}</p>
    </div>
  );
}
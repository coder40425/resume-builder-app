import { Link } from "react-router";
import { FileText, Download, Eye, Zap, Shield, Layout, ArrowRight, CheckCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../data/logo-skilldzire.png";

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <img src={logo} alt="SkillDzire" className="h-8 sm:h-10 w-auto object-contain" />
              <div className="hidden sm:block" style={{ width: 1, height: 20, background: "#e5e7eb", margin: "0 4px" }} />
              <span className="hidden sm:inline" style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827" }}>Resume Builder</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-link">Features</a>
              <Link to="/templates" className="nav-link">Templates</Link>
              <a href="#about" className="nav-link">About</a>
            </div>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link to="/templates" className="btn-primary hidden sm:inline-flex" style={{ padding: "9px 20px", fontSize: "0.85rem" }}>
                <span className="hidden sm:inline">Build Resume</span>
                <span className="sm:hidden">Start</span>
                <ArrowRight size={14} />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-4 space-y-3">
                <a href="#features" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <Link to="/templates" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
                <a href="#about" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>About</a>
                <Link to="/templates" className="btn-primary sm:hidden w-full justify-center" onClick={() => setMobileMenuOpen(false)}>
                  Build Resume <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* ── Hero ── */}
        <section style={{ maxWidth: 1200, margin: "0 auto" }} className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <div className="badge-pill fade-1 inline-flex items-center gap-2 mb-4 sm:mb-5">
                <Zap size={11} /> Free · ATS-Optimized · No Sign Up
              </div>
              <h1 className="fade-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-5" style={{ color: "#111827", letterSpacing: "-0.03em" }}>
                Build Resumes That<br />
                <span style={{ color: "#ea580c" }}>Actually Get You Hired</span>
              </h1>
              <p className="fade-3 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-xl" style={{ color: "#6b7280" }}>
                Create modern, ATS-friendly resumes with live preview and instant PDF export. Professional templates, zero hassle.
              </p>
              <div className="fade-4 flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link to="/templates" className="btn-primary text-center justify-center">
                  Build My Resume <ArrowRight size={15} />
                </Link>
                <Link to="/templates" className="btn-secondary text-center justify-center">
                  Explore Templates
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                {["No account needed", "PDF in 1 click", "100% free"].map(t => (
                  <div key={t} className="flex items-center gap-1.5 text-xs sm:text-sm" style={{ color: "#9ca3af" }}>
                    <CheckCircle size={13} color="#22c55e" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="float relative hidden lg:block">
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
        <section style={{ maxWidth: 1200, margin: "0 auto" }} className="px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { value: "6+", label: "Resume Templates" },
              { value: "1-Click", label: "PDF Export" },
              { value: "100%", label: "ATS Compatible" },
            ].map(({ value, label }) => (
              <div key={label} className="stat-card">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2" style={{ color: "#ea580c", letterSpacing: "-0.02em" }}>{value}</div>
                <div className="text-xs sm:text-sm md:text-base font-medium" style={{ color: "#6b7280" }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ── Features ── */}
        <section id="features" style={{ maxWidth: 1200, margin: "0 auto" }} className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="mb-10 sm:mb-14 text-center sm:text-left">
            <div className="section-tag">Why us</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ color: "#111827", letterSpacing: "-0.025em" }}>
              Everything you need,<br className="hidden sm:inline" /> nothing you don't
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto sm:mx-0" style={{ color: "#6b7280" }}>
              A focused set of tools built to help you land interviews faster.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
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
        <section style={{ background: "#fafafa" }} className="py-12 sm:py-16 md:py-20">
          <div style={{ maxWidth: 1200, margin: "0 auto" }} className="px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <div className="section-tag">Templates</div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: "#111827", letterSpacing: "-0.025em" }}>
                  Pick your style
                </h2>
              </div>
              <Link to="/templates" className="btn-secondary" style={{ padding: "9px 20px", fontSize: "0.85rem" }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
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
        <section style={{ borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6", background: "white" }} className="py-8 sm:py-10 md:py-12">
          <div style={{ maxWidth: 1200, margin: "0 auto" }} className="px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-center sm:text-left">
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#d1d5db" }}>Powered by</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={logo} alt="SkillDzire" className="h-8 sm:h-10 w-auto object-contain" />
              <div>
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "#111827" }}>SkillDzire</div>
                <div style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 500 }}>Industry-ready career platform</div>
              </div>
            </div>
            <div className="hidden lg:block" style={{ width: 1, height: 36, background: "#f3f4f6" }} />
            <p style={{ color: "#9ca3af", fontSize: "0.85rem", lineHeight: 1.55 }} className="max-w-xs lg:max-w-sm">
              Helping students build industry-ready careers through modern learning and professional development.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ maxWidth: 1200, margin: "0 auto" }} className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div style={{
            background: "linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)",
            border: "1.5px solid #fed7aa",
            borderRadius: 20,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }} className="p-8 sm:p-12 md:p-16">
            <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, background: "rgba(234,88,12,0.06)", borderRadius: "50%", filter: "blur(30px)", pointerEvents: "none" }} />
            <div className="section-tag" style={{ marginBottom: 14 }}>Get started free</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ color: "#111827", letterSpacing: "-0.025em" }}>
              Your next job starts with<br className="hidden sm:inline" /> a great resume
            </h2>
            <p style={{ color: "#6b7280" }} className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
              No sign up. No credit card. Just a professional resume in minutes.
            </p>
            <Link to="/templates" className="btn-primary" style={{ fontSize: "1rem" }}>
              Build My Resume — It's Free <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ background: "#111827" }} className="py-10 sm:py-12 md:py-16">
          <div style={{ maxWidth: 1200, margin: "0 auto" }} className="px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 sm:mb-12">
              <div className="sm:col-span-2 lg:col-span-1">
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <p style={{ color: "#4b5563" }} className="text-xs sm:text-sm">© 2026 AI Resume Builder · A SkillDzire Product. All rights reserved.</p>
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

Design a modern, premium, recruiter-focused AI Resume Builder web application inspired by modern SaaS products like Resume.io, Novoresume, Canva, Linear, Notion, and Vercel Dashboard.

The product name can be:

* “Resume Builder”
  OR
* “AI Resume Builder by SkillDzire”

The UI should feel:

* Professional
* Clean
* Premium
* ATS-friendly
* Minimal
* Modern SaaS
* Productivity-focused
* Recruiter-oriented

Use subtle brand inspiration from SkillDzire:

* Orange/red accent colors
* White backgrounds
* Light gray surfaces
* Dark text
* Clean spacing
* Rounded corners
* Minimal shadows
* Professional typography

DO NOT make it look like:

* an educational portal
* a college website
* a cartoon UI
* a gaming dashboard
* a glassmorphism-heavy UI

The website should look like a premium resume/productivity platform.

==================================================
MAIN PRODUCT FLOW
=================

Landing Page
→ Choose Template
→ Resume Builder Editor
→ Live Preview
→ Download PDF

NO authentication.
NO dashboard.
NO backend UI.
NO user profiles.

Frontend-only resume builder experience.

==================================================
DESIGN STYLE
============

Theme:

* White + light gray base
* Orange/red SkillDzire-inspired accent
* Minimal black text
* Soft borders
* Modern typography
* Large clean sections
* Spacious layout
* Professional card system

Fonts:

* Inter
* Poppins
* Manrope

Visual Feel:

* Resume.io
* Linear
* Notion
* Canva
* Stripe Dashboard

==================================================
CREATE THESE COMPLETE SCREENS
=============================

---

1. LANDING PAGE

---

Create a modern hero section for an AI Resume Builder.

Hero Section:

* Large bold heading:
  “Build Professional ATS-Friendly Resumes”
* Subheading:
  “Create modern resumes with live preview and instant PDF download.”
* CTA buttons:
  “Build Resume”
  “Explore Templates”

Right side:

* Professional resume preview mockup
* Floating template cards
* Resume thumbnails

Navbar:

* Logo
* Templates
* Features
* About
* Build Resume button

Sections:

* Features grid
* ATS-friendly section
* Resume template showcase
* Live preview explanation
* Download PDF explanation
* SkillDzire inspired strip:
  “Inspired by industry-focused learning platforms like SkillDzire”

Footer:

* Minimal professional footer
* Social links
* Terms
* Contact

==================================================
2. TEMPLATE SELECTION PAGE
==========================

Professional template gallery page.

Heading:
“Choose Your Resume Template”

Show 6 professional template cards:

* Modern Professional
* ATS Classic
* Minimal Elegant
* Creative Clean
* Corporate
* Developer Resume

Each card should have:

* Resume thumbnail
* Template name
* “Use Template” button
* Hover effect
* ATS badge for ATS-friendly templates

Design:

* Premium SaaS gallery
* Responsive grid
* Clean cards
* Minimal shadows
* White background

==================================================
3. RESUME BUILDER PAGE (MOST IMPORTANT)
=======================================

This is the CORE PRODUCT SCREEN.

Desktop Layout:

---

## | LEFT SIDE FORM | RIGHT SIDE LIVE RESUME PREVIEW |

Modern split-screen editor.

==================================================
LEFT PANEL — RESUME FORM
========================

Sticky scrollable form area.

Sections:

* Personal Information
* Education
* Experience
* Projects
* Skills
* Certifications
* Achievements

Features:

* Add/remove entries dynamically
* Accordion sections
* Clean inputs
* Professional forms
* Section icons
* Sticky save/download buttons

UI Style:

* Notion + Canva editor feel
* Minimal modern forms
* Spacious layout
* Smooth section cards

==================================================
RIGHT PANEL — LIVE PREVIEW
==========================

A4-style resume preview.

IMPORTANT:
Use realistic A4 dimensions.

Preview Area:

* White resume paper
* Soft shadow
* Professional typography
* Real-time updates
* Template rendering

Top Controls:

* Change template dropdown
* Zoom controls
* Download PDF button

Preview should look:

* Recruiter-ready
* ATS-friendly
* Printable
* Premium

==================================================
4. RESUME TEMPLATE DESIGNS
==========================

Create 6 PROFESSIONAL templates.

---

## Template 1 — Modern Professional

* Sidebar layout
* Accent color highlights
* Modern typography

---

## Template 2 — ATS Classic

* Black/white clean layout
* Simple sections
* Recruiter optimized

---

## Template 3 — Minimal Elegant

* Spacious clean design
* Minimal separators
* Elegant typography

---

## Template 4 — Developer Resume

* Tech-focused
* Skill chips
* GitHub/project sections

---

## Template 5 — Corporate Resume

* Professional enterprise style
* Strong hierarchy

---

## Template 6 — Creative Clean

* Slightly modern creative feel
* Still ATS readable

==================================================
5. MOBILE RESPONSIVE DESIGN
===========================

Mobile Layout:

Top Tabs:

* Edit
* Preview

Preview becomes full-width on mobile.

Use:

* Bottom sticky actions
* Mobile-friendly form spacing
* Responsive cards
* Scrollable preview

==================================================
6. MICRO INTERACTIONS
=====================

Add subtle:

* Hover effects
* Smooth transitions
* Template hover animation
* Button interactions
* Active section highlights

Keep animations:

* minimal
* professional
* smooth

==================================================
7. COMPONENT SYSTEM
===================

Design reusable component system:

* Buttons
* Inputs
* Textareas
* Form sections
* Cards
* Resume sections
* Template cards
* Preview wrappers
* Tags/chips

==================================================
8. DESIGN SYSTEM
================

Colors:

* White
* Light gray
* Orange/red accent inspired by SkillDzire
* Minimal black text

Spacing:

* Spacious
* Clean margins
* SaaS-like structure

Border Radius:

* Medium rounded corners

Shadows:

* Very soft shadows only

==================================================
9. FRONTEND ARCHITECTURE REFERENCE
==================================

Design with scalable frontend architecture in mind.

Suggested structure:

src/
│
├── pages/
│   ├── Landing/
│   ├── Builder/
│   ├── Templates/
│
├── components/
│   ├── ui/
│   ├── forms/
│   ├── preview/
│   ├── layout/
│
├── templates/
│   ├── ModernProfessional/
│   ├── ATSClassic/
│   ├── MinimalElegant/
│   ├── DeveloperResume/
│   ├── CorporateResume/
│   ├── CreativeClean/
│
├── sections/
│   ├── PersonalInfo/
│   ├── Education/
│   ├── Experience/
│   ├── Projects/
│   ├── Skills/
│   ├── Certifications/
│   ├── Achievements/
│
├── store/
│   └── resumeStore.ts
│
├── types/
│
├── utils/
│
└── styles/

IMPORTANT:
Architecture must be modular so new templates can easily be:

* added
* removed
* scaled
* maintained

Templates should ONLY change presentation/layout.
Data structure should remain universal.

==================================================
10. FINAL VISUAL GOAL
=====================

The final product should feel like:

* a premium modern SaaS product
* an industry-level resume platform
* highly polished
* recruiter-focused
* clean and production-ready

NOT like:

* a student project
* an educational portal
* a random template marketplace

Focus heavily on:

* professionalism
* ATS readability
* modern UX
* productivity flow
* PDF-ready layouts

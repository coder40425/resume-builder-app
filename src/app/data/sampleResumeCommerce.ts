import { ResumeData } from "../types/resume";

export const sampleResumeCommerce: ResumeData = {
  personalInfo: {
    fullName: "Benjamin Garcia",
    email: "b.garcia@email.com",
    phone: "+1 (555) 987-6543",
    location: "New York City, NY",
    linkedin: "linkedin.com/in/benjamingarcia",
    website: "",
    github: "",
    summary: "Enthusiastic Finance & Economics undergraduate with strong analytical skills and passion for investment banking. Proficient in data analysis and financial modeling, with hands-on experience in equity research and valuation. Seeking opportunities to leverage analytical abilities and contribute to strategic financial decision-making."
  },
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Business, Finance and Economics",
      institution: "New York University, Stern School of Business",
      location: "New York, NY",
      startDate: "2024-09",
      endDate: "2028-05",
      gpa: "3.8/4.0",
      description: "Relevant Coursework: Corporate Finance, Financial Statement Analysis, Data Analytics for Business, Investment Strategies | Honors: NYU Stern Scholarship, 1st Place in Global Private Equity Case Competition | Dean's List (All Semesters)"
    }
  ],
  experience: [
    {
      id: "exp1",
      title: "Resident Assistant",
      company: "NYU Office of Residential Life",
      location: "New York, NY",
      startDate: "2025-08",
      endDate: "",
      current: true,
      description: [
        "Manage a residence hall floor of 40 undergraduate students, acting as primary point of contact for conflict resolution and emergency response",
        "Plan and execute a $1,000 annual budget for community-building events, accurately tracking all expenses and vendor receipts",
        "Balance a 20-hour work week alongside a full-time rigorous academic schedule, demonstrating strong time management"
      ]
    },
    {
      id: "exp2",
      title: "Business Intern",
      company: "TechFlow Solutions (Local Startup)",
      location: "New York, NY",
      startDate: "2025-06",
      endDate: "2025-08",
      current: false,
      description: [
        "Researched and compiled a database of 100+ potential B2B leads using Salesforce and Excel, increasing the sales team's outreach pipeline by 15%",
        "Assisted the CEO with monthly expense tracking and categorized financial data in Excel, ensuring accurate internal reporting",
        "Handled high-volume client inquiries via phone and email, maintaining professional communication with prospective clients"
      ]
    }
  ],
  projects: [
    {
      id: "proj1",
      name: "JPMorgan Chase & Co. – Investment Banking Virtual Experience",
      description: "Completed a simulated M&A transaction module, learning how to identify potential acquisition targets based on strategic fit and financial viability. Drafted a mock 10-slide management presentation outlining a target company's financial overview, historical performance, and industry positioning. Calculated weighted average cost of capital to be used in a basic discounted cash flow analysis.",
      technologies: ["Financial Modeling", "Excel", "M&A Analysis", "DCF Valuation"],
      link: ""
    },
    {
      id: "proj2",
      name: "Corporate Finance Coursework – Equity Valuation Project",
      description: "Led a 4-person team to value Starbucks Corporation (SBUX) using a 5-year Discounted Cash Flow (DCF) model and comparable company analysis. Analyzed the company's 10-K and 10-Q filings, projecting future revenue growth based on historical store expansion and macroeconomic trends. Presented investment recommendation with valuation-based rationale to a panel of professors and peers, receiving an A- grade.",
      technologies: ["DCF Modeling", "Financial Analysis", "Excel", "Presentation"],
      link: ""
    }
  ],
  skills: [
    {
      category: "Technical Skills",
      items: ["Microsoft Excel", "VLOOKUP", "Pivot Tables", "Financial Formulas", "PowerPoint", "Google Workspace"]
    },
    {
      category: "Financial Skills",
      items: ["Financial Modeling", "DCF Valuation", "M&A Analysis", "Equity Research", "Data Analysis"]
    },
    {
      category: "Languages",
      items: ["English (Native)", "Spanish (Conversational)"]
    }
  ],
  certifications: [],
  achievements: [
    {
      id: "ach1",
      title: "NYU Economics Society - General Member",
      description: "Attend weekly meetings to discuss current macroeconomic trends, Federal Reserve policies, and their impact on global equity markets. Participate in student-led workshops focused on intermediate Excel skills and financial statement analysis."
    }
  ]
};

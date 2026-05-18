import { ResumeData } from "../types/resume";

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: "Sarah Anderson",
    email: "sarah.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/sarahanderson",
    github: "github.com/sarahanderson",
    website: "sarahanderson.dev",
    summary: "Results-driven Software Engineer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud infrastructure. Proven track record of delivering high-impact projects and mentoring junior developers."
  },
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      startDate: "2015-09",
      endDate: "2019-06",
      gpa: "3.8/4.0",
      description: "Relevant Coursework: Data Structures, Algorithms, Web Development, Database Systems, Machine Learning"
    }
  ],
  experience: [
    {
      id: "exp1",
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "",
      current: true,
      description: [
        "Led development of microservices architecture serving 2M+ daily active users, improving system reliability by 40%",
        "Architected and implemented real-time data processing pipeline using React, Node.js, and AWS, reducing latency by 60%",
        "Mentored team of 5 junior engineers, conducting code reviews and establishing best practices",
        "Spearheaded migration from monolithic to microservices architecture, reducing deployment time by 75%"
      ]
    },
    {
      id: "exp2",
      title: "Software Engineer",
      company: "Digital Solutions Corp",
      location: "San Francisco, CA",
      startDate: "2019-07",
      endDate: "2022-02",
      current: false,
      description: [
        "Developed and maintained customer-facing web applications using React, TypeScript, and Node.js",
        "Implemented CI/CD pipelines using Jenkins and Docker, reducing deployment errors by 50%",
        "Collaborated with product and design teams to deliver features for 500K+ users",
        "Optimized database queries and API endpoints, improving response time by 35%"
      ]
    }
  ],
  projects: [
    {
      id: "proj1",
      name: "E-Commerce Platform",
      description: "Built a full-stack e-commerce platform with payment integration, inventory management, and real-time analytics dashboard. Achieved 99.9% uptime and processed $1M+ in transactions.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      link: "github.com/sarahanderson/ecommerce"
    },
    {
      id: "proj2",
      name: "Task Management App",
      description: "Developed a collaborative task management application with real-time updates, team collaboration features, and productivity analytics.",
      technologies: ["React", "Firebase", "Material-UI", "WebSocket"],
      link: "taskmaster.sarahanderson.dev"
    },
    {
      id: "proj3",
      name: "Open Source Contribution",
      description: "Active contributor to React ecosystem. Contributed features and bug fixes to popular libraries including React Router and Redux Toolkit.",
      technologies: ["React", "TypeScript", "Jest"],
      link: "github.com/sarahanderson"
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java", "SQL"]
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Redux"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Django", "PostgreSQL", "MongoDB"]
    },
    {
      category: "DevOps & Tools",
      items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Git", "Jenkins"]
    }
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-05",
      credentialId: "AWS-SA-2023-XYZ789"
    },
    {
      id: "cert2",
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "2022-08"
    }
  ],
  achievements: [
    {
      id: "ach1",
      title: "Best Innovation Award",
      description: "Recognized for developing an AI-powered recommendation system that increased user engagement by 45%"
    },
    {
      id: "ach2",
      title: "Hackathon Winner",
      description: "1st place at TechCon 2021 for building a real-time collaboration tool used by 10,000+ developers"
    }
  ]
};

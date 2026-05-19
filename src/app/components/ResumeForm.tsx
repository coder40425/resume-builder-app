import { useState } from "react";
import { User, GraduationCap, Briefcase, Code, Award, Trophy, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useResume } from "../store/resumeStore";

export function ResumeForm() {
  return (
    <div className="p-6 space-y-6">
      <PersonalInfoSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <AchievementsSection />
    </div>
  );
}

function Section({
  title,
  icon,
  children,
  defaultOpen = true
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="text-orange-600">{icon}</div>
          <h2 className="font-semibold text-gray-900">{title}</h2>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>
      {isOpen && <div className="p-4 border-t border-gray-200 space-y-4">{children}</div>}
    </div>
  );
}

function PersonalInfoSection() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  return (
    <Section title="Personal Information" icon={<User className="w-5 h-5" />}>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          value={personalInfo.fullName}
          onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          required
        />
        <Input
          label="Phone"
          value={personalInfo.phone}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          required
        />
        <Input
          label="Location"
          value={personalInfo.location}
          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          required
        />
        <Input
          label="LinkedIn"
          value={personalInfo.linkedin || ""}
          onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
        />
        <Input
          label="GitHub"
          value={personalInfo.github || ""}
          onChange={(e) => updatePersonalInfo({ github: e.target.value })}
        />
        <Input
          label="Website"
          value={personalInfo.website || ""}
          onChange={(e) => updatePersonalInfo({ website: e.target.value })}
          className="md:col-span-2"
        />
      </div>
      <Textarea
        label="Professional Summary"
        value={personalInfo.summary}
        onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
        rows={4}
      />
    </Section>
  );
}

function EducationSection() {
  const { resumeData, updateEducation, addEducation, removeEducation } = useResume();

  return (
    <Section title="Education" icon={<GraduationCap className="w-5 h-5" />}>
      {resumeData.education.map((edu, index) => (
        <div key={edu.id} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
          {resumeData.education.length > 1 && (
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-2 right-2 p-1 hover:bg-red-50 text-red-600 rounded transition-colors"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <Input
            label="Degree"
            value={edu.degree}
            onChange={(e) => updateEducation(index, { degree: e.target.value })}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Institution"
              value={edu.institution}
              onChange={(e) => updateEducation(index, { institution: e.target.value })}
            />
            <Input
              label="Location"
              value={edu.location}
              onChange={(e) => updateEducation(index, { location: e.target.value })}
            />
            <Input
              label="Start Date"
              type="month"
              value={edu.startDate}
              onChange={(e) => updateEducation(index, { startDate: e.target.value })}
            />
            <Input
              label="End Date"
              type="month"
              value={edu.endDate}
              onChange={(e) => updateEducation(index, { endDate: e.target.value })}
            />
            <Input
              label="GPA (Optional)"
              value={edu.gpa || ""}
              onChange={(e) => updateEducation(index, { gpa: e.target.value })}
            />
          </div>
          <Textarea
            label="Description (Optional)"
            value={edu.description || ""}
            onChange={(e) => updateEducation(index, { description: e.target.value })}
            rows={2}
          />
        </div>
      ))}
      <button
        onClick={addEducation}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </Section>
  );
}

function ExperienceSection() {
  const { resumeData, updateExperience, addExperience, removeExperience } = useResume();

  return (
    <Section title="Work Experience" icon={<Briefcase className="w-5 h-5" />}>
      {resumeData.experience.map((exp, index) => (
        <div key={exp.id} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
          <button
            onClick={() => removeExperience(index)}
            className="absolute top-2 right-2 p-1 hover:bg-red-50 text-red-600 rounded transition-colors"
            title="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Job Title"
              value={exp.title}
              onChange={(e) => updateExperience(index, { title: e.target.value })}
            />
            <Input
              label="Company"
              value={exp.company}
              onChange={(e) => updateExperience(index, { company: e.target.value })}
            />
            <Input
              label="Location"
              value={exp.location}
              onChange={(e) => updateExperience(index, { location: e.target.value })}
            />
            <div className="flex items-end gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(index, { current: e.target.checked, endDate: "" })}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                Current Position
              </label>
            </div>
            <Input
              label="Start Date"
              type="month"
              value={exp.startDate}
              onChange={(e) => updateExperience(index, { startDate: e.target.value })}
            />
            {!exp.current && (
              <Input
                label="End Date"
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(index, { endDate: e.target.value })}
              />
            )}
          </div>
          <Textarea
            label="Responsibilities & Achievements (one per line)"
            value={exp.description.join("\n")}
            onChange={(e) =>
              updateExperience(index, { description: e.target.value.split("\n").filter((d) => d.trim()) })
            }
            rows={5}
            placeholder="• Led development of..."
          />
        </div>
      ))}
      <button
        onClick={addExperience}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </button>
    </Section>
  );
}

function ProjectsSection() {
  const { resumeData, updateProject, addProject, removeProject } = useResume();

  return (
    <Section title="Projects" icon={<Code className="w-5 h-5" />} defaultOpen={false}>
      {resumeData.projects.map((proj, index) => (
        <div key={proj.id} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
          <button
            onClick={() => removeProject(index)}
            className="absolute top-2 right-2 p-1 hover:bg-red-50 text-red-600 rounded transition-colors"
            title="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <Input
            label="Project Name"
            value={proj.name}
            onChange={(e) => updateProject(index, { name: e.target.value })}
          />
          <Textarea
            label="Description"
            value={proj.description}
            onChange={(e) => updateProject(index, { description: e.target.value })}
            rows={3}
          />
          <Input
            label="Technologies (comma-separated)"
            value={proj.technologies.join(", ")}
            onChange={(e) =>
              updateProject(index, {
                technologies: e.target.value.split(",").map((t) => t.trim()).filter((t) => t)
              })
            }
            placeholder="React, Node.js, PostgreSQL"
          />
          <Input
            label="Link (Optional)"
            value={proj.link || ""}
            onChange={(e) => updateProject(index, { link: e.target.value })}
          />
        </div>
      ))}
      <button
        onClick={addProject}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </Section>
  );
}

function SkillsSection() {
  const { resumeData, updateSkill, addSkill, removeSkill } = useResume();

  return (
    <Section title="Skills" icon={<Award className="w-5 h-5" />} defaultOpen={false}>
      {resumeData.skills.map((skill, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
          {resumeData.skills.length > 1 && (
            <button
              onClick={() => removeSkill(index)}
              className="absolute top-2 right-2 p-1 hover:bg-red-50 text-red-600 rounded transition-colors"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <Input
            label="Category"
            value={skill.category}
            onChange={(e) => updateSkill(index, { category: e.target.value })}
            placeholder="e.g., Programming Languages"
          />
          <Input
            label="Skills (comma-separated)"
            value={skill.items.join(", ")}
            onChange={(e) =>
              updateSkill(index, {
                items: e.target.value.split(",").map((s) => s.trim()).filter((s) => s)
              })
            }
            placeholder="JavaScript, Python, Java"
          />
        </div>
      ))}
      <button
        onClick={addSkill}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600"
      >
        <Plus className="w-4 h-4" />
        Add Skill Category
      </button>
    </Section>
  );
}

function CertificationsSection() {
  const { resumeData, updateCertification, addCertification, removeCertification } = useResume();

  return (
    <Section title="Certifications" icon={<Award className="w-5 h-5" />} defaultOpen={false}>
      {resumeData.certifications.map((cert, index) => (
        <div key={cert.id} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
          <button
            onClick={() => removeCertification(index)}
            className="absolute top-2 right-2 p-1 hover:bg-red-50 text-red-600 rounded transition-colors"
            title="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Certification Name"
              value={cert.name}
              onChange={(e) => updateCertification(index, { name: e.target.value })}
            />
            <Input
              label="Issuer"
              value={cert.issuer}
              onChange={(e) => updateCertification(index, { issuer: e.target.value })}
            />
            <Input
              label="Date"
              type="month"
              value={cert.date}
              onChange={(e) => updateCertification(index, { date: e.target.value })}
            />
            <Input
              label="Credential ID (Optional)"
              value={cert.credentialId || ""}
              onChange={(e) => updateCertification(index, { credentialId: e.target.value })}
            />
          </div>
        </div>
      ))}
      <button
        onClick={addCertification}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600"
      >
        <Plus className="w-4 h-4" />
        Add Certification
      </button>
    </Section>
  );
}

function AchievementsSection() {
  const { resumeData, updateAchievement, addAchievement, removeAchievement } = useResume();

  return (
    <Section title="Achievements" icon={<Trophy className="w-5 h-5" />} defaultOpen={false}>
      {resumeData.achievements.map((ach, index) => (
        <div key={ach.id} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
          <button
            onClick={() => removeAchievement(index)}
            className="absolute top-2 right-2 p-1 hover:bg-red-50 text-red-600 rounded transition-colors"
            title="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <Input
            label="Title"
            value={ach.title}
            onChange={(e) => updateAchievement(index, { title: e.target.value })}
          />
          <Textarea
            label="Description"
            value={ach.description}
            onChange={(e) => updateAchievement(index, { description: e.target.value })}
            rows={2}
          />
        </div>
      ))}
      <button
        onClick={addAchievement}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600"
      >
        <Plus className="w-4 h-4" />
        Add Achievement
      </button>
    </Section>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  className = ""
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 3,
  placeholder = ""
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
      />
    </div>
  );
}

import { useResume } from "../store/resumeStore";

export function BusinessAnalystTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = resumeData;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "-01");
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="p-10 h-full bg-white text-sm">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">{personalInfo.fullName}</h1>
        <div className="text-gray-600 text-sm mb-2">
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="text-gray-600 text-sm">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.linkedin && personalInfo.website && <span> | </span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Core Competencies */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-gray-900 font-semibold mt-0.5">•</span>
                <div>
                  <span className="font-semibold text-gray-900">{skill.category}:</span>
                  <span className="text-gray-700 ml-1">{skill.items.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-base">{edu.degree}</h3>
                    <div className="text-gray-700">{edu.institution}, {edu.location}</div>
                    {edu.gpa && <div className="text-gray-700">GPA: {edu.gpa}</div>}
                  </div>
                  <div className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.description && (
                  <div className="mt-2 text-gray-700">
                    <div className="font-semibold mb-1">Relevant Highlights:</div>
                    <div>{edu.description}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Relevant Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Relevant Projects & Coursework
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  {project.link && <span className="text-xs text-gray-600">{project.link}</span>}
                </div>
                <div className="text-xs text-gray-600 mb-1 italic">
                  Key Skills: {project.technologies.join(" | ")}
                </div>
                <ul className="list-none space-y-1 text-gray-700">
                  {project.description.split(". ").filter(s => s.trim()).map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold mt-0.5">→</span>
                      <span>{desc}{desc.endsWith(".") ? "" : "."}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                    <div className="text-gray-700">{exp.company} | {exp.location}</div>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <ul className="mt-2 space-y-1 text-gray-700">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold mt-0.5">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leadership & Activities */}
      {achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Leadership & Activities
          </h2>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div key={achievement.id}>
                <div className="flex items-start gap-2">
                  <span className="text-gray-900 font-bold mt-0.5">•</span>
                  <div>
                    <span className="font-bold text-gray-900">{achievement.title}:</span>
                    <span className="text-gray-700 ml-1">{achievement.description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide pb-1 border-b-2 border-gray-300">
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-start gap-2 text-gray-700">
                <span className="text-gray-900 font-bold mt-0.5">•</span>
                <div>
                  <span className="font-bold">{cert.name}</span> - {cert.issuer} ({formatDate(cert.date)})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

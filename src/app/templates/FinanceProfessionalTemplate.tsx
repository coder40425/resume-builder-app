import { useResume } from "../store/resumeStore";

export function FinanceProfessionalTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = resumeData;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "-01");
    return date.toLocaleDateString("en-US", { month: "2-digit", year: "numeric" });
  };

  return (
    <div className="p-12 h-full bg-white text-sm">
      {/* Header - Centered */}
      <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-wide">{personalInfo.fullName}</h1>
        <div className="text-gray-700 text-xs flex flex-wrap justify-center gap-2 mb-2">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="text-gray-700 text-xs flex flex-wrap justify-center gap-2">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.linkedin && personalInfo.website && <span>•</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Objective Statement */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-center text-base font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Objective Statement
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-center text-base font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Skills
          </h2>
          <div className="space-y-1">
            {skills.map((skill, idx) => (
              <div key={idx} className="text-gray-700">
                <span className="font-semibold">{skill.category}:</span> {skill.items.join(" • ")}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-center text-base font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                    <div className="text-gray-700 italic">{edu.degree}</div>
                  </div>
                  <div className="text-gray-600 text-xs whitespace-nowrap ml-4">
                    {edu.location}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="text-gray-700">
                    Expected Graduation: {formatDate(edu.endDate)}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </div>
                </div>
                {edu.description && (
                  <div className="text-gray-700 mt-1">
                    <span className="font-semibold">• </span>
                    {edu.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Academic Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-center text-base font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Academic Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                    {project.link ? "Remote" : ""}
                  </span>
                </div>
                <div className="text-gray-700 mb-1 italic text-xs">
                  {project.technologies.join(" • ")}
                </div>
                <ul className="list-disc list-outside ml-5 space-y-1 text-gray-700">
                  {project.description.split(". ").filter(s => s.trim()).map((desc, idx) => (
                    <li key={idx}>{desc}{desc.endsWith(".") ? "" : "."}</li>
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
          <h2 className="text-center text-base font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.company}</h3>
                    <div className="text-gray-700 italic">{exp.title}</div>
                  </div>
                  <div className="text-gray-600 text-xs whitespace-nowrap ml-4">
                    {exp.location}
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-1">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
                <ul className="list-disc list-outside ml-5 space-y-1 text-gray-700">
                  {exp.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leadership & Extracurricular */}
      {achievements.length > 0 && (
        <div>
          <h2 className="text-center text-base font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">
            Leadership & Extracurricular Experience
          </h2>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div key={achievement.id}>
                <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                <p className="text-gray-700">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer - Powered by */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-12 text-xs text-gray-400">
        <span>enhancv.com</span>
        <div className="flex items-center gap-1">
          <span>Powered by</span>
          <span className="font-semibold">Enhancv</span>
        </div>
      </div>
    </div>
  );
}

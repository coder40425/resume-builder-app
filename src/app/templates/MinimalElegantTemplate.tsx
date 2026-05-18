import { useResume } from "../store/resumeStore";

export function MinimalElegantTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = resumeData;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "-01");
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="p-16 h-full bg-white text-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-wide">{personalInfo.fullName}</h1>
        <div className="text-gray-600 flex flex-wrap justify-center gap-4 text-xs mb-4">
          <span>{personalInfo.email}</span>
          <span className="text-gray-400">|</span>
          <span>{personalInfo.phone}</span>
          <span className="text-gray-400">|</span>
          <span>{personalInfo.location}</span>
        </div>
        {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
          <div className="text-gray-600 flex flex-wrap justify-center gap-4 text-xs">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mb-8">
        <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">{personalInfo.summary}</p>
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 text-center tracking-widest uppercase">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-200 pl-6">
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">{exp.title}</h3>
                    <div className="text-gray-600 italic">{exp.company} • {exp.location}</div>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <ul className="space-y-1 text-gray-700">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 text-center tracking-widest uppercase">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <div className="text-gray-600">{edu.institution}, {edu.location}</div>
                <div className="text-sm text-gray-500">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </div>
                {edu.description && <div className="text-gray-700 mt-1">{edu.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 text-center tracking-widest uppercase">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, idx) => (
              <div key={idx} className="text-center">
                <div className="font-semibold text-gray-900 mb-1">{skill.category}</div>
                <div className="text-gray-600 text-xs">{skill.items.join(" • ")}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 text-center tracking-widest uppercase">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-gray-700 mb-1">{project.description}</p>
                <div className="text-sm text-gray-600">{project.technologies.join(" • ")}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 text-center tracking-widest uppercase">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-center">
                <span className="font-semibold text-gray-900">{cert.name}</span>
                <span className="text-gray-600"> - {cert.issuer}, {formatDate(cert.date)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div>
          <h2 className="text-lg font-light text-gray-900 mb-4 text-center tracking-widest uppercase">
            Achievements
          </h2>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-center">
                <div className="font-semibold text-gray-900">{achievement.title}</div>
                <div className="text-gray-700">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

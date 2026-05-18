import { useResume } from "../store/resumeStore";

export function ATSClassicTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = resumeData;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "-01");
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="p-12 h-full bg-white text-sm">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <div className="text-gray-700 flex flex-wrap justify-center gap-3 text-xs">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
          {personalInfo.github && (
            <>
              <span>•</span>
              <span>{personalInfo.github}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-gray-700 mb-1 italic">{exp.company}, {exp.location}</div>
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

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="text-gray-700">{edu.institution}, {edu.location}</div>
                {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
                {edu.description && <div className="text-gray-700">{edu.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">
            Skills
          </h2>
          <div className="space-y-1">
            {skills.map((skill, idx) => (
              <div key={idx} className="text-gray-700">
                <span className="font-semibold">{skill.category}:</span> {skill.items.join(", ")}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-gray-700">{project.description}</p>
                <div className="text-gray-600">
                  <span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-gray-700">
                <span className="font-bold">{cert.name}</span> - {cert.issuer} ({formatDate(cert.date)})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-400 pb-1">
            Achievements
          </h2>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-gray-700">
                <span className="font-bold">{achievement.title}:</span> {achievement.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

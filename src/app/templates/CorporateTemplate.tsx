import { useResume } from "../store/resumeStore";

export function CorporateTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = resumeData;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "-01");
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="h-full bg-white text-sm">
      {/* Header */}
      <div className="bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-gray-300">
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
        </div>
      </div>

      <div className="p-10">
        {/* Professional Summary */}
        <div className="mb-6">
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-base font-bold text-gray-900 mb-2 uppercase">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        </div>

        {/* Core Competencies */}
        {skills.length > 0 && (
          <div className="mb-6">
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-base font-bold text-gray-900 mb-3 uppercase">Core Competencies</h2>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-gray-900 mb-1">{skill.category}</h3>
                    <div className="text-gray-700 text-xs">{skill.items.join(" • ")}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900 mb-3 uppercase pb-2 border-b-2 border-gray-900">
              Professional Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{exp.title}</h3>
                      <div className="text-gray-700 font-semibold">{exp.company}</div>
                      <div className="text-gray-600 text-xs">{exp.location}</div>
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded text-xs text-gray-700 font-semibold whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
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

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900 mb-3 uppercase pb-2 border-b-2 border-gray-900">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <div className="text-gray-700">{edu.institution}, {edu.location}</div>
                      {edu.gpa && <div className="text-gray-600 text-xs">GPA: {edu.gpa}</div>}
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900 mb-3 uppercase pb-2 border-b-2 border-gray-900">
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-700 mb-1">{project.description}</p>
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3 uppercase pb-2 border-b-2 border-gray-900">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-bold text-gray-900 text-xs">{cert.name}</div>
                    <div className="text-gray-600 text-xs">{cert.issuer} • {formatDate(cert.date)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3 uppercase pb-2 border-b-2 border-gray-900">
                Achievements
              </h2>
              <div className="space-y-2">
                {achievements.map((achievement) => (
                  <div key={achievement.id}>
                    <div className="font-bold text-gray-900 text-xs">{achievement.title}</div>
                    <div className="text-gray-700 text-xs">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

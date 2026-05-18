import { useResume } from "../store/resumeStore";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

export function DeveloperResumeTemplate() {
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
      <div className="border-b-4 border-blue-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            {personalInfo.email}
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            {personalInfo.phone}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {personalInfo.location}
          </div>
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-3 h-3" />
              {personalInfo.github}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {personalInfo.website}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          <div>
            <h2 className="text-base font-bold text-blue-600 mb-2 uppercase tracking-wide">About</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-blue-600 mb-3 uppercase tracking-wide">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.title}</h3>
                        <div className="text-gray-600">{exp.company} • {exp.location}</div>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
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

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-blue-600 mb-3 uppercase tracking-wide">Projects</h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-gray-700 mb-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && <div className="text-xs text-blue-600">{project.link}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-blue-600 mb-3 uppercase tracking-wide">Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                        <div className="text-gray-600">{edu.institution}, {edu.location}</div>
                        {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-blue-600 mb-3 uppercase tracking-wide">Skills</h2>
              <div className="space-y-3">
                {skills.map((skill, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-gray-900 text-xs mb-1">{skill.category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-blue-600 mb-3 uppercase tracking-wide">Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-bold text-gray-900 text-xs">{cert.name}</h3>
                    <div className="text-gray-600 text-xs">{cert.issuer}</div>
                    <div className="text-gray-500 text-xs">{formatDate(cert.date)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-blue-600 mb-3 uppercase tracking-wide">Achievements</h2>
              <div className="space-y-2">
                {achievements.map((achievement) => (
                  <div key={achievement.id}>
                    <h3 className="font-bold text-gray-900 text-xs">{achievement.title}</h3>
                    <p className="text-gray-700 text-xs">{achievement.description}</p>
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

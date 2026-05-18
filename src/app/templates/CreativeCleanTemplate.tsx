import { useResume } from "../store/resumeStore";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

export function CreativeCleanTemplate() {
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
      <div className="flex items-start gap-6 border-b-2 border-orange-400 pb-6 mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {personalInfo.fullName.split(" ").map(n => n[0]).join("")}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-orange-600" />
              {personalInfo.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-orange-600" />
              {personalInfo.phone}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-orange-600" />
              {personalInfo.location}
            </div>
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-orange-600" />
                {personalInfo.linkedin}
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="w-3 h-3 text-orange-600" />
                {personalInfo.github}
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-orange-600" />
                {personalInfo.website}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-orange-600 mb-2 uppercase tracking-wide flex items-center gap-2">
          <div className="w-1 h-4 bg-orange-600"></div>
          About Me
        </h2>
        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-orange-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-4 bg-orange-600"></div>
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-orange-200 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.title}</h3>
                        <div className="text-gray-700">{exp.company} • {exp.location}</div>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <ul className="space-y-1 text-gray-700">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-orange-500 flex-shrink-0">▸</span>
                          <span>{desc}</span>
                        </li>
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
              <h2 className="text-base font-bold text-orange-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-4 bg-orange-600"></div>
                Projects
              </h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="bg-orange-50 p-3 rounded-lg">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-gray-700 mb-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-white text-orange-700 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && <div className="text-xs text-orange-600 mt-1">{project.link}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-orange-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-4 bg-orange-600"></div>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                        <div className="text-gray-700">{edu.institution}, {edu.location}</div>
                        {edu.gpa && <div className="text-gray-600 text-xs">GPA: {edu.gpa}</div>}
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

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-orange-600 mb-3 uppercase tracking-wide">Skills</h2>
              <div className="space-y-3">
                {skills.map((skill, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-gray-900 text-xs mb-1">{skill.category}</h3>
                    <div className="space-y-0.5">
                      {skill.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-1 text-xs text-gray-700">
                          <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                          {item}
                        </div>
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
              <h2 className="text-base font-bold text-orange-600 mb-3 uppercase tracking-wide">Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border-l-2 border-orange-300 pl-2">
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
              <h2 className="text-base font-bold text-orange-600 mb-3 uppercase tracking-wide">Achievements</h2>
              <div className="space-y-2">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-gradient-to-r from-orange-50 to-transparent p-2 rounded">
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

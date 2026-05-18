import { useResume } from "../store/resumeStore";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

export function ModernProfessionalTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills, certifications, achievements } = resumeData;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "-01");
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="flex h-full text-sm">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-6 flex flex-col">
        <div className="mb-6">
          <div className="w-24 h-24 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
            {personalInfo.fullName.split(" ").map(n => n[0]).join("")}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-300">Contact</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <Mail className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span className="break-all">{personalInfo.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{personalInfo.location}</span>
            </div>
            {personalInfo.linkedin && (
              <div className="flex items-start gap-2">
                <Linkedin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-start gap-2">
                <Github className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personalInfo.github}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-start gap-2">
                <Globe className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-300">Skills</h3>
            <div className="space-y-3">
              {skills.map((skill, idx) => (
                <div key={idx} className="text-xs">
                  <div className="font-semibold mb-1">{skill.category}</div>
                  <div className="text-slate-300">{skill.items.join(", ")}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-300">Certifications</h3>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <div className="font-semibold">{cert.name}</div>
                  <div className="text-slate-300">{cert.issuer}</div>
                  <div className="text-slate-400">{formatDate(cert.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-orange-600 pb-1">
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.title}</h3>
                      <div className="text-gray-700">{exp.company} • {exp.location}</div>
                    </div>
                    <div className="text-sm text-gray-600 whitespace-nowrap ml-4">
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
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-orange-600 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <div className="text-gray-700">{edu.institution} • {edu.location}</div>
                      {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
                      {edu.description && <div className="text-gray-700 mt-1">{edu.description}</div>}
                    </div>
                    <div className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-orange-600 pb-1">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-700 mb-1">{project.description}</p>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}
                  </div>
                  {project.link && (
                    <div className="text-sm text-orange-600">{project.link}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-orange-600 pb-1">
              Achievements
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
      </div>
    </div>
  );
}

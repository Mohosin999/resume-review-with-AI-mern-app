/* ===================================
Resume Certifications Component
=================================== */
import { ExternalLink } from "lucide-react";
import { Certification } from "../../types";

interface ResumeCertificationsProps {
  certifications: Certification[];
  forPdf?: boolean;
}

export default function ResumeCertifications({ certifications, forPdf }: ResumeCertificationsProps) {
  const textColor = forPdf ? "text-gray-500" : "text-gray-500 dark:text-gray-400";
  const titleColor = forPdf ? "text-black" : "text-gray-900 dark:text-white";
  const linkColor = forPdf ? "text-blue-600" : "text-blue-600 dark:text-blue-400";

  return (
    <div className="mb-4">
      <h2 className={`text-sm font-bold ${titleColor} uppercase tracking-wide border-b ${forPdf ? "border-gray-300" : "border-gray-300 dark:border-gray-600"} pb-1 mb-2`}>
        CERTIFICATIONS
      </h2>
      <div className="space-y-1">
        {certifications.map((cert, index) => (
          <div key={index} className={`${forPdf ? "text-gray-700" : "text-gray-700 dark:text-gray-300"} text-xs`}>
            {cert.link ? (
              <a href={cert.link.startsWith("http") ? cert.link : `https://${cert.link}`} target="_blank" rel="noopener noreferrer" className={`${linkColor} hover:underline flex items-center gap-1 inline-flex`}>
                {cert.title} <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span>{cert.title}</span>
            )}
            {cert.date && <span className={textColor}> ({cert.date})</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================================
Resume Personal Info Component
=================================== */
import { MapPin, Phone, Mail, Link as LinkIcon } from "lucide-react";
import { ResumeContent } from "../../types";

interface ResumePersonalInfoProps {
  content: ResumeContent;
  forPdf?: boolean;
}

export default function ResumePersonalInfo({ content, forPdf = false }: ResumePersonalInfoProps) {
  const textColor = forPdf ? "text-gray-700" : "text-gray-700 dark:text-gray-300";
  const borderColor = forPdf ? "border-gray-300" : "border-gray-300 dark:border-gray-600";

  return (
    <div className={`border-b ${borderColor} pb-3 mb-4`}>
      <h1 className={`text-2xl font-bold ${forPdf ? "text-black" : "text-gray-900 dark:text-white"} uppercase tracking-wide`}>
        {content.personalInfo.fullName || "MOHOSIN HASAN AKASH"}
      </h1>
      {content.personalInfo.jobTitle && (
        <p className={`text-sm ${forPdf ? "text-gray-700" : textColor} font-medium mt-1`}>
          {content.personalInfo.jobTitle}
        </p>
      )}
      <div className={`mt-2 text-xs ${forPdf ? "text-gray-600" : "text-gray-600 dark:text-gray-400"} flex flex-wrap gap-x-4 gap-y-1`}>
        {content.personalInfo.address?.city && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{[content.personalInfo.address.city, content.personalInfo.address.division, content.personalInfo.address.zipCode].filter(Boolean).join(" ")}</span>
          </div>
        )}
        {content.personalInfo.whatsapp && (
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            <span>{content.personalInfo.whatsapp}</span>
          </div>
        )}
        {content.personalInfo.email && (
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span>{content.personalInfo.email}</span>
          </div>
        )}
        {content.personalInfo.linkedIn && (
          <div className="flex items-center gap-1">
            <LinkIcon className="w-3 h-3" />
            <span>{content.personalInfo.linkedIn}</span>
          </div>
        )}
      </div>
    </div>
  );
}

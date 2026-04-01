import { ResumeContent } from "@/types";

export function EducationPreview({
  education,
}: {
  education: ResumeContent["education"];
  forPdf: boolean;
}) {
  return (
    <div className="mb-2 lg:mb-3 px-2 lg:px-6">
      <h2 className="text-[9px] lg:text-[10px] font-bold text-black uppercase tracking-wide border-b border-gray-700 mb-1">
        EDUCATION
      </h2>
      {education.map((edu, index) => (
        <div key={index} className="flex items-start mb-1.5 last:mb-0 gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-[9px] lg:text-[10px] font-bold text-black truncate">
              {edu.institution}
            </h3>
            <p className="text-[8px] lg:text-[9px] text-black truncate">{edu.degree}</p>
          </div>
          <div className="flex-shrink-0">
            {edu.date && <p className="text-[8px] lg:text-[9px] text-black">{edu.date}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

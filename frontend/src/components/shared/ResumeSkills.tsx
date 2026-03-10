/* ===================================
Resume Skills Component
=================================== */
import { ResumeContent } from "../../types";

interface ResumeSkillsProps {
  content: ResumeContent;
  forPdf?: boolean;
}

export default function ResumeSkills({ content, forPdf }: ResumeSkillsProps) {
  const textColor = forPdf ? "text-gray-700" : "text-gray-700 dark:text-gray-300";
  const titleColor = forPdf ? "text-black" : "text-gray-900 dark:text-white";

  return (
    <div className="mb-4">
      <h2 className={`text-sm font-bold ${titleColor} uppercase tracking-wide border-b ${forPdf ? "border-gray-300" : "border-gray-300 dark:border-gray-600"} pb-1 mb-2`}>
        SKILLS
      </h2>
      <div className={`${textColor} text-xs`}>
        <div>
          <span className="font-semibold">Technical Skills: </span>
          <span>{Array.isArray(content.skills) ? content.skills.join(", ") : content.skills}</span>
        </div>
      </div>
    </div>
  );
}

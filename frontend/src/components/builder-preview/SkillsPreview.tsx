import { ResumeContent } from "@/types";

export function SkillsPreview({
  content,
}: {
  content: ResumeContent;
  forPdf: boolean;
}) {
  const technicalSkills = content.technicalSkills || [];
  const softSkills = content.softSkills || [];

  return (
    <div className="mb-2 lg:mb-3 px-2 lg:px-6 pb-4 lg:pb-6">
      <h2 className="text-[9px] lg:text-[10px] font-bold text-black uppercase tracking-wide border-b border-gray-700 mb-1">
        SKILLS
      </h2>
      <div className="space-y-1.5">
        {technicalSkills.length > 0 && (
          <p className="text-[9px] lg:text-[10px] text-black">
            <span className="font-bold"> Technical Skills:</span>{" "}
            {technicalSkills.join(", ")}
          </p>
        )}
        {softSkills.length > 0 && (
          <p className="text-[9px] lg:text-[10px] text-black">
            <span className="font-bold"> Soft Skills:</span>{" "}
            {softSkills.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

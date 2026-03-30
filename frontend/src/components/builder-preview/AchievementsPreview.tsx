import { ResumeContent } from "@/types";

export function AchievementsPreview({
  achievements,
}: {
  achievements: ResumeContent["achievements"];
  forPdf: boolean;
}) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <div className="mb-2 lg:mb-3 px-2 lg:px-6">
      <h2 className="text-[9px] lg:text-[10px] font-bold text-black uppercase tracking-wide border-b border-gray-700 mb-1">
        ACHIEVEMENTS
      </h2>
      {achievements.map((achievement, index) => (
        <div key={index} className="mb-1.5 last:mb-0">
          <div className="flex justify-between items-start gap-1">
            <h3 className="text-[9px] lg:text-[10px] font-bold text-black truncate flex-1">
              {achievement.title}
            </h3>
            {achievement.date && (
              <p className="text-[8px] lg:text-[9px] text-black flex-shrink-0">{achievement.date}</p>
            )}
          </div>
          {achievement.description && (
            <p className="text-[9px] lg:text-[10px] text-black mt-0.5">
              {achievement.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

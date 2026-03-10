/* ===================================
Resume Achievements Component
=================================== */
import { Achievement } from "../../types";

interface ResumeAchievementsProps {
  achievements: Achievement[];
  forPdf?: boolean;
}

export default function ResumeAchievements({ achievements, forPdf }: ResumeAchievementsProps) {
  const textColor = forPdf ? "text-gray-700" : "text-gray-700 dark:text-gray-300";
  const titleColor = forPdf ? "text-black" : "text-gray-900 dark:text-white";

  return (
    <div className="mb-4">
      <h2 className={`text-sm font-bold ${titleColor} uppercase tracking-wide border-b ${forPdf ? "border-gray-300" : "border-gray-300 dark:border-gray-600"} pb-1 mb-2`}>
        ACHIEVEMENTS
      </h2>
      <div className="space-y-1">
        {achievements.map((ach, index) => (
          <div key={index} className={`${textColor} text-xs`}>• {ach.title}</div>
        ))}
      </div>
    </div>
  );
}

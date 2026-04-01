/* ===================================
Job Match Breakdown Component
=================================== */
import { Briefcase } from "lucide-react";

interface JobMatchItem {
  label: string;
  score: number;
  details: string;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-blue-500";
  if (score >= 40) return "text-yellow-500";
  return "text-red-500";
};

const getScoreBg = (score: number) => {
  if (score >= 80) return "bg-gradient-to-br from-green-500 to-emerald-600";
  if (score >= 60) return "bg-gradient-to-br from-blue-500 to-indigo-600";
  if (score >= 40) return "bg-gradient-to-br from-yellow-500 to-orange-600";
  return "bg-gradient-to-br from-red-500 to-rose-600";
};

export default function JobMatchBreakdown({ items }: { items: JobMatchItem[] }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Job Match Breakdown</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
              <span className={`text-sm font-bold ${getScoreColor(item.score)}`}>{item.score}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className={`h-2 rounded-full ${getScoreBg(item.score)} transition-all duration-500`} style={{ width: `${item.score}%` }} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

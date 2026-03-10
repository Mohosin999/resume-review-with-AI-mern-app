/* ===================================
Score Cards Component
=================================== */
import { Trophy, Target, Briefcase } from "lucide-react";
import { Analysis } from "../../types";

interface ScoreCardProps {
  title: string;
  value: number;
  label: string;
  icon: React.ElementType;
  color: string;
  badge: string;
}

const ScoreCard = ({ title, value, label, icon: Icon, color, badge }: ScoreCardProps) => (
  <div className="card p-6 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/5">
    <div className="flex items-center justify-between mb-3">
      <Icon className={`w-6 h-6 ${color}`} />
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
        value >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
        value >= 60 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      }`}>{badge}</span>
    </div>
    <div className={`text-5xl font-bold ${color} mb-1`}>{value}%</div>
    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
  </div>
);

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-blue-500";
  if (score >= 40) return "text-yellow-500";
  return "text-red-500";
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Improvement";
};

export default function ScoreCards({ analysis }: { analysis: Analysis }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ScoreCard title="Overall Score" value={analysis.score} label="Combined ATS + Job Match" icon={Trophy} color={getScoreColor(analysis.score)} badge={getScoreLabel(analysis.score)} />
      <ScoreCard title="ATS Score" value={analysis.atsScore} label="30% Keywords + 30% Skills + 30% Sections + 10% Experience" icon={Target} color="text-blue-500" badge="ATS Optimized" />
      <ScoreCard title="Job Match Score" value={analysis.jobMatch?.score || 0} label="Alignment with job requirements" icon={Briefcase} color="text-purple-500" badge="Job Match" />
    </div>
  );
}

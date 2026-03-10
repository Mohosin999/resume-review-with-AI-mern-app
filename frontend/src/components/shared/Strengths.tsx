/* ===================================
Strengths Component
=================================== */
import { CheckCircle } from "lucide-react";
import { AnalysisSection } from "../AnalysisSection";

export default function Strengths({ strengths }: { strengths: string[] }) {
  return (
    <AnalysisSection title="Your Strengths" icon="check">
      <div className="space-y-2">
        {strengths.map((strength, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <p className="text-sm text-green-900 dark:text-green-100">{strength}</p>
          </div>
        ))}
      </div>
    </AnalysisSection>
  );
}

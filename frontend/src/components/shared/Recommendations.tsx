/* ===================================
Recommendations Component
=================================== */
import { AlertCircle } from "lucide-react";
import { AnalysisSection } from "../AnalysisSection";

export default function Recommendations({ suggestions }: { suggestions: string[] }) {
  return (
    <AnalysisSection title="Priority Recommendations" icon="alert">
      <div className="space-y-3">
        {suggestions.slice(0, 7).map((suggestion, index) => (
          <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-900 dark:text-amber-100">{suggestion}</p>
            </div>
          </div>
        ))}
      </div>
    </AnalysisSection>
  );
}

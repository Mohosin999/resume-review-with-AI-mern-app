import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface MatchBreakdownProps {
  breakdown: {
    keywords: { score: number; matched: string[]; missing: string[] };
    skills: { score: number; matched: string[]; missing: string[] };
    education: { score: number; details: string };
    experience: { score: number; yearsMatched: number; yearsRequired?: number };
  };
}

const MatchBreakdown: React.FC<MatchBreakdownProps> = ({ breakdown }) => {
  return (
    <div className="space-y-6">
      {/* Keywords Match */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Keywords Match
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 flex items-center gap-1">
              <Check className="w-4 h-4" /> Matched
            </h4>
            <div className="flex flex-wrap gap-1">
              {breakdown.keywords.matched.slice(0, 10).map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2 flex items-center gap-1">
              <X className="w-4 h-4" /> Missing
            </h4>
            <div className="flex flex-wrap gap-1">
              {breakdown.keywords.missing.slice(0, 10).map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Match */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Skills Match ({breakdown.skills.score}%)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 flex items-center gap-1">
              <Check className="w-4 h-4" /> Matched
            </h4>
            <div className="flex flex-wrap gap-1">
              {breakdown.skills.matched.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2 flex items-center gap-1">
              <X className="w-4 h-4" /> Missing
            </h4>
            <div className="flex flex-wrap gap-1">
              {breakdown.skills.missing.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Education ({breakdown.education.score}%)
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {breakdown.education.details}
        </p>
      </div>

      {/* Experience */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Experience ({breakdown.experience.score}%)
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {breakdown.experience.yearsMatched} years matched
          {breakdown.experience.yearsRequired &&
            ` (Required: ${breakdown.experience.yearsRequired}+ years)`}
        </p>
      </div>
    </div>
  );
};

export default MatchBreakdown;

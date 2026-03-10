/* ===================================
Resume Summary Component
=================================== */
import { ResumeContent } from "../../types";

interface ResumeSummaryProps {
  content: ResumeContent;
  forPdf?: boolean;
}

export default function ResumeSummary({ content, forPdf }: ResumeSummaryProps) {
  const textColor = forPdf ? "text-gray-700" : "text-gray-700 dark:text-gray-300";
  const titleColor = forPdf ? "text-black" : "text-gray-900 dark:text-white";

  if (!content.summary) return null;

  return (
    <div className="mb-4">
      <h2 className={`text-sm font-bold ${titleColor} uppercase tracking-wide border-b ${forPdf ? "border-gray-300" : "border-gray-300 dark:border-gray-600"} pb-1 mb-2`}>
        SUMMARY
      </h2>
      {content.summary.includes("<") && content.summary.includes(">") ? (
        <div className={`${textColor} text-xs ql-editor leading-relaxed`} style={{ padding: 0 }} dangerouslySetInnerHTML={{ __html: content.summary }} />
      ) : (
        <p className={`${textColor} text-xs leading-relaxed`}>{content.summary}</p>
      )}
    </div>
  );
}

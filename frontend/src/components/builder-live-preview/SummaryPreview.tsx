import { ResumeContent } from "@/types";

export function SummaryPreview({
  content,
}: {
  content: ResumeContent;
  forPdf: boolean;
}) {
  const cleanHtmlContent = (html: string) => {
    return html
      .replace(/<p[^>]*>/gi, "<p>")
      .replace(/<span[^>]*>/gi, "<span>")
      .replace(/<strong[^>]*>/gi, "<strong>")
      .replace(/<em[^>]*>/gi, "<em>")
      .replace(/<u[^>]*>/gi, "<u>")
      .replace(/<ul[^>]*>/gi, "<ul>")
      .replace(/<ol[^>]*>/gi, "<ol>")
      .replace(/<li[^>]*>/gi, "<li>")
      .replace(/<br[^>]*>/gi, "<br>");
  };

  if (!content.summary) return null;

  return (
    <div className="mb-2 lg:mb-3 px-2 lg:px-6">
      <h2
        className={`text-[9px] lg:text-[10px] font-bold text-black uppercase tracking-wide border-b border-gray-700 mb-1`}
      >
        SUMMARY
      </h2>
      {content.summary.includes("<") && content.summary.includes(">") ? (
        <div
          className={`text-black text-[9px] lg:text-[10px] leading-relaxed ql-editor`}
          style={{ padding: 0, color: "#000000" }}
          dangerouslySetInnerHTML={{
            __html: cleanHtmlContent(content.summary),
          }}
        />
      ) : (
        <p className={`text-black text-[9px] lg:text-[10px] leading-relaxed`}>
          {content.summary}
        </p>
      )}
    </div>
  );
}

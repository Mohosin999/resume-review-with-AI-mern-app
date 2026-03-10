import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ResumeContent } from "../types";

const formatBullets = (text: string): string => {
  if (!text) return "";
  const cleanText = text
    .replace(/<[^>]+>/g, "")
    .replace(/<br\s*\/?>/gi, "\n");
  const lines = cleanText.split("\n").filter((line) => line.trim());
  if (lines.length === 0) return "";

  return lines
    .map((line) => {
      const cleanLine = line.replace(/^[•\-\*\+]\s*/, "").trim();
      if (!cleanLine) return "";
      return `<li style="margin-bottom: 4px; padding-left: 16px; list-style-position: outside; font-size: 14px; color: #374151; line-height: 1.5;">${cleanLine}</li>`;
    })
    .join("");
};

const buildPdfHtml = (content: ResumeContent): string => {
  const { personalInfo, summary, experience, projects, achievements, certifications, education, skills } = content;

  return `
    <div style="
      background: #ffffff;
      color: #000000;
      padding: 20px 24px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      width: 794px;
    ">
      <div style="border-bottom: 2px solid #e5e7eb; padding-bottom: 12px; margin-bottom: 16px;">
        <h1 style="font-size: 28px; font-weight: 700; color: #000000; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
          ${personalInfo.fullName || "RESUME"}
        </h1>
        ${personalInfo.jobTitle ? `<p style="font-size: 15px; font-weight: 500; color: #2563eb; margin: 6px 0 0 0;">${personalInfo.jobTitle}</p>` : ""}
        <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 10px; font-size: 12px; color: #6b7280;">
          ${personalInfo.address?.city ? `<span style="display: flex; align-items: center; gap: 4px;">📍 ${[personalInfo.address.city, personalInfo.address.division, personalInfo.address.zipCode].filter(Boolean).join(" ")}</span>` : ""}
          ${personalInfo.whatsapp ? `<span style="display: flex; align-items: center; gap: 4px;">📞 ${personalInfo.whatsapp}</span>` : ""}
          ${personalInfo.email ? `<span style="display: flex; align-items: center; gap: 4px;">✉️ ${personalInfo.email}</span>` : ""}
          ${personalInfo.linkedIn ? `<span style="display: flex; align-items: center; gap: 4px;">🔗 ${personalInfo.linkedIn}</span>` : ""}
        </div>
      </div>

      ${summary ? `
        <div style="margin-bottom: 18px;">
          <h2 style="font-size: 15px; font-weight: 700; color: #000000; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px;">SUMMARY</h2>
          <p style="font-size: 14px; color: #374151; margin: 0; line-height: 1.6;">${summary.replace(/<[^>]+>/g, "")}</p>
        </div>
      ` : ""}

      ${experience.length > 0 ? `
        <div style="margin-bottom: 18px;">
          <h2 style="font-size: 15px; font-weight: 700; color: #000000; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px;">EXPERIENCE</h2>
          ${experience.map(exp => `
            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 4px;">
                <span style="font-size: 15px; font-weight: 700; color: #000000;">${exp.title}</span>
                <span style="font-size: 12px; color: #6b7280; white-space: nowrap; font-weight: 500;">${exp.startDate} — ${exp.current ? "Present" : exp.endDate}</span>
              </div>
              <p style="font-size: 14px; color: #2563eb; margin: 0 0 6px 0; font-weight: 500;">${exp.company}</p>
              ${exp.description ? `<ul style="margin: 4px 0 0 0; padding-left: 16px; list-style-type: disc;">${formatBullets(exp.description)}</ul>` : ""}
            </div>
          `).join("")}
        </div>
      ` : ""}

      ${projects && projects.length > 0 ? `
        <div style="margin-bottom: 18px;">
          <h2 style="font-size: 15px; font-weight: 700; color: #000000; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px;">PROJECTS</h2>
          ${projects.map(proj => `
            <div style="margin-bottom: 16px;">
              <div style="display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px;">
                <span style="font-size: 15px; font-weight: 700; color: #000000;">${proj.name}</span>
              </div>
              ${proj.technologies && proj.technologies.length > 0 ? `<p style="font-size: 12px; color: #6b7280; margin: 0 0 6px 0; font-style: italic;">${proj.technologies.join(", ")}</p>` : ""}
              ${proj.description ? `<ul style="margin: 4px 0 0 0; padding-left: 16px; list-style-type: disc;">${formatBullets(proj.description)}</ul>` : ""}
            </div>
          `).join("")}
        </div>
      ` : ""}

      ${achievements && achievements.length > 0 ? `
        <div style="margin-bottom: 18px;">
          <h2 style="font-size: 15px; font-weight: 700; color: #000000; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px;">ACHIEVEMENTS</h2>
          <ul style="margin: 4px 0 0 0; padding-left: 16px; list-style-type: disc;">
            ${achievements.map(ach => `<li style="margin-bottom: 4px; padding-left: 16px; list-style-position: outside; font-size: 14px; color: #374151; line-height: 1.5;">${ach.title}</li>`).join("")}
          </ul>
        </div>
      ` : ""}

      ${certifications && certifications.length > 0 ? `
        <div style="margin-bottom: 18px;">
          <h2 style="font-size: 15px; font-weight: 700; color: #000000; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px;">CERTIFICATIONS</h2>
          <ul style="margin: 4px 0 0 0; padding-left: 16px; list-style-type: disc;">
            ${certifications.map(cert => `<li style="margin-bottom: 4px; padding-left: 16px; list-style-position: outside; font-size: 14px; color: #374151; line-height: 1.5;">${cert.title}${cert.date ? ` <span style="color: #9ca3af;">(${cert.date})</span>` : ""}</li>`).join("")}
          </ul>
        </div>
      ` : ""}

      ${education.length > 0 ? `
        <div style="margin-bottom: 18px;">
          <h2 style="font-size: 15px; font-weight: 700; color: #000000; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px;">EDUCATION</h2>
          ${education.map(edu => `
            <div style="margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 2px;">
                <span style="font-size: 15px; font-weight: 700; color: #000000;">${edu.degree}</span>
                <span style="font-size: 12px; color: #6b7280; white-space: nowrap; font-weight: 500;">${edu.date}</span>
              </div>
              <p style="font-size: 14px; color: #6b7280; margin: 0;">${edu.institution}</p>
            </div>
          `).join("")}
        </div>
      ` : ""}

      ${skills.length > 0 ? `
        <div style="margin-bottom: 18px;">
          <h2 style="font-size: 15px; font-weight: 700; color: #000000; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px;">SKILLS</h2>
          <div style="font-size: 14px; color: #374151; margin: 0; line-height: 1.8;">
            <span style="font-weight: 600; color: #000000;">Technical Skills:</span> ${skills.join("  |  ")}
          </div>
        </div>
      ` : ""}
    </div>
  `;
};

export const exportToPdf = async (content: ResumeContent): Promise<void> => {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "-9999px";
  container.style.zIndex = "-9999";
  container.style.width = "794px";
  container.style.backgroundColor = "#ffffff";
  document.body.appendChild(container);

  try {
    container.innerHTML = buildPdfHtml(content);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: 794,
      height: container.scrollHeight,
    });

    document.body.removeChild(container);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = (pdfWidth - 16) / imgWidth;
    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;
    const imgX = (pdfWidth - finalWidth) / 2;
    const imgY = 10;

    pdf.addImage(imgData, "PNG", imgX, imgY, finalWidth, finalHeight);
    pdf.save(`${content.personalInfo.fullName || "resume"}.pdf`);
  } catch (error) {
    if (container.parentNode) {
      document.body.removeChild(container);
    }
    throw error;
  }
};

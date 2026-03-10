/* ===================================
Builder Header Component
=================================== */
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Resume } from "../../types";

interface BuilderHeaderProps {
  savedResumes: Resume[];
  selectedResume: Resume | null;
  onSelectResume: (r: Resume) => void;
  onNewResume: () => void;
  onPreview: () => void;
}

export default function BuilderHeader({
  savedResumes,
  selectedResume,
  onSelectResume,
  onNewResume,
  onPreview,
}: BuilderHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Resume Builder</h1>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">
          Create your professional resume step by step
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {savedResumes.length > 0 && (
          <select
            value={selectedResume?._id || ""}
            onChange={(e) => {
              const resume = savedResumes.find((r) => r._id === e.target.value);
              if (resume) onSelectResume(resume);
            }}
            className="input w-full sm:w-40 text-sm"
          >
            <option value="">Load saved...</option>
            {savedResumes.map((r) => (
              <option key={r._id} value={r._id}>
                {r.content.personalInfo.jobTitle || "No Job Title"}
              </option>
            ))}
          </select>
        )}
        <button onClick={onNewResume} className="btn-outline text-sm px-3 sm:px-4">
          New
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPreview}
          className="btn-primary flex items-center gap-2 text-sm px-3 sm:px-4"
        >
          <Eye className="w-4 h-4" /> <span>Preview</span>
        </motion.button>
      </div>
    </div>
  );
}

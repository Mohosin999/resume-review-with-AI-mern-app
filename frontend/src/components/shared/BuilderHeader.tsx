/* ===================================
Builder Header Component
=================================== */
import { motion } from "framer-motion";
import { Eye, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BuilderHeaderProps {
  saving: boolean;
  onNewResume: () => void;
  onPreview: () => void;
}

export default function BuilderHeader({
  saving,
  onNewResume,
  onPreview,
}: BuilderHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Resume Builder</h1>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">
          Create your professional resume step by step
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => navigate('/resume-build-history')}
          className="btn-outline text-sm px-3 sm:px-4 flex items-center gap-2"
        >
          <History className="w-4 h-4" />
          History
        </button>
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

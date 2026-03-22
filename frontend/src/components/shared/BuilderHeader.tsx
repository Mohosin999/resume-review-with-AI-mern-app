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
        <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">Resume Builder</span>
          <span className="text-cyan-500/50">|</span>
        </h1>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">
          Create your professional resume with <span className="text-cyan-400">AI-powered</span> assistance
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => navigate('/resume-build-history')}
          className="btn-outline text-sm px-3 sm:px-4 flex items-center gap-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300"
        >
          <History className="w-4 h-4" />
          History
        </button>
        <button onClick={onNewResume} className="btn-outline text-sm px-3 sm:px-4 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300">
          New
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPreview}
          className="btn-primary flex items-center gap-2 text-sm px-3 sm:px-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg shadow-cyan-500/30"
        >
          <Eye className="w-4 h-4" /> <span>Preview</span>
        </motion.button>
      </div>
    </div>
  );
}

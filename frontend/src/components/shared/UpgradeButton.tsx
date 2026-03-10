/* ===================================
Upgrade Button Component
=================================== */
import { Link } from "react-router-dom";
import { Crown } from "lucide-react";

export default function UpgradeButton() {
  return (
    <Link
      to="/plans"
      className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-colors"
    >
      <Crown className="w-4 h-4" /> Upgrade
    </Link>
  );
}

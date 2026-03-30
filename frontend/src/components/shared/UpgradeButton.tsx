import { Link } from "react-router-dom";
import { Crown } from "lucide-react";

export default function UpgradeButton() {
  return (
    <Link
      to="/plans"
      className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
    >
      <Crown className="w-4 h-4" /> Upgrade
    </Link>
  );
}

/* ===================================
Mobile Menu Component
=================================== */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface NavLink {
  path: string;
  label: string;
  icon: React.ElementType;
}

export default function MobileMenu({ navLinks, user, setMobileMenuOpen }: { navLinks: NavLink[]; user: any; setMobileMenuOpen: (v: boolean) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden bg-gray-900 border-t border-gray-800"
    >
      <div className="px-4 py-3 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-3 py-2 rounded-lg text-sm font-medium ${
              window.location.pathname === link.path
                ? "bg-green-500/20 text-green-400"
                : "text-gray-300"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/plans" className="block px-3 py-2 rounded-lg text-sm font-medium text-orange-400" onClick={() => setMobileMenuOpen(false)}>
          Upgrade Plan
        </Link>
        <div className="px-3 py-2 text-sm text-gray-400">{user.subscription.credits} credits</div>
      </div>
    </motion.div>
  );
}

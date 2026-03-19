/* ===================================
Navbar Component
=================================== */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, FileText } from "lucide-react";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { logoutUser } from "../store/slices/authSlice";
import ConfirmModal from "./ui/ConfirmModal";
import {
  NavLinks, UpgradeButton, CreditsBadge, ProfileMenu,
  MobileMenuButton, MobileMenu, AuthButtons,
} from "./shared";

const NAV_LINKS = [
  { path: "/dashboard", label: "Dashboard", icon: null as any },
  { path: "/ats-score", label: "ATS Score", icon: null as any },
  { path: "/job-match", label: "Job Match", icon: null as any },
  { path: "/builder", label: "Builder", icon: FileText },
  { path: "/my-resumes", label: "My Resumes", icon: FileText },
];

export default function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-1 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CV<span className="text-green-500">Coach</span></span>
            </Link>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <NavLinks navLinks={NAV_LINKS} />
                  <UpgradeButton />
                  <CreditsBadge user={user} />
                  <ProfileMenu user={user} profileMenuOpen={profileMenuOpen} setProfileMenuOpen={setProfileMenuOpen} onLogout={() => setShowLogoutConfirm(true)} />
                  <MobileMenuButton mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
                </>
              ) : (
                <AuthButtons />
              )}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && user && <MobileMenu navLinks={NAV_LINKS} user={user} setMobileMenuOpen={setMobileMenuOpen} />}
        </AnimatePresence>
      </nav>
      <ConfirmModal isOpen={showLogoutConfirm} title="Logout" message="Are you sure you want to logout?" confirmText="Logout" cancelText="Cancel" onConfirm={handleLogout} onCancel={() => setShowLogoutConfirm(false)} />
    </>
  );
}

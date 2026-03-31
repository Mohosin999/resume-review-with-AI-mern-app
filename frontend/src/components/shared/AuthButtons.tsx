/* ===================================
Auth Buttons Component
=================================== */
import { Link } from "react-router-dom";

export default function AuthButtons() {
  return (
    <>
      <Link to="/login" className="text-gray-300 hover:text-white font-medium">Login</Link>
      <Link to="/login" className="gradient-btn">Get Started</Link>
    </>
  );
}

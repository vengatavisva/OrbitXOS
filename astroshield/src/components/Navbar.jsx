import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiInfo } from "react-icons/fi";
import { SiTensorflow } from "react-icons/si";
import { Radar, AlertTriangle } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", icon: <FiHome size={16} />, path: "/" },
    { name: "Dashboard", icon: <Radar size={16} />, path: "/dashboard" },
    { name: "Predictions", icon: <AlertTriangle size={16} />, path: "/predictions" },
    { name: "AIPredictor", icon: <SiTensorflow size={16} />, path: "/aipredictor" },
    { name: "About", icon: <FiInfo size={16} />, path: "/about" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[#141414]/95 backdrop-blur-lg border-b border-cyan-400/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="OrbitXOS Logo"
            className="w-8 h-8 object-cover rounded-full drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
          />
          <h1 className="text-lg font-semibold text-cyan-300 tracking-wide drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
            OrbitXOS
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-cyan-300 font-medium">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"} // exact match only for Home
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 text-sm ${
                  isActive
                    ? "bg-cyan-900/40 text-cyan-400 border-b-2 border-cyan-400"
                    : "hover:text-cyan-400"
                }`
              }
            >
              {link.icon} {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cyan-400"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-3 bg-[#0d0d0d]/98 px-6 py-5 border-t border-cyan-400/20">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                  isActive
                    ? "bg-cyan-900/40 text-cyan-400 border-b-2 border-cyan-400"
                    : "hover:text-cyan-400"
                }`
              }
            >
              {link.icon} {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

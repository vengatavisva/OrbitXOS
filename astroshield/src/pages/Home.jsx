import React from "react";
import { useNavigate } from "react-router-dom";
import { Radar, AlertTriangle } from "lucide-react";
import Navbar from "../components/Navbar";
import {
  FiShield,
  FiActivity,
  FiTrendingUp,
  FiCpu,
} from "react-icons/fi";

// Import Google Fonts (Orbitron + Inter)
import "@fontsource/orbitron/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050014] text-white font-inter">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-screen px-6 pt-28">
        <h1 className="font-orbitron text-6xl md:text-7xl font-extrabold tracking-widest leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(56,189,248,0.6)]">
          OrbitXOS
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed font-inter tracking-wide">
          AI-Driven Space Debris Monitoring <br />
          Protecting Satellites. Securing Orbits.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap gap-6 justify-center font-orbitron tracking-wide">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-400 text-black font-bold text-lg shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:scale-105 transition-all duration-300 uppercase"
          >
            <Radar className="w-6 h-6" />
            View Dashboard
          </button>

          <button
            onClick={() => navigate("/predictions")}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-cyan-400 text-cyan-300 font-bold text-lg hover:bg-cyan-900/30 hover:scale-105 transition-all duration-300 uppercase"
          >
            <AlertTriangle className="w-6 h-6" />
            See Predictions
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          <StatCard value="34,128" label="Tracked Objects" />
          <StatCard value="99.7%" label="Prediction Accuracy" />
          <StatCard value="847" label="Collisions Prevented" />
          <StatCard value="24/7" label="Active Monitoring" />
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className="py-32 px-8 md:px-16 grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Left */}
        <div>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-8 uppercase">
            Mission Critical Protection
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8 font-inter tracking-wide">
            With over{" "}
            <span className="text-cyan-400 font-semibold">34,000+</span>
            trackable objects in orbit and countless more pieces of debris,
            space has become a dangerous environment. Our advanced AI platform
            provides the intelligence needed to navigate this cosmic minefield.
          </p>
          <ul className="space-y-4 text-cyan-300 text-lg font-orbitron tracking-wider">
            <li>⚡ Real-time threat detection and analysis</li>
            <li>🌍 Global orbital tracking network</li>
            <li>🤖 Machine learning prediction models</li>
          </ul>
          <button className="mt-10 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition uppercase font-orbitron tracking-wide">
            Learn More About Our Mission
          </button>
        </div>

        {/* Right - Orbital Threat Matrix */}
        <div className="p-8 rounded-xl bg-[#0d0d2d]/60 border border-cyan-400/20 backdrop-blur-lg shadow-lg">
          <h3 className="font-orbitron text-2xl font-bold text-cyan-400 mb-6 uppercase tracking-wide">
            Orbital Threat Matrix
          </h3>
          <ThreatRow
            orbit="Low Earth Orbit (LEO)"
            risk="HIGH RISK"
            color="text-red-400"
          />
          <ThreatRow
            orbit="Medium Earth Orbit (MEO)"
            risk="MODERATE"
            color="text-purple-400"
          />
          <ThreatRow
            orbit="Geostationary Orbit (GEO)"
            risk="MONITORED"
            color="text-cyan-400"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-8 md:px-16 bg-[#0b0b1f]">
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-12 uppercase tracking-wide">
          Advanced Space Protection
        </h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-20 font-inter tracking-wide">
          Our AI-powered platform combines real-time tracking, predictive
          analytics, and automated collision avoidance to safeguard space
          assets.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <FeatureCard
            icon={<FiActivity size={42} />}
            title="Real-Time Monitoring"
            desc="Track over 34,000 objects in Earth's orbit with sub-meter precision."
          />
          <FeatureCard
            icon={<FiCpu size={42} />}
            title="AI-Powered Predictions"
            desc="Machine learning algorithms predict collision probabilities up to 7 days ahead."
          />
          <FeatureCard
            icon={<FiShield size={42} />}
            title="Collision Avoidance"
            desc="Automated trajectory correction suggestions to prevent space debris collisions."
          />
          <FeatureCard
            icon={<FiTrendingUp size={42} />}
            title="Risk Assessment"
            desc="Dynamic risk scoring based on orbital mechanics and debris characteristics."
          />
        </div>
      </section>
    </div>
  );
}

/* --- Reusable Components --- */
function StatCard({ value, label }) {
  return (
    <div className="p-8 bg-[#0d0d2d]/70 backdrop-blur-xl rounded-xl shadow-lg text-center border border-cyan-400/20 hover:border-cyan-400/50 hover:scale-105 transition duration-300">
      <p className="font-orbitron text-3xl md:text-4xl font-bold text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]">
        {value}
      </p>
      <p className="mt-2 text-gray-400 font-inter tracking-wide">{label}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 rounded-xl bg-[#101030]/70 backdrop-blur-xl border border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-cyan-500/20 hover:scale-105 transition duration-300">
      <div className="text-cyan-400 mb-5">{icon}</div>
      <h3 className="font-orbitron text-xl md:text-2xl font-semibold mb-3 tracking-wide uppercase">
        {title}
      </h3>
      <p className="text-gray-400 font-inter tracking-wide">{desc}</p>
    </div>
  );
}

function ThreatRow({ orbit, risk, color }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-cyan-400/10">
      <p className="text-gray-300 font-inter tracking-wide">{orbit}</p>
      <p className={`font-orbitron font-bold ${color} tracking-widest`}>
        {risk}
      </p>
    </div>
  );
}

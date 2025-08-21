import React from "react";
import { RefreshCw, Filter, Eye, Satellite, AlertTriangle, Activity, Globe } from "lucide-react";
import Navbar from "../components/Navbar";

function StatCard({ value, label, change, color, Icon }) {
  return (
    <div className="p-6 rounded-xl shadow-lg text-center 
                    bg-[#0d0d2d]/70 backdrop-blur-xl 
                    border border-gray-700/50 
                    hover:scale-105 transition-transform duration-300">
      {/* Value + Icon */}
      <div className="flex items-center justify-center gap-2">
        <p className={`font-orbitron text-4xl font-bold ${color}`}>
          {value}
        </p>
        <Icon className={`${color}`} size={26} />
      </div>
      {/* Label */}
      <p className="mt-1 text-gray-300 font-inter tracking-wide text-sm">
        {label}
      </p>
      {/* Change */}
      <p className="text-xs mt-1 text-gray-500">{change}</p>
    </div>
  );
}

function ThreatRow({ object, type, alt, velocity, size, risk, riskColor }) {
  return (
    <tr className="border-b border-gray-700/30">
      <td className="py-2 text-gray-200">{object}</td>
      <td className="text-gray-300">{type}</td>
      <td className="text-gray-300">{alt}</td>
      <td className="text-gray-300">{velocity}</td>
      <td className="text-gray-300">{size}</td>
      <td>
        <span
          className={`px-2 py-1 rounded text-xs ${riskColor.bg} ${riskColor.text}`}
        >
          {risk}
        </span>
      </td>
    </tr>
  );
}

/* --- Dashboard Page --- */
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050014] to-[#0a0f1f] text-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="p-6 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-cyan-400">
              Mission Control Dashboard
            </h1>
            <p className="text-gray-400 text-sm font-inter tracking-wide">
              Real-time space debris monitoring and threat assessment
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl border border-gray-600 text-gray-200 hover:bg-gray-800/50 flex items-center gap-2 transition">
              <Filter size={16} /> Filters
            </button>
            <button className="px-4 py-2 rounded-xl bg-cyan-400 text-black hover:bg-cyan-300 flex items-center gap-2 transition">
              <RefreshCw size={16} /> Refresh
            </button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            value="34,128"
            label="Objects Tracked"
            change="+47 today"
            color="text-cyan-400"
            Icon={Satellite}
          />
          <StatCard
            value="23"
            label="Active Threats"
            change="-5 today"
            color="text-red-400"
            Icon={AlertTriangle}
          />
          <StatCard
            value="1,847"
            label="Predictions Made"
            change="+124 today"
            color="text-purple-400"
            Icon={Activity}
          />
          <StatCard
            value="2,394"
            label="Satellites Protected"
            change="+12 today"
            color="text-blue-400"
            Icon={Globe}
          />
        </div>

        {/* Main Section */}
        <div className="space-y-6 mb-8">
          {/* Orbital Map - Full Width */}
          <div className="bg-[#0d0d2d]/70 backdrop-blur-xl p-5 rounded-xl shadow-md border border-blue-400/20">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-orbitron font-bold text-blue-400">
                Real-Time Orbital Map
              </h2>
              <span className="text-xs text-green-400 font-bold">● LIVE</span>
            </div>
            <div className="h-80 flex items-center justify-center border border-blue-800 rounded-xl">
              <p className="text-gray-500">[Orbital visualization placeholder]</p>
            </div>
            <div className="flex gap-4 mt-4 text-sm text-gray-400">
              <span className="text-green-400">● Active Satellites</span>
              <span className="text-red-400">● High-Risk Debris</span>
              <span className="text-blue-400">● Tracked Objects</span>
            </div>
          </div>

          {/* System Status + Alerts (Stacked neatly) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System Status */}
            <div className="bg-[#0d0d2d]/70 backdrop-blur-xl p-5 rounded-xl shadow-md border border-green-400/20">
              <h2 className="text-xl font-orbitron font-bold text-green-400 mb-3">
                System Status
              </h2>
              <ul className="space-y-2 text-sm font-inter text-gray-300">
                <li className="flex justify-between">
                  <span>Tracking Network</span>{" "}
                  <span className="text-green-400">● OPERATIONAL</span>
                </li>
                <li className="flex justify-between">
                  <span>AI Prediction Engine</span>{" "}
                  <span className="text-purple-400">● ACTIVE</span>
                </li>
                <li className="flex justify-between">
                  <span>Data Processing</span>{" "}
                  <span className="text-yellow-400">● PROCESSING</span>
                </li>
              </ul>
              <p className="mt-4 text-center text-2xl font-orbitron font-bold text-green-400">
                99.7%
              </p>
              <p className="text-center text-gray-400 text-sm">System Uptime</p>
            </div>

            {/* Alerts */}
            <div className="bg-[#0d0d2d]/70 backdrop-blur-xl p-5 rounded-xl shadow-md border border-red-400/20">
              <h2 className="text-xl font-orbitron font-bold text-red-400 mb-3">
                Recent Alerts
              </h2>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-md bg-red-900/30 border border-red-700">
                  ⚠️ Conjunction detected: Starlink-4052{" "}
                  <span className="block text-xs text-gray-400">2m ago</span>
                </div>
                <div className="p-3 rounded-md bg-yellow-900/30 border border-yellow-700">
                  🌀 Debris cloud expansion detected{" "}
                  <span className="block text-xs text-gray-400">15m ago</span>
                </div>
                <div className="p-3 rounded-md bg-green-900/30 border border-green-700">
                  ✅ Successful avoidance maneuver{" "}
                  <span className="block text-xs text-gray-400">1h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* High-Priority Debris Tracking */}
        <div className="bg-[#0d0d2d]/70 backdrop-blur-xl p-5 rounded-xl shadow-md border border-purple-400/20">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-orbitron font-bold text-purple-400">
              High-Priority Debris Tracking
            </h2>
            <button className="px-4 py-1 rounded-lg border border-purple-500 text-purple-300 text-sm flex items-center gap-1 hover:bg-purple-900/40 transition">
              <Eye size={14} /> View All
            </button>
          </div>
          <table className="w-full text-sm font-inter">
            <thead>
              <tr className="text-purple-300 text-left border-b border-purple-800">
                <th className="py-2">Object Name</th>
                <th>Type</th>
                <th>Altitude</th>
                <th>Velocity</th>
                <th>Size</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              <ThreatRow
                object="COSMOS 2251"
                type="Satellite Fragment"
                alt="789 km"
                velocity="7.8 km/s"
                size="Large"
                risk="HIGH"
                riskColor={{ bg: "bg-red-900/40", text: "text-red-300" }}
              />
              <ThreatRow
                object="Fengyun-1C"
                type="Debris Cloud"
                alt="864 km"
                velocity="7.4 km/s"
                size="Various"
                risk="CRITICAL"
                riskColor={{ bg: "bg-red-700/50", text: "text-red-200" }}
              />
              <ThreatRow
                object="CERISE Fragment"
                type="Collision Debris"
                alt="1,200 km"
                velocity="6.9 km/s"
                size="Medium"
                risk="MEDIUM"
                riskColor={{ bg: "bg-yellow-900/40", text: "text-yellow-300" }}
              />
              <ThreatRow
                object="SL-14 Rocket Body"
                type="Rocket Stage"
                alt="945 km"
                velocity="7.2 km/s"
                size="Large"
                risk="HIGH"
                riskColor={{ bg: "bg-red-900/40", text: "text-red-300" }}
              />
              <ThreatRow
                object="Microsat-R Debris"
                type="Test Debris"
                alt="283 km"
                velocity="8.1 km/s"
                size="Small"
                risk="LOW"
                riskColor={{ bg: "bg-green-900/40", text: "text-green-300" }}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

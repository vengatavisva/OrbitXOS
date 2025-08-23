import React from "react";
import { RefreshCw, Filter, Eye, Satellite, AlertTriangle, Activity, Globe } from "lucide-react";
import Navbar from "../components/Navbar";
import OrbitMapPro from "../components/OrbitMapPro"; 
import StarfieldBackground from "../components/StarfieldBackground";

function StatCard({ value, label, change, color, Icon }) {
  return (
    <div className="p-6 rounded-xl shadow-lg text-center 
                    bg-[#0d0d2d]/70 backdrop-blur-xl 
                    border border-gray-700/50 
                    hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-center gap-2">
        <p className={`font-orbitron text-4xl font-bold ${color}`}>
          {value}
        </p>
        <Icon className={`${color}`} size={26} />
      </div>
      <p className="mt-1 text-gray-300 font-inter tracking-wide text-sm">
        {label}
      </p>
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
        <span className={`px-2 py-1 rounded text-xs ${riskColor.bg} ${riskColor.text}`}>
          {risk}
        </span>
      </td>
    </tr>
  );
}

export default function Dashboard() {
  return (
    <div className="relative min-h-screen text-gray-200 overflow-hidden">
      {/* Starfield Background */}
      <StarfieldBackground />

      {/* Foreground Content */}
      <div className="relative z-10 bg-gradient-to-b from-[#050014]/80 to-[#0a0f1f]/90 min-h-screen">
        <Navbar />

        <div className="p-6 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              Mission Control Dashboard
            </h1>
            <p className="text-gray-400 text-sm font-inter tracking-wide">
              Real-time space debris monitoring and threat assessment
            </p>
          </div>
        </div>


          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard value="34,128" label="Objects Tracked" change="+47 today" color="text-cyan-400" Icon={Satellite} />
            <StatCard value="23" label="Active Threats" change="-5 today" color="text-red-400" Icon={AlertTriangle} />
            <StatCard value="1,847" label="Predictions Made" change="+124 today" color="text-purple-400" Icon={Activity} />
            <StatCard value="2,394" label="Satellites Protected" change="+12 today" color="text-blue-400" Icon={Globe} />
          </div>

          {/* Orbital Map */}
          <div className="space-y-6 mb-8">
            <div className="relative bg-[#0d0d2d]/80 backdrop-blur-xl p-5 rounded-2xl 
                            shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-gray-600/40">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-orbitron font-bold text-gray-200 tracking-wide">
                  Real-Time Orbital Map
                </h2>
                <span className="text-sm text-green-400 font-bold animate-pulse">● LIVE</span>
              </div>

              <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-inner shadow-black/40">
                <OrbitMapPro />
              </div>
            </div>

            {/* System Status + Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0d0d2d]/70 backdrop-blur-xl p-5 rounded-xl shadow-md border border-green-400/20">
                <h2 className="text-xl font-orbitron font-bold text-green-400 mb-3">
                  System Status
                </h2>
                <ul className="space-y-2 text-sm font-inter text-gray-300">
                  <li className="flex justify-between">
                    <span>Tracking Network</span> <span className="text-green-400">● OPERATIONAL</span>
                  </li>
                  <li className="flex justify-between">
                    <span>AI Prediction Engine</span> <span className="text-purple-400">● ACTIVE</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Data Processing</span> <span className="text-yellow-400">● PROCESSING</span>
                  </li>
                </ul>
                <p className="mt-4 text-center text-2xl font-orbitron font-bold text-green-400">
                  99.7%
                </p>
                <p className="text-center text-gray-400 text-sm">System Uptime</p>
              </div>

              <div className="bg-[#0d0d2d]/70 backdrop-blur-xl p-5 rounded-xl shadow-md border border-red-400/20">
                <h2 className="text-xl font-orbitron font-bold text-red-400 mb-3">
                  Recent Alerts
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-md bg-red-900/30 border border-red-700">
                    ⚠️ Conjunction detected: Starlink-4052 <span className="block text-xs text-gray-400">2m ago</span>
                  </div>
                  <div className="p-3 rounded-md bg-yellow-900/30 border border-yellow-700">
                    🌀 Debris cloud expansion detected <span className="block text-xs text-gray-400">15m ago</span>
                  </div>
                  <div className="p-3 rounded-md bg-green-900/30 border border-green-700">
                    ✅ Successful avoidance maneuver <span className="block text-xs text-gray-400">1h ago</span>
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
                <ThreatRow object="COSMOS 2251" type="Satellite Fragment" alt="789 km" velocity="7.8 km/s" size="Large" risk="HIGH" riskColor={{ bg: "bg-red-900/40", text: "text-red-300" }} />
                <ThreatRow object="Fengyun-1C" type="Debris Cloud" alt="864 km" velocity="7.4 km/s" size="Various" risk="CRITICAL" riskColor={{ bg: "bg-red-700/50", text: "text-red-200" }} />
                <ThreatRow object="CERISE Fragment" type="Collision Debris" alt="1,200 km" velocity="6.9 km/s" size="Medium" risk="MEDIUM" riskColor={{ bg: "bg-yellow-900/40", text: "text-yellow-300" }} />
                <ThreatRow object="SL-14 Rocket Body" type="Rocket Stage" alt="945 km" velocity="7.2 km/s" size="Large" risk="HIGH" riskColor={{ bg: "bg-red-900/40", text: "text-red-300" }} />
                <ThreatRow object="Microsat-R Debris" type="Test Debris" alt="283 km" velocity="8.1 km/s" size="Small" risk="LOW" riskColor={{ bg: "bg-green-900/40", text: "text-green-300" }} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

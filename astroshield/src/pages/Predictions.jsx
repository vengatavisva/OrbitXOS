// src/pages/PredictionPage.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Prediction = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://orbitxos.onrender.com/predict");
        const data = await res.json();

        if (data.critical_events) {
          setEvents(data.critical_events);
        }
      } catch (err) {
        console.error("Error fetching prediction data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#050014] text-white font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 pt-28 space-y-10">
        {/* Title */}
        <div>
          <h1 className="text-4xl font-bold text-cyan-400 drop-shadow-lg">
            Collision Prediction Center
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            AI-enhanced trajectory analysis and collision avoidance recommendations
          </p>
        </div>

        {/* Critical Alert */}
        {events.length > 0 && (
          <div className="bg-gradient-to-r from-red-900/40 via-red-800/20 to-transparent border border-red-500/40 rounded-2xl p-5 flex items-center justify-between shadow-lg">
            <p className="text-red-400 font-semibold text-lg">
              ⚠ CRITICAL CONJUNCTION ALERT —{" "}
              <span className="text-white">{events[0].satellite}</span> requires immediate
              attention — maneuver window closing in{" "}
              <span className="text-red-300">{events[0].time_to_impact}</span>
            </p>
            <button className="bg-red-500 hover:bg-red-600 transition px-6 py-2.5 rounded-xl font-semibold shadow-md">
              View Details
            </button>
          </div>
        )}

        {/* Active Predictions */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-cyan-400">Active Collision Predictions</h2>
            <span className="text-sm text-gray-400">
              ● Updated <span className="text-cyan-400">just now</span>
            </span>
          </div>

          {loading ? (
            <p className="text-gray-400">Loading predictions...</p>
          ) : events.length === 0 ? (
            <p className="text-gray-400">No critical events at this time 🚀</p>
          ) : (
            <div className="space-y-6">
              {events.map((event, i) => {
                // Handle maneuver suggestion properly
                let burnText = "N/A";
                let maneuverText = event.maneuver_suggestion;

                if (maneuverText.includes("~")) {
                  const parts = maneuverText.split("~");
                  burnText = parts[1] ? parts[1].trim() : "N/A";
                  maneuverText = parts[0].trim();
                } else {
                  burnText = maneuverText; // if no "~", show whole text
                }

                return (
                  <PredictionCard
                    key={i}
                    title={event.satellite}
                    target={event.debris}
                    time={event.time_to_impact}
                    prob={event.probability}
                    probColor={
                      event.risk_level === "High"
                        ? "text-red-400"
                        : event.risk_level === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                    barColor={
                      event.risk_level === "High"
                        ? "from-cyan-400 to-red-500"
                        : event.risk_level === "Medium"
                        ? "from-cyan-400 to-yellow-500"
                        : "from-cyan-400 to-green-500"
                    }
                    risk={event.risk_level.toUpperCase()}
                    riskColor={
                      event.risk_level === "High"
                        ? "text-red-400"
                        : event.risk_level === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                    burn={burnText}
                    maneuver={maneuverText}
                    confidence={event.confidence}
                    buttonColor={event.risk_level}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* Upcoming Events Timeline */}
        <section className="bg-[#0d0d2a] border border-cyan-500/20 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Upcoming Events Timeline</h2>
          <ul className="space-y-4">
            {[
              { time: "14:23 UTC", event: "Conjunction Analysis Complete", tag: "analysis" },
              { time: "15:45 UTC", event: "Starlink-4052 Maneuver Window", tag: "maneuver" },
              { time: "18:30 UTC", event: "Debris Cloud Update", tag: "update" },
              { time: "22:15 UTC", event: "ISS Trajectory Assessment", tag: "assessment" },
            ].map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center text-sm bg-[#0f0f2e] rounded-lg px-4 py-3 border border-cyan-500/10"
              >
                <span className="text-cyan-300 font-medium">{item.time}</span>
                <span className="text-gray-300">{item.event}</span>
                <span className="text-cyan-400 italic">{item.tag}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

// Prediction Card Component
const PredictionCard = ({
  title,
  target,
  time,
  prob,
  probColor,
  barColor,
  risk,
  riskColor,
  burn,
  maneuver,
  confidence,
  buttonColor,
}) => {
  // Tailwind-safe button colors
  const buttonStyles = {
    High: "bg-red-500 hover:bg-red-600",
    Medium: "bg-yellow-500 hover:bg-yellow-600",
    Low: "bg-cyan-500 hover:bg-cyan-600",
  };

  return (
    <div className="bg-[#0d0d2a] rounded-xl px-6 py-5 border border-cyan-500/20 shadow-md hover:shadow-cyan-500/10 transition flex items-center justify-between space-x-6">
      {/* Left: Satellite & Target */}
      <div className="min-w-[180px]">
        <h3 className="text-base font-semibold text-cyan-300">✦ {title}</h3>
        <p className="text-sm text-gray-400">vs {target}</p>
      </div>

      {/* Time to Impact */}
      <div className="text-center min-w-[120px]">
        <p className="text-pink-400 text-sm font-medium">⏱ {time}</p>
        <span className="text-gray-400 text-xs">Time to Impact</span>
      </div>

      {/* Probability + Risk */}
      <div className="flex flex-col items-center min-w-[150px]">
        <span className={`text-2xl font-bold ${probColor}`}>{prob}</span>
        <div className="w-28 bg-gray-800 h-2 rounded-full mt-1 overflow-hidden">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${barColor}`}
            style={{ width: prob }}
          ></div>
        </div>
        <span className={`text-xs mt-1 ${riskColor}`}>{risk}</span>
      </div>

      {/* Maneuver Suggestion */}
      <div className="text-center min-w-[180px]">
        <p className="text-cyan-300 text-sm">⏳ {burn}</p>
        <span className="text-gray-400 text-xs">{maneuver}</span>
      </div>

      {/* Confidence */}
      <div className="text-center min-w-[100px]">
        <p className="text-cyan-300 text-sm font-semibold">{confidence}</p>
        <span className="text-gray-400 text-xs">Confidence</span>
      </div>

      {/* Execute Button */}
      <div className="min-w-[100px] flex justify-end">
        <button
          className={`${buttonStyles[buttonColor] || "bg-cyan-500 hover:bg-cyan-600"} px-5 py-2 rounded-lg font-semibold transition`}
        >
          Execute
        </button>
      </div>
    </div>
  );
};

export default Prediction;

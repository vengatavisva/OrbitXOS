import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function AIPredictor() {
  const [tleData, setTleData] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  // Sample TLE
  const sampleTLE = `ISS (ZARYA)\n1 25544U 98067A   21001.00000000  .00001818  00000-0  40269-4 0  9992\n2 25544  51.6461 339.2971 0002829  53.8340 306.4445 15.48919893123456`;

  const handleLoadSample = () => setTleData(sampleTLE);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResults(null);

    // Fake analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setResults({
        riskSummary: {
          currentRisk: "23.4%",
          postManeuver: "1.2%",
          reduction: "95.1%",
          confidence: "91.8%",
        },
        collisions: [
          {
            object: "COSMOS 2251 Fragment",
            time: "2024-07-25 14:23:00 UTC",
            probability: "23.4%",
            missDistance: "847m",
            duration: "3m 45s",
          },
          {
            object: "Fengyun-1C Debris",
            time: "2024-07-28 09:15:00 UTC",
            probability: "8.7%",
            missDistance: "1.2km",
            duration: "1m 23s",
          },
        ],
        maneuvers: [
          {
            type: "Retrograde burn",
            deltaV: "1.8 m/s",
            time: "2024-07-25 11:30:00 UTC",
            fuel: "2.4 kg",
            effectiveness: "94.2%",
          },
          {
            type: "Plane change",
            deltaV: "0.7 m/s",
            time: "2024-07-27 16:45:00 UTC",
            fuel: "0.9 kg",
            effectiveness: "87.6%",
          },
        ],
        trajectory: [
          { time: "T+1h", original: 10, recommended: 8 },
          { time: "T+4h", original: 20, recommended: 15 },
          { time: "T+7h", original: 18, recommended: 12 },
        ],
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#050014] text-white font-sans">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* TLE Input */}
        <motion.div
          className="bg-[#0E0A2A] p-8 rounded-2xl border border-gray-800 mb-10 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">TLE Data Input</h2>
          <textarea
            value={tleData}
            onChange={(e) => setTleData(e.target.value)}
            placeholder="Paste TLE data here..."
            className="w-full h-32 bg-black text-green-400 font-mono p-4 rounded-lg border border-gray-700"
          />
          <div className="flex gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadSample}
              className="px-6 py-2 bg-[#1a1440] rounded-lg border border-blue-500 hover:bg-blue-700"
            >
              Load Sample Data (ISS)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyze}
              disabled={analyzing}
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {analyzing ? "Analyzing..." : "Analyze Trajectory"}
            </motion.button>
          </div>
        </motion.div>

        {/* Loader */}
        {analyzing && (
          <motion.div
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-4 text-lg animate-pulse">
              Processing trajectory...
            </p>
          </motion.div>
        )}

        {/* Results */}
        {results && !analyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Risk Summary */}
            <motion.div
              className="bg-[#0E0A2A] p-8 rounded-2xl border border-gray-800 mb-10 shadow-lg"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="text-2xl font-semibold mb-6">
                Risk Assessment Summary
              </h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                {Object.entries(results.riskSummary).map(([key, val], idx) => (
                  <motion.div
                    key={idx}
                    className="bg-[#1a1440] p-6 rounded-xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-3xl font-bold">{val}</p>
                    <p className="text-gray-400 mt-2 capitalize">{key}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Predicted Collisions */}
            <motion.div
              className="bg-[#0E0A2A] p-8 rounded-2xl border border-gray-800 mb-10 shadow-lg"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="text-2xl font-semibold mb-6">
                Predicted Collision Windows
              </h2>
              {results.collisions.map((col, i) => (
                <motion.div
                  key={i}
                  className="flex justify-between items-center bg-[#1a1440] p-4 rounded-lg mb-4"
                  whileHover={{ scale: 1.02, backgroundColor: "#221b52" }}
                >
                  <div>
                    <p className="font-bold text-lg">{col.object}</p>
                    <p className="text-gray-400">{col.time}</p>
                  </div>
                  <div className="flex gap-8 text-right">
                    <p className="text-red-400">{col.probability}</p>
                    <p>{col.missDistance}</p>
                    <p>{col.duration}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Maneuvers */}
            <motion.div
              className="bg-[#0E0A2A] p-8 rounded-2xl border border-gray-800 mb-10 shadow-lg"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="text-2xl font-semibold mb-6">
                Recommended Maneuvers
              </h2>
              {results.maneuvers.map((m, i) => (
                <motion.div
                  key={i}
                  className="flex justify-between items-center bg-[#1a1440] p-4 rounded-lg mb-4"
                  whileHover={{ scale: 1.02, backgroundColor: "#221b52" }}
                >
                  <div>
                    <p className="font-bold text-lg">{m.type}</p>
                    <p className="text-gray-400">{m.time}</p>
                  </div>
                  <div className="flex gap-6 text-right">
                    <p>{m.deltaV}</p>
                    <p>{m.fuel}</p>
                    <p className="text-green-400">{m.effectiveness}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700"
                  >
                    Select
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>

            {/* Trajectory Comparison */}
            <motion.div
              className="bg-[#0E0A2A] p-8 rounded-2xl border border-gray-800 shadow-lg"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="text-2xl font-semibold mb-6">
                Trajectory Comparison
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.trajectory}>
                    <XAxis dataKey="time" stroke="#888" />
                    <YAxis hide />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="original"
                      stroke="#FF6B6B"
                      strokeWidth={3}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="recommended"
                      stroke="#4ECDC4"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>
    </div>
  );
}

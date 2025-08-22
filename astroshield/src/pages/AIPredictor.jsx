// src/pages/AIPredictor.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function AIPredictor() {
  const location = useLocation();
  const passedState = location.state || {};

  const [tleData, setTleData] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (passedState.satelliteTLE && passedState.debrisTLE) {
      setTleData(
        `SATELLITE: ${passedState.satellite}\n${passedState.satelliteTLE}\n\nDEBRIS: ${passedState.debris}\n${passedState.debrisTLE}`
      );
    }
  }, [passedState]);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setShowResults(false);

    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050014] to-[#0b001f] text-white font-sans">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-10">
        {/* Input Section */}
        {!showResults && (
          <motion.div
            className="bg-[#0E0A2A]/80 p-8 rounded-3xl border border-gray-700 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Satellite & Debris TLE Data
            </h2>
            <div className="bg-black text-green-400 font-mono p-6 rounded-xl whitespace-pre-line text-lg">
              {tleData}
            </div>

            {/* Old style Analyze button */}
            <motion.button
              onClick={handleAnalyze}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 font-semibold"
            >
              {analyzing ? "Analyzing..." : "Analyze Trajectory"}
            </motion.button>
          </motion.div>
        )}

        {/* Loader */}
        {analyzing && (
          <motion.div
            className="flex flex-col items-center justify-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-300 animate-pulse">
              Processing trajectory...
            </p>
          </motion.div>
        )}

        {/* Results Section */}
        {showResults && !analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Simulation Placeholder */}
            <div className="w-full h-[550px] bg-[#1a1440] rounded-3xl shadow-2xl border border-blue-700 flex items-center justify-center text-gray-400 text-2xl font-semibold">
              Simulation Space (Coming Soon)
            </div>

            {/* TLE Display with Title */}
            <motion.div
              className="bg-[#0E0A2A]/90 p-6 rounded-2xl border border-gray-700 shadow-xl font-mono text-green-400 whitespace-pre-line text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                Satellite & Debris TLE Data
              </h3>
              {tleData}
            </motion.div>
          </motion.div>
        )}

      </section>
    </div>
  );
}
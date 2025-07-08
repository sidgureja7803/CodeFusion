import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDSASheets } from "../libs/api/dsasheets";
import { FaBookOpen, FaSpinner } from "react-icons/fa";

const DSASheets = () => {
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSheets = async () => {
      try {
        setLoading(true);
        const sheetsData = await fetchDSASheets();
        setSheets(sheetsData);
        setError(null);
      } catch (err) {
        console.error("Failed to load DSA sheets:", err);
        setError("Failed to load DSA sheets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadSheets();
  }, []);

  const handleViewSheet = (sheetId) => {
    navigate(`/dsasheets/${sheetId}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-lg">Loading DSA sheets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-fade-in">
            DSA Practice Sheets
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-fade-in-delay">
            Sharpen your coding skills with our curated collection of data structures and algorithms problems
          </p>
          <p className="mt-4 text-md text-blue-400">Powered by Blackbox AI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sheets.map((sheet, index) => (
            <div
              key={sheet.id}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 animate-fade-in"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 p-3 rounded-lg mr-4">
                    <FaBookOpen className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-semibold">{sheet.title}</h2>
                </div>
                <p className="text-gray-400 mb-6">{sheet.description}</p>
                <div className="flex justify-between items-center">
                  <div className="bg-gray-700/50 px-4 py-2 rounded-lg">
                    <span className="text-sm text-gray-300">
                      {sheet.problemCount} Problems
                    </span>
                  </div>
                  <button
                    onClick={() => handleViewSheet(sheet.id)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white font-medium"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DSASheets;

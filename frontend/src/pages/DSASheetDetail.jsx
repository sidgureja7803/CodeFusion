import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDSASheetById } from "../libs/api/dsasheets";
import { FaArrowLeft, FaSpinner, FaExternalLinkAlt, FaBookmark, FaCode } from "react-icons/fa";

const difficultyColors = {
  easy: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  hard: "bg-red-100 text-red-800 border-red-200",
};

const DSASheetDetail = () => {
  const { sheetId } = useParams();
  const navigate = useNavigate();
  const [sheet, setSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSheet = async () => {
      try {
        setLoading(true);
        const sheetData = await fetchDSASheetById(sheetId);
        setSheet(sheetData);
        setError(null);
      } catch (err) {
        console.error(`Failed to load DSA sheet ${sheetId}:`, err);
        setError("Failed to load DSA sheet. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadSheet();
  }, [sheetId]);

  const handleGoBack = () => {
    navigate("/dsasheets");
  };

  const handleProblemClick = (problem) => {
    // Open the problem link in a new tab
    window.open(problem.link, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-lg">Loading DSA sheet...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p>{error}</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!sheet) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 animate-fade-in">
          <button
            onClick={handleGoBack}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to DSA Sheets
          </button>
        </div>

        <div className="mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{sheet.title}</h1>
          <p className="text-gray-400 text-lg">{sheet.description}</p>
          <p className="mt-3 text-blue-400 text-sm">Powered by Blackbox AI</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-gray-700 bg-gray-800/80">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Problems ({sheet.problems.length})</h2>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full border border-green-200">Easy</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full border border-yellow-200">Medium</span>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full border border-red-200">Hard</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/30 divide-y divide-gray-700">
                {sheet.problems.map((problem, index) => (
                  <tr 
                    key={problem.number} 
                    className="hover:bg-blue-900/20 transition-colors cursor-pointer"
                    onClick={() => handleProblemClick(problem)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {problem.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${difficultyColors[problem.difficulty.toLowerCase()]}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex space-x-3">
                        <button className="text-blue-400 hover:text-blue-300" title="Open in LeetCode">
                          <FaExternalLinkAlt />
                        </button>
                        <button className="text-yellow-400 hover:text-yellow-300" title="Save for later">
                          <FaBookmark />
                        </button>
                        <button className="text-green-400 hover:text-green-300" title="Solve in CodeFusion">
                          <FaCode />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSASheetDetail;

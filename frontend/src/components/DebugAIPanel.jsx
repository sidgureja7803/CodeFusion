import React, { useState } from 'react';
import AIChatPanel from './AiChatPanel';

const DebugAIPanel = () => {
  const [showPanel, setShowPanel] = useState(false);

  const mockProblem = {
    id: "test-problem",
    title: "Test Problem",
    difficulty: "EASY"
  };

  const mockCode = `function solution() {
    // Test code
    return "Hello World";
  }`;

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => {
          console.log("Debug: Toggling AI panel, current state:", showPanel);
          setShowPanel(!showPanel);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {showPanel ? 'Hide' : 'Show'} AI Panel (Debug)
      </button>
      
      {showPanel && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-2">AI Panel should appear below:</p>
          <AIChatPanel
            problem={mockProblem}
            code={mockCode}
            language="JAVASCRIPT"
          />
        </div>
      )}
    </div>
  );
};

export default DebugAIPanel; 
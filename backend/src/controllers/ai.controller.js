import {
  generateAIResponse,
  explainCode,
  generateProblem,
} from "../libs/blackbox.lib.js";
import { db } from "../libs/db.js";

export const getAIHelp = async (req, res) => {
  try {
    // Log more details about the user making the request
    console.log("📝 AI Help Request from user:", req.loggedInUser?.id);
    console.log("📧 User email:", req.loggedInUser?.email);
    
    // Check if token refresh is recommended (from auth middleware)
    const needsRefresh = res.getHeader('X-Token-Refresh-Required');
    if (needsRefresh) {
      console.log("⚠️ Token refresh recommended for this user");
    }
    
    const { prompt, problemId, code, language } = req.body;

    if (!prompt) {
      console.log("❌ AI Help: Missing prompt");
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }
    
    console.log("✅ AI Help: Valid prompt received, length:", prompt.length);

    // Get problem details if problemId is provided
    let problem = null;
    if (problemId) {
      problem = await db.problem.findUnique({
        where: { id: problemId },
      });
    }

    try {
      const aiResponse = await generateAIResponse(prompt, {
        problem,
        userCode: code,
        language,
      });
      
      console.log("✅ AI Help: Response generated successfully, length:", aiResponse?.length);

      return res.status(200).json({
        success: true,
        message: "AI response generated successfully",
        response: aiResponse,
      });
    } catch (aiError) {
      console.error("❌ AI Service Error:", aiError.message);
      
      // Try fallback response for API errors
      if (aiError.message.includes("API key") || 
          aiError.message.includes("401") || 
          aiError.message.includes("403")) {
        return res.status(500).json({
          success: false,
          message: "AI service authentication failed. Please check API configuration.",
          error: "API_AUTH_ERROR"
        });
      } else if (aiError.message.includes("429") || aiError.message.includes("rate limit")) {
        return res.status(429).json({
          success: false,
          message: "AI service rate limit exceeded. Please try again later.",
          error: "RATE_LIMIT"
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to generate AI response",
          error: aiError.message,
        });
      }
    }
  } catch (error) {
    console.error("💥 Error getting AI help:", error);
    return res.status(500).json({
      success: false,
      message: "Server error processing AI request",
      error: error.message,
    });
  }
};

export const getCodeExplanation = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "Code and language are required",
      });
    }

    const explanation = await explainCode(code, language);

    return res.status(200).json({
      success: true,
      message: "Code explanation generated successfully",
      explanation,
    });
  } catch (error) {
    console.error("Error explaining code:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate code explanation",
      error: error.message,
    });
  }
};

export const generateAIProblem = async (req, res) => {
  try {
    const { topic, difficulty, category, additionalRequirements } = req.body;

    // Validate required inputs
    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required for problem generation",
      });
    }

    // Check if user is admin
    if (req.loggedInUser.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only admins can generate problems",
      });
    }

    // Call the generateProblem function
    let problemData = await generateProblem({
      topic,
      difficulty,
      category,
      additionalRequirements,
    });

    return res.status(200).json({
      success: true,
      message: "Problem generated successfully",
      problem: problemData,
    });
  } catch (error) {
    console.error("Error generating problem:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate problem",
      error: error.message,
    });
  }
};

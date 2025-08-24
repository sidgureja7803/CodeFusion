import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// GPT-5 API configuration from AIML.com
const apiKey = process.env.BLACKBOX_API_KEY; // Using the same env variable as requested

// OpenAI API configuration for AIML.com GPT-5 API
const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.aiml.com/v1", // AIML.com API endpoint
});

/**
 * Generate an AI response for code assistance using AIML.com GPT-5 API
 * @param {string} prompt - The user's query
 * @param {Object} context - Additional context (problem details, user code, etc.)
 * @returns {Promise<string>} AI response
 */
export const generateAIResponse = async (prompt, context) => {
  try {
    // Check if API key is available
    if (!apiKey) {
      throw new Error("API key for AIML.com GPT-5 is not configured");
    }

    const { problem, userCode, language } = context;

    // Create a well-structured system prompt
    const systemPrompt = `You are CodeFusion AI, an expert coding assistant for collaborative programming. 
You help users solve programming problems without revealing complete solutions.
Your approach:
- Provide clear hints and guidance for the specific question asked
- Explain concepts related to the problem 
- Identify potential issues in the user's code
- Suggest optimization approaches
- Use Markdown formatting in your responses

Current problem: ${problem?.title || "Unknown problem"}
Difficulty: ${problem?.difficulty || "Unknown"}
Language: ${language || "JavaScript"}`;

    // Create a detailed user prompt
    const userPrompt = `
${prompt}

${
  userCode
    ? `Here's my current code:\n\`\`\`${language.toLowerCase()}\n${userCode}\n\`\`\``
    : ""
}
`;

    console.log("Making API call to AIML.com GPT-5...");
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: "gpt-5", // Using AIML.com's GPT-5 model
      stream: false,
      temperature: 0.5, // Balanced between creativity and accuracy
      max_tokens: 1024, // Reasonable response length
    });

    console.log("API call successful");
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI response:", error.message);
    console.error("Full error:", error);
    
    // More specific error messages
    if (error.message.includes('401')) {
      throw new Error("Invalid API key - please check your API key for AIML.com GPT-5");
    } else if (error.message.includes('429')) {
      throw new Error("API rate limit exceeded - please try again later");
    } else if (error.message.includes('503') || error.message.includes('502')) {
      throw new Error("AI service is temporarily unavailable");
    } else {
      throw new Error(`Failed to generate AI response: ${error.message}`);
    }
  }
};

/**
 * Generate code explanations using AIML.com GPT-5 API
 * @param {string} code - Code to explain
 * @param {string} language - Programming language
 * @returns {Promise<string>} Explanation
 */
export const explainCode = async (code, language) => {
  try {
    // Check if API key is available
    if (!apiKey) {
      throw new Error("API key for AIML.com GPT-5 is not configured");
    }

    console.log("Making API call to AIML.com GPT-5 for code explanation...");
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert programming tutor. Explain code clearly and concisely using markdown formatting.",
        },
        {
          role: "user",
          content: `Explain this ${language} code step by step:\n\`\`\`${language.toLowerCase()}\n${code}\n\`\`\``,
        },
      ],
      model: "gpt-5",
      stream: false,
      temperature: 0.3, // More factual for explanations
      max_tokens: 1024,
    });

    console.log("Code explanation API call successful");
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error explaining code:", error.message);
    console.error("Full error:", error);
    
    // More specific error messages
    if (error.message.includes('401')) {
      throw new Error("Invalid API key - please check your API key for AIML.com GPT-5");
    } else if (error.message.includes('429')) {
      throw new Error("API rate limit exceeded - please try again later");
    } else {
      throw new Error(`Failed to generate code explanation: ${error.message}`);
    }
  }
};

/**
 * Generate a complete coding problem using AIML.com GPT-5 API
 * @param {Object} options - Problem generation options
 * @param {string} options.topic - Main topic/concept for the problem
 * @param {string} options.difficulty - Problem difficulty (EASY, MEDIUM, HARD)
 * @param {string} options.category - Problem category/type
 * @param {string} options.additionalRequirements - Any additional specifications
 * @returns {Promise<Object>} Generated problem data
 */
export const generateProblem = async (options) => {
  try {
    const { topic, difficulty, category, additionalRequirements } = options;

    // Check if API key is available
    if (!apiKey) {
      throw new Error("API key for AIML.com GPT-5 is not configured");
    }

    console.log("Making API call to AIML.com GPT-5 for problem generation...");
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert competitive programming problem designer. Create complete problems with clear descriptions, constraints, examples, and solutions.",
        },
        {
          role: "user",
          content: `
            Create a complete competitive programming problem about ${topic} with the following specifications:
            
            Difficulty: ${difficulty || "EASY"}
            Category/Tags: ${category || ""}
            ${
              additionalRequirements
                ? `Additional requirements: ${additionalRequirements}`
                : ""
            }
            
            The problem should include:
            1. A clear, concise title
            2. A detailed description explaining the problem
            3. Input/output specifications and constraints
            4. Example test cases with explanations
            5. At least 3 test cases with input and expected output
            6. Helpful hints for solving the problem (optional)
            7. An editorial explaining the solution approach
            
            For each supported language (JavaScript, Python, and Java):
            - Provide starter code templates with appropriate function signatures
            - Include complete reference solutions that pass all test cases
            - Include example inputs and outputs formatted for that language
            
            Return the result as a valid JSON object with the structure:
            {
              "title": "Problem Title",
              "description": "Detailed problem description",
              "difficulty": "EASY/MEDIUM/HARD",
              "tags": ["tag1", "tag2"],
              "constraints": "Input constraints description",
              "hints": "Helpful hints",
              "editorial": "Solution approach explanation",
              "testcases": [
                { "input": "test input 1", "output": "expected output 1" },
                { "input": "test input 2", "output": "expected output 2" }
              ],
              "examples": {
                "JAVASCRIPT": { "input": "js input format", "output": "js output", "explanation": "explanation" },
                "PYTHON": { "input": "python input format", "output": "python output", "explanation": "explanation" },
                "JAVA": { "input": "java input format", "output": "java output", "explanation": "explanation" }
              },
              "codeSnippets": {
                "JAVASCRIPT": "// JS starter code",
                "PYTHON": "# Python starter code",
                "JAVA": "// Java starter code"
              },
              "referenceSolutions": {
                "JAVASCRIPT": "// JS solution",
                "PYTHON": "# Python solution",
                "JAVA": "// Java solution"
              }
            }
          `,
        },
      ],
      model: "gpt-5",
      stream: false,
      temperature: 0.7,
      max_tokens: 3000,
    });

    // Parse and validate the response
    let problemData;
    try {
      const content = completion.choices[0].message.content;
      // Extract JSON from response (in case it's wrapped in markdown code blocks)
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                        content.match(/```\s*([\s\S]*?)\s*```/) || 
                        [null, content];
      
      const jsonContent = jsonMatch[1] || content;
      problemData = JSON.parse(jsonContent);
      
      // Validate required fields
      const requiredFields = ['title', 'description', 'difficulty', 'testcases'];
      for (const field of requiredFields) {
        if (!problemData[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }
      
    } catch (error) {
      console.error("Error parsing problem data:", error);
      throw new Error(`Invalid problem data format: ${error.message}`);
    }

    return problemData;
  } catch (error) {
    console.error("Error generating problem:", error.message);
    throw new Error(`Failed to generate problem: ${error.message}`);
  }
};

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the LLaMA API client
const llamaClient = axios.create({
  baseURL: process.env.LLAMA_API_URL || 'https://api.llama-api.com',
  headers: {
    'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Generate an AI response for code assistance
 * @param {string} prompt - The user's query
 * @param {Object} context - Additional context (problem details, user code, etc.)
 * @returns {Promise<string>} AI response
 */
export const generateAIResponse = async (prompt, context) => {
  try {
    const { problem, userCode, language } = context;

    // Create a well-structured system prompt
    const systemPrompt = `You are CodeFusion AI, an expert coding assistant. 
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

    const response = await llamaClient.post('/chat/completions', {
      model: 'llama-3-70b',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 0.9,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
};

/**
 * Generate code explanations
 * @param {string} code - Code to explain
 * @param {string} language - Programming language
 * @returns {Promise<string>} Explanation
 */
export const explainCode = async (code, language) => {
  try {
    const response = await llamaClient.post('/chat/completions', {
      model: 'llama-3-70b',
      messages: [
        {
          role: 'system',
          content: 'You are an expert programming tutor. Explain code clearly and concisely using markdown formatting.',
        },
        {
          role: 'user',
          content: `Explain this ${language} code step by step:\n\`\`\`${language.toLowerCase()}\n${code}\n\`\`\``,
        },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error explaining code:', error);
    throw new Error('Failed to generate code explanation');
  }
};

/**
 * Generate a complete coding problem
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

    const response = await llamaClient.post('/chat/completions', {
      model: 'llama-3-70b',
      messages: [
        {
          role: 'system',
          content: `You are an expert problem creator for CodeFusion. Create a complete coding problem with the following specifications:
- Topic: ${topic}
- Difficulty: ${difficulty}
- Category: ${category}
- Additional Requirements: ${additionalRequirements || 'None'}

The problem should include:
1. Clear title and description
2. Input/output constraints
3. Example test cases
4. Hints
5. Editorial
6. Code snippets in JavaScript, Python, and Java
7. Reference solutions`,
        },
        {
          role: 'user',
          content: 'Generate a complete coding problem based on the specifications above.',
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    // Parse the response into a structured problem object
    const problemData = JSON.parse(response.data.choices[0].message.content);
    return problemData;
  } catch (error) {
    console.error('Error generating problem:', error);
    throw new Error('Failed to generate problem');
  }
}; 
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const baseURL = "https://api.novita.ai/v3/openai";
const apiKey = process.env.NOVITA_API_KEY;
const model = "meta-llama/llama-3.1-8b-instruct";

const openai = new OpenAI({
  baseURL: baseURL,
  apiKey: apiKey,
});

/**
 * Generate an AI response for code assistance
 * @param {string} prompt - The user's query
 * @param {Object} context - Additional context (problem details, user code, etc.)
 * @returns {Promise<string>} AI response
 */
export const generateAIResponse = async (prompt, context) => {
  try {
    // Check if API key is available
    if (!apiKey) {
      throw new Error("NOVITA_API_KEY is not configured");
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

    console.log("Making API call to Novita AI...");
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: model,
      stream: false,
      temperature: 0.5, // Balanced between creativity and accuracy
      max_tokens: 1024, // Reasonable response length
      top_p: 0.9,
    });

    console.log("API call successful");
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI response:", error.message);
    console.error("Full error:", error);
    
    // More specific error messages
    if (error.message.includes('401')) {
      throw new Error("Invalid API key - please check your NOVITA_API_KEY");
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
 * Generate code explanations
 * @param {string} code - Code to explain
 * @param {string} language - Programming language
 * @returns {Promise<string>} Explanation
 */
export const explainCode = async (code, language) => {
  try {
    // Check if API key is available
    if (!apiKey) {
      throw new Error("NOVITA_API_KEY is not configured");
    }

    console.log("Making API call to Novita AI for code explanation...");
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
      model: model,
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
      throw new Error("Invalid API key - please check your NOVITA_API_KEY");
    } else if (error.message.includes('429')) {
      throw new Error("API rate limit exceeded - please try again later");
    } else {
      throw new Error(`Failed to generate code explanation: ${error.message}`);
    }
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

    const sampleProblems = JSON.stringify({
      title: "Valid Palindrome",
      description:
        "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
      difficulty: "EASY",
      tags: ["String", "Two Pointers"],
      constraints:
        "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
      hints:
        "Consider using two pointers, one from the start and one from the end, moving towards the center.",
      editorial:
        "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
      testcases: [
        {
          input: "A man, a plan, a canal: Panama",
          output: "true",
        },
        {
          input: "race a car",
          output: "false",
        },
        {
          input: " ",
          output: "true",
        },
      ],
      examples: {
        JAVASCRIPT: {
          input: 's = "A man, a plan, a canal: Panama"',
          output: "true",
          explanation: '"amanaplanacanalpanama" is a palindrome.',
        },
        PYTHON: {
          input: 's = "A man, a plan, a canal: Panama"',
          output: "true",
          explanation: '"amanaplanacanalpanama" is a palindrome.',
        },
        JAVA: {
          input: 's = "A man, a plan, a canal: Panama"',
          output: "true",
          explanation: '"amanaplanacanalpanama" is a palindrome.',
        },
      },
      codeSnippets: {
        JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
        PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
if __name__ == "__main__":
    import sys
    # Read the input string
    s = sys.stdin.readline().strip()
    
    # Call solution
    sol = Solution()
    result = sol.isPalindrome(s)
    
    # Output result
    print(str(result).lower())  # Convert True/False to lowercase true/false`,
        JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
      },
      referenceSolutions: {
        JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
        PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
if __name__ == "__main__":
    import sys
    # Read the input string
    s = sys.stdin.readline().strip()
    
    # Call solution
    sol = Solution()
    result = sol.isPalindrome(s)
    
    # Output result
    print(str(result).lower())  # Convert True/False to lowercase true/false`,
        JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        s = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        return s;
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
      },
    });

    const prompt = `
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

    IMPORTANT: Return ONLY a valid JSON object without any additional text or explanations.
    
    For each supported language (JavaScript, Python, and Java):
    - Provide starter code templates with appropriate function signatures
    - Include complete reference solutions that pass all test cases
    - Include example inputs and outputs formatted for that language

    For JavaScript solution:
    - Use console.log() for output, not print()
    - Parse input using standard Node.js methods
    - The solution must correctly process the input format in test cases
    
    For Python solution:
    - Use print() for output
    - Parse input using standard Python methods
    
    For Java solution:
    - Use System.out.println() for output
    - Parse input using Scanner or BufferedReader
    
    CRITICAL: Ensure the input/output formats match EXACTLY between test cases and solutions.
    Test your solutions mentally to verify they produce the expected output.

    Here are reference examples of well-structured problems to follow as templates:
    ${sampleProblems}
    Follow the examples closely for structure, but create a unique problem about ${topic}

    
    Return the result as a valid JSON object with the following structure:
    {
      "title": "Problem Title",
      "description": "Detailed problem description",
      "difficulty": "${difficulty || "EASY"}",
      "tags": ["Main Category", "Relevant Algorithm", "Data Structure"],
      "constraints": "Clear input constraints and limitations",
      "hints": "Helpful hints for solving the problem",
      "editorial": "Detailed explanation of the solution approach",
      "testcases": [
        {"input": "test input 1", "output": "expected output 1"},
        {"input": "test input 2", "output": "expected output 2"},
        {"input": "test input 3", "output": "expected output 3"}
      ],
      "examples": {
        "JAVASCRIPT": {"input": "example input", "output": "example output", "explanation": "explanation"},
        "PYTHON": {"input": "example input", "output": "example output", "explanation": "explanation"},
        "JAVA": {"input": "example input", "output": "example output", "explanation": "explanation"}
      },
      "codeSnippets": {
        "JAVASCRIPT": "Complete starter code template for JavaScript",
        "PYTHON": "Complete starter code template for Python",
        "JAVA": "Complete starter code template for Java"
      },
      "referenceSolutions": {
        "JAVASCRIPT": "Complete working solution in JavaScript",
        "PYTHON": "Complete working solution in Python",
        "JAVA": "Complete working solution in Java"
      }
    }
    
    Make sure all code snippets include proper input/output handling for standalone execution.
    Ensure all reference solutions are thoroughly tested against the test cases before including them.
    Double check that all solutions output exactly the expected format for each test case.`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI that generates LeetCode-style DSA problems. Return your response strictly as JSON with keys. Do not include markdown, explanations, or comments. Only output valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: model,
      stream: false,
      response_format: { type: "text" },
      temperature: 0.5,
      max_tokens: 4000,
      top_p: 0.9,
    });

    try {
      // Log the raw response for debugging
      console.log("Raw response structure:", JSON.stringify(completion, null, 2));

      const jsonContent = completion.choices[0].message.content;
      console.log(
        "Attempting to parse content:",
        jsonContent.substring(0, 200)
      );

      // Try to clean the JSON string before parsing
      const cleanedContent = jsonContent
        .trim()
        .replace(/\n\s*\n/g, "\n") // Remove extra newlines
        .replace(/[\u0000-\u001F]+/g, " "); // Remove control characters

      try {
        const problemData = JSON.parse(cleanedContent);
        console.log("Successfully parsed problem data");
        return problemData;
      } catch (parseError) {
        console.error("Initial JSON parsing failed:", parseError);

        // Attempt to fix common JSON issues
        try {
          const fixedContent = cleanedContent
            .replace(/\\/g, "\\\\") // Escape backslashes
            .replace(/\t/g, "\\t") // Escape tabs
            .replace(/\r/g, "\\r") // Escape carriage returns
            .replace(/\n/g, "\\n"); // Escape newlines

          const problemData = JSON.parse(fixedContent);
          console.log("Successfully parsed problem data after fixing");
          return problemData;
        } catch (fixError) {
          console.error("Failed to parse even after fixing:", fixError);
          throw new Error("JSON parsing failed after attempted fixes");
        }
      }
    } catch (err) {
      console.error("JSON handling failed:", err);
      console.error("Raw content causing error:", err.message);
      throw new Error(
        "AI-generated problem could not be parsed: " + err.message
      );
    }
  } catch (error) {
    console.error("Error generating problem:", error);
    throw new Error("Failed to generate problem");
  }
}; 
import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const parseLeetCodeCSV = () => {
  return new Promise((resolve, reject) => {
    const problems = [];
    const csvPath = path.join(__dirname, "../data/leetcode_dataset - lc.csv");

    if (!fs.existsSync(csvPath)) {
      reject(new Error("LeetCode CSV file not found"));
      return;
    }

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        try {
          // Parse the CSV row and convert to our Problem model format
          const problem = {
            leetcodeId: parseInt(row.id) || null,
            title: row.title || "",
            description: row.description || "",
            difficulty: normalizeDifficulty(row.difficulty),
            isPremium: row.is_premium === "True" || row.is_premium === "true",
            solutionLink: row.solution_link || null,
            acceptanceRate: parseFloat(row.acceptance_rate) || null,
            frequency: parseFloat(row.frequency) || null,
            url: row.url || null,
            discussCount: parseInt(row.discuss_count) || null,
            accepted: parseInt(row.accepted) || null,
            submissions: parseInt(row.submissions) || null,
            companies: parseArrayField(row.companies),
            relatedTopics: parseArrayField(row.related_topics),
            likes: parseInt(row.likes) || null,
            dislikes: parseInt(row.dislikes) || null,
            rating: parseFloat(row.rating) || null,
            askedByFaang: row.asked_by_faang === "True" || row.asked_by_faang === "true",
            similarQuestions: row.similar_questions || null,
            
            // Default values for custom fields
            tags: parseArrayField(row.related_topics), // Use related_topics as tags
            companyTags: parseArrayField(row.companies),
            userId: null, // LeetCode problems don't have a user
            examples: generateDefaultExamples(row.title, row.description),
            constraints: generateDefaultConstraints(row.difficulty),
            hints: generateDefaultHints(row.title, row.description),
            editorial: null,
            testcases: generateDefaultTestCases(row.title, row.description, row.difficulty),
            codeSnippets: generateDefaultCodeSnippets(row.title, row.description),
            referenceSolutions: null,
          };

          problems.push(problem);
        } catch (error) {
          console.error("Error parsing row:", error, row);
        }
      })
      .on("end", () => {
        console.log(`Parsed ${problems.length} problems from CSV`);
        resolve(problems);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

// Helper function to normalize difficulty values
const normalizeDifficulty = (difficulty) => {
  if (!difficulty) return "MEDIUM";
  
  const diff = difficulty.toLowerCase().trim();
  if (diff === "easy") return "EASY";
  if (diff === "medium") return "MEDIUM";
  if (diff === "hard") return "HARD";
  
  return "MEDIUM"; // Default fallback
};

// Helper function to parse array fields (companies, topics, etc.)
const parseArrayField = (field) => {
  if (!field || field === "" || field === "[]" || field === "null") {
    return [];
  }
  
  try {
    // Try to parse as JSON array first
    if (field.startsWith("[") && field.endsWith("]")) {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed.map(item => String(item)) : [];
    }
    
    // If it's a comma-separated string
    if (field.includes(",")) {
      return field.split(",").map(item => item.trim()).filter(item => item);
    }
    
    // Single item
    return [String(field).trim()];
  } catch (error) {
    console.error("Error parsing array field:", field, error);
    return [];
  }
};

// Get a single problem by LeetCode ID
export const getLeetCodeProblemById = async (leetcodeId) => {
  const problems = await parseLeetCodeCSV();
  return problems.find(problem => problem.leetcodeId === parseInt(leetcodeId));
};

// Get problems with pagination and filtering
export const getLeetCodeProblems = async (options = {}) => {
  const {
    page = 1,
    limit = 50,
    difficulty = null,
    search = null,
    company = null,
    topic = null,
  } = options;

  const problems = await parseLeetCodeCSV();
  
  let filteredProblems = problems;

  // Apply filters
  if (difficulty) {
    filteredProblems = filteredProblems.filter(
      p => p.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredProblems = filteredProblems.filter(
      p => p.title.toLowerCase().includes(searchLower) ||
           p.description.toLowerCase().includes(searchLower)
    );
  }

  if (company) {
    filteredProblems = filteredProblems.filter(
      p => p.companies.some(c => c.toLowerCase().includes(company.toLowerCase()))
    );
  }

  if (topic) {
    filteredProblems = filteredProblems.filter(
      p => p.relatedTopics.some(t => t.toLowerCase().includes(topic.toLowerCase()))
    );
  }

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProblems = filteredProblems.slice(startIndex, endIndex);

  return {
    problems: paginatedProblems,
    totalCount: filteredProblems.length,
    totalPages: Math.ceil(filteredProblems.length / limit),
    currentPage: page,
    hasNextPage: endIndex < filteredProblems.length,
    hasPrevPage: page > 1,
  };
};

// Helper function to generate default examples from description
const generateDefaultExamples = (title, description) => {
  try {
    const examples = {};
    
    // Extract examples from description using regex
    const exampleMatches = description.match(/Example \d+:[\s\S]*?(?=Example \d+:|Constraints:|$)/gi);
    
    if (exampleMatches) {
      exampleMatches.forEach((match, index) => {
        const inputMatch = match.match(/Input:\s*([^\n]+)/i);
        const outputMatch = match.match(/Output:\s*([^\n]+)/i);
        const explanationMatch = match.match(/Explanation:\s*([^\n]+)/i);
        
        if (inputMatch && outputMatch) {
          examples[`example${index + 1}`] = {
            input: inputMatch[1].trim(),
            output: outputMatch[1].trim(),
            explanation: explanationMatch ? explanationMatch[1].trim() : null
          };
        }
      });
    }
    
    // If no examples found, create a basic one
    if (Object.keys(examples).length === 0) {
      examples.example1 = {
        input: "Input will be provided here",
        output: "Expected output will be shown here",
        explanation: "Explanation of the solution approach"
      };
    }
    
    return examples;
  } catch (error) {
    console.error("Error generating examples:", error);
    return {
      example1: {
        input: "Input will be provided here",
        output: "Expected output will be shown here",
        explanation: "Explanation of the solution approach"
      }
    };
  }
};

// Helper function to generate default test cases from description
const generateDefaultTestCases = (title, description, difficulty) => {
  try {
    const testCases = [];
    
    // Extract examples from description and convert to test cases
    const exampleMatches = description.match(/Example \d+:[\s\S]*?(?=Example \d+:|Constraints:|$)/gi);
    
    if (exampleMatches) {
      exampleMatches.forEach((match, index) => {
        const inputMatch = match.match(/Input:\s*([^\n]+)/i);
        const outputMatch = match.match(/Output:\s*([^\n]+)/i);
        
        if (inputMatch && outputMatch) {
          let input = inputMatch[1].trim();
          let output = outputMatch[1].trim();
          
          // Clean up common patterns
          input = input.replace(/^(nums\s*=\s*|target\s*=\s*|s\s*=\s*|"([^"]*)")/g, '$2').trim();
          output = output.replace(/^(return\s+|output:\s*)/i, '').trim();
          
          testCases.push({
            input: input,
            output: output
          });
        }
      });
    }
    
    // If no test cases found, create basic ones based on difficulty
    if (testCases.length === 0) {
      const basicCases = difficulty === 'EASY' ? 2 : difficulty === 'MEDIUM' ? 3 : 4;
      
      for (let i = 0; i < basicCases; i++) {
        testCases.push({
          input: `test_input_${i + 1}`,
          output: `expected_output_${i + 1}`
        });
      }
    }
    
    return testCases;
  } catch (error) {
    console.error("Error generating test cases:", error);
    return [
      { input: "test_input_1", output: "expected_output_1" },
      { input: "test_input_2", output: "expected_output_2" }
    ];
  }
};

// Helper function to generate default code snippets
const generateDefaultCodeSnippets = (title, description) => {
  try {
    // Detect problem type from title and description
    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();
    
    let functionName = "solution";
    let params = "nums";
    let returnType = "int";
    let javaParams = "int[] nums";
    let cppParams = "vector<int>& nums";
    let cParams = "int* nums, int numsSize";
    
    // Advanced pattern matching for more specific function signatures
    if (titleLower.includes("two sum")) {
      functionName = "twoSum";
      params = "nums, target";
      returnType = "int[]";
      javaParams = "int[] nums, int target";
      cppParams = "vector<int>& nums, int target";
      cParams = "int* nums, int numsSize, int target";
    } else if (titleLower.includes("add two numbers")) {
      functionName = "addTwoNumbers";
      params = "l1, l2";
      returnType = "ListNode";
      javaParams = "ListNode l1, ListNode l2";
      cppParams = "ListNode* l1, ListNode* l2";
      cParams = "struct ListNode* l1, struct ListNode* l2";
    } else if (titleLower.includes("longest substring")) {
      functionName = "lengthOfLongestSubstring";
      params = "s";
      returnType = "int";
      javaParams = "String s";
      cppParams = "string s";
      cParams = "char* s";
    } else if (titleLower.includes("median")) {
      functionName = "findMedianSortedArrays";
      params = "nums1, nums2";
      returnType = "double";
      javaParams = "int[] nums1, int[] nums2";
      cppParams = "vector<int>& nums1, vector<int>& nums2";
      cParams = "int* nums1, int nums1Size, int* nums2, int nums2Size";
    } else if (titleLower.includes("palindrome")) {
      functionName = "isPalindrome";
      params = "s";
      returnType = "boolean";
      javaParams = "String s";
      cppParams = "string s";
      cParams = "char* s";
    } else if (titleLower.includes("reverse")) {
      if (titleLower.includes("integer")) {
        functionName = "reverse";
        params = "x";
        returnType = "int";
        javaParams = "int x";
        cppParams = "int x";
        cParams = "int x";
      } else {
        functionName = "reverseString";
        params = "s";
        returnType = "string";
        javaParams = "char[] s";
        cppParams = "vector<char>& s";
        cParams = "char* s";
      }
    } else if (titleLower.includes("valid parentheses") || titleLower.includes("valid brackets")) {
      functionName = "isValid";
      params = "s";
      returnType = "boolean";
      javaParams = "String s";
      cppParams = "string s";
      cParams = "char* s";
    } else if (titleLower.includes("merge")) {
      functionName = "merge";
      params = "nums1, m, nums2, n";
      returnType = "void";
      javaParams = "int[] nums1, int m, int[] nums2, int n";
      cppParams = "vector<int>& nums1, int m, vector<int>& nums2, int n";
      cParams = "int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n";
    } else if (titleLower.includes("container")) {
      functionName = "maxArea";
      params = "height";
      returnType = "int";
      javaParams = "int[] height";
      cppParams = "vector<int>& height";
      cParams = "int* height, int heightSize";
    } else if (titleLower.includes("climb") || titleLower.includes("stair")) {
      functionName = "climbStairs";
      params = "n";
      returnType = "int";
      javaParams = "int n";
      cppParams = "int n";
      cParams = "int n";
    } else if (titleLower.includes("fibonacci")) {
      functionName = "fib";
      params = "n";
      returnType = "int";
      javaParams = "int n";
      cppParams = "int n";
      cParams = "int n";
    } else if (titleLower.includes("binary tree")) {
      functionName = "inorderTraversal";
      params = "root";
      returnType = "int[]";
      javaParams = "TreeNode root";
      cppParams = "TreeNode* root";
      cParams = "struct TreeNode* root";
    } else if (titleLower.includes("linked list")) {
      functionName = "reverseList";
      params = "head";
      returnType = "ListNode";
      javaParams = "ListNode head";
      cppParams = "ListNode* head";
      cParams = "struct ListNode* head";
    } else {
      // Convert title to camelCase for function name
      functionName = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .split(' ')
        .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
        .replace(/^\d+\.?\s*/, ''); // Remove leading numbers
      
      if (!functionName || functionName.length < 2) {
        functionName = "solution";
      }
    }
    
    return {
      JAVASCRIPT: `/**
 * ${title}
 * @param {${params.includes(',') ? 'number[], number' : 'number[]'}} ${params.split(',')[0].trim()}
 * @return {${returnType === 'boolean' ? 'boolean' : returnType === 'int[]' ? 'number[]' : 'number'}}
 */
function ${functionName}(${params}) {
    // TODO: Implement your solution here
    
}`,
      PYTHON: `"""
${title}

Args:
    ${params.split(',').map(p => `${p.trim()}: ${returnType === 'boolean' ? 'bool' : 'int or List[int]'}`).join('\n    ')}

Returns:
    ${returnType === 'boolean' ? 'bool' : returnType === 'int[]' ? 'List[int]' : 'int'}: The result
"""
def ${functionName}(${params}):
    # TODO: Implement your solution here
    pass`,
      JAVA: `/**
 * ${title}
 * 
 * @param ${javaParams.split(',').map(p => p.trim()).join('\n * @param ')}
 * @return ${returnType === 'int[]' ? 'int[]' : returnType === 'boolean' ? 'boolean' : returnType}
 */
public ${returnType === 'int[]' ? 'int[]' : returnType === 'boolean' ? 'boolean' : returnType === 'void' ? 'void' : 'int'} ${functionName}(${javaParams}) {
    // TODO: Implement your solution here
    
}`,
      CPP: `/**
 * ${title}
 * 
 * @param ${cppParams}
 * @return ${returnType === 'int[]' ? 'vector<int>' : returnType === 'boolean' ? 'bool' : returnType === 'void' ? 'void' : 'int'}
 */
${returnType === 'int[]' ? 'vector<int>' : returnType === 'boolean' ? 'bool' : returnType === 'void' ? 'void' : 'int'} ${functionName}(${cppParams}) {
    // TODO: Implement your solution here
    
}`,
      C: `/**
 * ${title}
 * 
 * @param ${cParams}
 * @return ${returnType === 'int[]' ? 'int*' : returnType === 'boolean' ? 'bool' : returnType === 'void' ? 'void' : 'int'}
 */
${returnType === 'int[]' ? 'int*' : returnType === 'boolean' ? 'bool' : returnType === 'void' ? 'void' : 'int'} ${functionName}(${cParams}) {
    // TODO: Implement your solution here
    
}`
    };
  } catch (error) {
    console.error("Error generating code snippets:", error);
    return {
      JAVASCRIPT: `function solution(nums) {
    // Write your solution here
    
}`,
      PYTHON: `def solution(nums):
    # Write your solution here
    pass`
    };
  }
};

// Helper function to generate default constraints
const generateDefaultConstraints = (difficulty) => {
  const constraints = {
    EASY: "• 1 <= nums.length <= 100\n• -100 <= nums[i] <= 100",
    MEDIUM: "• 1 <= nums.length <= 1000\n• -1000 <= nums[i] <= 1000",
    HARD: "• 1 <= nums.length <= 10000\n• -10000 <= nums[i] <= 10000"
  };
  
  return constraints[difficulty] || constraints.MEDIUM;
};

// Helper function to generate default hints
const generateDefaultHints = (title, description) => {
  try {
    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();
    
    if (titleLower.includes("two sum")) {
      return "Try using a hash map to store the numbers you've seen and their indices.";
    } else if (titleLower.includes("palindrome")) {
      return "Consider using two pointers approach from both ends.";
    } else if (titleLower.includes("reverse")) {
      return "Think about the mathematical approach to reverse digits.";
    } else if (descLower.includes("array")) {
      return "Consider different approaches: brute force, two pointers, or hash map.";
    } else if (descLower.includes("string")) {
      return "Think about string manipulation techniques and edge cases.";
    }
    
    return "Break down the problem into smaller parts and think about the edge cases.";
  } catch (error) {
    return "Think step by step and consider different approaches.";
  }
}; 
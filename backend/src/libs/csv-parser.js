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
            examples: null,
            constraints: null,
            hints: null,
            editorial: null,
            testcases: null,
            codeSnippets: null,
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
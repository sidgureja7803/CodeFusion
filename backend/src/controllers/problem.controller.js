import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  submitBatch,
  pollBatchResults,
} from "../libs/judge0.lib.js";
import { 
  getLeetCodeProblems, 
  getLeetCodeProblemById, 
  parseLeetCodeCSV 
} from "../libs/csv-parser.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProblem = async (req, res) => {
  //get all the data from the request body
  const {
    title,
    description,
    difficulty,
    tags,
    companyTags,
    constraints,
    examples,
    testcases,
    codeSnippets,
    referenceSolutions,
    editorial,
    hints,
  } = req.body;

  //check if the user is logged in and is an admin
  if (!req.loggedInUser) {
    return res.status(401).json({ error: "Unauthorized - No user found" });
  }
  if (req.loggedInUser.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden - Admins only" });
  }
  //loop through each reference solution for different languages and create a new problem in the database

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json({ error: ` language: ${language} is not supported.` });
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Submission result---------", result);

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Test case ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        constraints,
        examples,
        editorial,
        hints,
        userId: req.loggedInUser.id,
        tags,
        companyTags: companyTags || [],
        testcases,
        codeSnippets,
        referenceSolutions,
      },
    });

    return res.status(201).json({
      message: "Problem created successfully",
      problemId: newProblem.id,
      problem: newProblem,
    });
  } catch (error) {
    console.error("Error in creating problem:", error);

    return res.status(500).json({ error: "Error in creating problem" });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      difficulty,
      search,
      company,
      topic,
      source = 'all' // 'all', 'leetcode', 'custom'
    } = req.query;

    let dbProblems = [];
    let leetcodeProblems = [];
    let totalCount = 0;

    // Get custom problems from database
    if (source === 'all' || source === 'custom') {
      try {
        dbProblems = await db.problem.findMany({
          where: {
            userId: { not: null }, // Custom problems have a userId
            ...(difficulty && { difficulty: difficulty.toUpperCase() }),
            ...(search && {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
              ]
            })
          },
          ...(req.loggedInUser && {
            include: {
              solvedBy: {
                where: {
                  userId: req.loggedInUser.id,
                },
              },
            },
          }),
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (dbError) {
        console.log("Database query failed, skipping custom problems:", dbError.message);
      }
    }

    // Get LeetCode problems from CSV
    if (source === 'all' || source === 'leetcode') {
      try {
        const leetcodeData = await getLeetCodeProblems({
          page: parseInt(page),
          limit: parseInt(limit),
          difficulty,
          search,
          company,
          topic,
        });

        leetcodeProblems = leetcodeData.problems;
        
        // Add solved status for LeetCode problems if user is logged in
        if (req.loggedInUser) {
          const solvedProblemIds = await db.problemSolved.findMany({
            where: { userId: req.loggedInUser.id },
            select: { problemId: true }
          });
          
          const solvedIds = new Set(solvedProblemIds.map(p => p.problemId));
          
          leetcodeProblems = leetcodeProblems.map(problem => ({
            ...problem,
            // Generate a consistent ID for LeetCode problems
            id: `leetcode_${problem.leetcodeId}`,
            solvedBy: solvedIds.has(`leetcode_${problem.leetcodeId}`) ? [{ userId: req.loggedInUser.id }] : []
          }));
        } else {
          leetcodeProblems = leetcodeProblems.map(problem => ({
            ...problem,
            id: `leetcode_${problem.leetcodeId}`,
            solvedBy: []
          }));
        }

        totalCount = leetcodeData.totalCount;
      } catch (csvError) {
        console.log("CSV parsing failed, skipping LeetCode problems:", csvError.message);
      }
    }

    // Combine and sort problems
    let allProblems = [];
    
    if (source === 'custom') {
      allProblems = dbProblems;
      totalCount = dbProblems.length;
    } else if (source === 'leetcode') {
      allProblems = leetcodeProblems;
      // totalCount already set above
    } else {
      // Combine both sources
      allProblems = [...dbProblems, ...leetcodeProblems];
      totalCount = dbProblems.length + leetcodeProblems.length;
    }

    // Apply additional filtering if needed for combined results
    if (source === 'all' && (difficulty || search)) {
      if (difficulty) {
        allProblems = allProblems.filter(p => 
          p.difficulty?.toLowerCase() === difficulty.toLowerCase()
        );
      }
      if (search) {
        const searchLower = search.toLowerCase();
        allProblems = allProblems.filter(p => 
          p.title?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
        );
      }
      totalCount = allProblems.length;
    }

    // Apply pagination for combined results
    if (source === 'all') {
      const startIndex = (parseInt(page) - 1) * parseInt(limit);
      const endIndex = startIndex + parseInt(limit);
      allProblems = allProblems.slice(startIndex, endIndex);
    }

    return res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      problems: allProblems,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalCount,
        hasNextPage: parseInt(page) * parseInt(limit) < totalCount,
        hasPrevPage: parseInt(page) > 1,
      }
    });

  } catch (error) {
    console.error("Error fetching problems:", error);
    return res.status(500).json({ error: "Error While Fetching Problems" });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if it's a LeetCode problem ID (starts with 'leetcode_')
    if (id.startsWith('leetcode_')) {
      const leetcodeId = parseInt(id.replace('leetcode_', ''));
      
      try {
        const leetcodeProblem = await getLeetCodeProblemById(leetcodeId);
        
        if (leetcodeProblem) {
          return res.status(200).json({
            success: true,
            message: "LeetCode problem fetched successfully",
            problem: {
              ...leetcodeProblem,
              id: `leetcode_${leetcodeProblem.leetcodeId}`,
            },
          });
        }
      } catch (csvError) {
        console.log("Error fetching LeetCode problem:", csvError.message);
      }
    }
    
    // Try to fetch custom problem from database
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    
    if (problem) {
      return res.status(200).json({
        success: true,
        message: "Problem fetched successfully",
        problem,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Problem not found"
    });

  } catch (error) {
    console.error("Error fetching problem:", error);
    return res.status(500).json({ 
      success: false,
      error: "Error While Fetching Problem" 
    });
  }
};

export const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      difficulty,
      tags,
      companyTags,
      constraints,
      examples,
      testcases,
      codeSnippets,
      referenceSolutions,
      editorial,
      hints,
    } = req.body;

    // Check if user is logged in and has admin rights
    if (!req.loggedInUser) {
      return res.status(401).json({ error: "Unauthorized - No user found" });
    }
    if (req.loggedInUser.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden - Admins only" });
    }

    // Check if problem exists
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // If reference solutions are being updated, validate them against test cases
    if (referenceSolutions) {
      for (const [language, solutionCode] of Object.entries(
        referenceSolutions
      )) {
        const languageId = getJudge0LanguageId(language);

        if (!languageId) {
          return res
            .status(400)
            .json({ error: `Language: ${language} is not supported.` });
        }

        // Use updated testcases if provided, otherwise use existing ones
        const testsToUse = testcases || problem.testcases;

        const submissions = testsToUse.map(({ input, output }) => ({
          source_code: solutionCode,
          language_id: languageId,
          stdin: input,
          expected_output: output,
        }));

        const submissionResults = await submitBatch(submissions);
        const tokens = submissionResults.map((res) => res.token);
        const results = await pollBatchResults(tokens);

        for (let i = 0; i < results.length; i++) {
          const result = results[i];

          if (result.status.id !== 3) {
            return res.status(400).json({
              error: `Test case ${i + 1} failed for language ${language}`,
              details: result,
            });
          }
        }
      }
    }

    // Prepare update data (only include fields that were provided)
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (difficulty !== undefined) updateData.difficulty = difficulty;
    if (constraints !== undefined) updateData.constraints = constraints;
    if (examples !== undefined) updateData.examples = examples;
    if (editorial !== undefined) updateData.editorial = editorial;
    if (hints !== undefined) updateData.hints = hints;
    if (tags !== undefined) updateData.tags = tags;
    if (companyTags !== undefined) updateData.companyTags = companyTags;
    if (testcases !== undefined) updateData.testcases = testcases;
    if (codeSnippets !== undefined) updateData.codeSnippets = codeSnippets;
    if (referenceSolutions !== undefined)
      updateData.referenceSolutions = referenceSolutions;

    // Update the problem
    const updatedProblem = await db.problem.update({
      where: {
        id,
      },
      data: updateData,
    });

    return res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    console.error("Error updating problem:", error);
    return res.status(500).json({ error: "Error while updating problem" });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    await db.problem.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting problem:", error);
    return res.status(500).json({ error: "Error While Deleting Problem" });
  }
};

export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.loggedInUser) {
      return res.status(401).json({ 
        success: false,
        message: "Unauthorized - Please login to view solved problems" 
      });
    }

    // Get solved problems from database
    const solvedProblems = await db.problemSolved.findMany({
      where: {
        userId: req.loggedInUser.id,
      },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            tags: true,
            companyTags: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Most recently solved first
      },
    });

    // Format the response data
    const formattedProblems = solvedProblems.map((solved) => ({
      id: solved.problem.id,
      problemId: solved.problem.id,
      title: solved.problem.title,
      difficulty: solved.problem.difficulty,
      tags: solved.problem.tags,
      companyTags: solved.problem.companyTags,
      solvedAt: solved.createdAt,
      solvedBy: [{
        userId: solved.userId,
        createdAt: solved.createdAt,
      }],
    }));

    console.log(`📊 Found ${formattedProblems.length} solved problems for user ${req.loggedInUser.id}`);

    res.status(200).json({
      success: true,
      message: "Solved problems fetched successfully",
      problems: formattedProblems,
      data: formattedProblems, // For backward compatibility
      count: formattedProblems.length,
    });
  } catch (error) {
    console.error("Error fetching problems solved by user:", error);
    res.status(500).json({ 
      success: false,
      error: "Error while fetching solved problems",
      message: "Failed to fetch solved problems"
    });
  }
};

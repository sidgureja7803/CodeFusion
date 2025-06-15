import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  submitBatch,
  pollBatchResults,
} from "../libs/judge0.lib.js";

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
    const problems = await db.problem.findMany(
      {
        include: {
          solvedBy: {
            where: {
              userId: req.loggedInUser ? req.loggedInUser.id : null,
            },
          },
        },
      },
      {
        orderBy: {
          createdAt: "desc",
        },
      }
    );
    if (problems.length === 0) {
      return res.status(404).json({ message: "No problems found" });
    }

    return res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      problems,
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    return res.status(500).json({ error: "Error While Fetching Problems" });
  }
};

export const getProblemById = async (req, res) => {
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
    return res.status(200).json({
      success: true,
      message: "Problem fetched successfully",
      problem,
    });
  } catch (error) {
    console.error("Error fetching problem:", error);
    return res
      .status(500)
      .json({ error: "Error While Fetching Problem Details" });
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
    const problems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId: req.loggedInUser.id,
          },
        },
      },
      include: {
        solvedBy: {
          where: {
            userId: req.loggedInUser.id,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      data: problems.map((problem) => ({
        ...problem,
        solvedBy: problem.solvedBy[0],
      })),
    });
  } catch (error) {
    console.error("Error fetching problems solved by user:", error);
    res.status(500).json({ error: "Error while fetching problems" });
  }
};

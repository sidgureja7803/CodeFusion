import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";
import { db } from "../libs/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to check if code is just the default template
const isDefaultTemplate = (sourceCode, problemCodeSnippets, languageId) => {
  // Get language name from ID mapping
  const languageMap = {
    71: 'PYTHON',
    62: 'JAVA', 
    63: 'JAVASCRIPT',
    54: 'CPP',
    50: 'C'
  };
  
  const languageName = languageMap[languageId];
  if (!languageName || !problemCodeSnippets || !problemCodeSnippets[languageName]) {
    return false;
  }
  
  const template = problemCodeSnippets[languageName];
  const userCode = sourceCode.trim();
  const templateCode = template.trim();
  
  // Check if user code is exactly the same as template
  if (userCode === templateCode) {
    return true;
  }
  
  // Check if user only added comments or whitespace
  const userCodeClean = userCode.replace(/\/\/.*|\/\*[\s\S]*?\*\/|#.*|\s+/g, '');
  const templateCodeClean = templateCode.replace(/\/\/.*|\/\*[\s\S]*?\*\/|#.*|\s+/g, '');
  
  if (userCodeClean === templateCodeClean) {
    return true;
  }
  
  // Check for minimal changes (less than 20 characters difference)
  const diff = Math.abs(userCode.length - templateCode.length);
  if (diff < 20 && userCode.includes('// Write your code here')) {
    return true;
  }
  
  return false;
};

// Helper function to get problem from database or JSON
const getProblemById = async (problemId) => {
  try {
    // First try to fetch from database
    const problem = await db.problem.findUnique({
      where: { id: problemId },
      select: { codeSnippets: true, title: true, testcases: true }
    });

    if (problem) {
      return problem;
    }

    // If not found in database, try JSON data
    console.log(`Problem ${problemId} not found in database, checking JSON data`);
    
    const problemsFilePath = path.join(__dirname, "../data/problems.json");
    
    if (fs.existsSync(problemsFilePath)) {
      const jsonData = fs.readFileSync(problemsFilePath, "utf8");
      const jsonProblems = JSON.parse(jsonData);
      
      const jsonProblem = jsonProblems.find(p => p.id === problemId);
      
      if (jsonProblem) {
        return {
          codeSnippets: jsonProblem.codeSnippets,
          title: jsonProblem.title,
          testcases: jsonProblem.testcases
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching problem:", error);
    return null;
  }
};

export const executeCode = async (req, res) => {
  try {
    const {
      source_code,
      languageId,
      stdin,
      expectedOutput,
      problemId,
      saveSubmission = false,
    } = req.body;

    const userId = req.loggedInUser.id;

    // Validate required fields
    if (!source_code || source_code.trim() === "") {
      return res.status(400).json({
        error: "Source code is required. Please write some code before executing.",
      });
    }

    if (!languageId) {
      return res.status(400).json({
        error: "Language selection is required.",
      });
    }

    // Get problem details to check against template
    const problem = await getProblemById(problemId);

    if (!problem) {
      return res.status(404).json({
        error: "Problem not found.",
      });
    }

    // Check if user is submitting default template code
    if (isDefaultTemplate(source_code, problem.codeSnippets, languageId)) {
      return res.status(400).json({
        error: "Please write your own solution. The default template code cannot be submitted.",
      });
    }

    //Validate test cases
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expectedOutput) ||
      expectedOutput.length === 0 ||
      expectedOutput.length !== stdin.length
    ) {
      return res.status(400).json({
        error: "Invalid test cases. Please provide valid input and output.",
      });
    }

    // Prepare each test case for judge0 submission
    const submissions = stdin.map((input) => ({
      source_code,
      language_id: languageId,
      stdin: input,
    }));

    // Submit the batch of test cases to judge0
    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map((res) => res.token);

    // Poll for results
    const results = await pollBatchResults(tokens);

    console.log("Result ---------");
    console.log(results);

    // Analyze test case results
    let allPassed = true;
    const detailedResults = results.map((result, index) => {
      const expected = expectedOutput[index]?.trim();
      const actual = result.stdout?.trim();

      const passed = actual === expected;
      if (!passed) {
        allPassed = false;
      }

      console.log(`TestCase #${index + 1} ---------`);
      console.log("Input:", stdin[index]);
      console.log("Expected Output:", expected);
      console.log("Actual Output:", actual);
      console.log(`Did it pass ? ${passed}`);

      return {
        testCase: index + 1,
        passed,
        stdout: actual,
        expected,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} seconds` : undefined,
      };
    });

    console.log("Detailed Results", detailedResults);

    // Initialize variables for database operations
    let submission = null;
    let submissionWithTestCase = null;

    // Only create a submission record if saveSubmission is true
    if (saveSubmission) {
      submission = await db.submission.create({
        data: {
          userId,
          problemId,
          sourceCode: { code: source_code },
          language: getLanguageName(languageId),
          stdin: stdin.join("\n"),
          stdout: JSON.stringify(
            detailedResults.map((result) => result.stdout)
          ),
          stderr: detailedResults.some((result) => result.stderr)
            ? JSON.stringify(detailedResults.map((result) => result.stderr))
            : null,
          compileOutput: detailedResults.some((result) => result.compile_output)
            ? JSON.stringify(
                detailedResults.map((result) => result.compile_output)
              )
            : null,
          status: allPassed ? "ACCEPTED" : "WRONG_ANSWER",
          memory: detailedResults.some((result) => result.memory)
            ? JSON.stringify(detailedResults.map((result) => result.memory))
            : null,
          time: detailedResults.some((result) => result.time)
            ? JSON.stringify(detailedResults.map((result) => result.time))
            : null,
        },
      });

      //If all test cases passed, mark the problem as solved
      if (allPassed) {
        await db.problemSolved.upsert({
          where: {
            userId_problemId: {
              userId,
              problemId,
            },
          },
          create: {
            userId,
            problemId,
          },
          update: {},
        });
      }

      // Save individual test case results using detailedResults
      const testCaseResults = detailedResults.map((result) => ({
        submissionId: submission.id,
        testCase: result.testCase,
        passed: result.passed,
        stdout: result.stdout,
        expected: result.expected,
        stderr: result.stderr,
        compileOutput: result.compile_output,
        status: result.status,
        memory: result.memory,
        time: result.time,
      }));

      await db.testCaseResult.createMany({
        data: testCaseResults,
      });

      // Only fetch submission with test cases if a submission was created
      submissionWithTestCase = await db.submission.findUnique({
        where: {
          id: submission.id,
        },
        include: {
          testCases: true,
        },
      });
    }

    // Return appropriate response based on whether a submission was saved
    res.status(200).json({
      success: true,
      message: saveSubmission
        ? "Solution submitted successfully"
        : "Code executed successfully",
      submission: saveSubmission
        ? submissionWithTestCase
        : {
            status: allPassed ? "ACCEPTED" : "WRONG_ANSWER",
            testCases: detailedResults,
          },
    });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ error: "Error While Executing Code" });
  }
};

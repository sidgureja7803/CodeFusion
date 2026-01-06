import axios from "axios";

// Get RapidAPI configuration from environment variables
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

// Judge0 language IDs mapping
export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
    CPP: 54,
    C: 50,
  };
  return languageMap[language.toUpperCase()];
};

export const getLanguageName = (languageId) => {
  const languageMap = {
    71: "PYTHON",
    63: "JAVASCRIPT",
    62: "JAVA",
    54: "CPP",
    50: "C",
  };
  return languageMap[languageId] || "UNKNOWN";
};

// Submit a batch of code submissions to Judge0 via RapidAPI
export const submitBatch = async (submissions) => {
  try {
    if (!RAPIDAPI_KEY || !RAPIDAPI_HOST) {
      throw new Error("RapidAPI credentials are not configured");
    }

    const response = await axios.post(
      `https://${RAPIDAPI_HOST}/submissions/batch?base64_encoded=false`,
      {
        submissions,
      },
      {
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": RAPIDAPI_HOST,
        },
      }
    );

    console.log("Batch submission response:", response.data);
    return response.data; // returns the tokens for the submissions
  } catch (error) {
    console.error("Error submitting batch to Judge0 via RapidAPI:", error.message);
    if (error.response) {
      console.error("Response error:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    throw new Error(`Failed to submit code to Judge0: ${error.message}`);
  }
};

// Poll for batch results from Judge0 via RapidAPI
export const pollBatchResults = async (tokens) => {
  if (!RAPIDAPI_KEY || !RAPIDAPI_HOST) {
    throw new Error("RapidAPI credentials are not configured");
  }

  const maxAttempts = 30; // Maximum number of polling attempts
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const response = await axios.get(
        `https://${RAPIDAPI_HOST}/submissions/batch`,
        {
          params: {
            tokens: tokens.join(","),
            base64_encoded: false,
          },
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST,
          },
        }
      );

      const results = response.data.submissions;

      // Check if all submissions are done processing
      // Status IDs: 1 = In Queue, 2 = Processing
      const isAllDone = results.every(
        (result) => result.status?.id !== 1 && result.status?.id !== 2
      );

      if (isAllDone) {
        return results;
      }

      // Wait for 1 second before polling again
      await sleep(1000);
      attempts++;
    } catch (error) {
      console.error("Error polling batch results:", error.message);
      throw new Error(`Failed to get results from Judge0: ${error.message}`);
    }
  }

  throw new Error("Code execution timed out. Please try again.");
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Execute code with multiple test cases
export const executeCodeWithTestCases = async (
  sourceCode,
  languageId,
  testCaseInputs,
  expectedOutputs
) => {
  try {
    // Prepare submissions for each test case
    const submissions = testCaseInputs.map((input) => ({
      source_code: sourceCode,
      language_id: languageId,
      stdin: input,
    }));

    // Submit batch to Judge0
    const submitResponse = await submitBatch(submissions);
    const tokens = submitResponse.map((res) => res.token);

    // Poll for results
    const results = await pollBatchResults(tokens);

    // Analyze test case results
    let allPassed = true;
    const detailedResults = results.map((result, index) => {
      const expected = expectedOutputs[index]?.trim();
      const actual = result.stdout?.trim() || "";

      const passed = actual === expected;
      if (!passed) {
        allPassed = false;
      }

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

    return {
      allPassed,
      results: detailedResults,
      status: allPassed ? "ACCEPTED" : "WRONG_ANSWER",
    };
  } catch (error) {
    console.error("Error executing code:", error);
    throw error;
  }
};


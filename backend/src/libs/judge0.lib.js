import axios from "axios";

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
  };
  return languageMap[language.toUpperCase()];
};

// RapidAPI configuration
const getRapidAPIHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST || 'judge0-ce.p.rapidapi.com',
  };
};

const RAPIDAPI_BASE_URL = `https://${process.env.RAPIDAPI_HOST || 'judge0-ce.p.rapidapi.com'}`;

export const submitBatch = async (submissions) => {
  try {
    const { data } = await axios.post(
      `${RAPIDAPI_BASE_URL}/submissions/batch?base64_encoded=false`,
      {
        submissions,
      },
      {
        headers: getRapidAPIHeaders(),
      }
    );

    console.log("Batch submission response:", data);
    return data; // returns the tokens for the submissions
  } catch (error) {
    console.error("Error submitting batch to Judge0:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    throw new Error(`Failed to submit code to Judge0: ${error.message}`);
  }
};

export const pollBatchResults = async (tokens) => {
  while (true) {
    const { data } = await axios.get(
      `${RAPIDAPI_BASE_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
        headers: getRapidAPIHeaders(),
      }
    );

    const results = data.submissions;

    const isAllDone = results.every(
      (result) => result.status?.id !== 1 && result.status?.id !== 2
    );

    if (isAllDone) {
      return results;
    }
    await sleep(1000); // Wait for 1 seconds before polling again
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function getLanguageName(languageId) {
  const languageMap = {
    71: "PYTHON",
    63: "JAVASCRIPT",
    62: "JAVA",
  };
  return languageMap[languageId] || "UNKNOWN";
}

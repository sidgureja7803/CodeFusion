import axios from "axios";

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
  };
  return languageMap[language.toUpperCase()];
};

export const submitBatch = async (submissions) => {
  try {
    const { data } = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
      {
        submissions,
      },
      {
        headers: {
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );

    console.log("Batch submission response:", data);
    return data; // returns the tokens for the submissions
  } catch (error) {
    console.error("Error submitting batch to Judge0:", error.message);
    throw new Error(`Failed to submit code to Judge0: ${error.message}`);
  }
};

export const pollBatchResults = async (tokens) => {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
        headers: {
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
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

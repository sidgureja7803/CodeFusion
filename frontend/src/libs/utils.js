function getLanguageName(languageId) {
  const LANGUAGE_NAMES = {
    63: "JavaScript",
    71: "Python",
    62: "Java",
  };
  return LANGUAGE_NAMES[languageId] || "Unknown";
}

export { getLanguageName };

export function getLanguageId(language) {
  const languageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
  };
  return languageMap[language.toUpperCase()];
}

export const formatSubmissionStatus = (status) => {
  switch (status) {
    case "ACCEPTED":
      return "Accepted";
    case "WRONG_ANSWER":
      return "Wrong Answer";
    default:
      return status;
  }
};

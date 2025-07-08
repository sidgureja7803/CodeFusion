import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to DSA sheet YAML file
const dsaSheetPath = path.join(__dirname, '../data/dsasheet.yaml');

/**
 * Load and split the DSA sheet data into two sheets
 * @returns {Promise<Object>} Object containing the two DSA sheets
 */
export const loadDSASheets = async () => {
  try {
    // Read the YAML file
    const fileContents = fs.readFileSync(dsaSheetPath, 'utf8');
    
    // Parse the YAML data
    const dsaData = yaml.load(fileContents);
    
    // Calculate the midpoint for splitting the data
    const midpoint = Math.floor(dsaData.length / 2);
    
    // Create two sheets
    const sheet1 = dsaData.slice(0, midpoint);
    const sheet2 = dsaData.slice(midpoint);
    
    return {
      sheet1: {
        title: "DSA Sheet 1",
        description: "First set of DSA problems covering various algorithms and data structures",
        problems: sheet1
      },
      sheet2: {
        title: "DSA Sheet 2",
        description: "Second set of DSA problems covering various algorithms and data structures",
        problems: sheet2
      }
    };
  } catch (error) {
    console.error('Error loading DSA sheets:', error);
    throw new Error(`Failed to load DSA sheets: ${error.message}`);
  }
};

/**
 * Get all available DSA sheets
 * @returns {Promise<Array>} Array of DSA sheet metadata
 */
export const getAllDSASheets = async () => {
  try {
    const sheets = await loadDSASheets();
    
    // Return metadata about the sheets (without the problems)
    return [
      {
        id: "sheet1",
        title: sheets.sheet1.title,
        description: sheets.sheet1.description,
        problemCount: sheets.sheet1.problems.length
      },
      {
        id: "sheet2",
        title: sheets.sheet2.title,
        description: sheets.sheet2.description,
        problemCount: sheets.sheet2.problems.length
      }
    ];
  } catch (error) {
    console.error('Error getting DSA sheets:', error);
    throw new Error(`Failed to get DSA sheets: ${error.message}`);
  }
};

/**
 * Get a specific DSA sheet by ID
 * @param {string} sheetId - ID of the sheet to retrieve
 * @returns {Promise<Object>} The DSA sheet data
 */
export const getDSASheetById = async (sheetId) => {
  try {
    const sheets = await loadDSASheets();
    
    if (!sheets[sheetId]) {
      throw new Error(`DSA sheet with ID '${sheetId}' not found`);
    }
    
    return sheets[sheetId];
  } catch (error) {
    console.error(`Error getting DSA sheet ${sheetId}:`, error);
    throw new Error(`Failed to get DSA sheet: ${error.message}`);
  }
};

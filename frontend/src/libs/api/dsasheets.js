import axios from "axios";
import { API_URL } from '../axios';

/**
 * Fetch all available DSA sheets
 * @returns {Promise<Array>} Array of DSA sheet metadata
 */
export const fetchDSASheets = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/dsasheets`, {
      withCredentials: true,
    });
    
    if (response.data.success) {
      return response.data.sheets;
    } else {
      throw new Error(response.data.message || "Failed to fetch DSA sheets");
    }
  } catch (error) {
    console.error("Error fetching DSA sheets:", error);
    throw error;
  }
};

/**
 * Fetch a specific DSA sheet by ID
 * @param {string} sheetId - ID of the sheet to fetch
 * @returns {Promise<Object>} The DSA sheet data
 */
export const fetchDSASheetById = async (sheetId) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/dsasheets/${sheetId}`, {
      withCredentials: true,
    });
    
    if (response.data.success) {
      return response.data.sheet;
    } else {
      throw new Error(response.data.message || "Failed to fetch DSA sheet");
    }
  } catch (error) {
    console.error(`Error fetching DSA sheet ${sheetId}:`, error);
    throw error;
  }
};

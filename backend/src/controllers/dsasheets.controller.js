import { getAllDSASheets, getDSASheetById as getDSASheetByIdFromLib } from "../libs/dsasheets.lib.js";

/**
 * Get all available DSA sheets
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getDSASheets = async (req, res) => {
  try {
    const sheets = await getAllDSASheets();
    
    return res.status(200).json({
      success: true,
      message: "DSA sheets retrieved successfully",
      sheets
    });
  } catch (error) {
    console.error("Error getting DSA sheets:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve DSA sheets",
      error: error.message
    });
  }
};

/**
 * Get a specific DSA sheet by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getDSASheetByIdController = async (req, res) => {
  try {
    const { sheetId } = req.params;
    
    if (!sheetId) {
      return res.status(400).json({
        success: false,
        message: "Sheet ID is required"
      });
    }
    
    const sheet = await getDSASheetByIdFromLib(sheetId);
    
    return res.status(200).json({
      success: true,
      message: "DSA sheet retrieved successfully",
      sheet
    });
  } catch (error) {
    console.error("Error getting DSA sheet:", error);
    
    // Handle not found error
    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve DSA sheet",
      error: error.message
    });
  }
};

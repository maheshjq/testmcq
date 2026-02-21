const config = {
  adminEmail: 'express.run1@gmail.com',
  greetingMessage: 'Good job!',
    // Folder settings
  QUIZ_DATA_FOLDER_NAME: 'Quiz_Data',
  
  // Validation settings
  VALID_SUBJECT_PATTERN: /^[a-zA-Z0-9_-]+$/,
  
  // Email settings
  ADMIN_EMAIL: 'express.run1@gmail.com',
  
  // Application settings
  GREETING_MESSAGE: 'MCQ Quiz System',
  
  // Debug settings
  DEFAULT_DEBUG_MODE: false,

}

function toggleDebugMode() {
  const currentMode = isDebugMode();
  setDebugMode(!currentMode);
  console.log("Debug mode set to:", !currentMode);
}

// Function to get the current debug mode
function isDebugMode() {
  console.log((PropertiesService.getScriptProperties().getProperty('DEBUG_MODE') === 'true'));
  return PropertiesService.getScriptProperties().getProperty('DEBUG_MODE') === 'true';
}

// Function to set the debug mode
function setDebugMode(isDebug) {
  PropertiesService.getScriptProperties().setProperty('DEBUG_MODE', isDebug.toString());
}

/**
 * Initialize script properties with default values
 * This function should be called at the start of the application
 */
function initializeScriptProperties() {
  const properties = PropertiesService.getScriptProperties();
  
  // Initialize debug mode if not set
  if (!properties.getProperty('DEBUG_MODE')) {
    properties.setProperty('DEBUG_MODE', config.DEFAULT_DEBUG_MODE.toString());
  }
  
  // Add any other property initializations here
  return properties;
}

/**
 * Get current debug mode status
 */
function isDebugMode() {
  return PropertiesService.getScriptProperties().getProperty('DEBUG_MODE') === 'true';
}

/**
 * Toggle debug mode
 */
function toggleDebugMode() {
  const properties = PropertiesService.getScriptProperties();
  const currentMode = properties.getProperty('DEBUG_MODE') === 'true';
  properties.setProperty('DEBUG_MODE', (!currentMode).toString());
  return !currentMode;
}

/**
 * Debug logging helper
 */
function debugLog(...args) {
  if (isDebugMode()) {
    console.log('[DEBUG]', ...args);
  }
}
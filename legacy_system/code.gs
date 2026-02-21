// Code.gs

/**
 * Entry point for the web app
 */
function doGet(e) {
  const template = HtmlService.createTemplateFromFile('index');
  
  // Get subject parameter
  const subject = e?.parameter?.subject;
  
  if (!subject) {
    // No subject provided
    template.subject = '';
    template.subjectError = true;
    template.errorMessage = 'Please provide a subject parameter in the URL';
  } else {
    try {
      // Load questions for the subject
      const questions = getQuestions(subject);
      template.questions = questions;
      template.subject = subject;
      template.subjectError = false;
      template.errorMessage = '';
    } catch (error) {
      console.error('Error loading questions:', error);
      template.subject = '';
      template.subjectError = true;
      template.errorMessage = 'Error loading questions: ' + error.message;
    }
  }

  return template.evaluate()
      .setTitle('MCQ Quiz')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Gets or creates the quiz data folder
 */
function getQuizDataFolder() {
  const folders = DriveApp.getFoldersByName(config.QUIZ_DATA_FOLDER_NAME);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(config.QUIZ_DATA_FOLDER_NAME);
}

/**
 * Validates and sanitizes the subject identifier
 */
function validateSubject(subject) {
  if (!subject) {
    throw new Error('Subject parameter is required');
  }
  
  // Sanitize the subject string
  const sanitizedSubject = subject.replace(/[^a-zA-Z0-9_-]/g, '');
  
  // Validate the sanitized subject
  if (!config.VALID_SUBJECT_PATTERN.test(sanitizedSubject)) {
    throw new Error('Invalid subject format');
  }
  
  return sanitizedSubject;
}

/**
 * Gets questions for a specific subject from Google Drive
 */
// function getQuestions(subject) {
//   try {
//     const sanitizedSubject = validateSubject(subject);
//     const folder = getQuizDataFolder();
    
//     // Look for the subject file
//     const fileName = `${sanitizedSubject}.json`;
//     const files = folder.getFilesByName(fileName);
    
//     if (!files.hasNext()) {
//       throw new Error(`Question set not found: ${fileName}`);
//     }
    
//     // Read and parse the file
//     const file = files.next();
//     const content = file.getBlob().getDataAsString();
//     const questions = JSON.parse(content);
    
//     // Validate questions array
//     if (!Array.isArray(questions)) {
//       throw new Error('Invalid question data format: not an array');
//     }

//     if (questions.length === 0) {
//       throw new Error('No questions found in file');
//     }

//     // Verify each question has required fields
//     questions.forEach((question, index) => {
//       if (!question.title || !question.choices || !Array.isArray(question.choices)) {
//         throw new Error(`Invalid question format at index ${index}`);
//       }
//     });

//     // Return shuffled questions
//     return shuffleArray(questions);
    
//   } catch (error) {
//     console.error('Error loading questions:', error);
//     throw error;
//   }
// }


// 1. Cache Management in Code.gs
const CACHE_DURATION = 21600; // 6 hours in seconds

function getQuestions(subject) {
  try {
    const sanitizedSubject = validateSubject(subject);
    const cacheKey = `quiz_questions_${sanitizedSubject}`;
    
    // Try to get from cache first
    const cache = CacheService.getScriptCache();
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      console.log('Serving questions from cache');
      return JSON.parse(cachedData);
    }

    // If not in cache, load from Drive
    const folder = getQuizDataFolder();
    const fileName = `${sanitizedSubject}.json`;
    const files = folder.getFilesByName(fileName);
    
    if (!files.hasNext()) {
      throw new Error(`Question set not found: ${fileName}`);
    }
    
    const file = files.next();
    const content = file.getBlob().getDataAsString();
    const questions = JSON.parse(content);
    
    // Validate and process questions
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid question data format');
    }

    // Store in cache
    cache.put(cacheKey, JSON.stringify(questions), CACHE_DURATION);
    console.log('Questions cached for', sanitizedSubject);
    
    return questions;
  } catch (error) {
    console.error('Error loading questions:', error);
    throw error;
  }
}

/**
 * Process submitted answers
 */
function submitAnswer(questionIndex, answerIndex, subject) {
  try {
    // Get questions for the specific subject
    const questions = getQuestions(subject);
    
    // Find the question by its unique index
    const question = questions.find(q => q.index === questionIndex);
    if (!question) {
      throw new Error('Question not found');
    }

    // Validate answerIndex
    if (answerIndex < 0 || answerIndex >= question.choices.length) {
      throw new Error('Invalid answer selection');
    }

    const isCorrect = question.choices[answerIndex].isCorrect;
    return {
      isCorrect: isCorrect,
      feedback: isCorrect ? question.feedbackCorrect : question.feedbackIncorrect,
      points: isCorrect ? question.points : 0
    };
  } catch (error) {
    console.error("Error in submitAnswer:", error.message);
    return {
      isCorrect: false,
      feedback: "An error occurred while processing your answer. Please try again.",
      points: 0
    };
  }
}

// Helper function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Send email with quiz results
 */
function logScoreAndSendEmail(username, email, score, totalPossiblePoints) {
    // If no email provided, just return true without sending email
    if (!email) {
        console.log("No email provided, Just inform admin");
        email = config.adminEmail;
    }

    try {
        const subject = `${config.greetingMessage} Quiz Results for ${username}`;
        const body = "Hey " + username + ",\n\n" +
                  "Thank you for completing the MCQ Quiz. Here are your results:\n\n" +
                  "Score: " + score + " out of " + totalPossiblePoints + "\n\n" +
                  "Keep up the good work!\n\n" +
                  "Best regards,\nQuiz Team";

        MailApp.sendEmail({
            to: email,
            cc: config.adminEmail,
            subject: subject,
            body: body
        });
        
        console.log("Email sent to user: " + email + " and CC'd to admin: " + config.adminEmail);
        return true;
    } catch (error) {
        console.error("Error sending email:", error.message);
        return false;
    }
}
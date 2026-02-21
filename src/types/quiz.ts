export interface Choice {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  index: number;
  title: string;
  required: boolean;
  points: number;
  choices: Choice[];
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface QuizData {
  lessonTitle: string;
  questions: Question[];
}

export interface LessonSelection {
  categoryId: string;
  lessonFiles: string[];
  displayName: string;
}

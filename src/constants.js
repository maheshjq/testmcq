export const ADMIN_EMAIL = 'express.run1@gmail.com';

export const READING_SPEED = 25; // chars per second
export const MIN_WAIT_TIME = 8;
export const MAX_WAIT_TIME = 30;

export const SUBJECTS = [
  { id: 'grade_6_lesson_01', label: 'Grade 6 — Lesson 1' },
  { id: 'grade_6_lesson_02', label: 'Grade 6 — Lesson 2' },
  { id: 'grade_7_lesson_01', label: 'Grade 7 — Lesson 1' },
  { id: 'grade_7_lesson_03', label: 'Grade 7 — Lesson 3' },
  { id: 'grade_8_lesson_01', label: 'Grade 8 — Lesson 1' },
  { id: 'grade_9_lesson_01', label: 'Grade 9 — Lesson 1' },
  { id: 'grade_10_lesson_05', label: 'Grade 10 — Lesson 5' },
  { id: 'grade_10_lesson_06', label: 'Grade 10 — Lesson 6' },
];

export const SUBJECT_REGEX = /^grade_\d+_lesson_\d+$/;

export const QUIZ_STATES = {
  IDLE: 'IDLE',
  USERNAME_ENTRY: 'USERNAME_ENTRY',
  LOADING: 'LOADING',
  QUESTION: 'QUESTION',
  FEEDBACK_CORRECT: 'FEEDBACK_CORRECT',
  FEEDBACK_WRONG: 'FEEDBACK_WRONG',
  COUNTDOWN: 'COUNTDOWN',
  FINAL_SCORE: 'FINAL_SCORE',
};

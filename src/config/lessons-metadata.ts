export type CategoryType = 'grade' | 'subject';

export interface LessonMetadata {
  number: number;
  title: string;
  titleEnglish?: string;
  file: string;
}

export interface TopicMetadata {
  id: string;
  title: string;
  titleEnglish: string;
  lessons: LessonMetadata[];
}

export interface CategoryMetadata {
  id: string;
  type: CategoryType;
  grade?: number;
  title: string;
  titleEnglish: string;
  topics?: TopicMetadata[];
  lessons?: LessonMetadata[];
}

export const categories: CategoryMetadata[] = [
  // Grades 6-10
  {
    id: 'grade-6',
    type: 'grade',
    grade: 6,
    title: 'ශ්‍රේණිය 6',
    titleEnglish: 'Grade 6',
    lessons: [
      { number: 1, title: 'පාඩම 1', file: 'sample-questions.js' },
    ],
  },
  {
    id: 'grade-7',
    type: 'grade',
    grade: 7,
    title: 'ශ්‍රේණිය 7',
    titleEnglish: 'Grade 7',
    lessons: [
      { number: 1, title: 'පාඩම 1', file: 'sample-questions.js' },
    ],
  },
  {
    id: 'grade-8',
    type: 'grade',
    grade: 8,
    title: 'ශ්‍රේණිය 8',
    titleEnglish: 'Grade 8',
    lessons: [
      { number: 1, title: 'පාඩම 1', file: 'sample-questions.js' },
    ],
  },
  {
    id: 'grade-9',
    type: 'grade',
    grade: 9,
    title: 'ශ්‍රේණිය 9',
    titleEnglish: 'Grade 9',
    lessons: [
      { number: 1, title: 'පාඩම 1', file: 'sample-questions.js' },
    ],
  },
  {
    id: 'grade-10',
    type: 'grade',
    grade: 10,
    title: 'ශ්‍රේණිය 10',
    titleEnglish: 'Grade 10',
    lessons: [
      { number: 5, title: 'පාඩම 5', file: 'grade-10-lesson-5.js' },
    ],
  },

  // Final Grade - 4 Subjects
  {
    id: 'abhidharma',
    type: 'subject',
    title: 'අභිධර්මය',
    titleEnglish: 'Pali & Abhidhamma',
    topics: [
      {
        id: 'basic-concepts',
        title: 'මූලික කරුණු',
        titleEnglish: 'Basic Concepts',
        lessons: [
          { number: 1, title: 'මූලික කරුණු 01', file: 'abhidharma-basic-concepts-01.js' },
        ],
      },
      {
        id: 'matter-types',
        title: 'රූපයේ ප්‍රභේද',
        titleEnglish: 'Types of Matter',
        lessons: [
          { number: 1, title: 'රූපයේ ප්‍රභේද 01', file: 'abhidharma-matter-types-01.js' },
        ],
      },
    ],
  },
  {
    id: 'culture',
    type: 'subject',
    title: 'සංස්කෘතිය',
    titleEnglish: 'Buddhist Culture',
    topics: [
      {
        id: 'governance',
        title: 'බෞද්ධ පාලනය',
        titleEnglish: 'Buddhist Governance',
        lessons: [
          { number: 1, title: 'බෞද්ධ පාලනය 01', file: 'culture-governance-01.js' },
        ],
      },
      {
        id: 'philosophy',
        title: 'බෞද්ධ දර්ශනය',
        titleEnglish: 'Buddhist Philosophy',
        lessons: [
          { number: 1, title: 'බෞද්ධ දර්ශනය 01', file: 'culture-philosophy-01.js' },
        ],
      },
    ],
  },
  {
    id: 'history',
    type: 'subject',
    title: 'ශාසන ඉතිහාසය',
    titleEnglish: 'History of the Sasana',
    topics: [],
  },
  {
    id: 'buddha',
    type: 'subject',
    title: 'බුද්ධ චරිතය',
    titleEnglish: 'Life of the Buddha',
    topics: [],
  },
];

export function getCategoryById(id: string): CategoryMetadata | undefined {
  return categories.find((c) => c.id === id);
}

export function getGradeCategories(): CategoryMetadata[] {
  return categories.filter((c) => c.type === 'grade');
}

export function getSubjectCategories(): CategoryMetadata[] {
  return categories.filter((c) => c.type === 'subject');
}

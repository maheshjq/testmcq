// function createAllForms() {
//   createMCQForm('MCQ Form 1', questions_01);
//   createMCQForm('MCQ Form 2', questions_02);
//   createMCQForm('MCQ Form 3', questions_03);
//   // Add more as needed
// }

const LESSON_02_GROUP_01 = [208, 161, 120, 79, 38, 189, 148, 107, 66, 25, 207, 172, 131, 90, 49, 200, 162, 121, 80, 39, 190, 149, 108, 67, 26, 8, 96, 55, 14, 138, 2];
const LESSON_02_GROUP_02 = [206, 163, 122, 81, 40, 191, 150, 109, 68, 27, 205, 173, 132, 91, 50, 201, 164, 123, 82, 41, 192, 151, 110, 69, 28, 9, 97, 56, 15, 139, 11];
const LESSON_02_GROUP_03 = [204, 165, 124, 83, 42, 193, 152, 111, 70, 29, 203, 174, 133, 92, 51, 202, 166, 125, 84, 43, 194, 153, 112, 71, 30, 10, 98, 57, 16, 140, 12];
const LESSON_02_GROUP_04 = [195, 167, 126, 85, 44, 180, 154, 113, 72, 31, 179, 168, 127, 86, 45, 178, 141, 137, 100, 59, 18, 17, 58, 99, 4, 3, 1];
const LESSON_02_GROUP_05 = [213, 159, 118, 77, 36, 187, 146, 105, 64, 23, 209, 171, 130, 89, 48, 199, 160, 119, 78, 37, 188, 147, 106, 65, 24, 7, 177, 136, 95, 54, 13];
const LESSON_02_GROUP_06 = [212, 157, 116, 75, 34, 185, 144, 103, 62, 21, 211, 170, 129, 88, 47, 198, 158, 117, 76, 35, 186, 145, 104, 63, 22, 6, 182, 176, 135, 53];
const LESSON_02_GROUP_07 = [196, 155, 114, 73, 32, 183, 142, 101, 60, 19, 210, 169, 128, 87, 46, 197, 156, 115, 74, 33, 184, 143, 102, 61, 20, 5, 181, 175, 134, 93, 52];

const LESSON_20_GROUP_01 = [196, 155, 114, 73, 32, 183, 142, 101, 60, 19, 210, 169, 128, 87, 46, 197, 156, 115, 74, 33, 184, 143, 102, 61, 20, 5, 181, 175, 134, 93, 52];

const LESSSON_ABHIDHARMA_01 = [1, 3, 34, 36, 38, 40, 42, 44, 46, 48, 51, 53, 55, 57, 59, 61, 64, 68, 70, 72, 74, 76, 126]; // අභිධර්මයේ මූලික කරුණු
const LESSSON_ABHIDHARMA_02 = [2, 4, 35, 37, 39, 41, 43, 45, 47, 49, 52, 54, 56, 60, 62, 66, 67, 69, 71, 73, 75, 77, 124, 125, 127, 128]; // අභිධර්මයේ මූලික කරුණු
const LESSSON_ABHIDHARMA_03 = [9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 50, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100]; // අභිධර්මයේ චෛතසික ප්‍රභේද
const LESSSON_ABHIDHARMA_04 = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 65, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101]; // අභිධර්මයේ චෛතසික ප්‍රභේද
const LESSSON_ABHIDHARMA_05 = [102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123]; // අභිධර්මයේ චෛතසික ප්‍රභේද
const LESSSON_ABHIDHARMA_06 = [5, 6, 7, 8, 31, 32, 33, 58, 63, 78]; // අභිධර්මයේ චිත්තයේ ප්‍රභේද 
const LESSSON_ABHIDHARMA_07 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]; // අභිධර්මයේ රූපයේ ප්‍රභේද ප්‍රභේද 
const LESSSON_ABHIDHARMA_08 = [5, 6, 7, 8, 31, 32, 33, 58, 63, 78]; // අභිධර්මයේ රූපයේ ප්‍රභේද ප්‍රභේද 

/**
 * Grade 11 LESSON 01 => බෞද්ධ සිරිත් විරිත්වල පදනම ප්‍රශ්න පත්‍රය
 */
function createMCQForm_Lesson_01() {
  createMCQForm('බෞද්ධ සිරිත් විරිත්වල පදනම ප්‍රශ්න පත්‍රය', questions_01);
}

/**
 * Grade 11 Lesson 02 => පැවිදි ජීවිතය ආශ්‍රිත සිරිත් විරිත් ප්‍රශ්න පත්‍රය 01
 */
function createMCQForm_Lesson_02_01() {
  createMCQForm('පැවිදි ජීවිතය ආශ්‍රිත සිරිත් විරිත් ප්‍රශ්න පත්‍රය 01', questions_02.filter(q => LESSON_02_GROUP_01.includes(q.index)));
}

function createMCQForm_Lesson_02_02() {
  createMCQForm('පැවිදි ජීවිතය ආශ්‍රිත සිරිත් විරිත් ප්‍රශ්න පත්‍රය 02', questions_02.filter(q => LESSON_02_GROUP_02.includes(q.index)));
}
function createMCQForm_Lesson_02_03() {
  createMCQForm('පැවිදි ජීවිතය ආශ්‍රිත සිරිත් විරිත් ප්‍රශ්න පත්‍රය 03', questions_02.filter(q => LESSON_02_GROUP_03.includes(q.index)));
}
function createMCQForm_Lesson_02_04() {
  createMCQForm('පැවිදි ජීවිතය ආශ්‍රිත සිරිත් විරිත් ප්‍රශ්න පත්‍රය 04', questions_02.filter(q => LESSON_02_GROUP_04.includes(q.index)));
}
function createMCQForm_Lesson_02_05() {
  createMCQForm('පැවිදි ජීවිතය ආශ්‍රිත සිරිත් විරිත් ප්‍රශ්න පත්‍රය 05', questions_02.filter(q => LESSON_02_GROUP_05.includes(q.index)));
}
function createMCQForm_Lesson_02_06() {
  createMCQForm('පැවිදි ජීවිතය ආශ්‍රිත සිරිත් විරිත් ප්‍රශ්න පත්‍රය 06', questions_02.filter(q => LESSON_02_GROUP_06.includes(q.index)));
}
function createMCQForm_Lesson_02_07() {
  createMCQForm('පැවිදි ජීවිතය ආශ්‍රිත සිරිත් විරිත් ප්‍රශ්න පත්‍රය 07', questions_02.filter(q => LESSON_02_GROUP_07.includes(q.index)));
}

/**
 * Grade 11 Lesson 13 => බුරුමයේ බුදු දහම ප්‍රශ්න පත්‍රය 01
 */
function createMCQForm_Culture_Lesson_13_01() {
  createMCQForm('බුරුමයේ බුදු දහම ප්‍රශ්න පත්‍රය 01', questions_culture_13_01);
}
function createMCQForm_Culture_Lesson_13_02() {
  createMCQForm('බුරුමයේ බුදු දහම ප්‍රශ්න පත්‍රය 02', questions_culture_13_02);
}

/**
 * Grade 11 Lesson 6 & 7  => බෞද්ධ පාලකයන්ගේ සිරිත් විරිත් and බුදුදහම හා කලා ශිල්ප
 */
function createMCQForm_Culture_Lesson_07_01() {
  createMCQForm('බුදුදහම හා කලා ශිල්ප ප්‍රශ්න පත්‍රය 01', questions_culture_07_01);
}

function createMCQForm_Culture_Lesson_06_01() {
  createMCQForm('බෞද්ධ පාලකයන්ගේ සිරිත් විරිත් ප්‍රශ්න පත්‍රය පත්‍රය 01', questions_culture_06_01);
}


/**
 * Grade 11 අභිධර්මයේ මූලික කරුණු
 */
function createMCQForm_Abhidhamma_Lesson_01() {
  createMCQForm('අභිධර්මයේ මූලික කරුණු ප්‍රශ්න පත්‍රය 01', questions_abhidharma_01.filter(q => LESSSON_ABHIDHARMA_01.includes(q.index)));
}
function createMCQForm_Abhidhamma_Lesson_02() {
  createMCQForm('අභිධර්මයේ මූලික කරුණු ප්‍රශ්න පත්‍රය 02',questions_abhidharma_01.filter(q => LESSSON_ABHIDHARMA_02.includes(q.index)));
}
function createMCQForm_Abhidhamma_Lesson_03() {
  createMCQForm('අභිධර්මයේ චෛතසික ප්‍රභේද ප්‍රශ්න පත්‍රය 01', questions_abhidharma_01.filter(q => LESSSON_ABHIDHARMA_03.includes(q.index)));
}
function createMCQForm_Abhidhamma_Lesson_04() {
  createMCQForm('අභිධර්මයේ චෛතසික ප්‍රභේද ප්‍රශ්න පත්‍රය 02', questions_abhidharma_01.filter(q => LESSSON_ABHIDHARMA_04.includes(q.index)));
}
function createMCQForm_Abhidhamma_Lesson_05() {
  createMCQForm('අභිධර්මයේ චෛතසික ප්‍රභේද ප්‍රශ්න පත්‍රය 03', questions_abhidharma_01.filter(q => LESSSON_ABHIDHARMA_05.includes(q.index)));
}
function createMCQForm_Abhidhamma_Lesson_05() {
  createMCQForm('අභිධර්මයේ චිත්තයේ ප්‍රභේද ප්‍රශ්න පත්‍රය 01', questions_abhidharma_01.filter(q => LESSSON_ABHIDHARMA_06.includes(q.index)));
}
function createMCQForm_Abhidhamma_Lesson_06() {
  createMCQForm('අභිධර්මයේ රූපයේ ප්‍රභේද ප්‍රශ්න පත්‍රය 01', questions_abhidharma_02.filter(q => LESSSON_ABHIDHARMA_07.includes(q.index)));
}
function createMCQForm_Abhidhamma_Lesson_07() {
  createMCQForm('අභිධර්මයේ රූපයේ ප්‍රභේද ප්‍රශ්න පත්‍රය 02', questions_abhidharma_02.filter(q => LESSSON_ABHIDHARMA_08.includes(q.index)));
}

/**
 * Grade 10 
 */
/** Lesson 05  => මහා කාශ්‍යප මහරහතන් වහන්සේ ප්‍රශ්න පත්‍රය 01 / Grade 10 */
function createMCQForm_GRADE_10_Lesson_05_01() {
  createMCQForm('මහා කාශ්‍යප මහරහතන් වහන්සේ - ප්‍රශ්න පත්‍රය 01', questions_grade_10_lesson_05);
}
/** Lesson 20 => ත්‍රිලක්ෂණය ප්‍රශ්න පත්‍රය 01 / Grade 10*/
function createMCQForm_GRADE_10_Lesson_20_01() {
  createMCQForm('ත්‍රිලක්ෂණය ප්‍රශ්න පත්‍රය 01', questions_grade_10_lesson_20);
}
/** Lesson 21 => ත්‍රිලක්ෂණය ප්‍රශ්න පත්‍රය 01 / Grade 10 */
function createMCQForm_GRADE_10_Lesson_21_01() {
  createMCQForm('ජාතක පාළියෙන් බිඳක් - ප්‍රශ්න පත්‍රය 01', questions_grade_10_lesson_21);
}


/**
 * Grade 11 Lesson 01 => බුද්ධ ධර්මය හා පාලි භාෂා පරිචය පටිච්ච සමුප්පාදය ප්‍රශ්න පත්‍රය 01 final grade
 */

function createMCQForm_GRADE_11_paliandDhamma_Lesson_1_01() {
  createMCQForm('බුද්ධ ධර්මය හා පාලි භාෂා පරිචය : පටිච්ච සමුප්පාදය ප්‍රශ්න පත්‍රය 01', questions_dammapali_01);
}



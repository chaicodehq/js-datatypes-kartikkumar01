/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
export function generateReportCard(student) {
  //validations
  if(!isObject(student)) return null;
  if(typeof student.name !== 'string' || student.name === '') return null;
  if(!isObject(student.marks)) return null;
  const subjects = Object.entries(student.marks);
  if(subjects.length === 0) return null;
  if(subjects.some(subject => typeof subject[1] !== 'number' || subject[1] < 0 || subject[1] > 100 )) return null;

  //calculating total marks
  const totalMarks = subjects.reduce((acc, subject) => acc + subject[1],0);

  //calculating percentage
  const numSubjects = subjects.length;
  let percentage = (totalMarks / (numSubjects * 100)) * 100;
  percentage = parseFloat(percentage.toFixed(2));

  //calculating grade
  let grade = 'F';
  if(percentage >=90) grade = 'A+';
  else if(percentage >= 80) grade = 'A';
  else if(percentage >= 70) grade = 'B';
  else if(percentage >= 60) grade = 'C';
  else if(percentage >= 40) grade = 'D';  

  //finding out highest subject
  let highestSubject = subjects[0];
  for(let i = 1; i < subjects.length; i++){
    if(subjects[i][1] > highestSubject[1]){
      highestSubject = subjects[i];
    }
  }
  highestSubject = highestSubject[0];
  
  //finding out the lowest subject
  let lowestSubject = subjects[0];
  for(let i = 1; i < subjects.length; i++){
    if(subjects[i][1] < lowestSubject[1]){
      lowestSubject = subjects[i];
    }
  }
  lowestSubject = lowestSubject[0];

  //filtering out passed subjects
  let passedSubjects = subjects.filter(subject => subject[1] >= 40);
  passedSubjects = passedSubjects.map(subject => subject[0]);

  //failed subjects
  let failedSubjects = subjects.filter(subject => subject[1] < 40);
  failedSubjects = failedSubjects.map(subject => subject [0]);

  const subjectCount = subjects.length;
  const name = student.name;
  return {name, totalMarks, percentage, grade,
          highestSubject, lowestSubject,passedSubjects, failedSubjects, subjectCount}
}

// // At the TOP of src/index.ts
// import type { User, Course } from "../types/index";

// // ===== USING INTERFACES =====
// const student: User = {
//   id: 1,
//   name: "Juan dela Cruz",
//   email: "juan@example.com",
//   role: "student",
//   isActive: true,
// };

// const course: Course = {
//   code: "ITELECT4",
//   title: "IT Elective 4",
//   units: 3,
//   semester: "1st Semester 2026-2027",
// };

// // ===== PRIMITIVE TYPE ANNOTATIONS =====
// const projectName: string = "itelect4-project";
// const currentYear: number = 2026;
// const isFullStack: boolean = true;
// const nothing: null = null;
// const notSet: undefined = undefined;

// function greet(name: string, year: number): string {
//   return `Welcome to ${name} -- AY ${year}!`;
// }

// function logMessage(message: string): void {
//   console.log(message);
// }

// logMessage(greet(projectName, currentYear));

// // ===== SPECIAL TYPES =====
// let anything: any = "hello";
// anything = 42;
// anything = true;

// let userInput: unknown = "test";
// if (typeof userInput === "string") {
//   console.log(userInput.toUpperCase());
// }

// function throwError(message: string): never {
//   throw new Error(message);
// }

// console.log(student);
// console.log(course);


// src/index.ts -- converted from sample.js (GT1 Part 1)
// All variables, parameters, and return types are annotated.
// Uses the User, Course, and Submission interfaces from types/index.ts

import type { User, Course, Submission } from "../types/index";

function getUser(id: number): User {
  const role: "student" | "admin" | "instructor" = "student";

  return {
    id: id,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: role,
    isActive: true,
    score: 95.5,
  };
}

function calculateGrade(score: number, maxScore: number): string {
  const percentage: number = (score / maxScore) * 100;
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  return "F";
}

function formatCourse(name: string, units: number, semester: string): string {
  return `${name} (${units} units) - ${semester}`;
}

const user: User = getUser(1);
console.log(user);
console.log(calculateGrade(85, 100));
console.log(formatCourse("IT Elective 4", 3, "1st Semester"));

// ===== Using the interfaces together =====

const course: Course = {
  name: "IT Elective 4",
  units: 3,
  semester: "1st Semester 2026-2027",
};

const submission: Submission = {
  id: 1,
  studentId: user.id,
  courseName: course.name,
  grade: calculateGrade(user.score, 100),
  submittedAt: new Date(),
};

console.log(course);
console.log(submission);


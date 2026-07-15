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

// ===== GENERIC FUNCTIONS =====
// T is inferred automatically from whatever array you pass in
function getFirst<T>(items: T[]): T | undefined {
return items[0];
}
// Constrained generic -- T must have an "id: number" field
function getById<T extends { id: number }>(
items: T[],
id: number
): T | undefined {
return items.find((item) => item.id === id);
}
// [student] is an array containing one element
const firstUser = getFirst<User>([user]);
const foundUser = getById<User>([user], 1);
// Each ?. checks whether the object on its left exists before trying to access the next property,
//preventing errors if any part of the chain is null or undefined.
console.log(firstUser?.name); // Juan dela Cruz
console.log(foundUser?.email); // juan@example.com

import type { ApiResponse } from "../types/index";
const userResponse: ApiResponse<User> = {
success: true,
data: user,
};
const courseResponse: ApiResponse<Course[]> = {
success: true,
data: [course],
};
console.log(userResponse.data.name); // Juan dela Cruz

// ===== USING UTILITY TYPES =====
import { UserUpdate, UserPreview, PublicUser, RoleCount } from "../types/index";
// Partial<T> -- update payload only needs the changed fields
const patch: UserUpdate = { name: "Juan D. Cruz" };
// Pick<T,K> -- a lightweight preview object
const preview: UserPreview = { id: 1, name: "Juan dela Cruz", role: "student" };
// Omit<T,K> -- safe to expose publicly (no email, no isActive)
const publicProfile: PublicUser = { id: 1, name: "Juan dela Cruz", role: "student", score: 95.5 };
// Record<K,T> -- dashboard-style counts
const roleCount: RoleCount = { student: 45, admin: 2, instructor: 3 };
// ===== ReturnType<T> =====
function makeSubmission(courseCode: string) {
return { id: 1, studentId: 1, courseCode, submittedAt: new Date() };
}
// Infer the shape directly from the function -- no need to redeclare it
type NewSubmission = ReturnType<typeof makeSubmission>;
const gt1Submission: NewSubmission = makeSubmission("ITELECT4")

// ===== USING ENUMS =====
import { SubmissionStatus, Role } from "../types/index";
let status: SubmissionStatus = SubmissionStatus.Pending;
console.log(SubmissionStatus[status]); // "Pending" -- reverse mapping
status = SubmissionStatus.Graded;
console.log(status === SubmissionStatus.Graded); // true
const currentRole: Role = Role.Student;
console.log(currentRole); // "student"
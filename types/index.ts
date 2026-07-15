// ===== INTERFACES =====
// An interface defines the SHAPE of an object -- what fields it must have.
export interface User {
id: number;
name: string;
email: string;
role: "student" | "admin" | "instructor"; // only these values
isActive: boolean;
score: number;
}
export interface Course {
name: string;
units: number;
semester: string;
}
export interface Submission {
id: number;
studentId: number;
courseName: string;
grade: string;
submittedAt: Date;
}
// ===== TYPE ALIASES =====
// A type alias gives a name to any type -- primitives, unions, functions, objects
// Alias for a union type (string OR number)
export type ID = number | string;
// Alias for an object shape
export type Coordinate = {
x: number;
y: number;
};
// Alias for a function signature
export type Formatter = (value: number) => string;
// Using them
const studentId: ID = "S2026-001";
const position: Coordinate = { x: 10, y: 20 };
const formatScore: Formatter = (value) => `${value}%`;
console.log(studentId); // S2026-001
console.log(formatScore(95.5)); // 95.5%

// ===== UNION TYPES -- One OR the other =====
export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive"; // literal union
// Function that accepts a union type
function printId(id: StringOrNumber): void {
console.log(`ID: ${id}`);
}
export { printId };
printId(101);
printId("S2026-001");
// ===== INTERSECTION TYPES -- combines ALL properties =====
// StudentWithCourse must have all User fields AND enrolledCourse AND gpa
export type StudentWithCourse = User & {
enrolledCourse: Course;
gpa: number;
};
const topStudent: StudentWithCourse = {
id: 1, name: "Maria Santos", email: "m@example.com",
role: "student", isActive: true, score: 95.5,
enrolledCourse: { name: "IT Elective 4", units: 3, semester: "1st" },
gpa: 1.25,
};

// Narrowing with typeof
// Without the if-check, TypeScript would error:
// Property 'toUpperCase' does not exist on type 'number'
function processInput(input: StringOrNumber): string {
if (typeof input === "string") {
return input.toUpperCase(); // TypeScript knows: input is string here
}
return input.toFixed(2); // TypeScript knows: input is number here
}
// Narrowing with instanceof
// Used with class instances like Date, Error, etc.
function formatDate(value: string | Date): string {
if (value instanceof Date) {
return value.toLocaleDateString(); // TypeScript knows: it's a Date
}
return value; // TypeScript knows: it's a string
}
console.log(processInput("hello")); // HELLO
console.log(processInput(3.14159)); // 3.14
console.log(formatDate(new Date())); // e.g. 7/4/2026


// ----- types/index.ts -----
// ===== GENERIC INTERFACE =====
// ApiResponse<T> can wrap ANY data type -- every future GT reuses this
export interface ApiResponse<T> {
success: boolean;
data: T;
message?: string;
}
// ===== UTILITY TYPES =====
// Partial<T> -- every field becomes optional
export type UserUpdate = Partial<User>;
// Pick<T, K> -- keep ONLY the listed fields
export type UserPreview = Pick<User, "id" | "name" | "role">;
// Omit<T, K> -- keep every field EXCEPT the listed ones
export type PublicUser = Omit<User, "email" | "isActive">;
// Record<K, T> -- a fixed set of keys, each mapped to the same value type
export type RoleCount = Record<
"student" | "admin" | "instructor",
number
>;

// ===== ENUMS =====
// Regular enum -- exists at runtime; can be looped over or reverse-mapped
export enum SubmissionStatus {
Pending,
Graded,
Late,
}
// const enum -- inlined at compile time, zero runtime overhead
export const enum Role {
Student = "student",
Admin = "admin",
Instructor = "instructor",
}
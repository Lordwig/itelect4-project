# ITELECT4 Project -- GT1

## Project Concept

This is a small TypeScript learning project for ITELECT4 that models a simple
academic tracking system. It represents a **User** (a student, admin, or
instructor), a **Course** they can be enrolled in, and a **Submission** a
student makes for a course, including its grade and status. The project
demonstrates core TypeScript features -- interfaces, type aliases, unions,
intersections, generics, utility types, and enums.

## Interfaces / Types Defined

**Interfaces** (`types/index.ts`)
- `User` -- id, name, email, role, isActive, score
- `Course` -- name, units, semester
- `Submission` -- id, studentId, courseName, grade, submittedAt
- `ApiResponse<T>` -- generic wrapper for API-style responses

**Utility Types**
- `UserUpdate` -- `Partial<User>`
- `UserPreview` -- `Pick<User, "id" | "name" | "role">`
- `PublicUser` -- `Omit<User, "email" | "isActive">`
- `RoleCount` -- `Record<"student" | "admin" | "instructor", number>`
- `NewSubmission` -- `ReturnType<typeof makeSubmission>`

**Enums**
- `SubmissionStatus` -- regular enum
- `Role` -- const enum

## How to run it

- bash
- npm install
- npx tsc --noEmit
- npx ts-node src/index.ts

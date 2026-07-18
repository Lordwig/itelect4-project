// src/components/SubmissionBadge.tsx
import type { Submission } from "../types/index";

interface SubmissionBadgeProps {
  submission: Submission;
  children?: React.ReactNode;
}

const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({
  submission,
  children,
}) => {
  return (
    <div className="submission-badge">
      <p>Course: {submission.courseName}</p>
      <p>Grade: {submission.grade ?? "Not graded yet"}</p>
      {children}
    </div>
  );
};

export default SubmissionBadge;
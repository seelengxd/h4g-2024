import { User } from "../users/users";

export type AnswerValue = number | string | number[];

export interface Answer {
  questionId: number;
  value: AnswerValue;
}

export interface Submission {
  id?: number;
  answer: Answer[];
}

export interface SubmissionData extends Submission {
  user: User;
}

export interface SubmissionPostData extends Submission {
  submissionId?: number;
  enrollmentFormId: number;
}

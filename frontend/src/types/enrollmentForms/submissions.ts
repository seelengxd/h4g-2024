export type AnswerValue = number | string | number[];

export interface Answer {
  questionId: number;
  value: AnswerValue;
}

export interface Submission {
  id?: number;
  answer: Answer[];
}

export interface SubmissionPostData extends Submission {
  submissionId?: number;
  enrollmentFormId: number;
}

import { FormData } from "../forms/forms";
import { SubmissionData } from "./submissions";

export interface EnrollmentForm {
  id?: number;
  formSchema: FormData;
  activityId: number;
  submissions: SubmissionData[];
}

export interface EnrollmentFormPostData {
  id?: number;
  formSchema: FormData;
  activityId: number;
}

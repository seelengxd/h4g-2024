import { FormData } from "../forms/forms";
import { Submission } from "./submissions";

export interface EnrollmentForm {
  id?: number;
  formSchema: FormData;
  activityId: number;
  submissions: Submission[];
}

export interface EnrollmentFormPostData {
  id?: number;
  formSchema: FormData;
  activityId: number;
}

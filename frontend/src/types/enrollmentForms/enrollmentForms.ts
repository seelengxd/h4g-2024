import { FormData } from "../forms/forms";

export interface EnrollmentForm {
  id?: number;
  formSchema: FormData;
  activityId: number;
}

export interface EnrollmentFormPostData {
  id?: number;
  formSchema: FormData;
  activityId: number;
}

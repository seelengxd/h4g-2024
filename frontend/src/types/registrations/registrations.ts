import { SubmissionData } from "../enrollmentForms/submissions";
import { Feedback } from "../feedback/feedback";
import { SessionData } from "../sessions/sessions";
import { UserMiniData } from "../users/users";

export type Attendance = boolean | null;

export interface RegistrationMiniData {
  id: number;
  attendance: Attendance;
}

export interface Registration extends RegistrationMiniData {
  session: SessionData;
  feedback: Feedback;
}

export interface UserRegistration extends RegistrationMiniData {
  user: UserMiniData;
  submission?: SubmissionData;
}

export interface RegistrationData extends UserRegistration {
  feedback: Feedback;
}

export interface RegistrationPostData {
  sessionIds: number[];
  submissionId?: number;
}

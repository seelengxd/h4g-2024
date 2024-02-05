import { SubmissionData } from "../enrollmentForms/submissions";
import { SessionData } from "../sessions/sessions";
import { User } from "../users/users";

export interface RegistrationMiniData {
  id: number;
  attendance: boolean | null;
}

export interface Registration extends RegistrationMiniData {
  session: SessionData;
}

export interface UserRegistration extends RegistrationMiniData {
  user: User;
  submission?: SubmissionData;
}

export interface RegistrationPostData {
  sessionIds: number[];
  submissionId?: number;
}

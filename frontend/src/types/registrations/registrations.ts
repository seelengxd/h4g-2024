import { SessionData } from "../sessions/sessions";
import { User } from "../users/users";

export type Attendance = boolean | null;

export interface RegistrationMiniData {
  id: number;
  attendance: Attendance;
}

export interface Registration extends RegistrationMiniData {
  session: SessionData;
}

export interface UserRegistration extends RegistrationMiniData {
  user: User;
}

export interface RegistrationPostData {
  sessionIds: number[];
}

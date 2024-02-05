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
}

export interface RegistrationPostData {
  sessionIds: number[];
}

import { SessionData } from "../sessions/sessions";

export interface RegistrationMiniData {
  id: number;
}

export interface Registration extends RegistrationMiniData {
  session: SessionData;
}

export interface RegistrationPostData {
  sessionIds: number[];
}

import { SessionData } from "../sessions/sessions";

export interface Registration {
  id: number;
  session: SessionData;
}

export interface RegistrationPostData {
  sessionIds: number[];
}

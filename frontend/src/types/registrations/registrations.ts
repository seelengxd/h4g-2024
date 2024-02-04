import { SessionData } from "../activities/activities";

export interface Registration {
  id: number;
  session: SessionData;
}

export interface RegistrationPostData {
  sessionIds: number[];
}

import { ActivityData } from "../activities/activities";
import { Submission } from "../forms/forms";
import { UserRegistration } from "../registrations/registrations";

export interface SessionPostData {
  start: Date;
  end: Date;
  id?: number;
}

export interface SessionMiniData {
  start: Date;
  end: Date;
  id: number;
}

export interface SessionData extends SessionMiniData {
  activity: ActivityData;
  registrations: UserRegistration[];
}

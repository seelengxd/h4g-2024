import { ActivityData } from "../activities/activities";

import {
  RegistrationData,
  UserRegistration,
} from "../registrations/registrations";

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
  registrations: RegistrationData[];
}

export interface SessionWithMinutesData extends SessionData {
  minutes: number;
}

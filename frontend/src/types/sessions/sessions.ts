import { ActivityData } from "../activities/activities";

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
}

import { Organisation } from "../organisations/organisations";

export interface ActivityDatePostData {
  start: Date;
  end: Date;
  id?: number;
}

export interface ActivityDate {
  start: Date;
  end: Date;
  id: number;
}

export type ActivityType = "VOLUNTEER" | "WORKSHOP" | "TRAINING";

export interface Activity {
  id: number;
  name: string;
  type: ActivityType;
  description: string;
  organisationId: number;
  organisation: Organisation;
  ActivityDate: ActivityDate[];
}

export interface ActivityPostData {
  name: string;
  type: ActivityType;
  organisationId: number;
  activityDates: ActivityDatePostData[];
  description: string;
}

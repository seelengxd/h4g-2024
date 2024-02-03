import { EnrollmentForm } from "../enrollmentForms/enrollmentForms";
import { Organisation } from "../organisations/organisations";

export interface SessionPostData {
  start: Date;
  end: Date;
  id?: number;
}

export interface Session {
  start: Date;
  end: Date;
  id: number;
}

export type ActivityType = "VOLUNTEER" | "WORKSHOP" | "TRAINING";

export interface ActivityMiniData {
  id: number;
  name: string;
  type: ActivityType;
  description: string;
  organisationId: number;
  organisation: Organisation;
  location: string;
  sessions: Session[];
}

export interface ActivityData extends ActivityMiniData {
  enrollmentForm: EnrollmentForm;
}

export interface ActivityPostData {
  name: string;
  type: ActivityType;
  organisationId: number;
  sessions: SessionPostData[];
  description: string;
  location: string;
}

import { EnrollmentForm } from "../enrollmentForms/enrollmentForms";
import { Organisation } from "../organisations/organisations";
import {
  SessionData,
  SessionMiniData,
  SessionPostData,
} from "../sessions/sessions";

export interface Image {
  id: number;
  imageUrl: string;
}

export type ActivityType = "VOLUNTEER" | "WORKSHOP" | "TRAINING";

export interface ActivityMiniData {
  id: number;
  name: string;
  type: ActivityType;
  description: string;
  organisationId: number;
  organisationName: string;
  location: string;
  sessions: SessionData[];
  images: Image[];
  capacity: number;
  loadedImages?: File[];
}

export interface ActivityData extends ActivityMiniData {
  enrollmentForm?: EnrollmentForm;
  organisation: Organisation;
}

export interface ActivityPostData {
  name: string;
  type: ActivityType;
  organisationId: number;
  sessions: SessionPostData[];
  description: string;
  location: string;
  images: File[];
}

import { EnrollmentForm } from "../enrollmentForms/enrollmentForms";

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
  sessions: Session[];
  images: Image[];
  capacity: number;
  loadedImages?: File[];
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
  images: File[];
}

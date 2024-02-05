import { Registration } from "../registrations/registrations";

export interface Feedback {
  id?: number;
  userReflection: string;
  actualFeedback: string;
  minutesServed: number;
  registration: Registration;
  status: "Pending" | "Accepted" | "Rejected";
}

export interface FeedbackPostData extends Feedback {
  registrationId: number;
}

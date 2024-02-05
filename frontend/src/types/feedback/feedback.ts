export interface Feedback {
  id?: number;
  userReflection: string;
  actualFeedback: string;
  minutesServed: number;
}

export interface FeedbackPostData extends Feedback {
  registrationId: number;
}

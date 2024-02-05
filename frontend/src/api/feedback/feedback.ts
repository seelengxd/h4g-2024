import client from "../base";

import {
  Submission,
  SubmissionPostData,
} from "../../types/enrollmentForms/submissions";
import { Feedback, FeedbackPostData } from "../../types/feedback/feedback";

class FeedbackAPI {
  protected getFeedbackUrl(): string {
    return "/feedbacks";
  }

  public async getFeedback(id: number): Promise<Feedback> {
    const response = await client.get(`${this.getFeedbackUrl()}/${id}`);
    return response.data.data;
  }

  public async createSubmission(data: FeedbackPostData) {
    return await client.post(`${this.getFeedbackUrl()}`, data);
  }

  public async updateSubmission(id: number, data: SubmissionPostData) {
    return await client.put(`${this.getFeedbackUrl()}/${id}`, data);
  }
}

const feedbackAPI = new FeedbackAPI();
export default feedbackAPI;

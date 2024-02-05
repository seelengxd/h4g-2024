import client from "../base";

import {
  Submission,
  SubmissionPostData,
} from "../../types/enrollmentForms/submissions";

class SubmissionsAPI {
  protected getSubmissionsUrl(): string {
    return "/submissions";
  }

  public async getSubmission(id: number): Promise<Submission> {
    const response = await client.get(`${this.getSubmissionsUrl()}/${id}`);
    return response.data.data;
  }

  public async createSubmission(data: SubmissionPostData): Promise<Submission> {
    const response = await client.post(`${this.getSubmissionsUrl()}`, data);
    return response.data.data;
  }

  public async updateSubmission(id: number, data: SubmissionPostData) {
    return await client.put(`${this.getSubmissionsUrl()}/${id}`, data);
  }

  public async deleteSubmission(id: number) {
    return await client.delete(`${this.getSubmissionsUrl()}/${id}`);
  }
}

const submissionsAPI = new SubmissionsAPI();
export default submissionsAPI;

import client from "../base";
import {
  EnrollmentForm,
  EnrollmentFormPostData,
} from "../../types/enrollmentForms/enrollmentForms";

class EnrollmentFormsAPI {
  protected getEnrollmentFormsUrl(): string {
    return "/enrollment-forms";
  }

  public async getEnrollmentForm(id: number): Promise<EnrollmentForm> {
    const response = await client.get(`${this.getEnrollmentFormsUrl()}/${id}`);
    return response.data.data;
  }

  public async createEnrollmentForm(data: EnrollmentFormPostData) {
    return await client.post(`${this.getEnrollmentFormsUrl()}`, data);
  }

  public async updateEnrollmentForm(id: number, data: EnrollmentFormPostData) {
    return await client.put(`${this.getEnrollmentFormsUrl()}/${id}`, data);
  }

  public async deleteEnrollmentForm(id: number) {
    return await client.delete(`${this.getEnrollmentFormsUrl()}/${id}`);
  }
}

const enrollmentFormsAPI = new EnrollmentFormsAPI();
export default enrollmentFormsAPI;

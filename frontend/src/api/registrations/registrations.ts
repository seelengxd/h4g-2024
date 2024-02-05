import {
  Registration,
  RegistrationPostData,
  UserRegistration,
} from "../../types/registrations/registrations";
import client from "../base";

class RegistrationsAPI {
  protected getSubmissionsUrl(): string {
    return "/registrations";
  }

  public async getAllRegistrations(): Promise<Registration[]> {
    const response = await client.get(this.getSubmissionsUrl());
    return response.data.data;
  }

  public async createRegistration(data: RegistrationPostData) {
    return await client.post(`${this.getSubmissionsUrl()}`, data);
  }

  public async markAttended(data: UserRegistration): Promise<UserRegistration[]> {
    const response = await client.put(`${this.getSubmissionsUrl()}/${data.id}/markAttended`, data);
    return response.data.data;
  }

  public async markAbsent(data: UserRegistration): Promise<UserRegistration[]> {
    const response = await client.put(`${this.getSubmissionsUrl()}/${data.id}/markAbsent`, data);
    return response.data.data;
  }

  public async unmark(data: UserRegistration): Promise<UserRegistration[]> {
    const response = await client.put(`${this.getSubmissionsUrl()}/${data.id}/unmark`, data);
    return response.data.data;
  }
}

const registrationsAPI = new RegistrationsAPI();
export default registrationsAPI;

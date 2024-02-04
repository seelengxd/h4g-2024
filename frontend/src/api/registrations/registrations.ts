import {
  Registration,
  RegistrationPostData,
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
}

const registrationsAPI = new RegistrationsAPI();
export default registrationsAPI;

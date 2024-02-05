import {
  Registration,
  RegistrationPostData,
  UserRegistration,
} from "../../types/registrations/registrations";
import client from "../base";

class RegistrationsAPI {
  protected getRegistrationsUrl(): string {
    return "/registrations";
  }

  public async getAllRegistrations(): Promise<Registration[]> {
    const response = await client.get(this.getRegistrationsUrl());
    return response.data.data;
  }

  public async getRegistration(id: number): Promise<Registration> {
    const response = await client.get(this.getRegistrationsUrl() + "/" + id);
    return response.data.data;
  }

  public async createRegistration(data: RegistrationPostData) {
    console.log(data);
    return await client.post(`${this.getRegistrationsUrl()}`, data);
  }

  public async markAttended(
    data: UserRegistration
  ): Promise<UserRegistration[]> {
    const response = await client.put(
      `${this.getRegistrationsUrl()}/${data.id}/markAttended`,
      data
    );
    return response.data.data;
  }

  public async markAbsent(data: UserRegistration): Promise<UserRegistration[]> {
    const response = await client.put(
      `${this.getRegistrationsUrl()}/${data.id}/markAbsent`,
      data
    );
    return response.data.data;
  }

  public async unmark(data: UserRegistration): Promise<UserRegistration[]> {
    const response = await client.put(
      `${this.getRegistrationsUrl()}/${data.id}/unmark`,
      data
    );
    return response.data.data;
  }
}

const registrationsAPI = new RegistrationsAPI();
export default registrationsAPI;

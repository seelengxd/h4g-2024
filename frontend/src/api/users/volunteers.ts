import { UserData, UserMiniData } from "../../types/users/users";
import client from "../base";

class VolunteersAPI {
  protected getVolunteersUrl(): string {
    return "/volunteers";
  }

  public async getAllVolunteers(): Promise<UserMiniData[]> {
    const response = await client.get(this.getVolunteersUrl());
    return response.data.data;
  }

  public async getVolunteer(id: number): Promise<UserData> {
    const response = await client.get(`${this.getVolunteersUrl()}/${id}`);
    return response.data.data;
  }
}

const volunteersApi = new VolunteersAPI();
export default volunteersApi;

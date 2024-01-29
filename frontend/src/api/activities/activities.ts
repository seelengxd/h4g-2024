import client from "../base";
import { Activity, ActivityPostData } from "../../types/activities/activities";

class ActivitiesAPI {
  protected getActivitiesUrl(): string {
    return "/activities";
  }

  public async getAllActivities(): Promise<Activity[]> {
    const response = await client.get(this.getActivitiesUrl());
    return response.data.data;
  }

  public async getActivity(id: number): Promise<Activity> {
    const response = await client.get(`${this.getActivitiesUrl()}/${id}`);
    return response.data.data;
  }

  public async createActivity(data: ActivityPostData) {
    return await client.post(`${this.getActivitiesUrl()}`, data);
  }

  public async updateActivity(id: number, data: ActivityPostData) {
    return await client.put(`${this.getActivitiesUrl()}/${id}`, data);
  }

  public async deleteActivity(id: number) {
    return await client.delete(`${this.getActivitiesUrl()}/${id}`);
  }
}

const activitiesAPI = new ActivitiesAPI();
export default activitiesAPI;

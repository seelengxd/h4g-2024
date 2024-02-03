import client from "../base";
import {
  ActivityData,
  ActivityMiniData,
  ActivityPostData,
} from "../../types/activities/activities";

class ActivitiesAPI {
  protected getActivitiesUrl(): string {
    return "/activities";
  }

  public async getAllActivities(): Promise<ActivityMiniData[]> {
    const response = await client.get(this.getActivitiesUrl());
    return response.data.data;
  }

  public async getActivity(id: number): Promise<ActivityData> {
    const response = await client.get(`${this.getActivitiesUrl()}/${id}`);
    return response.data.data;
  }

  public async createActivity(data: ActivityPostData) {
    const form = new FormData();
    form.append("name", data.name);
    form.append("type", data.type);
    form.append("organisationId", data.organisationId.toString());
    form.append("description", data.description);
    form.append("location", data.location);

    // Append images if available
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((image, index) => {
        form.append(`images`, image as Blob);
      });
    }

    if (data.sessions && data.sessions.length > 0) {
      form.append("sessions", JSON.stringify(data.sessions));
    }

    return await client.post(this.getActivitiesUrl(), form);
  }

  public async updateActivity(id: number, data: ActivityPostData) {
    const form = new FormData();
    form.append("name", data.name);
    form.append("type", data.type);
    form.append("organisationId", JSON.stringify(data.organisationId));
    form.append("description", data.description);
    form.append("location", data.location);

    // Append images if available
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((image, index) => {
        form.append(`images`, image as Blob);
      });
    }

    if (data.sessions && data.sessions.length > 0) {
      form.append("sessions", JSON.stringify(data.sessions));
    }

    return await client.put(`${this.getActivitiesUrl()}/${id}`, form);
  }

  public async deleteActivity(id: number) {
    return await client.delete(`${this.getActivitiesUrl()}/${id}`);
  }
}

const activitiesAPI = new ActivitiesAPI();
export default activitiesAPI;

import client from "../base";
import {
  Organisation,
  OrganisationsPostData,
} from "../../types/organisations/organisations";

class OrganisationsAPI {
  protected getOrganisationsUrl(): string {
    return "/organisations";
  }

  public async getAllOrganisations(): Promise<Organisation[]> {
    const response = await client.get(this.getOrganisationsUrl());
    console.log(response.data.data);
    return response.data.data;
  }

  public async getOrganisation(id: number): Promise<Organisation> {
    const response = await client.get(`${this.getOrganisationsUrl}/${id}`);
    return response.data.data;
  }

  public async createOrganisation(data: OrganisationsPostData) {
    const form = new FormData();
    form.append("name", data.name);
    form.append("description", data.description);
    form.append("websiteUrl", data.websiteUrl || "");
    if (data.image) {
      form.append("image", data.image as Blob);
    }
    return await client.post(this.getOrganisationsUrl(), form);
  }

  public async updateOrganisation(id: number, data: OrganisationsPostData) {
    return await client.put(`${this.getOrganisationsUrl}/${id}`, data);
  }

  public async deleteOrganisation(id: number) {
    await client.delete(`${this.getOrganisationsUrl}/${id}`);
  }
}

const organisationsAPI = new OrganisationsAPI();
export default organisationsAPI;

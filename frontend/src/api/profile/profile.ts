import client from "../base";
import { Profile, PostData } from "../../types/users/profiles";

class ProfilesAPI {
  protected getProfilesUrl(): string {
    return "/profile";
  }

  public async getAllProfiles(): Promise<Profile[]> {
    const response = await client.get(this.getProfilesUrl());
    return response.data.data;
  }

  public async getProfile(): Promise<Profile> {
    const response = await client.get(`${this.getProfilesUrl()}`);
    return response.data.data;
  }

  public async updateProfile(data: PostData): Promise<Number> {
    const form = new FormData();

    form.append("fullName", data.fullName);
    form.append("preferredName", data.prefName);
    form.append("email", data.email);
    form.append("dob", data.dob?.toISOString() || "");
    form.append("description", data.description || "");
    form.append("imageUrl", data.imageUrl || "");
    if (data.image) {
      form.append("image", data.image as Blob);
    }

    form.append("driving", JSON.stringify(data.driving));
    form.append("ownVehicle", JSON.stringify(data.ownVehicle));
    form.append("availability", data.availability);
    form.append("immigrationStatus", JSON.stringify(data.immigrationStatus));
    form.append("educationLevel", JSON.stringify(data.educationLevel));
    form.append("commitmentLevel", JSON.stringify(data.commitmentLevel));
    form.append("salutation", data.salutation);
    data.interests.forEach((interest) =>
      form.append("interests[]", interest.toString())
    );
    data.skills.forEach((skill) => form.append("skills[]", skill.toString()));

    const response = await client.put(`${this.getProfilesUrl()}`, form);

    return response.data.id;
  }

  //future
  public async deleteProfile() {}
}

const profilesAPI = new ProfilesAPI();
export default profilesAPI;

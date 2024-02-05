import client from "../base";
import { Profile, PostData } from "../../types/users/profiles";


class ProfilesAPI {
    protected getProfilesUrl(): string {
        return "/profile"
    };

    public async getProfile(): Promise<Profile> {
        const response = await client.get(`${this.getProfilesUrl()}`);
        return response.data.data;
    }

    public async updateProfile(data: PostData): Promise<Number> {
        const form = new FormData();

        form.append("dob", data.dob?.toISOString() || "");
        form.append("description", data.description || "");
        form.append("imageUrl", data.imageUrl || "");

        data.interests.forEach((interest) => form.append('interest[]', interest.toString()));
        data.skills.forEach((skill) => form.append('interest[]', skill.toString()));

        // form.append("monday", data.monday.toString());
        // form.append("tuesday", data.tuesday.toString());
        // form.append("wednesday", data.wednesday.toString());
        // form.append("thursday", data.thursday.toString());
        // form.append("friday", data.friday.toString());
        // form.append("saturday", data.saturday.toString());
        // form.append("sunday", data.sunday.toString());

        const response = await client.put(`${this.getProfilesUrl()}`, form);
        console.log(response)

        return response.data.id;
    }

    //does not delete user, only clears profile info
    public async deleteProfile() {
        //await client.delete();
    }

}

const profilesAPI = new ProfilesAPI();
export default profilesAPI;

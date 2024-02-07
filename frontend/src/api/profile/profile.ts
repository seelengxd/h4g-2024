import client from "../base";
import { Profile, PostData } from "../../types/users/profiles";


class ProfilesAPI {
    protected getProfilesUrl(): string {
        return "/profile"
    };

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

        //console.log("dob"+ data.dob);
        //console.log("dob" + typeof data.dob)
        form.append("fullName", data.fullName);
        form.append("preferredName", data.prefName);
        form.append("email", data.email);
        form.append("dob", data.dob?.toISOString() || "");
        form.append("description", data.description || "");
        form.append("imageUrl", data.imageUrl || "");
        if (data.image) {
            form.append("image", data.image as Blob);
        }

        //console.log("interests in api ==== ", data.interests)
        //console.log("skills in api ==== ", data.skills)

        data.interests.forEach((interest) => form.append('interests[]', interest.toString()));
        data.skills.forEach((skill) => form.append('skills[]', skill.toString()));

        // form.append("monday", data.monday.toString());
        // form.append("tuesday", data.tuesday.toString());
        // form.append("wednesday", data.wednesday.toString());
        // form.append("thursday", data.thursday.toString());
        // form.append("friday", data.friday.toString());
        // form.append("saturday", data.saturday.toString());
        // form.append("sunday", data.sunday.toString());

        const response = await client.put(`${this.getProfilesUrl()}`, form);
        //console.log(response)

        return response.data.id;
    }

    //future
    public async deleteProfile() {
    }

}

const profilesAPI = new ProfilesAPI();
export default profilesAPI;

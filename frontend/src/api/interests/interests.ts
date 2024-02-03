import { Interest } from "../../types/interests/interests";
import client from "../base";

class InterestsAPI {
  protected getInterestsUrl(): string {
    return "/interests";
  }

  public async getAllInterests(): Promise<Interest[]> {
    const response = await client.get(this.getInterestsUrl());
    return response.data.data;
  }
}

const interestApi = new InterestsAPI();
export default interestApi;


import client from "../base";
import { Skill } from "../../types/skills/skills";

class SkillsAPI {
  protected getSkillsUrl(): string {
    return "/skills";
  }

  public async getAllSkills(): Promise<Skill[]> {
    const response = await client.get(this.getSkillsUrl());
    console.log(response.data.data);
    return response.data.data;
  }
}

const skillsApi = new SkillsAPI();
export default skillsApi;

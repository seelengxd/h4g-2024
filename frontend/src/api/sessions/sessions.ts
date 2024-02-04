import { SessionData } from "../../types/sessions/sessions";
import client from "../base";

class SessionAPI {
  protected getSessionsUrl(): string {
    return "/sessions";
  }

  public async getSession(id: number): Promise<SessionData> {
    const response = await client.get(`${this.getSessionsUrl()}/${id}`);
    return response.data.data;
  }
}

const sessionApi = new SessionAPI();
export default sessionApi;

import client from "../base";
import type { LogInPostData, SignUpPostData } from "../../types/users/auth";
import type { User } from "../../types/users/users";

class AuthAPI {
  protected getAuthUrl(): string {
    return "/auth";
  }

  public async logIn(data: LogInPostData): Promise<User> {
    const response = await client.post(this.getAuthUrl() + "/login", data);
    return response.data.user;
  }

  public async logOut(): Promise<void> {
    await client.post(this.getAuthUrl() + "/logout");
  }

  public async signUp(data: SignUpPostData): Promise<never> {
    return await client.post(this.getAuthUrl() + "/signup", data);
  }

  public async getCurrentUser(): Promise<User> {
    const response = await client.get(this.getAuthUrl() + "/current-user");
    return response.data.user;
  }
}

const authApi = new AuthAPI();
export default authApi;
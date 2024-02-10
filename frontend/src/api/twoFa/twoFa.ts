import { UserInfo } from "../../pages/auth/TwoFaSgIdRedirect";
import { UserTwoFaData } from "../../types/twoFa/twoFa";
import client from "../base";

class TwoFaApi {
  protected getTwoFaUrl(): string {
    return "/two-fa";
  }

  public async authenticateTwoFa(): Promise<{ redirectUrl: string }> {
    const response = await client.get(`${this.getTwoFaUrl()}/auth-url`);
    return response.data.data;
  }

  public async getUserInfo(): Promise<UserInfo> {
    const response = await client.get(`${this.getTwoFaUrl()}/user-info`);
    return response.data.data;
  }

  public async hasTwoFaSession(): Promise<UserTwoFaData> {
    const response = await client.get(
      `${this.getTwoFaUrl()}/has-two-fa-session`
    );
    return response.data.data;
  }

  public async deleteTwoFaSession(): Promise<void> {
    return await client.post(`${this.getTwoFaUrl()}/reset-two-fa-session`);
  }

  public async configureTwoFaSession(isEnabled: boolean): Promise<void> {
    return await client.post(`${this.getTwoFaUrl()}/set-two-fa-preference`, {
      isEnabled,
    });
  }
}

const twoFaApi = new TwoFaApi();
export default twoFaApi;

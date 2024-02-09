import { UserInfo } from "../../pages/auth/TwoFaSgIdRedirect";
import client from "../base";

class TwoFaApi {
  protected getTwoFaUrl(): string {
    return "/two-fa";
  }

  public async authenticateTwoFa(): Promise<{ redirectUrl: string }> {
    const response = await client.get(`${this.getTwoFaUrl()}/auth-url`);
    return response.data.data;
  }

  public async hasTwoFaSession(): Promise<UserInfo> {
    const response = await client.get(
      `${this.getTwoFaUrl()}/has_two_fa_session`
    );
    return response.data.data;
  }
}

const twoFaApi = new TwoFaApi();
export default twoFaApi;

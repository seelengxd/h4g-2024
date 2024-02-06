import { Profile } from "./profiles";

export interface User {
  id: number;
  fullName: string;
  preferredName: string;
  email: string;
  role: "USER" | "ADMIN";
  profile: Profile;
}

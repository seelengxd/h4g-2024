import { Registration } from "../registrations/registrations";
import { Profile } from "./profiles";

export interface UserMiniData {
  id: number;
  fullName: string;
  preferredName: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface UserData extends UserMiniData {
  profile: Profile;
  registrations: Registration[];
}

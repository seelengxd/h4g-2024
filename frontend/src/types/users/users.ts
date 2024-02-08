import { Profile } from "./profiles";
import { Registration } from "../registrations/registrations";
export interface User {
  id: number;
  fullName: string;
  preferredName: string;
  email: string;
  role: "USER" | "ADMIN";
  profile: Profile;
  phone: string;
}

export interface UserMiniData {
  id: number;
  fullName: string;
  preferredName: string;
  email: string;
  role: "USER" | "ADMIN";
  profile: Profile;
}

export interface UserData extends UserMiniData {
  profile: Profile;
  registrations: Registration[];
}

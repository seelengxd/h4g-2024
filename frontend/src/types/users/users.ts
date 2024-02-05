export interface User {
  id: number;
  fullName: string;
  email: string;
  preferredName: string; //todo double check if this is ok
  role: "USER" | "ADMIN";
}

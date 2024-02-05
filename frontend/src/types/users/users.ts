export interface User {
  id: number;
  fullName: string;
  preferredName: string;
  email: string;
  role: "USER" | "ADMIN";
}

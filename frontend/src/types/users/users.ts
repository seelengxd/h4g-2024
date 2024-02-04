export interface User {
  id: number;
  // username: string;
  email: string;
  role: "USER" | "ADMIN";
  fullName: string;
  preferredName: string;
}

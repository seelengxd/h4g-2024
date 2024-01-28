export interface User {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
}

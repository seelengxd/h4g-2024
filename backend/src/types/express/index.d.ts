interface User {
  id: number;
  username: string;
  email: string;
}

export {};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

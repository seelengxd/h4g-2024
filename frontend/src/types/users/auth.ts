export interface LogInPostData {
  username: string;
  password: string;
}

export interface SignUpPostData extends LogInPostData {
  email: string;
  confirmPassword: string;
}

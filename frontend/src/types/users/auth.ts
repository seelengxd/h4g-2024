export interface LogInPostData {
  email: string;
  password: string;
}

export interface SignUpPostData extends LogInPostData {
  fullName: string;
  preferredName: string;
  confirmPassword: string;
}

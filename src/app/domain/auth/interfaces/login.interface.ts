export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface GoogleLoginRequest {
  credential: string;
}

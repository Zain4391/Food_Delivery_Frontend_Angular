import { User } from "./user.type";

export interface AuthResponse {
  statusCode: number;
  success: boolean;
  data: {
    access_token: string;
    user: User;
  };
  message: string;
}
export interface UserRegisterResponse {
  statusCode: number;
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    vehicle_type: string;
    address: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  message: string;
}
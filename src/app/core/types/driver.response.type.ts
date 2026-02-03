export interface DriverRegisterResponse {
  statusCode: number;
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    vehicle_type: string;
    profile_image_url: string | null;
    is_available: boolean;
    role: string;
    created_at: string;
    updated_at: string;
  };
  message: string;
}
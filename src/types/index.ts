
export type Product = {
  _id: string;
  name: string;
  price: number;
};


export interface LoginPayload {
  email: string;
  password: string;
}


export interface User {
  _id: string;
  email: string;
  password: string;
}


export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: any; // For additional fields
}

export interface RegistrationResult {
  success: boolean;
  acknowledged?: boolean;
  insertedId?: string;
  error?: string;
}
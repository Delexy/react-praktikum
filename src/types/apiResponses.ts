import { IngredientInterface } from "./IngredientTypes";

export interface GetIngredientsResponse {
  success: boolean;
  data: IngredientInterface[];
}

export interface CreateOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
  message?: string;
}

export interface CreateOrderRequest {
  ingredients: string[];
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface ChangePasswordRequest {
  password: string;
  token: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

interface User {
  email: string;
  name: string;
}

export interface RegisterRequest extends User {
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends RegisterResponse {}

export interface LogoutRequest {
  token: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface TokenRequest {
  token: string;
}

export interface TokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  success: boolean;
  user: User;
}

export interface PatchUserRequest extends User {}

export interface PatchUserResponse {
  success: boolean;
  user: User;
}

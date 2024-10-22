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

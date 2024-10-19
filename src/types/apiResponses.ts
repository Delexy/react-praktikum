import { IngredientInterface } from "./IngredientTypes";

export interface GetIngredientsResponse {
  success: boolean;
  data: IngredientInterface[];
}

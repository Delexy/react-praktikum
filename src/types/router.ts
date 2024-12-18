import { Location } from "react-router-dom";

export interface LocationState {
  backgroundLocation?: Location;
}

export type LocationWithState = Location<LocationState>;

export type IngredientParams = "ingredientId";

import { Location } from "react-router-dom";

export interface LocationState {
  backgroundLocation?: Location;
  profileFeedLocation?: Location;
  feedListLocation?: Location;
}

export type LocationWithState = Location<LocationState>;

export type IngredientParams = "ingredientId";

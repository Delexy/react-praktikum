import {
  IngredientInterface,
  IngredientType,
} from "@projectTypes/IngredientTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@services/store";

export interface ConstructorItem extends IngredientInterface {
  uniqId: number;
}

interface ConstructorItemsState {
  ingredients: ConstructorItem[];
  bun: IngredientInterface | undefined;
}

const initialState: ConstructorItemsState = {
  bun: undefined,
  ingredients: [],
};

export const constructorItemsSlice = createSlice({
  name: "constructorItems",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IngredientInterface>) => {
      const ingredient = { ...action.payload, uniqId: Math.random() };
      const isBun = ingredient.type === IngredientType.BUN;

      if (isBun) {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    changeOrder: (
      state,
      action: PayloadAction<{ currentIndex: number; nextIndex: number }>
    ) => {
      const { currentIndex, nextIndex } = action.payload;
      const draggedIngredient = state.ingredients[currentIndex];

      state.ingredients[currentIndex] = state.ingredients[nextIndex];
      state.ingredients[nextIndex] = draggedIngredient;
    },
    clearIngredients: (state) => {
      state.bun = initialState.bun;
      state.ingredients = initialState.ingredients;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  changeOrder,
  clearIngredients,
} = constructorItemsSlice.actions;

export const selectConstructorItems = (state: RootState) =>
  state.constructorItems.ingredients;

export const selectBun = (state: RootState) => state.constructorItems.bun;

export const selectTotalPrice = (state: RootState) => {
  const ingredientsPrice = state.constructorItems.ingredients.reduce(
    (sum, ingredient) => (sum += ingredient.price),
    0
  );
  const bunsPrice = (state.constructorItems.bun?.price ?? 0) * 2;

  return ingredientsPrice + bunsPrice;
};

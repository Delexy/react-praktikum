import { IngredientInterface } from "@projectTypes/IngredientTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@services/store";

interface CurrentIngredientState {
  value: IngredientInterface | null;
}

const initialState: CurrentIngredientState = {
  value: null,
};

export const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {
    setIngredient: (state, action: PayloadAction<IngredientInterface>) => {
      state.value = action.payload;
    },
    clearIngredient: (state) => {
      state.value = null;
    },
  },
});

export const { clearIngredient, setIngredient } =
  currentIngredientSlice.actions;

export const selectIngredient = (state: RootState) =>
  state.currentIngredient.value;

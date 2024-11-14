import { configureStore } from "@reduxjs/toolkit";
import { normaApi } from "./normaApi";
import { constructorItemsSlice } from "./constructorItemsSlice";
import { currentIngredientSlice } from "./currentIngredientSlice";

export const store = configureStore({
  reducer: {
    constructorItems: constructorItemsSlice.reducer,
    currentIngredient: currentIngredientSlice.reducer,
    [normaApi.reducerPath]: normaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(normaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

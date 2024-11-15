import { configureStore } from "@reduxjs/toolkit";
import { normaApi } from "./normaApi";
import { constructorItemsSlice } from "./constructorItemsSlice";
import { authApi } from "./authApi/authApi";

export const store = configureStore({
  reducer: {
    constructorItems: constructorItemsSlice.reducer,
    [normaApi.reducerPath]: normaApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(normaApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

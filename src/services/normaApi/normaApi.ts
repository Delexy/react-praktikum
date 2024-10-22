import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetIngredientsResponse,
} from "@projectTypes/apiResponses";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const normaApi = createApi({
  reducerPath: "normaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://norma.nomoreparties.space/api/",
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<GetIngredientsResponse, void>({
      query: () => `ingredients`,
    }),
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: "orders",
        body,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useCreateOrderMutation } = normaApi;

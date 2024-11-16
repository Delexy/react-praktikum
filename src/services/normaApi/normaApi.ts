import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  GetIngredientsResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@projectTypes/apiResponses";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@services/authApi/baseQueryWithReauth";
import { Token } from "@utils/token";

export const normaApi = createApi({
  reducerPath: "normaApi",
  baseQuery: baseQueryWithReauth,
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
          Authorization: Token.get(),
        },
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: "password-reset",
        body,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        responseHandler: async (response) => {
          localStorage.setItem("reset-password", "true");

          return await response.json();
        },
      }),
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "password-reset/reset",
        body,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        responseHandler: async (response) => {
          localStorage.removeItem("reset-password");

          return await response.json();
        },
      }),
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useCreateOrderMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = normaApi;

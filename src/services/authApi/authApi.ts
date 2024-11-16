import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  PatchUserRequest,
  PatchUserResponse,
  RegisterRequest,
  RegisterResponse,
  UserResponse,
} from "@projectTypes/apiResponses";
import { createApi } from "@reduxjs/toolkit/query/react";
import { RefreshToken, Token } from "@utils/token";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "auth/login",
        body,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Token.get(),
        },
        async responseHandler(response) {
          const data: LoginResponse = await response.json();

          if (data.accessToken) {
            Token.set(data.accessToken);
            RefreshToken.set(data.refreshToken);
          }

          return data;
        },
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: (body) => ({
        url: "auth/logout",
        body,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Token.get(),
        },
        async responseHandler(response) {
          if (response.ok) {
            Token.clear();
            RefreshToken.clear();
          }

          return await response.json();
        },
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "auth/register",
        body,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
    getUser: builder.query<UserResponse, void>({
      query: () => ({
        url: "auth/user",
        headers: {
          Authorization: Token.get(),
        },
      }),
      providesTags: ["User"],
    }),
    patchUser: builder.mutation<PatchUserResponse, PatchUserRequest>({
      query: (body) => ({
        url: "auth/user",
        body,
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Token.get(),
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
  usePatchUserMutation,
} = authApi;

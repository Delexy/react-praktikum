import { TokenResponse } from "@projectTypes/apiResponses";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { BURGER_API_URL } from "@utils/constants";
import { RefreshToken, Token } from "@utils/token";

const baseQuery = fetchBaseQuery({ baseUrl: `${BURGER_API_URL}` });

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    result.error.status === 403 &&
    result.error.data instanceof Object &&
    "message" in result.error.data &&
    result.error.data.message === "jwt expired"
  ) {
    const refreshResult = await baseQuery(
      {
        url: "auth/token",
        method: "POST",
        body: JSON.stringify({
          token: RefreshToken.get(),
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      api,
      extraOptions
    );

    const refreshData = refreshResult.data as TokenResponse;

    if (refreshResult.data && refreshData.success) {
      Token.set(refreshData.accessToken);
      RefreshToken.set(refreshData.refreshToken);

      if (args instanceof Object) {
        args.headers = {
          ...args.headers,
          Authorization: refreshData.accessToken,
        };
      }

      result = await baseQuery(args, api, extraOptions);
    } else {
      Token.clear();
      RefreshToken.clear();
    }
  }
  return result;
};

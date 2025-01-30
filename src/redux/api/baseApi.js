import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagtypes";
import { getFromSessionStorage } from "@/utils/sessionStorage";
import { logout, setUser } from "../features/authSlice";
import { getBackendBaseUrl } from "@/config";

const prepareAuthHeaders = (headers, state) => {
  
  const otpToken = getFromSessionStorage("signUpToken");
  const forgotPassToken = getFromSessionStorage("forgotPassToken");
  const token = getFromSessionStorage('token');

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  if (otpToken) {
    headers.set("token", otpToken);
  }

  if (forgotPassToken) {
    headers.set("token", forgotPassToken);
  }

  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: getBackendBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers, { getState }) =>
    prepareAuthHeaders(headers, getState()),
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    try {
      const res = await fetch(`${getBackendBaseUrl()}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed to refresh token:", res.statusText);
        api.dispatch(logout());
        return result;
      }

      const data = await res.json();
      if (data?.data?.accessToken) {
        const user = api.getState()?.auth?.user;

        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          })
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
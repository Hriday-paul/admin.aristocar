

import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const incomesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allEarnings: builder.query({
      query: (query) => ({
        url: `/payments/earnings`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.income],
    }),
    getDashboardData: builder.query({
      query: (query) => ({
        url: `/payments/dashboard-data`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.income],
    }),

    getSubscriptionsBy_id: builder.query({
      query: ({id , query}) => ({
        url: `/payments/paymentbyuserId/${id}?limit=${query?.limit || 20}`,
        method: "GET",
        // params: query,
      }),
      // providesTags: [tagTypes.income],
    }),

  }),
});

export const { useAllEarningsQuery, useGetDashboardDataQuery, useGetSubscriptionsBy_idQuery } = incomesApi;

import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: (arg) => ({
        url: `/orders`,
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.order],
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: [tagTypes.order],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.order],
    }),

    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),

      invalidatesTags: [tagTypes.orders, tagTypes.order],
    }),
  }),
});

export const {
  useGetAllOrderQuery,
  useUpdateOrderMutation,

  useGetSingleOrderQuery,
  useDeleteOrderMutation,
} = orderApi;

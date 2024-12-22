import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.product, tagTypes.products],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: [tagTypes.product, tagTypes.products],
    }),

    getAllProducts: builder.query({
      query: (arg) => ({
        url: `/products`,
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.products],
    }),

    getNewProducts: builder.query({
      query: (arg) => ({
        url: "/products",
        method: "GET",
        params: arg, // arg must have `sort=createdAt`
      }),
      providesTags: [tagTypes.newProducts],
    }),

    deleteProduct: builder.mutation({
      query: (reviewId) => ({
        url: `/products/${reviewId}`,
        method: "DELETE",
      }),

      invalidatesTags: [tagTypes.product, tagTypes.products],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

    getRelatedProducts: builder.query({
      query: (id) => ({
        url: `/products?category=${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.products],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetAllProductsQuery,
  useGetNewProductsQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useGetRelatedProductsQuery,
} = productsApi;

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





    get_all_brands: builder.query({
      query: (query) => ({
        url: `/brands`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.brands],
    }),

    update_brand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brands/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.brands],
    }),
    createBrand: builder.mutation({
      query: (data) => ({
        url: `/brands/create-brands`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.brands],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brands],
    }),




    get_all_model: builder.query({
      query: (query) => ({
        url: `/models`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.models],
    }),
    update_model: builder.mutation({
      query: ({ id, data }) => ({
        url: `/models/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.models],
    }),
    create_model: builder.mutation({
      query: (data) => ({
        url: `/models/create-models`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.models],
    }),
    delete_model: builder.mutation({
      query: (id) => ({
        url: `/models/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.models],
    }),








    get_all_cars: builder.query({
      query: (query) => ({
        url: `/cars`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.products],
    }),
    update_car: builder.mutation({
      query: ({ data, id }) => ({
        url: `/cars/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.products],
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

  useGet_all_brandsQuery,
  useUpdate_brandMutation,
  useCreateBrandMutation,
  useDeleteBrandMutation,



  useGet_all_modelQuery,
  useCreate_modelMutation,
  useUpdate_modelMutation,
  useDelete_modelMutation,



  useGet_all_carsQuery,
  useUpdate_carMutation
} = productsApi;

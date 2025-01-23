import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyContents: builder.query({
      query: () => ({
        url: `/privacy/67922a44f9320702236c0d82`,
        method: "GET"
      }),
      providesTags: [tagTypes.privacy_content],
    }),

    updatePrivacyContent: builder.mutation({
      query: (data) => ({
        url: `/privacy/update/67922a44f9320702236c0d82`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.privacy_content],
    }),


    getAboutContents: builder.query({
      query: () => ({
        url: `/about/67922ade5cdd08a4d3670df9`,
        method: "GET"
      }),
      providesTags: [tagTypes.about_content],
    }),

    updateAboutContent: builder.mutation({
      query: (data) => ({
        url: `/about/update/67922ade5cdd08a4d3670df9`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.about_content],
    }),
  }),
});

export const { useGetPrivacyContentsQuery, useUpdatePrivacyContentMutation, useGetAboutContentsQuery, useUpdateAboutContentMutation } = contentApi;

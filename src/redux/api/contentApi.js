import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyContents: builder.query({
      query: () => ({
        url: `/privacy/678e1a1cbb7cae0b77e14229`,
        method: "GET"
      }),
      providesTags: [tagTypes.privacy_content],
    }),

    updatePrivacyContent: builder.mutation({
      query: (data) => ({
        url: `/privacy/update/678e1a1cbb7cae0b77e14229`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.privacy_content],
    }),


    getAboutContents: builder.query({
      query: () => ({
        url: `/about/678e1c02bb7cae0b77e1cd1f`,
        method: "GET"
      }),
      providesTags: [tagTypes.about_content],
    }),

    updateAboutContent: builder.mutation({
      query: (data) => ({
        url: `/about/update/678e1c02bb7cae0b77e1cd1f`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.about_content],
    }),
  }),
});

export const { useGetPrivacyContentsQuery, useUpdatePrivacyContentMutation, useGetAboutContentsQuery, useUpdateAboutContentMutation } = contentApi;

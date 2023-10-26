import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost/api/v1';

const headers = {
  'Accept': 'application/json',
  'Content-Type' : 'application/json',
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: '/auth/users/me/',
        headers: {
          ...headers,
          'Authorization': `Bearer ${ localStorage.getItem('access') }`
        }
      }),
    }),
    updateCurrentUser: builder.mutation({
      query: (data) => ({
        url: '/auth/users/me/',
        method: 'PATCH',
        headers: data.avatar ?
        {
          'Authorization': `Bearer ${ localStorage.getItem('access') }`
        } :
        {
          ...headers,
          'Authorization': `Bearer ${ localStorage.getItem('access') }`
        },
        body: data.avatar ? data.data : JSON.stringify({
          username: data.data.username,
          status: data.data.status
        })
      }),
    }),
  })
})

export const { useUpdateCurrentUserMutation, useLazyGetCurrentUserQuery } = apiSlice;
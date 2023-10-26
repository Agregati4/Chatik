import { apiSlice } from "../api.Slice";

const headers = {
  'Accept': 'application/json',
  'Content-Type' : 'application/json',
}

const requestsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRequests: builder.query({
      query: () => ({
        url: '/auth/users/friend/request',
        headers: {
          ...headers,
          'Authorization': `Bearer ${ localStorage.getItem('access') }`
        },
      })
    }),
    handleRequestAnswer: builder.mutation({
      query: (data) => ({
        url: '/auth/users/friend/request/',
        method: 'PATCH',
        headers: {
          ...headers,
          'Authorization': `Bearer ${ localStorage.getItem('access') }`
        },
        body: data,
      })
    })
  })
})

export const { useLazyGetRequestsQuery, useHandleRequestAnswerMutation } = requestsApi;
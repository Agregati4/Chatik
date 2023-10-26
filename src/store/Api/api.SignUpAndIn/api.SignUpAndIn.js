import { apiSlice } from "../api.Slice";

const headers = {
  'Accept': 'application/json',
  'Content-Type' : 'application/json',
}

const signUpAndInApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: '/auth/users/',
        method: 'POST',
        headers,
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password
        })
      })
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: '/auth/jwt/create/',
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      })
    })
  })
})

export const { useSignInMutation, useSignUpMutation } = signUpAndInApi;

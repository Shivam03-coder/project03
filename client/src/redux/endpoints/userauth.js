import { Apiservices } from "../middlewares/apiServices";

const headers = {
  "content-type": "application/json",
};

const userQuery = Apiservices.injectEndpoints({
  endpoints: (build) => ({
    signupUser: build.mutation({
      query: (userinfo) => ({
        url: "/signup",
        method: "POST",
        body: userinfo,
        headers,
        credentials: "include",
      }),
    }),
    loginUser: build.mutation({
      query: (userinfo) => ({
        url: "/login",
        method: "POST",
        body: userinfo,
        headers,
        credentials: "include",
      }),
    }),
    changePassword: build.mutation({
      query: (userinfo) => ({
        url: "/userpasswordchange",
        method: "POST",
        body: userinfo,
        headers,
      }),
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: "/userlogout",
        method: "POST",
        headers,
        credentials: "include",
      }),
    }),
    createPayment: build.query({
      query: () => ({
        url: "/payment",
        method: "GET",
      }),
    }),
    verifyPayment: build.mutation({
      query: (orderId) => ({
        url: "/verify",
        method: "POST",
        body: { orderId },
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useChangePasswordMutation,
  useLogoutUserMutation,
  useCreatePaymentQuery,
  useVerifyPaymentMutation,
} = userQuery;

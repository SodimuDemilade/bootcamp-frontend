import {BaseService} from "@/configs/serviceConfig";
import {ApiRequestMethodsEnum} from "../util/enums/apiRequestMethodsEnum.ts";
import {authStore} from "../store/authStore.ts";
import {ApiTagsEnum} from "../util/enums/apiTagsEnum.ts";
import type {LoginRequest} from "../model/request/LoginRequest.ts";
import type {LoginResponse} from "../model/response/LoginResponse.ts";
import {RegisterRequest} from "@/model/request/RegisterRequest.ts";

const controller = "auth";
export const AuthenticationService = BaseService.appClient.injectEndpoints({
    endpoints: (builder) => ({
        // changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
        //     query: (data) => ({
        //         url: `/${controller}/change-password`,
        //         method: ApiRequestMethodsEnum.POST,
        //         body: data,
        //     }),
        // }),
        // completeEnrollment: builder.mutation<CompleteEnrollmentResponse, CompleteEnrollmentRequest>({
        //     query: (data) => ({
        //         url: `/${controller}/complete-enrollment`,
        //         method: ApiRequestMethodsEnum.POST,
        //         body: data,
        //     }),
        //     onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
        //         try {
        //             const {data} = await queryFulfilled;
        //             dispatch(authStore.mutation.setCoreAuthState(data));
        //         } catch (error) {
        //             // Handle login error
        //             console.error('Complete enrollment failed:', error);
        //         }
        //     },
        //     invalidatesTags: [{type: ApiTagsEnum.Authentication}],
        // }),
        // completePasswordReset: builder.mutation<CompletePasswordResetResponse, CompletePasswordResetRequest>({
        //     query: (data) => ({
        //         url: `/${controller}/complete-password-reset`,
        //         method: ApiRequestMethodsEnum.POST,
        //         body: data,
        //     }),
        // }),
        // initiateEnrollment: builder.mutation<InitiateEnrollmentResponse, InitiateEnrollmentRequest>({
        //     query: (data) => ({
        //         url: `/${controller}/initiate-enrollment`,
        //         method: ApiRequestMethodsEnum.POST,
        //         body: data,
        //     }),
        // }),
        register: builder.mutation<LoginResponse, RegisterRequest>({
            query: (data) => ({
                url: `/${controller}/register`,
                method: ApiRequestMethodsEnum.POST,
                body: data,
            }),
            onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(authStore.mutation.setCoreAuthState(data));
                } catch (error) {
                    // Handle login error
                    console.error('Signup failed:', error, arg);
                }
            },
        }),
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => ({
                url: `/${controller}/login/`,
                method: ApiRequestMethodsEnum.POST,
                body: data,
            }),
            onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(authStore.mutation.setCoreAuthState(data));
                } catch (error) {
                    // Handle login error
                    console.error('Login failed:', error, arg);
                }
            },
            invalidatesTags: [{type: ApiTagsEnum.Authentication}],
        }),
        // resendOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
        //     query: (data) => ({
        //         url: `/${controller}/resend-otp`,
        //         method: ApiRequestMethodsEnum.POST,
        //         body: data,
        //     }),
        // }),
    }),
    overrideExisting: true
});

import {BaseService} from "../configs/serviceConfig.ts";
import {ApiTagsEnum} from "../util/enums/apiTagsEnum.ts";
import {ApiRequestMethodsEnum} from "../util/enums/apiRequestMethodsEnum.ts";
import type {CreateEnrollmentResponse, ReadEnrollmentResponse} from "../model/response/EnrollmentResponse.ts";
import {EnrollmentRequest} from "@/model/request/EnrollmentRequest.ts";


const controller = "enrollments";
export const EnrollmentService = BaseService.appClient.injectEndpoints({
    endpoints: (builder) => ({
        enroll: builder.mutation<CreateEnrollmentResponse, EnrollmentRequest>({
            query: (data) => ({
                url: `/${controller}/enroll`,
                method: ApiRequestMethodsEnum.POST,
                body: data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.Enrollment, id: "LIST"}],
        }),
        readUserEnrollment: builder.query<ReadEnrollmentResponse, void>({
            query: (data) => ({
                url: `/${controller}/user`,
                method: ApiRequestMethodsEnum.GET,
                body: data,
            }),
            onQueryStarted: async (arg, {queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    console.log("data:", data);
                } catch (error) {
                    // Handle login error
                    console.error('Enrollments Fetch failed:', error, arg);
                }
            },
            providesTags: [{type: ApiTagsEnum.Enrollment, id: "LIST"}],
        }),
        readBootcampEnrollment: builder.query<ReadEnrollmentResponse, string>({
            query: (data) => ({
                url: `/${controller}/bootcamp/${data}`,
                method: ApiRequestMethodsEnum.GET,
                // body: data,
            }),
            onQueryStarted: async (arg, {queryFulfilled}) => {
                try {
                    await queryFulfilled;
                    // console.log("data:", data);
                } catch (error) {
                    // Handle login error
                    console.error('Enrollments Fetch failed:', error, arg);
                }
            },
            providesTags: [{type: ApiTagsEnum.Enrollment, id: "LIST"}],
        }),
        // deleteEnrollment: builder.mutation<DeleteEnrollmentResponse, DeleteEnrollmentRequest>({
        //     query: (data) => ({
        //         url: `/${controller}/delete`,
        //         method: ApiRequestMethodsEnum.DELETE,
        //         body: data,
        //     }),
        //     invalidatesTags: [{type: ApiTagsEnum.LetterOfCredit, id: "LIST"}],
        // }),

    }),
    overrideExisting: true
});

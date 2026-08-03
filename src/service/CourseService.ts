import {BaseService} from "../configs/serviceConfig.ts";
import {ApiTagsEnum} from "../util/enums/apiTagsEnum.ts";
import {ApiRequestMethodsEnum} from "../util/enums/apiRequestMethodsEnum.ts";
import type {CourseResponse} from "../model/response/course/CourseResponse.ts";
import {CreateCourseResponse} from "@/model/response/course/CreateCourseResponse.ts";
import {DeleteUserResponse} from "@/model/response/user/DeleteUserResponse.ts";
import {CreateCourseRequest} from "@/model/request/course/CreateCourseRequest.ts";


const controller = "courses";
export const CourseService = BaseService.appClient.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation<CreateCourseResponse, { bootcampId: string, data: CreateCourseRequest }>({
            query: (data) => ({
                url: `bootcamps/${data.bootcampId}/courses`,
                method: ApiRequestMethodsEnum.POST,
                body: data.data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.Course, id: "LIST"}],
        }),
        readCourse: builder.query<CourseResponse, void>({
            query: (data) => ({
                url: `/${controller}/`,
                method: ApiRequestMethodsEnum.GET,
                body: data,
            }),
            onQueryStarted: async (arg, {queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    console.log("data:", data);
                } catch (error) {
                    // Handle login error
                    console.error('Courses Fetch failed:', error, arg);
                }
            },
            providesTags: [{type: ApiTagsEnum.Course, id: "LIST"}],
        }),
        readCourseByBootcamp: builder.query<CourseResponse, string>({
            query: (data) => ({
                url: `bootcamps/${data}/`,
                method: ApiRequestMethodsEnum.GET,
                body: data,
            }),
            onQueryStarted: async (arg, {queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    console.log("data:", data);
                } catch (error) {
                    // Handle login error
                    console.error('Courses Fetch failed:', error, arg);
                }
            },
            providesTags: [{type: ApiTagsEnum.Course, id: "LIST"}],
        }),
        updateCourse: builder.mutation<CreateCourseResponse, { courseId: string, data: CreateCourseRequest }>({
            query: (data) => ({
                url: `/${controller}/${data.courseId}`,
                method: ApiRequestMethodsEnum.PUT,
                body: data.data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.Course, id: "LIST"}],
        }),
        deleteCourse: builder.mutation<DeleteUserResponse, string>({
            query: (data) => ({
                url: `/${controller}/${data}`,
                method: ApiRequestMethodsEnum.DELETE,
                // body: data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.Course, id: "LIST"}],
        }),

    }),
    overrideExisting: true
});

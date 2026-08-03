import {BaseService} from "../configs/serviceConfig.ts";
import {ApiTagsEnum} from "../util/enums/apiTagsEnum.ts";
import {ApiRequestMethodsEnum} from "../util/enums/apiRequestMethodsEnum.ts";
import {DeleteUserResponse} from "@/model/response/user/DeleteUserResponse.ts";
import {CreateReviewRequest} from "@/model/request/CreateReviewRequest.ts";
import {ReadReviewResponse} from "@/model/response/ReadReviewResponse.ts";


const controller = "reviews";
export const ReviewService = BaseService.appClient.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation<DeleteUserResponse, { bootcampId: string, data: CreateReviewRequest }>({
            query: (data) => ({
                url: `/bootcamps/${data.bootcampId}/reviews`,
                method: ApiRequestMethodsEnum.POST,
                body: data.data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.Review, id: "LIST"}],
        }),
        readReview: builder.query<ReadReviewResponse, string>({
            query: (data) => ({
                url: `/bootcamps/${data}/reviews`,
                method: ApiRequestMethodsEnum.GET,
            }),
            onQueryStarted: async (arg, {queryFulfilled}) => {
                try {
                    await queryFulfilled;
                    // console.log("data:", data);
                } catch (error) {
                    // Handle login error
                    console.error('Reviews Fetch failed:', error, arg);
                }
            },
            providesTags: [{type: ApiTagsEnum.Review, id: "LIST"}],
        }),
        updateReview: builder.mutation<DeleteUserResponse, { id: string, data: CreateReviewRequest }>({
            query: (data) => ({
                url: `/${controller}/${data.id}`,
                method: ApiRequestMethodsEnum.PUT,
                body: data.data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.Review, id: "LIST"}],
        }),
        // deleteReview: builder.mutation<DeleteReviewResponse, string>({
        //     query: (data) => ({
        //         url: `/${controller}/${data}`,
        //         method: ApiRequestMethodsEnum.DELETE,
        //         // body: data,
        //     }),
        //     invalidatesTags: [{type: ApiTagsEnum.Review, id: "LIST"}],
        // }),

    }),
    overrideExisting: true
});

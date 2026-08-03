import {BaseService} from "../configs/serviceConfig.ts";
import {ApiTagsEnum} from "../util/enums/apiTagsEnum.ts";
import {ApiRequestMethodsEnum} from "../util/enums/apiRequestMethodsEnum.ts";
import {baseStore} from "../store/baseStore.ts";
import type {BootcampResponse} from "../model/response/bootcamp/BootcampResponse.ts";
import {ReadSavedBootcampResponse} from "@/model/response/SavedBootcampResponse.ts";
import {CreateBootcamp, CreateBootcampResponse} from "@/model/response/bootcamp/CreateBootcampResponse.ts";
import {DeleteUserResponse} from "@/model/response/user/DeleteUserResponse.ts";
import {UpdateBootcampRequest} from "@/model/request/bootcamp/UpdateBootcampRequest.ts";
import {SingleBootcampResponse} from "@/model/response/bootcamp/SingleBootcampResponse.ts";
import {UpdateBootcampResponse} from "@/model/response/bootcamp/UpdateBootcampResponse.ts";


const controller = "bootcamps";
export const BootcampService = BaseService.appClient.injectEndpoints({
    endpoints: (builder) => ({
        createBootcamp: builder.mutation<CreateBootcampResponse, CreateBootcamp>({
            query: (data) => ({
                url: `/${controller}/`,
                method: ApiRequestMethodsEnum.POST,
                body: data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.Bootcamp, id: "LIST"}],
        }),
        readBootcamp: builder.query<BootcampResponse, void>({
            query: (data) => ({
                url: `/${controller}/`,
                method: ApiRequestMethodsEnum.GET,
                body: data,
            }),
            onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    console.log("data:", data);
                    dispatch(baseStore.mutation.setBootcamps(data.data));
                } catch (error) {
                    // Handle login error
                    console.error('Bootcamps Fetch failed:', error, arg);
                }
            },
            providesTags: [{type: ApiTagsEnum.Bootcamp, id: "LIST"}],
        }),
        readSingleBootcamp: builder.query<SingleBootcampResponse, { bootcampId: string }>({
            query: (data) => ({
                url: `/${controller}/${data.bootcampId}`,
                method: ApiRequestMethodsEnum.GET,
                // body: data,
            }),
            onQueryStarted: async (arg, {queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    console.log("data:", data);
                } catch (error) {
                    // Handle login error
                    console.error('Bootcamps Fetch failed:', error, arg);
                }
            },
            providesTags: [{type: ApiTagsEnum.Bootcamp, id: "LIST"}],
        }),
        readSavedBootcamp: builder.query<ReadSavedBootcampResponse, void>({
            query: (data) => ({
                url: `/savedBootcamps`,
                method: ApiRequestMethodsEnum.GET,
                body: data,
            }),
            onQueryStarted: async (arg, {queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    console.log("data:", data);
                } catch (error) {
                    // Handle login error
                    console.error('Bootcamps Fetch failed:', error, arg);
                }
            },
            providesTags: [{type: ApiTagsEnum.Enrollment, id: "LIST"}],
        }),
        updateBootcamp: builder.mutation<UpdateBootcampResponse, { id: string, data: UpdateBootcampRequest }>({
            query: (data) => ({
                url: `/${controller}/${data.id}`,
                method: ApiRequestMethodsEnum.PUT,
                body: data.data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.Bootcamp, id: "LIST"}],
        }),
        deleteBootcamp: builder.mutation<DeleteUserResponse, string>({
            query: (data) => ({
                url: `/${controller}/${data}`,
                method: ApiRequestMethodsEnum.DELETE,
                // body: data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.Bootcamp, id: "LIST"}],
        }),

    }),
    overrideExisting: true
});

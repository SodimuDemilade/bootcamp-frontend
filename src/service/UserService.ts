import {BaseService} from "../configs/serviceConfig.ts";
import {ApiTagsEnum} from "../util/enums/apiTagsEnum.ts";
import {ApiRequestMethodsEnum} from "../util/enums/apiRequestMethodsEnum.ts";
import type {ReadUserResponse} from "../model/response/user/ReadUserResponse.ts";
import {DeleteUserResponse} from "@/model/response/user/DeleteUserResponse.ts";
import {UpdateUserRequest} from "@/model/request/user/UpdateUserRequest.ts";
import {CreateUserRequest} from "@/model/request/user/CreateUserRequest.ts";
import {UpdateUserResponse} from "@/model/response/user/UpdateUserResponse.ts";
import {baseStore} from "@/store/baseStore.ts";


const controller = "users";
export const UserService = BaseService.appClient.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation<DeleteUserResponse, CreateUserRequest>({
            query: (data) => ({
                url: `/${controller}/`,
                method: ApiRequestMethodsEnum.POST,
                body: data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.User, id: "LIST"}],
        }),
        readUser: builder.query<ReadUserResponse, void>({
            query: (data) => ({
                url: `/${controller}/`,
                method: ApiRequestMethodsEnum.GET,
                body: data,
            }),
            onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(baseStore.mutation.setUsers(data.data));
                } catch (error) {
                    // Handle login error
                    console.error('Users Fetch failed:', error, arg);
                }
            },
            providesTags: [{type: ApiTagsEnum.User, id: "LIST"}],
        }),
        updateUser: builder.mutation<UpdateUserResponse, { _id: string, data: UpdateUserRequest }>({
            query: (data) => ({
                url: `/${controller}/${data._id}`,
                method: ApiRequestMethodsEnum.PUT,
                body: data.data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.User, id: "LIST"}],
        }),
        deleteUser: builder.mutation<DeleteUserResponse, string>({
            query: (data) => ({
                url: `/${controller}/${data}`,
                method: ApiRequestMethodsEnum.DELETE,
                // body: data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.User, id: "LIST"}],
        }),

    }),
    overrideExisting: true
});

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {LoginResponse} from "../model/response/LoginResponse.ts";
import {baseStore} from "./baseStore.ts";
import {User} from "@/model/response/user/ReadUserResponse.ts";
import {BaseService} from "@/configs/serviceConfig.ts";

export type AuthState = {
    token: string,
    loading: boolean,
    userInfo: User
};

const initialState: AuthState = {
    token: "",
    loading: false,
    userInfo: {} as User,
};

const action = {
    logout: createAsyncThunk(
        "auth/action/logout",
        async (_, thunkAPI) => {
            try {
                thunkAPI.dispatch(authStore.mutation.reset());
                thunkAPI.dispatch(baseStore.mutation.reset());
                thunkAPI.dispatch(BaseService.appClient.util.resetApiState());
                // thunkAPI.dispatch(UserService.util.resetApiState());
                // thunkAPI.dispatch(EnrollmentService.util.resetApiState());
                // thunkAPI.dispatch(AuthenticationService.util.resetApiState());
                return
            } catch (e: any) {
                return thunkAPI.rejectWithValue(e?.message);
            }
        }
    ),
};
const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }, reset: () => ({...initialState}),
        setCoreAuthState: (state, {payload}: {
            payload: LoginResponse
        }) => {
            // console.log(payload)
            state.token = payload.token;
            state.userInfo = payload?.userInfo;
        }
    },
});

export const authStore = {
    reducer: slice.reducer,
    action: action,
    mutation: slice.actions,
};

import {combineReducers} from "@reduxjs/toolkit";
import {BaseService} from "../configs/serviceConfig.ts";
import {authStore} from "./authStore.ts";
import {baseStore} from "./baseStore.ts";

export const rootReducer = combineReducers({
    auth: authStore.reducer,
    base: baseStore.reducer,
    [BaseService.appClient.reducerPath]: BaseService.appClient.reducer,
})

export type RootState = ReturnType<typeof rootReducer>;

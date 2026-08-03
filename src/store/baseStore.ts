import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {type AppConfig, appConfig} from "../configs/appConfig.ts";
import type {Bootcamp} from "../model/response/bootcamp/BootcampResponse.ts";
import {Course} from "@/model/response/course/CourseResponse.ts";
import {User} from "@/model/response/user/ReadUserResponse.ts";

export type BaseState = {
    appStage: AppConfig["stage"],
    loading: boolean;
    bootcamps: Bootcamp[];
    users: User[];
};

const initialState: BaseState = {
    appStage: appConfig.stage,
    loading: false,
    bootcamps: [] as Bootcamp[],
    users: [] as User[],
};

const actions = {}
const baseSlice = createSlice({
    name: "baseStore",
    initialState,
    reducers: {
        setAppStage(state, {payload}: { payload: BaseState["appStage"] }) {
            state.appStage = payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setBootcamps: (state, action) => {
            state.bootcamps = action.payload;
        },
        addBootcamp: (state, action) => {
            state.bootcamps.push(action.payload);
        },
        removeBootcamp: (
            state,
            action: PayloadAction<string>
        ) => {
            state.bootcamps = state.bootcamps.filter(
                bootcamp => bootcamp.id !== action.payload
            );
        },
        addCourseToBootcamp: (
            state,
            action: PayloadAction<{
                bootcampId: string;
                course: Course;
            }>
        ) => {
            const bootcamp = state.bootcamps.find(
                bootcamp => bootcamp.id === action.payload.bootcampId
            );

            if (bootcamp) {
                bootcamp.courses ??= [];
                bootcamp.courses.push(action.payload.course);
            }
        },
        removeCourseFromBootcamp: (
            state,
            action: PayloadAction<{ bootcampId: string, courseId: string }>
        ) => {
            const bootcamp = state.bootcamps.find(
                bootcamp => bootcamp.id === action.payload.bootcampId
            );

            if (bootcamp) {
                bootcamp.courses = bootcamp.courses.filter(
                    course => course._id !== action.payload.courseId
                );
            }
        },
        editBootcamp: (state, action: PayloadAction<{ bootcamp: Bootcamp }>) => {
            const selectedBootcamp = state.bootcamps.find(
                bootcamp => bootcamp.id === action.payload.bootcamp.id
            );

            if (selectedBootcamp) {
                Object.assign(selectedBootcamp, action.payload.bootcamp);
            }
        },
        editCourse: (state, action: PayloadAction<{ bootcampId: string, courseId: string, course: Course }>) => {
            const selectedBootcamp = state.bootcamps.find(
                bootcamp => bootcamp.id === action.payload.bootcampId
            );

            if (selectedBootcamp) {
                const selectedCourse = selectedBootcamp.courses.find(course =>
                    course._id == action.payload.courseId
                );
                if (selectedCourse) {
                    Object.assign(selectedCourse, action.payload.course);
                }
            }
        },
        reset: () => ({...initialState}),
    },
});

export const baseStore = {
    mutation: baseSlice.actions,
    action: actions,
    reducer: baseSlice.reducer,
};

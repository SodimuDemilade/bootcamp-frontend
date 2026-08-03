import {User} from "@/model/response/user/ReadUserResponse.ts";

export type LoginResponse = {
    success: string,
    token: string,
    userInfo: User
}
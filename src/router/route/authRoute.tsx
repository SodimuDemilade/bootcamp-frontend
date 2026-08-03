import type {RouteType} from "../../util/type/route.tsx";
import {RouteConstant} from "@/util/constants/routeConstant.ts";
import {NameEnum} from "@/util/enums/enum.ts";
import {SignUpView} from "../../view/SignUpView.tsx";
import {LoginView} from "@/view/LoginView.tsx";

export const authRoute: RouteType[] = [
    {
        path: RouteConstant.auth.signup.path,
        name: NameEnum.Signup,
        element: <SignUpView/>,
        metadata: {
            isProtected: false,
            hasSideBar: false,
            subtitle: "Create your account.",
            isAuth: true
        },
    },
    {
        path: RouteConstant.auth.login.path,
        name: NameEnum.Login,
        element: <LoginView/>,
        metadata: {
            isProtected: false,
            hasSideBar: false,
            subtitle: "Login to your account.",
            isAuth: true
        },
    },
]
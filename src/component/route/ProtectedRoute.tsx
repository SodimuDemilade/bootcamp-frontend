import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import type {ReactNode} from "react";
import type {RootState} from "@/store";
import {RouteConstant} from "@/util/constants/routeConstant.ts";
import {StringUtil} from "../../util/stringUtil.ts";

type ProtectedRouteProps = {
    children: ReactNode,
    allowedRoles?: string[]
}

export const ProtectedRoute = ({children, allowedRoles}: ProtectedRouteProps) => {
    const authState = useSelector((state: RootState) => state.auth);
    const isAuthenticated = !StringUtil.isStringNullOrEmpty(authState?.token);

    if (!isAuthenticated) {
        return <Navigate to={RouteConstant.auth.login.path} replace/>;
    }

    if (allowedRoles && !allowedRoles.includes(authState.userInfo?.role)) {
        return <Navigate to={RouteConstant.auth.login.path} replace/>;
    }

    return <>{children}</>;
}

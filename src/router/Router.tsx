import {Navigate, Route, Routes} from "react-router-dom";
import {authRoute} from "./route/authRoute.tsx";
import {dashboardRoute} from "./route/dashboardRoute.tsx";
import {useSelector} from "react-redux";
import type {RouteType} from "../util/type/route.tsx";
import type {RootState} from "@/store";
import type {NameEnum} from "../util/enums/enum.ts";
import {StringUtil} from "../util/stringUtil.ts";
import {DashboardLayout} from "../component/layout/DashboardLayout.tsx";
import {AuthLayout} from "../component/layout/AuthLayout.tsx";
import {AdminBootcampView} from "@/view/AdminBootcampView.tsx";
import {AdminBootcampsView} from "@/view/AdminBootcampsView.tsx";
import {AdminUsersView} from "@/view/AdminUsersView.tsx";
import {AdminLayout} from "@/component/layout/AdminLayout.tsx";

export const Router = () => {
    const routes = [...authRoute, ...dashboardRoute];
    const publicRoute = routes.filter(it => !it.metadata.isProtected);
    const privateRoute = routes.filter(it => it.metadata.isProtected);
    const authState = useSelector((state: RootState) => state.auth);
    const isAuthenticated = !StringUtil.isStringNullOrEmpty(authState?.token);
    const isAdmin = isAuthenticated && authState.userInfo?.role === "admin";

    return (
        <Routes>
            {
                publicRoute.map((value: RouteType, index) => {
                    const options = value.metadata
                    const component = (options.isAuth ?
                        <AuthLayout title={value.name as NameEnum} subtitle={value.metadata.subtitle}
                                    children={
                                        value.element}/> :
                        <DashboardLayout title={value.name} subtitle={""} children={value.element}/>)

                    return (
                        <Route key={index} path={value.path} element={component}  {...value.metadata} />
                    )
                })
            }
            {
                privateRoute.map((value: RouteType, index) => {
                    const component = (
                        <DashboardLayout title={value.name as NameEnum} subtitle={value.metadata.subtitle}
                                         children={
                                             value.element}/>)
                    return (
                        isAuthenticated ?
                            <Route key={index} path={value.path} element={component}  {...value.metadata} /> :
                            <Route key={index} path={value.path} element={<Navigate to={'/'} replace/>}/> // replace means replace current browser history instead of adding a new one
                    )
                })
            }
            <Route
                path="/admin"
                element={
                    isAdmin ? (
                        <DashboardLayout
                            title="Admin"
                            subtitle="Manage users and bootcamps"
                        >
                            <AdminLayout/>
                        </DashboardLayout>
                    ) : (
                        <Navigate to="/" replace/>
                    )
                }
            >
                <Route
                    index
                    element={
                        <Navigate
                            to="users"
                            replace
                        />
                    }
                />

                <Route
                    path="users"
                    element={<AdminUsersView/>}
                />

                <Route
                    path="bootcamps"
                    element={<AdminBootcampsView/>}
                />

                <Route
                    path="bootcamps/:bootcampId"
                    element={<AdminBootcampView/>}
                />
            </Route>

            {/* Optional fallback */}
            <Route
                path="*"
                element={<Navigate to="/" replace/>}
            />
        </Routes>
    )
}
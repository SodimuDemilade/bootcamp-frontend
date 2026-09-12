import {Navigate, Route, Routes} from "react-router-dom";
import {authRoute} from "./route/authRoute.tsx";
import {dashboardRoute} from "./route/dashboardRoute.tsx";
import type {RouteType} from "../util/type/route.tsx";
import type {NameEnum} from "../util/enums/enum.ts";
import {DashboardLayout} from "../component/layout/DashboardLayout.tsx";
import {AuthLayout} from "../component/layout/AuthLayout.tsx";
import {AdminBootcampView} from "@/view/AdminBootcampView.tsx";
import {AdminBootcampsView} from "@/view/AdminBootcampsView.tsx";
import {AdminUsersView} from "@/view/AdminUsersView.tsx";
import {AdminLayout} from "@/component/layout/AdminLayout.tsx";
import {ProtectedRoute} from "@/component/route/ProtectedRoute.tsx";

export const Router = () => {
    const routes = [...authRoute, ...dashboardRoute];
    const publicRoute = routes.filter(it => !it.metadata.isProtected);
    const privateRoute = routes.filter(it => it.metadata.isProtected);

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
                    const allowedRoles = value.metadata.role ? [value.metadata.role] : undefined;
                    return (
                        <Route key={index} path={value.path}
                               element={
                                   <ProtectedRoute allowedRoles={allowedRoles}>
                                       {component}
                                   </ProtectedRoute>
                               }  {...value.metadata} />
                    )
                })
            }
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <DashboardLayout
                            title="Admin"
                            subtitle="Manage users and bootcamps"
                        >
                            <AdminLayout/>
                        </DashboardLayout>
                    </ProtectedRoute>
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
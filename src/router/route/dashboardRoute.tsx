import type {RouteType} from "../../util/type/route.tsx";
import {RouteConstant} from "@/util/constants/routeConstant.ts";
import {NameEnum} from "@/util/enums/enum.ts";
import {LandingView} from "../../view/LandingView.tsx";
import {BootcampListView} from "../../view/BootcampListView.tsx";
import {BootcampDetailView} from "../../view/BootcampDetailView.tsx";
import UserView from "@/view/UserView.tsx";
import {PublisherView} from "@/view/PublisherView.tsx";

export const dashboardRoute: RouteType[] = [
    {
        path: RouteConstant.dashboard.landing.path,
        name: NameEnum.LandingPage,
        element: <LandingView/>,
        metadata: {
            isProtected: false,
            subtitle: "",
            isAuth: false
        },
    },
    {
        path: RouteConstant.dashboard.bootcampList.path,
        name: NameEnum.BootcampList,
        element: <BootcampListView/>,
        metadata: {
            isProtected: false,
            subtitle: "",
            isAuth: false
        },
    },
    {
        path: RouteConstant.dashboard.bootcampDetail.path,
        name: NameEnum.BootcampDetail,
        element: <BootcampDetailView/>,
        metadata: {
            isProtected: false,
            subtitle: "",
            isAuth: false
        },
    },
    {
        path: RouteConstant.dashboard.user.path,
        name: NameEnum.User,
        element: <UserView/>,
        metadata: {
            isProtected: true,
            subtitle: "",
            isAuth: false,
            role: "user"
        },
    },
    // {
    //     path: RouteConstant.dashboard.adminUsers.path,
    //     name: NameEnum.AdminUsers,
    //     element: <AdminUsersView/>,
    //     metadata: {
    //         isProtected: true,
    //         subtitle: "",
    //         isAuth: false
    //     },
    // },
    // {
    //     path: RouteConstant.dashboard.adminBootcamps.path,
    //     name: NameEnum.AdminBootcamps,
    //     element: <AdminBootcampsView/>,
    //     metadata: {
    //         isProtected: true,
    //         subtitle: "",
    //         isAuth: false
    //     },
    // },
    // {
    //     path: RouteConstant.dashboard.adminBootcamp.path,
    //     name: NameEnum.AdminBootcamp,
    //     element: <AdminBootcampView/>,
    //     metadata: {
    //         isProtected: true,
    //         subtitle: "",
    //         isAuth: false
    //     },
    // },
    {
        path: RouteConstant.dashboard.publisher.path,
        name: NameEnum.Publisher,
        element: <PublisherView/>,
        metadata: {
            isProtected: true,
            subtitle: "",
            isAuth: false,
            role: "publisher"
        },
    }
]
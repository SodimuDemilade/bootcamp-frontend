import type {ReactNode} from "react";
import {Header} from "../ui/menu/Header.tsx";

type DashboardLayoutType = {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export const DashboardLayout = ({children}: DashboardLayoutType) => {
    return (
        <div className={"dashboard"}>
            <Header/>
            <div style={{overflowY: "auto"}}>
                {children}
            </div>
        </div>
    )
}
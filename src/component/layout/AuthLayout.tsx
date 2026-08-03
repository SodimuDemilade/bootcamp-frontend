import type {ReactNode} from "react";
import '../../../public/css/auth.css';
import Logo from "../../../public/images/logo.svg";
import {RouteConstant} from "@/util/constants/routeConstant.ts";
import {useNavigate} from "react-router-dom";

type AuthLayoutType = {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export const AuthLayout = ({title, subtitle, children}: AuthLayoutType) => {
    const navigate = useNavigate();

    return (
        <div className={"authLayout"}>
            <div className={"authCard"}>
                <div className={"authImageWrapper"}>
                    <img src={"/images/bootcamp.png"} alt={""} className={"authImage"}/>
                </div>
                <div className={"authRight"}>
                    <div className={"authRightContent"}>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <img src={Logo} alt={""} className={"authImage"}/>
                        </div>
                        <div className={"authForm"}>
                            <div>
                                <p className={"authTitle"}>{title}</p>
                                <p className={"authSubtitle"}>{subtitle}</p>
                            </div>
                            {children}

                            <div>
                                <p className={"authSubtitle"}>{title.toLowerCase() == "sign up" ? "Already" : "Don't"} have
                                    an account?
                                    {
                                        title.toLowerCase() == "sign up" ?
                                            <span
                                                onClick={() => navigate(RouteConstant.auth.login.path)}
                                                className={"authAction"}> Login</span> :
                                            <span
                                                onClick={() => navigate(RouteConstant.auth.signup.path)}
                                                className={"authAction"}> SignUp</span>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import "./form.css";
import {TextInput} from "@/component/ui/input/TextInput.tsx";
import {LockKeyhole, Mail} from 'lucide-react';
import {useFormik} from "formik";
import {LoginRequest, LoginRequestInit} from "@/model/request/LoginRequest.ts";
import {AuthenticationService} from "@/service/AuthenticationService.ts";
import {useNavigate} from "react-router-dom";
import {PasswordInput} from "@/component/ui/input/PasswordInput.tsx";
import {BaseButton} from "@/component/ui/input/BaseButton.tsx";
import {RouteConstant} from "@/util/constants/routeConstant.ts";

export const LoginForm = () => {
    const [login, {isLoading}] = AuthenticationService.useLoginMutation();
    const navigate = useNavigate();

    const handleSubmit = async (values: LoginRequest) => {
        const response = await login(values).unwrap();
        const userInfo = response.userInfo;
        // if (localStorage.currentPath) {
        //     navigate(localStorage.currentPath);
        //     localStorage.removeItem("currentPath");
        // }
        if (userInfo.role == "user") {
            navigate(RouteConstant.dashboard.user.path);
        } else if (userInfo.role == "admin") {
            navigate(RouteConstant.dashboard.adminUsers.path);
        } else {
            navigate(RouteConstant.dashboard.publisher.path);
        }
    }

    const formik = useFormik({
        initialValues: LoginRequestInit,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    })
    return (
        <div className={"form"}>
            <div className={"formContent"}>
                <TextInput
                    startIcon={<Mail size={15}/>}
                    placeholder={"Email"}
                    name="email"
                    formik={formik}
                />
                <PasswordInput
                    startIcon={<LockKeyhole size={15}/>}
                    placeholder={"Password"}
                    name="password"
                    formik={formik}
                />
            </div>

            <BaseButton
                text={"Login"}
                onClick={() => formik.handleSubmit()}
                className={"submitButton"}
                isLoading={isLoading}
            />
        </div>
    )
}
import "./form.css";
import {TextInput} from "@/component/ui/input/TextInput.tsx";
import {LockKeyhole, Mail, User} from 'lucide-react';
import {AuthenticationService} from "@/service/AuthenticationService.ts";
import {useFormik} from "formik";
import {RegisterRequestInit} from "@/model/request/RegisterRequest.ts";
import {useState} from "react";
import {PasswordInput} from "@/component/ui/input/PasswordInput.tsx";
import {BaseButton} from "@/component/ui/input/BaseButton.tsx";
import {RouteConstant} from "@/util/constants/routeConstant.ts";
import {useNavigate} from "react-router-dom";

export const SignUpForm = () => {
    // const filledWeightId = useId();
    const [activeRole, setActiveRole] = useState("user");
    const [register, {isLoading}] = AuthenticationService.useRegisterMutation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: RegisterRequestInit,
        onSubmit: async () => {
            // console.log(values);
            await register(formik.values);
            navigate(RouteConstant.dashboard.user.path);
        }
    })

    return (
        <div className={"form"}>

            <div className={"formContent"}>

                <TextInput
                    startIcon={<User size={15}/>}
                    placeholder={"Full name"}
                    name={"name"}
                    formik={formik}
                />

                <TextInput
                    startIcon={<Mail size={15}/>}
                    placeholder={"Email"}
                    name={"email"}
                    formik={formik}
                />

                <PasswordInput
                    startIcon={<LockKeyhole size={15}/>}
                    placeholder={"Password"}
                    name={"password"}
                    formik={formik}
                />

                <div className={"roleSection"}>

                    <p className={"roleTitle"}>
                        Join as
                    </p>

                    <div className={"roleOptions"}>

                        <div className={`roleCard ${activeRole == "user" ? "activeRole" : ""}`} onClick={() => {
                            setActiveRole("user");
                            formik.setFieldValue("role", "user");
                        }}>
                            <div>
                                <p className={"roleHeading"}>
                                    Student
                                </p>

                                <p className={"roleDescription"}>
                                    Browse and enroll in bootcamps
                                </p>
                            </div>

                            <div className={"roleRadio"}/>
                        </div>

                        <div className={`roleCard ${activeRole == "publisher" ? "activeRole" : ""}`} onClick={() => {
                            setActiveRole("publisher");
                            formik.setFieldValue("role", "publisher");
                        }}>
                            <div>
                                <p className={"roleHeading"}>
                                    Bootcamp Provider
                                </p>

                                <p className={"roleDescription"}>
                                    Publish and manage bootcamps
                                </p>
                            </div>

                            <div className={"roleRadio"}/>
                        </div>

                    </div>

                </div>

            </div>
            <BaseButton
                className={"submitButton"}
                text={"Continue"}
                isLoading={isLoading}
                onClick={() => formik.handleSubmit()}
            />
        </div>
    )
}
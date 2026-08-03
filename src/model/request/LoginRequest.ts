export type LoginRequest = {
    email: string;
    password: string;
}

export const LoginRequestInit: LoginRequest = {
    email: "",
    password: "",
}
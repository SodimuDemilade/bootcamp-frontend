export type RegisterRequest = {
    name: string,
    email: string;
    password: string;
    role: string
}

export const RegisterRequestInit: RegisterRequest = {
    name: "",
    email: "",
    password: "",
    role: "user",
}
export type CreateUserRequest = {
    name: string,
    email: string,
    role: string,
    password: string,
}

export const CreateUserRequestInit: CreateUserRequest = {
    name: "",
    email: "",
    role: "user",
    password: "",
}
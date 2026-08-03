export type ReadUserResponse = {
    "success": boolean,
    "count": number,
    "pagination": {
        prev: {
            page: number,
            limit: number,
        },
        next: {
            page: number,
            limit: number,
        }
    },
    "data": User[]
}

export type User = {
    _id: string,
    name: string,
    email: string,
    role: string,
    createdAt: string
}
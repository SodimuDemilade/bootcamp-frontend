export type ReadReviewResponse = {
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
    "data": Review[]
}

export type Review = {
    _id: string,
    title: string,
    text: string,
    rating: number,
    bootcamp: {
        _id: string,
        name: string,
        description: string,
    },
    user: {
        _id: string,
        name: string,
    },
    createdAt: string
}
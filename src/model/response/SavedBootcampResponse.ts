export type ReadSavedBootcampResponse = {
    "success": boolean,
    "count": number,
    "data": SavedBootcamp[]
}

export type SavedBootcamp = {
    "_id": string,
    "user": string,
    "bootcamp": string,
    "createdAt": string
}
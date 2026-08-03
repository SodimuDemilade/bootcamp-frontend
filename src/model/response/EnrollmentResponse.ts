export type ReadEnrollmentResponse = {
    "success": boolean,
    "count": number,
    "data": Enrollment[]
}

export type Enrollment = {
    "_id": string,
    "user": string,
    "bootcamp": string,
    "status": string,
    "paymentStatus": string,
    "enrolledAt": string
}

export type CreateEnrollmentResponse = {
    "success": boolean,
    "count": number,
}
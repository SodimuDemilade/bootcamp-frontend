export type CourseResponse = {
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
    data: Course[]
}

export type Course = {
    "_id": string,
    "title": string,
    "description": string,
    "weeks": number,
    "tuition": number,
    "minimumSkill": "beginner" | "intermediate" | "advanced",
    "scholarshipAvailable": boolean,
    "bootcamp": string
    "user": string,
    "createdAt": string,
}
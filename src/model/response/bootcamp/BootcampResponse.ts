import type {Location} from "@/util/type";
import type {Course} from "../course/CourseResponse.ts";

export type BootcampResponse = {
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
    "data": Bootcamp[]
}

export type Bootcamp = {
    "location": Location,
    "name": string,
    "description": string,
    "website": string,
    "phone": string,
    "email": string,
    "careers": string[],
    "photo": string,
    "housing": boolean,
    "jobAssistance": boolean,
    "jobGuarantee": boolean,
    "acceptGi": boolean,
    "user": string,
    "createdAt": string,
    "slug": string,
    "averageCost": number,
    averageRating: number,
    "courses": Course[],
    "id": string,
    address: string,
    category: string[],
}
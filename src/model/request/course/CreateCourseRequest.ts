export type CreateCourseRequest = {
    title: string,
    description: string,
    weeks: number,
    tuition: number,
    minimumSkill: "beginner" | "intermediate" | "advanced",
    scholarshipAvailable: boolean
}
import { z} from "zod";

export const signupSchema = z.object({
    name:z.string().min(1,"name is required"),
    email:z.string(),
    password:z.string(),
    role:z.string()
})

export const loginSchema = z.object({
    email:z.string(),
    password:z.string()
})

export const createCourseSchema = z.object({
    title : z.string(),
    description : z.string(),
    price : z.number()
})

export const createLessonSchema = z.object({
    title : z.string(),
    content : z.string(),
    courseId : z.string()
})

export const purchaseSchema = z.object({
    courseId : z.string()
})

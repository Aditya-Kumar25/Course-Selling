import  {type Request,type Response} from "express";
import {prisma} from "../../globalprisma"
import { createLessonSchema } from "../../validations";



export async function Lesson(req: Request,res : Response){
    const user = (req as any).user;

    if(user.role != "INSTRUCTOR"){
        return res.status(403).json({
            success:false,
            error : "FORBIDDEN"
        })
    }


    const parsed = createLessonSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({
            success : false,
            error : "INVALID_SCHEMA"
        })
    }

    const { title , content , courseId } = req.body;

    try {
        const course = await prisma.course.findFirst({
        where:{
            id : courseId
        }
    })
    if(!course){
        return res.status(404).json({
            error:"COURSE_NOT_FOUND"
        })
    }
    

    if(course.instructorId != user.id){
        return res.status(403).json({
            error:"FORBIDDEN"
        })
    }


    const lesson = await prisma.lesson.create(({
        data:{
            title,
            content,
            courseId
        }
    }))

    res.status(200).json(lesson);
    } catch (error : any) {
        if(error.code === "P202"){
            return res.status(400).json({error:"LESSON_ALREADY_EXISTS"})
        }

        return res.status(500).json({error:"SERVER_ERROR"})
    }
    
} 

export async function getLessons(req:Request,res:Response){
    const {courseId} = req.params as any;

    const lessons = await prisma.lesson.findMany({
        where:{
            courseId:courseId
        }
    })

    return res.status(200).json(lessons)
}


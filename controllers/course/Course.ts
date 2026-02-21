import {type Request, type Response} from "express";
import { createCourseSchema } from "../../validations";
import {prisma} from "../../globalprisma.ts"
import { success } from "zod";



export async function Course(req : Request,res:Response) {
    console.log("flag 1")
    const user = (req as any).user;
    
    if(user.role == "student"){
        return res.status(403).json({
            success:false,
            data:null,
            error:"FORBIDDEN"
        })
    }

    const parsed = createCourseSchema.safeParse(req.body);
    
    if(!parsed.success){
        return res.status(400).json({
            success:false,
            error:"INVALID_SCHEMA"
        })
    }

    const exist = await prisma.course.findFirst({
        where:{title:parsed.data.title}
    })
    if(exist){
        return res.status(400).json({
            success:false,
            error:"ALREADY_EXISTS"
        })
    }   


    const course = await prisma.course.create({
        data:{
            instructorId:user.id,
            title:parsed.data.title,
            descrption : parsed.data.description,
            price : parsed.data.price
        }
    })

    res.status(201).json({
        success:false,
        data:{
            course
        },
        error:null
    })
}

export async function Courses(req : Request,res : Response){
        try {
            const courses = await prisma.course.findMany();

            return res.status(200).json({
                success:false,
                data:courses,
                error : null
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                error :  "Server error"
            })
            
        }
}
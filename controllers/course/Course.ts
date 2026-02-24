    import {type Request, type Response} from "express";
    import { createCourseSchema } from "../../validations";
    import {prisma} from "../../globalprisma.ts"



    export async function Course(req : Request,res:Response) {
        
        try {
            const user = (req as any).user;
        
        if(user.role !=  "INSTRUCTOR"){
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
                description : parsed.data.description,
                price : parsed.data.price
            }
        })

        res.status(200).json({
            data: {
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price,
    instructorId: course.instructorId,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt
  }
        })
            
        } catch (error) {
            console.error("Create course error:", error);
            return res.status(500).json({
            success: false,
            error: "SERVER_ERROR",
             });
        }
    }

export async function Courses(req : Request,res : Response){
        try {
            const courses = await prisma.course.findMany();
            return res.status(200).json(courses)
        } catch (error) {
            return res.status(500).json({
                success : false,
                error :  "Server error"
            })
            
        }
}

export async function getCourse(req:Request,res:Response){
    const id = req.params.id as string;

    const course = await prisma.course.findUnique({
        where:{id}
    })

    if(!course){
        return res.status(404).json({error:"course not found"})
    }

    return res.status(200).json(course)
}
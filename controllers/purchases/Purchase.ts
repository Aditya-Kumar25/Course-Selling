import {type Request,type Response}from "express";
import {prisma} from "../../globalprisma.ts";
import { purchaseSchema } from "../../validations.ts";
import { success } from "zod";



export async function Purchase(req : Request, res : Response){
    const user = (req as any).user;

    if(user.role != "STUDENT"){
        res.status(400).json({
            success: false,
            data : null,
            error: "FORBIDDEN"
        })
    }

    const parsed = purchaseSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({
            success:false,
            data:null,
            error:"INVALID_SCHEMA"
        })
    }

    const purchase = await prisma.purchase.create({
        data:{
            courseId:parsed.data.courseId,
            userId:user.id,
            
        }
    })

    res.status(200).json({
        success:true,
        data:{
            id:purchase.id,
            userId:purchase.courseId,
            courseId:purchase.courseId
        }
    })
}
import {type Request,type Response} from "express";
import {signupSchema} from "../../validations.ts"
import bcrypt from "bcrypt";
import {prisma} from "../../globalprisma.ts"
import { password } from "bun";

export async function SignUp(req:Request,res:Response){

    const payload = req.body;
    const parsed  = signupSchema.safeParse(payload);

    if(!parsed.success){
        return res.status(400).json({
          success:false,
          error:"INVALID_SCHEMA"  
        })
    }

    const ezmail = parsed.data?.email.toLowerCase();

    const exisiting = await prisma.user.findUnique({where:{email:ezmail}});
    if(exisiting){
        return res.status(400).json({
            success:false,
            error:"EMAIL_ALREADY_EXISTS"
        })
    }

    try {
        const hash = await bcrypt.hash(payload.password,10);
    
        const user = await prisma.user.create({
            data:{
                name:req.body.name,
                email:ezmail,
                password:hash,
                role:req.body.role
            }
        })
        
        return res.status(200).json({
            success:true,
            data:{
                email:user.email,
                password,
                name:user.name,
                role:user.role
            },
            error:null
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error
        })
        
    }
    
}
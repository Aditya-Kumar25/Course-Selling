import {type Request, type Response} from "express";
import {loginSchema} from "../../validations.ts";
import bcrypt from "bcrypt";
import {prisma} from "../../globalprisma.ts";
import jwt from "jsonwebtoken";
import { success } from "zod";

export async function LogIn(req : Request,res:Response){
    const parsed = loginSchema.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({
            success : false,
            data:null,
            error : "INVALID_REQUEST"
        })
    }

    const us = await prisma.user.findUnique({
        where:{
            email:parsed.data.email.toLowerCase()
        }
    })
    if(!us){
        return res.status(404).json({
            success:false,
            error:"Email_not _Found"
        })
    }

    const pwd = bcrypt.compare(parsed.data.password,us.password);
    if(!pwd){
        return res.status(401).json({
            success:false,
            error:"INVALID_CREDENTIALS",
        })
    }

    const token = jwt.sign(
        {
        id:us.id,
        role:us.role
        },
        process.env.JWT_SECRET as string,
        {expiresIn : "1d"},
    );

    res.json({
        success:true,
        data:{
            token,
            user:{
            id:us.id,
            name:us.name,
            email:us.email,
            role:us.role
            },
        },
        error : null
    })
}
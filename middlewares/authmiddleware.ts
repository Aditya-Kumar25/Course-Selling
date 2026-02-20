import type{Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken"

export const authmiddleware=(
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success:"false",
            error:"UNAUTHORIZED"
        });
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token as string,process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        next();
    }catch(e){
        return res.status(401).json({
            success:false,
            error:"SERVER ERROR"
        })
    }
}
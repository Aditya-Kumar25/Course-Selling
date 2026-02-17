import {type Request,type Response} from "express";
import {signup} from "../validations.ts"

export function SignUp(req:Request,res:Response){
    const payload = req.body;
    const parsed  = signup.safeParse(payload)
    res.send("hello from signup")
}
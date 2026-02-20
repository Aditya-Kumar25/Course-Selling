import { password } from "bun";
import {email, z} from "zod";

export const signup = z.object({
    name:z.string().min(1,"name is required"),
    email:z.string(),
    password:z.string(),
    role:z.string()
})

export const login = z.object({
    email:z.string(),
    password:z.string()
})
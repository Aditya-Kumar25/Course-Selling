import express from "express";
import {SignUp} from "../controllers/auth/SignUp"
import { LogIn } from "../controllers/auth/LogIn";
export const authrouter = express.Router()


authrouter.post('/signup',SignUp)
authrouter.post('/login', LogIn)



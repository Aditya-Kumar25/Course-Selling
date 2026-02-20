import express from "express";
import {SignUp} from "../controllers/SignUp"
import { LogIn } from "../controllers/LogIn";
export const authrouter = express.Router()


authrouter.post('/auth/signup',SignUp)
authrouter.post('/auth/login', LogIn)



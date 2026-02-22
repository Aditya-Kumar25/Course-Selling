import express from "express";
import { authmiddleware } from "../middlewares/authmiddleware";
import {Lesson} from "../controllers/lessons/Lessons.ts"

export const lessonrouter =  express.Router();

lessonrouter.post("/lessons",authmiddleware,Lesson);
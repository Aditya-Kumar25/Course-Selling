import express from "express";
import { authmiddleware } from "../middlewares/authmiddleware";
import {getLessons, Lesson} from "../controllers/lessons/Lessons.ts"

export const lessonrouter =  express.Router();

lessonrouter.post("/lessons",authmiddleware,Lesson);
lessonrouter.get("/courses/:courseId/lessons",getLessons);
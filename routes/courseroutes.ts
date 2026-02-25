import express from "express";
import { authmiddleware } from "../middlewares/authmiddleware";
import { Course ,Courses, delLessons, getCourse } from "../controllers/course/Course.ts";
export const courserouter = express.Router();

courserouter.post("/courses",authmiddleware,Course)
courserouter.get("/courses",Courses)
courserouter.get("/courses/:id",getCourse)
courserouter.patch("/courses/:id",authmiddleware)
courserouter.delete("/courses/:id",delLessons)
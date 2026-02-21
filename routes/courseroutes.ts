import express from "express";
import { authmiddleware } from "../middlewares/authmiddleware";
import { Course ,Courses } from "../controllers/course/Course.ts";
export const courserouter = express.Router();

courserouter.post("/courses",authmiddleware,Course)
courserouter.get("/courses",authmiddleware,Courses)
courserouter.get("/courses/:id",authmiddleware)
courserouter.patch("/courses/:id",authmiddleware)
courserouter.delete("/courses/:id",authmiddleware)
import express from "express";
import {authrouter} from "./routes/authroutes.ts"
import { courserouter } from "./routes/courseroutes.ts";
import { lessonrouter } from "./routes/lessonsroutes.ts";

const app = express();

app.use(express.json())

app.use("/",lessonrouter)
app.use("/",courserouter)
app.use("/auth", authrouter)

app.listen(3000 , ()=>{
  console.log("Server is running on port http://127.0.0.1:3000")
})
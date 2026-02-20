import express from "express";
import {authrouter} from "./routes/authroutes.ts"

const app = express();

app.use(express.json())

app.use("/", authrouter)

app.listen(3000 , ()=>{
  console.log("Server is running on port http://127.0.0.1:3000")
})
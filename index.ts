import express from "express";
import {router} from "./routes/authroutes.ts"
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

const app = express();

app.use("/", router)

app.listen(3000)
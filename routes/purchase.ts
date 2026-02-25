import express from "express";
import { authmiddleware } from "../middlewares/authmiddleware";
import { Purchase } from "../controllers/purchases/Purchase";

export const purchaserouter = express.Router();

purchaserouter.post("/purchase",authmiddleware,Purchase);
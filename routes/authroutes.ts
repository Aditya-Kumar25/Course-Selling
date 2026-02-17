import express from "express";
import {SignUp} from "../controllers/SignUp"
export const router = express.Router()


// define the home page route
router.get('/auth/signup',SignUp)
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})



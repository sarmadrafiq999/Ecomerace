
import express from "express"
import { contactUs } from "../controllers/contactController.js"

const contactRouter=express.Router()

contactRouter.post('/contact-us',contactUs)
export default contactRouter
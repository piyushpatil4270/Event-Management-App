import {Router} from "express"
import multer from "multer"
import { createapplicant,loginapplicant } from "../controllers/applicant.js";

const router=Router()
const uploadmiddleware=multer({dest:"Uploads"})
router.post("/register",uploadmiddleware.single("file"),createapplicant)
router.post("/login",loginapplicant)







export default router;

import {Router} from "express"
import {createorganiser,loginorganiser} from "../controllers/organiser.js"
import multer from "multer"
const router=Router()
const uploadmiddleware=multer({dest:"Uploads"})
router.post("/register",uploadmiddleware.single("file"),createorganiser)
router.post("/login",loginorganiser)

export default router;

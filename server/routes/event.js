import {Router} from "express"
import multer from "multer"
const uploadmiddleware=multer({dest:"Uploads"})
import {getapplicants,getallevents,geteventbycity,createevent,getevent,geteventbyorganiser,applyforevent, selectforevent,rejectforevent,getselections} from "../controllers/event.js"
const router=Router()

router.get("/",getallevents)
router.get("/:eventId",getevent)
router.get("/:eventId/applicants",getapplicants)
router.get("/:eventId/selections",getselections)
router.get("/organiser/:organiserId",geteventbyorganiser)
router.post("/",uploadmiddleware.single("file"),createevent)
router.post("/apply/:applicantId/:eventId",applyforevent)
router.patch("/select/:eventId/:applicantId",selectforevent)
router.patch("/:eventId/:applicantId/reject",rejectforevent)
router.get("/findbycity/:City",geteventbycity)




export default router;

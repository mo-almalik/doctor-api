import { Router } from "express";
import { DoctorReview, addreview } from "../controllers/review.controller.js";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import Role from "../../../utils/enum.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { addreviewSchema } from "../validations/vlaidate.review.js";



const router = Router()

router.post('/add/:doctorId',authenticate,authorize(Role.USER),validate(addreviewSchema),addreview)
router.get('/' ,authenticate,authorize(Role.DOCTOR),DoctorReview)

export default router
import { Router } from "express";
import authRouter from "../modules/auth/auth.router.js"
import timeRouter from "../modules/time/routers/time.router.js"
import userRouter  from "../modules/user/routers/user.router.js"
import adminRouter from "../modules/admin/routers/admin.router.js"
import doctorRouter from "../modules/doctor/routers/doctor.router.js"
import reviewRouter  from "../modules/review/routers/review.router.js"
import analyticsRouter from "../modules/analytics/routers/analytics.routers.js"
import appointmentRouter from "../modules/appointment/routers/appointment.router.js"

const router = Router()

router.use('/time',timeRouter)
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/doctor',doctorRouter)
router.use('/review', reviewRouter)
router.use('/analytics',analyticsRouter)
router.use('/appointment',appointmentRouter)
export default router
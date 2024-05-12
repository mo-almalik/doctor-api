import { Router } from "express";
import Role from "../../../utils/enum.js";
import { addtimeSchema, getDaysdSchema } from "../validations/validation.time.js";
import {  addtime, deleteTime, getDays, getDoctorTime, mangeTime } from "../controllers/time.controller.js";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { validate } from "../../../middlewares/validation.middleware.js";

const router = Router()

router.post('/add',authenticate,authorize(Role.DOCTOR),validate(addtimeSchema),addtime)
router.delete('/delete-time/:id',authenticate,authorize(Role.DOCTOR),deleteTime)
router.put('/mange-time/:id',authenticate,authorize(Role.DOCTOR),mangeTime)
router.get('/my-time',authenticate,authorize(Role.DOCTOR),getDoctorTime)
router.get('/:id',validate(getDaysdSchema),getDays)

export default router
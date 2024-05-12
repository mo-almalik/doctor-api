import { Router } from "express";
import { addAppointment, filter } from "../controllers/appointment.controller.js";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import Role from "../../../utils/enum.js";
import { addAppointmentSchema, filterSchema } from "../validations/validate.appointment.js";
import { validate } from "../../../middlewares/validation.middleware.js";

const router = Router()

router.post('/add/:id',authenticate,authorize(Role.USER),validate(addAppointmentSchema),addAppointment)
router.get('/filter',authenticate,authorize(Role.ADMIN),validate(filterSchema),filter)
export default router
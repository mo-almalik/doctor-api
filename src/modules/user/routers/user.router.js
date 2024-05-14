import { Router } from "express";
import Role from "../../../utils/enum.js";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { validate } from  "../../../middlewares/validation.middleware.js";
import { AppointmentCanceledSchema,  updateSchema } from "../validations/validation.user.js";
import { canceledMyAppointment, deleteAccountUser, getMyAppointment, updateUser, userInfo } from "../controllers/user.controller.js";


const router = Router()

router.get("/account",authenticate,authorize(Role.USER),userInfo)
router.delete("/delete",authenticate,authorize(Role.USER),deleteAccountUser)
router.get("/appointments",authenticate,authorize(Role.USER),getMyAppointment)
router.patch("/update",authenticate,authorize(Role.USER),updateUser)
router.put("/appointment/:id",authenticate,authorize(Role.USER),validate(AppointmentCanceledSchema),canceledMyAppointment)

export default router
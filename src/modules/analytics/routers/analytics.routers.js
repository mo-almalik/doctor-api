import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import Role from "../../../utils/enum.js";
import { appointmentsAnalysis } from "../controllers/analytics.controllers.js";

const router  = Router()

router.get('/appointments',authenticate,authorize(Role.ADMIN) ,appointmentsAnalysis)

export default router
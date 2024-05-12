import { Router } from "express";
import { DoctorRegisterVal, loginSchema, registerSchema } from "./validate.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { Login, Registrt, assertUniqueEmail } from "./auth.middlewares.js";
import Doctor from "../../models/doctor.js";
import User from "../../models/user.js";
import { DoctorRegister } from "./auth.controller.js";
import { uploadSingleFile } from "../../middlewares/upload.middleware.js";

const router = Router()
router.post("/doctor/register",uploadSingleFile('profilePhoto'),assertUniqueEmail(Doctor),DoctorRegister)

router.post("/register",validate(registerSchema),assertUniqueEmail(User) ,Registrt(User))
router.post("/login",validate(loginSchema),Login(User))
router.post("/doctor/login",validate(loginSchema),Login(Doctor))

export default router
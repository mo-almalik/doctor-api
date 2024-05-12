import { Router } from "express";
import Role from "../../../utils/enum.js";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { DocotrInfoSchema, filterSchema, statusSchema, updateSchema } from "../validations/validate.doctor.js";
import {  AppointmentStatus, DocotrInfo, DoctorAccount, GetAdsDoctor, GetAllDoctor,  deleteAccount, filter, getMyAppointment,getMypatients,pationtfilter,updateDoctorProfile } from "../controllers/doctor.controller.js";





const router = Router()
router.get('/' ,GetAllDoctor)
router.get('/ads' ,GetAdsDoctor)
router.get('/info/:id',validate(DocotrInfoSchema),DocotrInfo)
router.get('/filter' ,authenticate,authorize(Role.DOCTOR) ,validate(filterSchema),filter)
router.get('/pationt/filter' ,authenticate,authorize(Role.DOCTOR) ,validate(filterSchema),pationtfilter)
router.get('/account',authenticate,authorize(Role.DOCTOR),DoctorAccount)
router.get('/patients',authenticate,authorize(Role.DOCTOR) ,getMypatients)
router.delete('/delete' ,authenticate,authorize(Role.DOCTOR) ,deleteAccount)
router.get('/my-appointment' ,authenticate,authorize(Role.DOCTOR),getMyAppointment)
router.put("/appointment/",authenticate,authorize(Role.DOCTOR),validate(statusSchema),AppointmentStatus)
router.patch('/update-profile' ,authenticate,authorize(Role.DOCTOR),validate(updateSchema),updateDoctorProfile)


export default router
import { Router } from "express";
import Role from "../../../utils/enum.js";
import User from "../../../models/user.js";
import Doctor from "../../../models/doctor.js";
import Appointment from "../../../models/appointment.js";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { AcceptedDoctor, Blocklist, DoctorDetails,  GetDoctors, GetNewAddDoctors, GetUsers, RemoveAds, UserDetails, addBlobkList,  addToads,  canceledBlobk, filter, getAllCounts, getAllapointment, getCounts } from "../controllers/admin.controller.js";
import { filterSchema } from "../validations/validate.admin.js";
import { validate } from "../../../middlewares/validation.middleware.js";

const router = Router()


router.get('/users',authenticate,authorize(Role.ADMIN),GetUsers)
router.get("/users/filter",authenticate,authorize(Role.ADMIN),validate(filterSchema),filter(User))
router.get("/doctors/filter",authenticate,authorize(Role.ADMIN),validate(filterSchema),filter(Doctor))
router.get('/doctors',authenticate,authorize(Role.ADMIN),GetDoctors)
router.get('/user/:id',authenticate,authorize(Role.ADMIN),UserDetails)
router.put('/stauts' ,authenticate,authorize(Role.ADMIN),AcceptedDoctor)
router.get('/doctor/:id',authenticate,authorize(Role.ADMIN),DoctorDetails)
router.get('/new-add' ,authenticate,authorize(Role.ADMIN),GetNewAddDoctors)
router.get('/appointments',authenticate,authorize(Role.ADMIN),getAllapointment)
router.get('/users/getBlocklist' ,authenticate,authorize(Role.ADMIN),Blocklist(User))
router.get('/doctors/getBlocklist' , authenticate ,authorize(Role.ADMIN),Blocklist(Doctor))
router.put('/user/addBlocklist/:id' ,authenticate,authorize(Role.ADMIN),addBlobkList(User))
router.put('/users/canceledBlock/:id' , authenticate,authorize(Role.ADMIN),canceledBlobk(User))
router.put('/doctors/addBlocklist/:id' , authenticate ,authorize(Role.ADMIN),addBlobkList(Doctor))
router.put('/doctors/canceledBlock/:id' , authenticate  ,authorize(Role.ADMIN),canceledBlobk(Doctor))
// get Counts

router.get('/total/counts' , authenticate ,authorize(Role.ADMIN),getAllCounts)
router.get('/users/counts' , authenticate ,authorize(Role.ADMIN),getCounts(User))
router.get('/doctors/counts' , authenticate ,authorize(Role.ADMIN),getCounts(Doctor))
router.get('/appointments/counts' , authenticate ,authorize(Role.ADMIN),getCounts(Appointment))

// ads 
const link = '/ads'
router
.put(`${link}/add/:id` ,authenticate,authorize(Role.ADMIN),addToads)
.put(`${link}/remove/:id` ,authenticate,authorize(Role.ADMIN),RemoveAds)
export default router
import { AppError, catchError } from "../../../utils/error.handler.js";
import Review from "../../../models/review.js";
import Appointment from "../../../models/appointment.js";


const addreview = catchError(async(req,res)=>{
    const {doctorId} = req.params
   const {id} = req.user
   const checkUser = await Appointment.findOne({userId:id})

   if(!checkUser) return res.status(401).json({message : 'انت لاتمتلك حجز مع الدكتور ولايمكنك التقيم'})

    const {rating,comment} = req.body
    const existingReview = await Review.findOne({ user: id, doctor: doctorId });
    if(existingReview) throw new AppError('تم التقيم من قبل' , 406)
    const data = await Review.create({
        user:req.user.id,
        doctor:doctorId,
        rating,
        comment
    })
    res.json({data})
     
})

const DoctorReview = catchError(async(req,res)=>{
    const {id : doctor} = req.user 

    const review = await Review.find({doctor}).populate('user', 'username').exec();
    return res.json({review})
  
  })

export {
    addreview,
    DoctorReview
}
import { AppError, catchError } from "../../../utils/error.handler.js";
import Appointment from '../../../models/appointment.js'
import Doctor from '../../../models/doctor.js'
import User from "../../../models/user.js";
const addAppointment = catchError(async(req,res)=>{
    
    const {id} = req.params
    const {name,time,phone,gender} =req.body
    const doctor = await Doctor.findById({_id:id})
    if(!doctor) throw new AppError("not found !" , 404)

    const user = await User.findById(req.user.id)
    if(!user) throw new AppError("المستخدم غير موجود!" , 404)

    if(user.isBlock) {
        throw new AppError("أنت محظور ولا يمكنك الحجز!", 403)
    }

let priced = doctor.price
    const data = await Appointment.create({
        name,
        phone,
        time,
        gender,
        doctorId:id,
        userId:req.user.id,
        price:priced
    })

    res.json({message :'تم الحجز بنجاح' , data })

})


const filter = catchError(async(req,res)=>{
    const {  page = 1, limit = 10, visitNo , status, phone } = req.query;
    let filters = {};

    if (visitNo) filters.visitNo = visitNo;
    if (status) filters.status = status;
    if (phone) filters.phone = phone;

 

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }, 
      populate : [({ path: 'time', select: '-doctorId' }) ,({ path: 'doctorId', select: 'username' }) ]
      
    };

    const appointments = await Appointment.paginate(filters,options)

    return res.json({ data: appointments });


})
export{
    addAppointment,
    filter
}
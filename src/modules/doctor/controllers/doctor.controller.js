
import Doctor from "../../../models/doctor.js";
import { AppError, catchError } from "../../../utils/error.handler.js";
import Appointment from '../../../models/appointment.js';
import Review from '../../../models/review.js';
import fs from 'fs'
import path, { dirname }   from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
    //TODO -- update photo 
const updateDoctorProfile = catchError(async(req,res)=>{
  const {id} = req.user ;
    const {username,
        email,
        phone,
        DOB,
        gender,
        specialization,
        bio,
        location,
        price} = req.body
    let doctor = await Doctor.findById(id)
    if(!doctor) throw new AppError('not found !' , 404)
    doctor = await Doctor.findByIdAndUpdate(id,{
      username,
      email,
      phone,
      DOB,
      gender,
      specialization,
      bio,
      location,
      price,
  })
   if (doctor.price && doctor.location && doctor.specialization && doctor.phone) {
    doctor.accountComplite = true;
    }

await doctor.save();
return res.json({ message: "تم التعديل بنجاح" });

})


const DoctorAccount = catchError(async (req, res) => {
  const {id : doctorId} = req.user 

  let data = await Doctor.findById(req.user.id)
  if(!data) return res.json({message :'لم يتم العور علي المستخدم '})

  const appointments = await Appointment.find({doctorId})
    .populate('doctorId', '_id')
    .populate('userId', '_id')
    .populate('time', '_id')
    .exec();

  const totalAmount = appointments.reduce((total, appointment) => total + appointment.price, 0);

  if (!data.accountComplite) {
    return res.json({
      data: {
        message: 'اكمل اعدادات الحجز',
        data,
        count: {
          appointmentCount: appointments.length,
          patientCount: appointments.filter(appointment => appointment.status === "confirmed").length,
          totalAmount
        }
      }
    });
  }

  return res.json({
    data: {
      data,
      count: {
        appointmentCount: appointments.length,
        patientCount: appointments.filter(appointment => appointment.status === "confirmed").length,
        totalAmount
      }
    }
  });
});
const deleteAccount  =catchError(async (req,res)=>{
    const {id} = req.user
    await  Doctor.findByIdAndDelete(id)
    res.json({success : true, message: "تم جذف الحساب" })
})

const getMyAppointment = catchError(async(req,res)=>{
   const {id : doctorId}= req.user
   const { page = 1, limit = 10 } = req.query;

   const options = {
     page: parseInt(page),
     limit: parseInt(limit),
     sort: { createdAt: -1 }, 
     populate: 'time',
     
   };
 
   const appointments = await Appointment.paginate({doctorId}, options);
   res.json({appointments})
})
const getMypatients = catchError(async(req,res)=>{
  const {id : doctorId}= req.user
   const { page = 1, limit = 10 } = req.query;
   const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: -1 }, 
 
  };
   const data = await Appointment.paginate({doctorId , status:"confirmed"},options)
   if(!data) throw new AppError('not found !' , 404)
   
   res.json({data})
})

const GetAllDoctor = catchError(async(req,res)=>{
  const { page = 1, limit =10 } = req.query;
  const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }, 
      select :('-email -phone -password -role')
    };
  const data = await Doctor.paginate({ isVerify: true ,isBlock:false ,accountComplite:true },options) 
  res.json({data})
})

const GetAdsDoctor = catchError(async(req,res)=>{
  const { page = 1, limit =10 } = req.query;
  const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }, 
      select :('-password ')
    };
  const data = await Doctor.paginate({ads:true,isBlock:false,accountComplite:true },options) 
  res.json({data})
})

const AppointmentStatus = catchError(async(req,res)=>{
  const doctorId = req.user.id;
  const { id: _id, stats } = req.body;
  let data = await Appointment.findById(_id);


  if (data && data.doctorId.toString() === doctorId) {
   if(stats === data.status)throw new AppError("تم التعديل بافعل" ,400)
   await Appointment.findByIdAndUpdate(_id, { status: stats });
   return res.json({success:true , message: "تم تغيير الحالة بنجاح" } );
  }

   
  throw new AppError("الموعد غير موجود ", 404);
})

const DocotrInfo = catchError(async(req,res)=>{
    const {id} = req.params

  const info = await Doctor.findOne({_id:id}).select('-email -phone -password -role')
  if(!info) throw new AppError("not found", 404)
  const review = await Review.find({doctor:id})
  res.json({data :{
    info,
    review
  }})
})

const filter = catchError(async(req,res)=>{
  const {id : doctorId}= req.user
  const {  page = 1, limit = 10, visitNo , status, phone,name } = req.query;
  let filters = {doctorId};

  if (visitNo) filters.visitNo = visitNo;
  if (status) filters.status = status;
  if (phone) filters.phone = phone;
  if (name) filters.name = name;



  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: -1 },  
  };

  const appointments = await Appointment.paginate(filters,options)

  return res.json({ data: appointments });


})
const pationtfilter = catchError(async(req,res)=>{
  const {id : doctorId}= req.user
  const {  page = 1, limit = 10, visitNo , status, phone,name } = req.query;
  let filters = {doctorId ,status:"confirmed"};

  if (visitNo) filters.visitNo = visitNo;
  if (status) filters.status = status;
  if (phone) filters.phone = phone;
  if (name) filters.name = name;



  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: -1 },  
  };

  const appointments = await Appointment.paginate(filters,options)

  return res.json({ data: appointments });


})

export {
   
    DocotrInfo,
    GetAllDoctor,
    deleteAccount,
    getMyAppointment,
    AppointmentStatus,
    updateDoctorProfile,
    DoctorAccount,
    getMypatients,
    GetAdsDoctor,
    filter,
    pationtfilter
    
   
}
import Appointment from "../../../models/appointment.js";
import Doctor from "../../../models/doctor.js";
import Time from "../../../models/time.js";
import User from "../../../models/user.js";
import { AppError, catchError } from "../../../utils/error.handler.js";

export const GetUsers = catchError(async(req,res)=>{
    const { page = 1, limit =10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 }, 
       select : "-password"
      };
    const data = await User.paginate({},options) 

   return res.json({data})
})

export const GetDoctors = catchError(async(req,res)=>{
    const { page = 1, limit =10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 }, 
        select :(' -password')
      };
    const data = await Doctor.paginate({ isVerify: true },options) 
    res.json({data})
})

export const UserDetails = catchError(async(req,res)=>{
  const { page = 1, limit =10 } = req.query;
  const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }, 
     select : "-password" ,
     populate : [{path:'doctorId' ,select:'username'} ,{path :'time' ,select:'-doctorId'}]
    };
    const data = await User.findById({_id :req.params.id}).select("-password")
    if(!data) throw new AppError('not fount' , 404)
 
    const appointment = await Appointment.paginate({userId:req.params.id} ,options)
   

    if(!appointment) throw new AppError('not fount Appointment' , 404)
    return res.json({data ,appointment })
})

export const getAllapointment=catchError(async(req,res)=>{
    const { page = 1, limit = 10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 }, 
        populate : [({ path: 'time', select: '-doctorId' }) ,({ path: 'doctorId', select: 'username' }) ]
      };
  const data = await Appointment.paginate({},options)
  return res.json({data})
})
export const GetNewAddDoctors = catchError(async(req,res)=>{
    const { page = 1, limit =10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 }, 
        select :('-email -phone -password -role')
      };
    const data = await Doctor.paginate({isAccepted:"pending"},options) 
    res.json({data})
  })

export const DoctorDetails = catchError(async(req,res)=>{
    const { page = 1, limit = 10 } = req.query;

   const options = {
     page: parseInt(page),
     limit: parseInt(limit),
     sort: { createdAt: -1 }, 
     populate:({path :'time' ,select:'-doctorId'})
   };
    const info = await Doctor.findById({_id :req.params.id}).select("-password")
    if(!info) throw new AppError('not fount' , 404)

    const appointment = await Appointment.paginate({doctorId:req.params.id},options)
    const time = await Time.find({doctorId:req.params.id}) 
    if(!time)  throw new AppError('not fount time' , 404)
    if(!appointment) throw new AppError('not fount Appointment' , 404)

    // const appointmentCount = await Appointment.countDocuments({doctorId:req.params.id})

    return res.json({data:{
        info ,time ,appointment
    }})
})
export const AcceptedDoctor = catchError(async(req,res)=>{
     
    const {stats ,id} = req.body;
     await Doctor.findByIdAndUpdate(id,{isAccepted:stats ,isVerify:true}) 
    res.json({message :'تم قبول الطلب'})
  })
export const getCounts = (model) =>catchError(async(req,res)=>{
    const count = await model.countDocuments()
    if(!count) throw new AppError('لاتوجد بيانات'  , 404)
    return res.json({count})
})
export const getAllCounts = catchError(async(req,res)=>{
    const appointment = await Appointment.countDocuments()
    const doctor = await Doctor.countDocuments()
    const user = await User.countDocuments()
    if(!appointment && !doctor  && !user) throw new AppError('لاتوجد بيانات'  , 404)
    return res.json({data:{
        appointment,
        doctor,
        user
     }})
})
export const addBlobkList = (model)=>catchError(async (req,res)=>{
  const {id} =req.params
  const user = await model.findById(id)
  if (!user) throw new AppError('المستخدم غير موجود' ,404)
  await model.findByIdAndUpdate(id,{isBlock:true}) 
  return res.json({message: "تم الاضافة الي قائمة الحظر"})
})
export const canceledBlobk = (model)=>catchError(async (req,res)=>{
  const {id} =req.params
   await model.findByIdAndUpdate(id,{isBlock:false}) 
  return res.json({message: "تم  رفع الحظر"})
})
export const Blocklist =  (model)=>catchError(async(req,res)=>{
  const { page = 1, limit =10 } = req.query;
  const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }, 
      select:("-password")
    };
  const data = await model.paginate({isBlock:true},options)

 return res.json({data})
})

// ads doctor 
export const addToads = catchError(async (req,res)=>{
  const {id} =req.params
  const doctor = await Doctor.findById(id)
  if (!doctor) throw new AppError('المستخدم غير موجود' ,404)
  await Doctor.findByIdAndUpdate(id,{ads:true}) 
  return res.json({message: "تم الاضافة الي قائمة التميز"})
})
export const RemoveAds = catchError(async (req,res)=>{
  const {id} =req.params
  const doctor = await Doctor.findById(id)
  if (!doctor) throw new AppError('المستخدم غير موجود' ,404)
  await Doctor.findByIdAndUpdate(id,{ads:false}) 
  return res.json({message: "تم الغاء  التميز"})
})
export const GetAdsDoctor = catchError(async(req,res)=>{
  const { page = 1, limit =10 } = req.query;
  const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }, 
      select :('-password ')
    };
  const data = await Doctor.paginate({ads:true},options) 
  res.json({data})
})


export const filter =(db)=> catchError(async(req,res)=>{
  const {  page = 1, limit = 10, email , username, phone,role } = req.query;
  let filters = {};

  if (email) filters.email = email;
  if (username) filters.username = username;
  if (phone) filters.phone = phone;
  if (role) filters.role = role;



  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: -1 }, 
    select :('username  phone  email  role  createdAt'),
  
    
  };

  const appointments = await db.paginate(filters,options)

  return res.json({ data: appointments });


})
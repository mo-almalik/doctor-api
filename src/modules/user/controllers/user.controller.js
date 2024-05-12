import User from "../../../models/user.js";
import Appointment from "../../../models/appointment.js";
import { AppError, catchError } from "../../../utils/error.handler.js";


const updateUser = catchError(async(req,res)=>{
    const {username,
        email,
        gender,
        phone,
        DOB} = req.body
        const {id}= req.user

        const user = await User.findById(id)
        if(!user) throw new AppError("user not found" , 404)
        await User.findByIdAndUpdate(id,{
            username,
            email,
            gender,
            phone,
            DOB
    })
        res.json({message :"updated success"})
})

const deleteAccountUser = catchError(async(req,res)=>{
    
        const {id}= req.user

        const user = await User.findById(id)
        if(!user) throw new AppError("user not found" , 404)
        await User.findByIdAndDelete(id,)
        res.json({message :"deleted success"})
})

const getMyAppointment = catchError(async(req,res)=>{
   const {id} =req.user
   const { page = 1, limit =10 } = req.query;
   const options = {
       page: parseInt(page),
       limit: parseInt(limit),
       sort: { createdAt: -1 }, 
       populate :[({path: 'time' ,select:'-doctorId -updatedAt -createdAt'}) ,({ path: 'doctorId', select: '-password -email -role -isVerify -updatedAt -createdAt' })]
     };

    const data = await Appointment.paginate({userId:id},options) 
 

    if(!data) throw new AppError('not found !' , 404)
    
    res.json({data})
 })

 const canceledMyAppointment = catchError(async(req,res)=>{
   const {id:userId} =req.user
   const {id} = req.params
 const data = await Appointment.findById(id)
 if(userId === data.userId.toString()) {
    await Appointment.findByIdAndUpdate(id,{status:"canceled"})
    res.json({message :"canceled appointment success"})
 } throw new AppError('not found !' , 404)
    
    
 })
 const userInfo = catchError(async(req,res)=>{
    const {id} = req.user

  const data = await User.findById(id).select('-password -role')
  if(!data) throw new AppError("not found", 404)
  res.json({data})
})


export{
    userInfo,
    updateUser,
    getMyAppointment,
    deleteAccountUser,
    canceledMyAppointment,
  
    
}
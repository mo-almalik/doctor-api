import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { sendMail } from "../../emails/sendEmail.js";
import { AppError, catchError } from "../../utils/error.handler.js";  
import Doctor from '../../models/doctor.js'
import {emailHtml} from '../../emails/emailTemplate.js'
import cloudinary from 'cloudinary'

const verify = catchError(async (req, res) => {
    jwt.verify(req.params.token, 'c11bc2262de686c' ,{expiresIn :'2h'}, async (err, decoded) => {
        if (err) return res.json(err)
        await Doctor.findOneAndUpdate({ email: decoded.email }, { verifyEmail: true })
        res.json({ message: "تم تاكيد البريد" })
    })
  
})


export const DoctorRegister =  catchError(async (req,res)=>{
    const {email,phone,password ,username} = req.body
    if (!req.file) {
      return res.status(400).json( "يرجى تحميل  الصور الشخصية " );
    }
  const {path}= req.file
   const cloudinaryImage = await cloudinary.uploader.upload(path); 
	const checkPhone = await Doctor.findOne({ phone })
	if (checkPhone) throw new AppError('This phone is already taken', 400)
   const hashed = bcrypt.hashSync(password , +process.env.SALT)
			await Doctor.create({
                profilePhoto:{
                    name:cloudinaryImage.asset_id,
                    path:cloudinaryImage.secure_url,
                },
                username,
                email,
                phone,
                password:hashed
            })
              
			let token = jwt.sign({ email: req.body.email }, 'c11bc2262de686c' ,{expiresIn :'2h'})
			sendMail({email   ,  html: emailHtml(token ,username)})
			 res.json({ message:'success'})
		
})


export {
    verify,
}
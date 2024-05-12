import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { sendMail } from "../../emails/sendEmail.js";
import User from "../../models/user.js";
import { AppError, catchError } from "../../utils/error.handler.js";  
import Doctor from '../../models/doctor.js'
import {emailHtml} from '../../emails/emailTemplate.js'
import cloudinary from 'cloudinary'
const verify = catchError(async (req, res) => {
    jwt.verify(req.params.token, 'sendMailToHambozo', async (err, decoded) => {
        if (err) return res.json(err)
        await User.findOneAndUpdate({ email: decoded.email }, { verifyEmail: true })
        res.json({ message: "success" })
    })

})


export const DoctorRegister =  catchError(async (req,res)=>{

 
    const {email,phone,password ,username} = req.body


    if (!req.file) {
      return res.status(400).json( "يرجى تحميل  الصور الشخصية " );
    }
  const {path}= req.file
   const cloudinaryImage = await cloudinary.uploader.upload(path); 
   console.log(cloudinaryImage);
	const checkPhone = await Doctor.findOne({ phone })
	if (checkPhone) throw new AppError('This phone is already taken', 400)
   const hashed = bcrypt.hashSync(password , +process.env.SALT)
			const doctor = await Doctor.create({
                profilePhoto:{
                    name:cloudinaryImage.asset_id,
                    path:cloudinaryImage.secure_url,
                },
                username,
                email,
                phone,
                password:hashed
            })
              
			// let token = jwt.sign({ email: req.body.email }, 'sendMailToHambozo')
			// sendMail({email ,  html: emailHtml(token)})
			 res.json({ message:'success'})
		
})


export {
    verify,
}
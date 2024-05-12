
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const doctorSchema = new mongoose.Schema({

username:{
  type:String,

} ,
email:{
 type:String,
 unique: true,
 lowercase: true,

} ,
phone:{
 type:Number,
 unique: true,

} ,
password:{
 type:String,

},
gender:String,
DOB:{
    type: Date,
    format: 'YYYY-MM-DD',

} ,
role:{
    type: String,
    default :'doctor'

} ,

status:{
    type: String,
    enum: ['online' ,'offline'],
    default :'offline'
},
verifyEmail:{
 type:Boolean,
 default:false

},
isVerify:{
    type:Boolean,
    default :false,
},
isAccepted:{
    type:String,
    enum: ["canceled", "accepted","pending"],
    default :'pending',
},
accountComplite:{
    type:Boolean,
    default:false
},
specialization:{
//  type:mongoose.Schema.Types.ObjectId, ref: 'Specialization',
type:String,
} ,
bio:{
 type:String,

} ,
profilePhoto:{
    path:String,
    name:String,
},
location:{
 type:String,

} ,
price:{
 type:Number,

} ,
isBlock:{
 type:Boolean,
 default:false

},
appointment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Appointment"
},
Review:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review"
},
ads:{
    type:Boolean,
    default:false
}

},{timestamps:true})

// doctorSchema.post('find',(doc,next)=>{
//     doc.forEach((d)=>  d.path = process.env.BASE_URL + 'uploads/' +  d.path  )
//     // doc.profilePhoto = process.env.BASE_URL + 'uploads/' + doc.profilePhoto 
//     next()
//   })
  
doctorSchema.plugin(mongoosePaginate);
const Doctor  =  mongoose.model("Doctor" , doctorSchema)

export default Doctor
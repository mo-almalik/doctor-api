import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const userSchema = new mongoose.Schema({

username:{
  type:String,

},
email:{
 type:String,
 required:true,
 unique: true,

} ,
gender:String,

phone:{
    type:Number,
    unique: true,

} ,
password:{
 type:String,

} ,
DOB:{
    type: Date,
    format: 'YYYY-MM-DD',

} ,
role:{
    type: String,
    enum: ['admin', 'user'],
    default :'user'
} ,

status:{
    type: String,
    enum: ['online' ,'offline'],
    default :'offline'
},
verifyEmail:{
 type:Boolean,

},

isBlock:{
 type:Boolean,
 default:false
},
appointment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Appointment"
}
},{timestamps:true})

userSchema.plugin(mongoosePaginate);
const User  =  mongoose.model("User" , userSchema)

export default User
import mongoose from "mongoose";

const availabletimeSchema = new mongoose.Schema({
  doctorId:{
     type: mongoose.Schema.Types.ObjectId,
    ref:"Doctor"
  },
  day: {
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
     isAvailable: {
      type: Boolean,
      default: true
    }
},{timestamps:true});

const Time = mongoose.model('Time', availabletimeSchema);
export default Time


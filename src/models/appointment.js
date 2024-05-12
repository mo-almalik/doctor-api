import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

function generateUniqueId() {
  const min = 100000;
  const max = 999999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    time: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Time",
    },

    name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    gender: String,

    status: {
      type: String,
      enum: ["canceled", "confirmed", "pending"],
      default: "pending",
    },
    visitNo: {
      type: Number,
      unique: true,
      default: generateUniqueId,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

appointmentSchema.plugin(mongoosePaginate);
const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;

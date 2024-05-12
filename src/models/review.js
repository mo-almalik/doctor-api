import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  rating: {
    type:Number,
    min:1,
    max:5,
    required:true,
    default:5
  },
  comment: String,

});

const Review = mongoose.model('Review', reviewSchema);

 export default Review;
 
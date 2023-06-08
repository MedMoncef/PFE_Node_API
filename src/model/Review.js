import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  ID_Review: String,
  OneStar: Number,
  TwoStars: Number,
  ThreeStars: Number,
  FourStars: Number,
  FiveStars: Number,
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
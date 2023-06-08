import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  ID_Review: String,
  oneStar: Number,
  twoStars: Number,
  threeStars: Number,
  fourStars: Number,
  fiveStars: Number,
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
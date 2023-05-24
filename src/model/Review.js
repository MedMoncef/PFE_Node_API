import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  ID_Review: String,
  Nom: String,
  Message: String,
  Image: String,
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  oneStar: { type: Number, default: 0 },
  twoStars: { type: Number, default: 0 },
  threeStars: { type: Number, default: 0 },
  fourStars: { type: Number, default: 0 },
  fiveStars: { type: Number, default: 0 },
  starRating: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  Nom: String,
  Message: String,
  Image: String,
});

reviewSchema.methods.calculateScore = function () {
  const totalReviews = this.oneStar + this.twoStars + this.threeStars + this.fourStars + this.fiveStars;
  this.score = (this.oneStar + (this.twoStars * 2) + (this.threeStars * 3) + (this.fourStars * 4) + (this.fiveStars * 5)) / totalReviews;
  return this.score;
}

const Review = mongoose.model('Review', reviewSchema);
export default Review;
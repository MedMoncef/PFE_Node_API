import mongoose from 'mongoose';

const { Schema } = mongoose;

const sliderSchema = new Schema({
  Image: String,
  Titre: String,
  Text: String,
  DateU: { type: Date, default: Date.now }
});

const Slider = mongoose.model('Slider', sliderSchema);
export default Slider;
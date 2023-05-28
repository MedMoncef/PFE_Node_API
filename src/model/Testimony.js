import mongoose from 'mongoose';
const { Schema } = mongoose;

const testimonySchema = new Schema({
  IdTestimony: String,
  comment: String,
  name: String,
  image: String,
  title: String
});

const Testimony = mongoose.model('Testimony', testimonySchema);
export default Testimony;
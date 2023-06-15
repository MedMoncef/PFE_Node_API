import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  nom: String,
  prenom: String,
  dateN: String,
  email: String,
  password: String,
  image: String,
  id_post: String
});

const User = mongoose.model('User', userSchema);
export default User;
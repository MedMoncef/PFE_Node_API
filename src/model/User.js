import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  nom: String,
  prenom: String,
  dateN: String,
  email: String,
  password: String,
  image: String,
  id_post: { type: Schema.Types.ObjectId, ref: 'Post', required: false },
});

// Pre-hook to capitalize the first letter of nom and prenom
userSchema.pre('save', function (next) {
  this.nom = capitalizeFirstLetter(this.nom);
  this.prenom = capitalizeFirstLetter(this.prenom);
  next();
});

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const User = mongoose.model('User', userSchema);
export default User;
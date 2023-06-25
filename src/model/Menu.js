import mongoose from 'mongoose';

const { Schema } = mongoose;

const menuSchema = new Schema({
  Image: String,
  Nom: String,
  Description: String,
  Prix: Number,
  Type: String,
});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
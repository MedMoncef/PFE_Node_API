import mongoose from 'mongoose';

const { Schema } = mongoose;

const menuSchema = new Schema({
  Image: String,
  Nom: String,
  Description: String,
  Prix: Number,
  Type: { type: Schema.Types.ObjectId, ref: 'MenuType', required: false },
});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
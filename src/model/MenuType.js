import mongoose from 'mongoose';

const { Schema } = mongoose;

const menuTypeSchema = new Schema({
  Name: String,
});

const MenuType = mongoose.model('MenuType', menuTypeSchema);
export default MenuType;
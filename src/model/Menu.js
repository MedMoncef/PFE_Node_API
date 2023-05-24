import mongoose from 'mongoose';

const { Schema } = mongoose;

const menuSchema = new Schema({
  ID_Menu: String,
  Image: String,
  Nom: String,
  Description: String,
  Type: {
    type: String,
    enum: ['Breakfast', 'Appetizers and Starters', 'Main Courses', 'Desserts', 'Beverages']
  }
});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
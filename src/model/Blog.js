import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogSchema = new Schema({
  ID_Blog: String,
  Image: String,
  Titre: String,
  Content: String,
  DateU: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
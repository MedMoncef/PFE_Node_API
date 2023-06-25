import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogSchema = new Schema({
  Image: String,
  Titre: String,
  Content: String,
  DateU: {
    type: Date,
    default: Date.now,
    get: function() {
      const date = new Date(this.DateU);
      return date.toLocaleDateString();
    }
  }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
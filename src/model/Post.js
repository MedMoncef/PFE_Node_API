import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  Name: String,
  Salaire: Number,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  ID_Post: String,
  Name: String,
  Salaire: Number,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
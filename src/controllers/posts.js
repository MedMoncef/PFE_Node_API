import Post from '../model/Post';
import express from 'express';

const createPost = async (req, res) => {
  const { ID_Post, Name, Salaire } = req.body;

  try {
    const newPost = new Post({
      ID_Post,
      Name,
      Salaire
    });

    const savedPost = await newPost.save();

    res.status(201).json({ id: savedPost._id });
  } catch (error) {
    console.error('Error creating post:', error);
    res.sendStatus(500);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.sendStatus(500);
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.send(post);
  } catch (error) {
    console.error('Error getting post by ID:', error);
    res.sendStatus(500);
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;

  try {
    const result = await Post.updateOne({ _id: id }, updatedPost);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Post.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createPost, getAllPosts, getPostById, updatePost, deletePost };
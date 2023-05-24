import Blog from '../model/Blog';
import express from 'express';
import nodemailer from 'nodemailer';

const createBlog = async (req, res) => {
  const { Image, Titre, Content } = req.body;

  try {
    const newBlog = new Blog({
      Image,
      Titre,
      Content
    });

    const savedBlog = await newBlog.save();

    // Send email using nodemailer
    // ...

    res.status(201).json({ id: savedBlog._id });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.sendStatus(500);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send(blogs);
  } catch (error) {
    console.error('Error getting blogs:', error);
    res.sendStatus(500);
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updatedBlog = req.body;

  try {
    const result = await Blog.updateOne({ _id: id }, updatedBlog);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    return res.json({ message: 'Blog updated successfully' });
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Blog.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    return res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createBlog, getAllBlogs, updateBlog, deleteBlog };
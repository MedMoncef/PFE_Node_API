import Testimony from '../model/Testimony';
import express from 'express';
import nodemailer from 'nodemailer';

const createTestimony = async (req, res) => {
  const { image, title, comment, name } = req.body;

  try {
    const newTestimony = new Testimony({
      image,
      title,
      comment,
      name
    });

    const savedTestimony = await newTestimony.save();

    // Send email using nodemailer
    // ...

    res.status(201).json({ id: savedTestimony._id });
  } catch (error) {
    console.error('Error creating testimony:', error);
    res.sendStatus(500);
  }
};

const getAllTestimonies = async (req, res) => {
  try {
    const testimonies = await Testimony.find();
    res.send(testimonies);
  } catch (error) {
    console.error('Error getting testimonies:', error);
    res.sendStatus(500);
  }
};

const updateTestimony = async (req, res) => {
  const { id } = req.params;
  const updatedTestimony = req.body;

  try {
    const result = await Testimony.updateOne({ _id: id }, updatedTestimony);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Testimony not found' });
    }

    return res.json({ message: 'Testimony updated successfully' });
  } catch (error) {
    console.error('Error updating testimony:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteTestimony = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Testimony.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Testimony not found' });
    }

    return res.json({ message: 'Testimony deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimony:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTestimonyById = async (req, res) => {
  const { id } = req.params;

  try {
    const testimony = await Testimony.findById(id);
    
    if (!testimony) {
      return res.status(404).json({ message: 'Testimony not found' });
    }

    res.json(testimony);
  } catch (error) {
    console.error('Error getting testimony by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createTestimony, getAllTestimonies, updateTestimony, deleteTestimony, getTestimonyById };
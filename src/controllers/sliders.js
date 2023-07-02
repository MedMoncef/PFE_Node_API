import Slider from '../model/Slider';
import express from 'express';
import nodemailer from 'nodemailer';

const createSlider = async (req, res) => {
  const { Image, Titre, Text } = req.body;

  try {
    const newSlider = new Slider({
      Image,
      Titre,
      Text
    });

    const savedSlider = await newSlider.save();

    // Send email using nodemailer
    // ...

    res.status(201).json({ id: savedSlider._id });
  } catch (error) {
    console.error('Error creating slider:', error);
    res.sendStatus(500);
  }
};

const getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.send(sliders);
  } catch (error) {
    console.error('Error getting sliders:', error);
    res.sendStatus(500);
  }
};

const updateSlider = async (req, res) => {
  const { id } = req.params;
  const updatedSlider = req.body;

  try {
    const result = await Slider.updateOne({ _id: id }, updatedSlider);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Slider not found' });
    }

    return res.json({ message: 'Slider updated successfully' });
  } catch (error) {
    console.error('Error updating slider:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteSlider = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Slider.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Slider not found' });
    }

    return res.json({ message: 'Slider deleted successfully' });
  } catch (error) {
    console.error('Error deleting slider:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getSliderById = async (req, res) => {
  const { id } = req.params;

  try {
    const slider = await Slider.findById(id);

    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }

    res.json(slider);
  } catch (error) {
    console.error('Error getting slider:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createSlider, getAllSliders, getSliderById, updateSlider, deleteSlider };

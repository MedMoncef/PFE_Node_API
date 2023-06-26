import Review from '../model/Review';
import express from 'express';
import nodemailer from 'nodemailer';

const createReview = async (req, res) => {
  const { Nom, Message, Image, starRating } = req.body;

  try {
    const newReview = new Review({
      Nom,
      Message,
      Image
    });

    if (starRating < 1 || starRating > 5) {
      return res.status(400).json({ message: 'Invalid star rating' });
    }

    // Add a count to the appropriate star rating
    if (starRating === 1) newReview.oneStar += 1;
    else if (starRating === 2) newReview.twoStars += 1;
    else if (starRating === 3) newReview.threeStars += 1;
    else if (starRating === 4) newReview.fourStars += 1;
    else if (starRating === 5) newReview.fiveStars += 1;

    // Now calculate the score
    newReview.calculateScore();

    const savedReview = await newReview.save();

    // Send email using nodemailer
    // ...

    res.status(201).json({ id: savedReview._id });
  } catch (error) {
    console.error('Error creating review:', error);
    res.sendStatus(500);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.send(reviews);
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.sendStatus(500);
  }
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const updatedReview = req.body;

  try {
    const result = await Review.updateOne({ _id: id }, updatedReview);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Review.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createReview, getAllReviews, updateReview, deleteReview };
import User from '../model/User';
import express from "express";
import nodemailer from "nodemailer";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import z from 'zod';


const registerSchema = z.object({
  nom: z.string().nonempty('Nom is required'),
  prenom: z.string().nonempty('Prénom is required'),
  dateN: z.string().nonempty('Date of Birth is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
  confirmPassword: z.string().nonempty('Confirm Password is required'),
  id_post: z.string().nonempty('Post is required'),
});
// ...

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  console.log(req.body);
  const personInfo = req.body;

  if (
    !personInfo.email ||
    !personInfo.password ||
    !personInfo.confirmPassword ||
    personInfo.password !== personInfo.confirmPassword
  ) {
    res.status(400).json({ message: 'Invalid request data.' });
  } else {
    try {
      const existingUser = await User.findOne({ email: personInfo.email });

      if (existingUser) {
        return res.status(409).json({ message: 'Email is already used.' });
      }

      const hashedPassword = await bcrypt.hash(personInfo.password, 10);

      const newPerson = new User({
        nom: personInfo.nom,
        prenom: personInfo.prenom,
        dateN: personInfo.dateN,
        email: personInfo.email,
        password: hashedPassword,
        id_post: personInfo.id_post
      });

      const savedPerson = await newPerson.save();

      const token = jwt.sign({ id: savedPerson._id, email: savedPerson.email }, 'your_secret_key');

      res.status(201).json({ id: savedPerson._id, authToken: token });
    } catch (error) {
      console.error('Error creating user:', error);
      res.sendStatus(500);
    }
  }
};

/* const getAllUser = async (req, res) => {
  const users = await User.find();
  return res.render("pages/login/register", { users });
}; */

const getAllUser = async (req, res) => {
  const users = await User.find();
  return res.send(users);
};


const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  try {
    const result = await User.updateOne({ _id: id }, updatedUser);

    if (result.n === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createUser, getAllUser, getUserById, updateUser, deleteUser };
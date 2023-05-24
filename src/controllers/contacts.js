import Contact from '../model/Contact';
import express from 'express';
import nodemailer from 'nodemailer';

const createContact = async (req, res) => {
  const { Nom, Email, Sujet, Message } = req.body;

  try {
    const newContact = new Contact({
      Nom,
      Email,
      Sujet,
      Message
    });

    const savedContact = await newContact.save();

    // Send email using nodemailer
    // ...

    res.status(201).json({ id: savedContact._id });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.sendStatus(500);
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.sendStatus(500);
  }
};

const getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.send(contact);
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    res.sendStatus(500);
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = req.body;

  try {
    const result = await Contact.updateOne({ _id: id }, updatedContact);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Error updating contact:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Contact.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createContact, getAllContacts, getContactById, updateContact, deleteContact };
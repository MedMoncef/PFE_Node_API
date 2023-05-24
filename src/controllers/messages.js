import Message from '../model/Message';
import express from 'express';

const createMessage = async (req, res) => {
  const { Sujet, Message, ID_Sent } = req.body;

  try {
    const newMessage = new Message({
      Sujet,
      Message,
      ID_Sent,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({ id: savedMessage._id });
  } catch (error) {
    console.error('Error creating message:', error);
    res.sendStatus(500);
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.send(messages);
  } catch (error) {
    console.error('Error getting messages:', error);
    res.sendStatus(500);
  }
};

const updateMessage = async (req, res) => {
  const { id } = req.params;
  const updatedMessage = req.body;

  try {
    const result = await Message.updateOne({ _id: id }, updatedMessage);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    return res.json({ message: 'Message updated successfully' });
  } catch (error) {
    console.error('Error updating message:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Message.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    return res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createMessage, getAllMessages, updateMessage, deleteMessage };
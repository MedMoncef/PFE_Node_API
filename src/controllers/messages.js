import Message from '../model/Message';
import express from 'express';

const createMessage = async (req, res) => {
  const { messageContent, ID_Sent, ID_SentTo, ID_PostSent } = req.body;

  try {
    const newMessage = new Message({
      Message: messageContent,  // Renamed Message to messageContent
      ID_Sent,
      ID_SentTo,
      ID_PostSent
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({ id: savedMessage._id });
  } catch (error) {
    console.error('Error creating message:', error);
    res.sendStatus(500);
  }
};

const getMessageById_Post = async (req, res) => {
  const { ID_PostSent } = req.params;

  try {
    const message = await Message.findOne({ ID_PostSent });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.send(message);
  } catch (error) {
    console.error('Error getting message:', error);
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

const getMessagesBetweenUsers = async (req, res) => {
  const { userID, otherUserID } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { ID_Sent: userID, ID_SentTo: otherUserID },
        { ID_Sent: otherUserID, ID_SentTo: userID },
      ],
    });

    res.send(messages);
  } catch (error) {
    console.error('Error getting messages:', error);
    res.sendStatus(500);
  }
};

const deleteMessagesBetweenUsers = async (req, res) => {
  const { userID, otherUserID } = req.params;

  try {
    const result = await Message.deleteMany({
      $or: [
        { ID_Sent: userID, ID_SentTo: otherUserID },
        { ID_Sent: otherUserID, ID_SentTo: userID },
      ],
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No messages found' });
    }

    return res.json({ message: 'Messages deleted successfully' });
  } catch (error) {
    console.error('Error deleting messages:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getGroupMessagesByPost = async (req, res) => {
  const { ID_PostSent } = req.params;

  try {
    const messages = await Message.find({ ID_PostSent, ID_SentTo: "Group" });

    res.send(messages);
  } catch (error) {
    console.error('Error getting messages:', error);
    res.sendStatus(500);
  }
};

const getMessagesRelatedToUser = async (req, res) => {
  const { userID, ID_PostSent } = req.params;

  try {
    const messages = await Message.find({ ID_SentTo: userID, ID_PostSent });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};


export {
  createMessage,
  getMessageById_Post,  // Added getMessageById_Post
  getAllMessages,
  updateMessage,
  deleteMessage,
  getMessagesBetweenUsers,
  deleteMessagesBetweenUsers,
  getGroupMessagesByPost,
  getMessagesRelatedToUser
};